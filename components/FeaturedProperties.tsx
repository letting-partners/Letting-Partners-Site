"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import LPIcon from "@/components/LPIcon";
import WebsitePropertyCard, { WebsiteProperty } from "@/components/WebsitePropertyCard";
import { getWebsiteApiJson, WebsiteApiEnvelope } from "@/lib/website-api";

/**
 * The featured listings carousel on the home page.
 *
 * Which properties appear is chosen in the portal, so the home page reflects
 * whatever the team is pushing this week without a deploy.
 *
 * It advances on its own but stops the moment somebody takes over - hovering,
 * focusing a card with the keyboard, or pressing an arrow - because a slider
 * that moves while you are reading it is worse than one that does not move at
 * all. Nothing here renders if there is nothing featured.
 */

const AUTOPLAY_MS = 5000;

type ApiResponse = WebsiteApiEnvelope & { properties?: WebsiteProperty[] };

export default function FeaturedProperties({ limit = 9 }: { limit?: number }) {
  const [properties, setProperties] = useState<WebsiteProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);

  const viewportRef = useRef<HTMLDivElement>(null);

  // Drag state. `moved` is what tells a drag apart from a click on a card.
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const moved = useRef(0);

  useEffect(() => {
    const controller = new AbortController();

    getWebsiteApiJson<ApiResponse>(`/properties?featured=1&limit=${limit}`, controller.signal)
      .then((data) => {
        setProperties(data?.properties ?? []);
        setLoading(false);
      })
      .catch((error) => {
        // A home page must still render when the portal is unreachable, so
        // this section simply disappears rather than breaking the page.
        if (error?.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, [limit]);

  // How many cards fit, so the arrows page rather than nudge.
  useEffect(() => {
    function measure() {
      const width = window.innerWidth;
      setPerView(width < 700 ? 1 : width < 1080 ? 2 : 3);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const pageCount = Math.max(1, Math.ceil(properties.length / perView));

  // A resize can leave the last page out of range.
  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const go = useCallback(
    (delta: number) => {
      setPage((current) => (current + delta + pageCount) % pageCount);
    },
    [pageCount],
  );

  useEffect(() => {
    if (paused || pageCount < 2) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, pageCount, go]);

  /* -------------------------------------------------------------- drag */

  /*
   * Pointer events, so one implementation covers mouse, touch and pen. The
   * track follows the pointer and snaps to the nearest page on release; a
   * short drag springs back rather than jumping, which stops a stray flick
   * moving the carousel.
   */
  function onPointerDown(event: React.PointerEvent) {
    if (pageCount < 2 || event.button !== 0) return;
    dragStart.current = event.clientX;
    moved.current = 0;
    setDragging(true);
    viewportRef.current?.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!dragging) return;
    const delta = event.clientX - dragStart.current;
    moved.current = Math.abs(delta);
    setDragX(delta);
  }

  function endDrag(event: React.PointerEvent) {
    if (!dragging) return;
    const width = viewportRef.current?.clientWidth ?? 1;
    const delta = event.clientX - dragStart.current;

    setDragging(false);
    setDragX(0);
    viewportRef.current?.releasePointerCapture?.(event.pointerId);

    // A quarter of the viewport, or 70px, whichever is smaller.
    const threshold = Math.min(width / 4, 70);
    if (Math.abs(delta) > threshold) go(delta < 0 ? 1 : -1);
  }

  /*
   * Cards are links. Without this, letting go at the end of a drag counts as
   * a click and navigates away from the page the visitor was browsing.
   */
  function onClickCapture(event: React.MouseEvent) {
    // detail is 0 for a keyboard activation, which is never a drag.
    if (event.detail > 0 && moved.current > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
    moved.current = 0;
  }

  if (loading || properties.length === 0) return null;

  return (
    <div
      className="lp-featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={(event) => {
        /*
         * Only a keyboard focus should pause. Pressing the mouse on a card
         * focuses it too, so pausing on any focus meant that one drag left
         * the carousel paused for good.
         */
        const target = event.target as HTMLElement;
        if (typeof target.matches === "function" && target.matches(":focus-visible")) {
          setPaused(true);
        }
      }}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="lp-featured-head">
        <div>
          <span className="lp-kicker">Featured properties</span>
          <h3>Handpicked by our lettings team.</h3>
        </div>

        <div className="lp-featured-controls">
          {pageCount > 1 && (
            <>
              <button
                type="button"
                className="lp-featured-arrow"
                onClick={() => go(-1)}
                aria-label="Previous properties"
              >
                <LPIcon name="chevron-left" size={18} />
              </button>
              <button
                type="button"
                className="lp-featured-arrow"
                onClick={() => go(1)}
                aria-label="Next properties"
              >
                <LPIcon name="chevron-right" size={18} />
              </button>
            </>
          )}

          <Link href="/properties" className="lp-btn lp-btn--navy lp-btn--sm">
            Browse all
            <LPIcon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>

      <div
        className={dragging ? "lp-featured-viewport is-dragging" : "lp-featured-viewport"}
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div
          className="lp-featured-track"
          style={{
            transform: `translateX(calc(-${page * 100}% + ${dragX}px))`,
            transition: dragging ? "none" : undefined,
          }}
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="lp-featured-slide"
              style={{ flex: `0 0 ${100 / perView}%` }}
              // Cards scrolled out of view are not reachable by tab.
              aria-hidden={
                Math.floor(properties.indexOf(property) / perView) !== page || undefined
              }
            >
              <WebsitePropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="lp-featured-dots" role="tablist" aria-label="Featured property pages">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === page}
              aria-label={`Page ${index + 1} of ${pageCount}`}
              className={index === page ? "lp-featured-dot is-active" : "lp-featured-dot"}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
