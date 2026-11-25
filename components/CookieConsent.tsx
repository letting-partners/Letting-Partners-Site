"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import LPIcon from "@/components/LPIcon";

const GA_ID = "G-JKM4WL3BWX";
const STORAGE_KEY = "lp-cookie-consent";

/** The footer link dispatches this; the banner listens for it. */
export const COOKIE_SETTINGS_EVENT = "lp-open-cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  /*
   * Private browsing and blocked site data both make this throw rather than
   * return null, and a throw here would take the whole layout down.
   */
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

function storeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* Nothing to do: the banner still applies the choice for this visit. */
  }
}

/*
 * Withdrawing consent has to remove what was already set, otherwise the cookies
 * sit there until they expire and the promise in the privacy policy is empty.
 */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((pair) => pair.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name) && (name.startsWith("_ga") || name === "_gid"));

  const { hostname } = window.location;
  // The cookie is set on the registrable domain, so clear both spellings of it.
  const domains = [hostname, `.${hostname}`, `.${hostname.split(".").slice(-2).join(".")}`];

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    // No stored choice means nothing has been consented to yet, so ask.
    if (stored === null) setOpen(true);
    /*
     * Sweep on every load unless consent is in place, so no analytics cookie
     * ever outlives the consent for it. The tag writes its session cookie as
     * the page unloads, so clearing only at the moment of refusal leaves one
     * behind on the way out.
     */
    if (stored !== "granted") clearAnalyticsCookies();
  }, []);

  useEffect(() => {
    const onRequest = () => setOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, onRequest);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onRequest);
  }, []);

  const accept = useCallback(() => {
    storeChoice("granted");
    setChoice("granted");
    setOpen(false);
  }, []);

  const reject = useCallback(() => {
    const wasGranted = choice === "granted";
    storeChoice("denied");
    setChoice("denied");
    setOpen(false);
    clearAnalyticsCookies();
    /*
     * Analytics was already running on this page view. Unmounting the tag does
     * not unload gtag, so the page has to be reloaded for the refusal to bite.
     */
    if (wasGranted) window.location.reload();
  }, [choice]);

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'granted'
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/*
       * A landmark rather than a dialog: the bar is not modal, it traps no
       * focus, and the rest of the page stays usable behind it.
       */}
      {open && (
        <div className="lp-cookie-banner" role="region" aria-labelledby="lp-cookie-title">
          <div className="lp-container lp-cookie-inner">
            <div className="lp-cookie-copy">
              <h2 id="lp-cookie-title">
                <LPIcon name="shield" size={18} />
                Cookies on this site
              </h2>
              <p>
                We use essential cookies to make this website work. We would also like to set Google
                Analytics cookies, which help us understand how visitors use the site. Analytics cookies
                are only set if you accept them, and you can change your choice at any time. Read our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </div>

            <div className="lp-cookie-actions">
              <button type="button" className="lp-btn lp-btn--gold" onClick={accept}>
                Accept analytics cookies
              </button>
              {/* Same size and weight as accept: refusing must be no harder than agreeing. */}
              <button type="button" className="lp-btn lp-btn--outline" onClick={reject}>
                Reject analytics cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Sits in the footer so a choice can be withdrawn as easily as it was given. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="lp-cookie-settings-link"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
    >
      Cookie Settings
    </button>
  );
}
