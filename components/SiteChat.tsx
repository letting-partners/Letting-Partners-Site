"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import LPIcon from "@/components/LPIcon";
import { LOGO } from "@/lib/images";

/**
 * The site-wide chat widget.
 *
 * One launcher in the corner of every page, and one panel. Messages reach the
 * Letting Partners portal: a chat started from a property page lands with the
 * agent who published that listing, and a chat started anywhere else has no
 * agent to attach to, so it goes to the shared queue where any agent can pick
 * it up.
 *
 * The property page has its own button rather than a second widget - it asks
 * this one to open, carrying the property with it, so a visitor never has two
 * chat windows or two threads.
 */

const TOKEN_KEY = "lp_chat_visitor_token";
const OPEN_POLL_MS = 8000;
const CLOSED_POLL_MS = 60000;

export const OPEN_CHAT_EVENT = "lp:open-chat";

export type OpenChatDetail = {
  propertyId?: string | null;
  propertyTitle?: string | null;
  agentName?: string | null;
};

/** Who the visitor is talking to, once somebody has taken the conversation. */
type Agent = {
  name: string;
  jobTitle: string | null;
  avatarUrl: string | null;
  online: boolean;
};

type Message = {
  id: string;
  sender: "VISITOR" | "STAFF" | "SYSTEM";
  senderName: string | null;
  body: string;
  createdAt: string;
};

/** Two letters for an agent with no photo, the way a contacts app does it. */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "LP";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

function readToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Blocked storage just means the thread will not resume on a return visit.
  }
}

export default function SiteChat() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [context, setContext] = useState<OpenChatDetail | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);

  const messagesRef = useRef<HTMLDivElement>(null);
  // What the visitor had already seen, so a reply that arrives while the panel
  // is shut can be counted without re-counting it on every poll.
  const seenCountRef = useRef(0);

  const loadThread = useCallback(async (isOpen: boolean) => {
    const token = readToken();
    if (!token) return;

    try {
      const response = await fetch(`/api/website/chat?visitorToken=${encodeURIComponent(token)}`);
      const payload = await response.json();
      if (!payload?.ok || !payload.thread) return;

      const thread: Message[] = payload.thread.messages ?? [];
      setMessages(thread);
      setAgent(payload.thread.agent ?? null);
      setStarted(true);

      if (isOpen) {
        seenCountRef.current = thread.length;
        setUnread(0);
      } else {
        const fromStaff = thread.filter((message) => message.sender !== "VISITOR").length;
        const unseen = thread.length - seenCountRef.current;
        setUnread(unseen > 0 && fromStaff > 0 ? unseen : 0);
      }
    } catch {
      // Offline or blocked: the composer still works and will retry on send.
    }
  }, []);

  /* The property page asks this widget to open rather than rendering its own. */
  useEffect(() => {
    function onOpenRequest(event: Event) {
      const detail = (event as CustomEvent<OpenChatDetail>).detail ?? null;
      setContext(detail);
      setOpen(true);
    }

    window.addEventListener(OPEN_CHAT_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    if (open) void loadThread(true);
  }, [open, loadThread]);

  /*
   * Poll quickly while the visitor is watching, slowly while they are not, and
   * not at all before there is a thread to poll for.
   */
  useEffect(() => {
    if (!open && !started) return;
    const interval = setInterval(() => void loadThread(open), open ? OPEN_POLL_MS : CLOSED_POLL_MS);
    return () => clearInterval(interval);
  }, [open, started, loadThread]);

  // Check once on load, so a reply left overnight is waiting in the morning.
  useEffect(() => {
    if (readToken()) void loadThread(false);
  }, [loadThread]);

  useEffect(() => {
    const element = messagesRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  /*
   * The panel covers the whole screen on a phone, so the page behind it must
   * stop scrolling: without this a swipe inside the conversation drags the
   * page underneath, and closing the chat leaves the visitor somewhere they
   * never navigated to.
   */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /*
   * An on-screen keyboard shrinks the visual viewport but not the layout one,
   * so a panel sized in viewport units keeps its full height and pushes the
   * composer - the part being typed into - underneath the keyboard. Measuring
   * the visual viewport keeps the message box on screen while typing.
   */
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    if (!viewport) return;

    const apply = () => {
      document.documentElement.style.setProperty("--lp-chat-vh", `${viewport.height}px`);
    };

    apply();
    viewport.addEventListener("resize", apply);
    viewport.addEventListener("scroll", apply);

    return () => {
      viewport.removeEventListener("resize", apply);
      viewport.removeEventListener("scroll", apply);
      document.documentElement.style.removeProperty("--lp-chat-vh");
    };
  }, [open]);

  // Escape closes, as it does for any dialog.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send() {
    if (!body.trim()) return;
    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/website/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          visitorToken: readToken(),
          // Only the opening message carries the details; after that the token
          // identifies the thread and the rest would be ignored anyway.
          propertyId: started ? null : (context?.propertyId ?? null),
          name: started ? null : name || null,
          email: started ? null : email || null,
          phone: started ? null : phone || null,
          message: body,
        }),
      });

      const payload = await response.json();

      if (!payload?.ok) {
        setError(payload?.error ?? "We could not send that message. Please try again.");
        return;
      }

      if (payload.visitorToken) writeToken(payload.visitorToken);
      setBody("");
      setStarted(true);
      await loadThread(true);
    } catch {
      setError("We could not reach the messaging service. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const subject = context?.propertyTitle ?? null;
  const replier = context?.agentName
    ? `${context.agentName} will reply`
    : "A member of our team will reply";

  return (
    <>
      {!open && (
        <button
          type="button"
          className="lp-chat-launcher"
          onClick={() => setOpen(true)}
          aria-label={unread > 0 ? `Open chat, ${unread} new message` : "Chat with us"}
        >
          <LPIcon name="message-circle" size={22} />
          <span className="lp-chat-launcher-text">Chat with us</span>
          {unread > 0 && <span className="lp-chat-launcher-dot" aria-hidden="true" />}
        </button>
      )}

      {open && (
        <div
          className="lp-chat-scrim"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            className="lp-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-label={subject ? `Chat about ${subject}` : "Chat with Letting Partners"}
          >
            <header className="lp-chat-header">
              {/* Letting Partners answers until somebody picks the conversation
                  up; from then on the visitor is talking to a named person, and
                  the header says who. */}
              <div className="lp-chat-ident">
                <span
                  className={
                    agent?.online
                      ? "lp-chat-avatar lp-chat-avatar--online"
                      : "lp-chat-avatar"
                  }
                >
                  {agent?.avatarUrl ? (
                    <Image
                      src={agent.avatarUrl}
                      alt=""
                      width={44}
                      height={44}
                      className="lp-chat-avatar-photo"
                    />
                  ) : agent ? (
                    <span className="lp-chat-avatar-initials">{initialsOf(agent.name)}</span>
                  ) : (
                    <Image
                      src={LOGO.mark}
                      alt=""
                      width={24}
                      height={24}
                      className="lp-chat-avatar-mark"
                    />
                  )}
                </span>

                <span className="lp-chat-ident-text">
                  <strong>{agent ? agent.name : "Letting Partners"}</strong>
                  <p>
                    {agent ? (
                      <>
                        {agent.jobTitle && <span>{agent.jobTitle}</span>}
                        <span className={agent.online ? "lp-chat-status is-online" : "lp-chat-status"}>
                          {agent.online ? "Online" : "Away"}
                        </span>
                      </>
                    ) : (
                      <span>{replier}</span>
                    )}
                  </p>
                </span>
              </div>

              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
                <LPIcon name="x" size={18} />
              </button>
            </header>

            <div className="lp-chat-body" ref={messagesRef}>
              {messages.length === 0 && (
                <p className="lp-chat-intro">
                  {subject
                    ? `Ask us anything about ${subject}. We usually reply the same working day.`
                    : "Ask us about renting, letting or managing a property. We usually reply the same working day."}
                </p>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.sender === "VISITOR"
                      ? "lp-chat-bubble lp-chat-bubble--out"
                      : "lp-chat-bubble lp-chat-bubble--in"
                  }
                >
                  {message.sender === "STAFF" && message.senderName && (
                    <span className="lp-chat-author">{message.senderName}</span>
                  )}
                  {message.body}
                </div>
              ))}
            </div>

            {!started && (
              <div className="lp-chat-lead">
                <input
                  className="lp-form-input"
                  placeholder="Your name"
                  value={name}
                  aria-label="Your name"
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  className="lp-form-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  aria-label="Your email address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className="lp-form-input"
                  placeholder="Phone (optional)"
                  value={phone}
                  aria-label="Your phone number"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            )}

            {error && (
              <p className="lp-chat-error" role="alert">
                {error}
              </p>
            )}

            <div className="lp-chat-composer">
              <textarea
                className="lp-form-input"
                rows={2}
                placeholder="Write your message..."
                aria-label="Your message"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") void send();
                }}
              />
              <button
                type="button"
                className="lp-btn lp-btn--gold lp-btn--sm"
                onClick={() => void send()}
                disabled={sending || !body.trim()}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>

            <p className="lp-chat-privacy">
              We use your details only to reply to this enquiry. See our{" "}
              <a href="/privacy-policy">privacy policy</a>.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
