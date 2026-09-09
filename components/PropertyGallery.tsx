"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import LPIcon from "@/components/LPIcon";

/**
 * The photo gallery on a property listing.
 *
 * One large frame with a thumbnail strip beneath it. A thumbnail previews into
 * the large frame on hover and commits on click, so a visitor can skim a set of
 * photos with the mouse alone and still land on the one they meant. Leaving the
 * strip returns to the committed photo rather than stranding them on whichever
 * thumbnail they happened to pass over last.
 */

export type GalleryImage = { url: string; alt?: string | null };

export default function PropertyGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  // What a click chose, and what the mouse is currently hovering over. The
  // hover is a preview: it never becomes the selection on its own.
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const active = preview ?? selected;
  const current = images[active] ?? images[0];

  const step = useCallback(
    (delta: number) => {
      setPreview(null);
      setSelected((index) => (index + delta + total) % total);
    },
    [total],
  );

  // Arrow keys move through the set once the gallery has focus.
  function onKeyDown(event: React.KeyboardEvent) {
    if (total < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  // Keep the chosen thumbnail in view when the arrows walk past the edge.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[selected] as HTMLElement | undefined;
    if (!strip || !thumb) return;

    const left = thumb.offsetLeft - strip.offsetLeft;
    const right = left + thumb.offsetWidth;

    if (left < strip.scrollLeft) {
      strip.scrollTo({ left: left - 12, behavior: "smooth" });
    } else if (right > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: right - strip.clientWidth + 12, behavior: "smooth" });
    }
  }, [selected]);

  /* -------------------------------------------------------------- drag */

  /*
   * Pointer events, so one implementation covers mouse, touch and pen. The
   * photo follows the pointer and springs back if the drag was too short to
   * count, which keeps a tap or a vertical scroll from changing the photo.
   */
  const dragStartX = useRef<number | null>(null);
  const moved = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  function onPointerDown(event: React.PointerEvent) {
    if (total < 2 || (event.pointerType === "mouse" && event.button !== 0)) return;
    dragStartX.current = event.clientX;
    moved.current = 0;
    setDragging(true);
    stageRef.current?.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (dragStartX.current == null) return;
    const delta = event.clientX - dragStartX.current;
    moved.current = Math.abs(delta);
    setDragX(delta);
  }

  function endDrag(event: React.PointerEvent) {
    const start = dragStartX.current;
    dragStartX.current = null;
    setDragging(false);
    setDragX(0);
    stageRef.current?.releasePointerCapture?.(event.pointerId);

    if (start == null || total < 2) return;

    const delta = event.clientX - start;
    const width = stageRef.current?.clientWidth ?? 1;
    // A tenth of the frame, or 40px, whichever is smaller.
    if (Math.abs(delta) < Math.min(width / 10, 40)) return;

    step(delta < 0 ? 1 : -1);
  }

  /*
   * A drag that finishes over an arrow must not also press it.
   *
   * `detail` is how a real pointer click is told apart from a keyboard one:
   * activating a button with Enter or Space fires a click with detail 0 and no
   * pointerdown before it, so without this check a stale drag distance would
   * swallow it.
   */
  function onClickCapture(event: React.MouseEvent) {
    if (event.detail > 0 && moved.current > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
    moved.current = 0;
  }

  return (
    <div
      className="lp-gallery"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Photos of ${title}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        ref={stageRef}
        className={dragging ? "lp-gallery-stage is-dragging" : "lp-gallery-stage"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={dragX ? { "--lp-drag": `${dragX}px` } as React.CSSProperties : undefined}
      >
        <Image
          key={current.url}
          src={current.url}
          alt={current.alt ?? title}
          fill
          sizes="(max-width: 960px) 100vw, 62vw"
          className="lp-cover-img lp-gallery-photo"
          priority
        />

        {total > 1 && (
          <>
            <button
              type="button"
              className="lp-gallery-arrow lp-gallery-arrow--prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <LPIcon name="chevron-left" size={20} />
            </button>

            <button
              type="button"
              className="lp-gallery-arrow lp-gallery-arrow--next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              <LPIcon name="chevron-right" size={20} />
            </button>

            <span className="lp-gallery-count" aria-live="polite">
              {active + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className="lp-gallery-strip"
          ref={stripRef}
          onMouseLeave={() => setPreview(null)}
        >
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              className={
                index === selected ? "lp-gallery-thumb is-active" : "lp-gallery-thumb"
              }
              aria-label={`Show photo ${index + 1} of ${total}`}
              aria-current={index === selected}
              onClick={() => {
                setSelected(index);
                setPreview(null);
              }}
              onMouseEnter={() => setPreview(index)}
              onFocus={() => setPreview(index)}
              onBlur={() => setPreview(null)}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="120px"
                className="lp-cover-img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
