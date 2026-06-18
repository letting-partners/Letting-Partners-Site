import Link from "next/link";
import LPIcon from "@/components/LPIcon";

export default function NotFound() {
  return (
    <section className="lp-section lp-not-found">
      <div className="lp-container">
        <div className="lp-empty-state">
          <LPIcon name="home" className="lp-empty-icon" size={58} />
          <p className="lp-kicker">404</p>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
          <div className="lp-inline-actions lp-inline-actions--center">
            <Link href="/" className="lp-btn lp-btn--gold">Go Home</Link>
            <Link href="/contact" className="lp-btn lp-btn--outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
