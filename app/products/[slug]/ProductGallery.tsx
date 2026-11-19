"use client";

import Image from "next/image";
import { useRef, useState, ViewTransition } from "react";

type ProductPhoto = { src: string; display: string; alt: string; label: string };

// Up to three verified photos. With more than one: thumbnails, arrow keys,
// previous/next buttons and horizontal swipe. Selecting the stage zooms.
export default function ProductGallery({
  slug,
  name,
  images,
}: {
  slug: string;
  name: string;
  images: ProductPhoto[];
}) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const photos = images.slice(0, 3);
  const multiple = photos.length > 1;

  function selectPhoto(index: number, moveFocus = false) {
    const next = (index + photos.length) % photos.length;
    setSelected(next);
    setZoomed(false);
    if (moveFocus) thumbnailRefs.current[next]?.focus();
  }

  function handleKeys(
    event: React.KeyboardEvent<HTMLElement>,
    index: number,
    moveFocus: boolean,
  ) {
    if (!multiple) return;
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: photos.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    selectPhoto(keys[event.key], moveFocus);
  }

  return (
    <div>
      <div className="relative">
        <ViewTransition
          name={`product-${slug}`}
          share="product-image"
          default="none"
        >
          <button
            type="button"
            onClick={() => setZoomed((current) => !current)}
            onKeyDown={(event) => handleKeys(event, selected, false)}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse")
                swipeStart.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              const start = swipeStart.current;
              swipeStart.current = null;
              if (!start || !multiple) return;
              const dx = event.clientX - start.x;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(event.clientY - start.y))
                selectPhoto(selected + (dx < 0 ? 1 : -1));
            }}
            aria-pressed={zoomed}
            aria-label={`${zoomed ? "Zoom out of" : "Zoom in on"} ${name}, ${photos[selected].label}`}
            aria-describedby="gallery-status"
            className={`product-stage relative block aspect-square w-full touch-pan-y overflow-hidden rounded-2xl ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          >
            {photos.map((photo, index) => (
              <span
                key={photo.src}
                aria-hidden={selected !== index}
                // Each layer is its own blend group (opacity/scale), so it
                // carries the stage tone for the photo to multiply onto.
                className={`absolute inset-0 bg-[var(--color-image-surface)] transition-[opacity,transform] duration-200 ease-out ${
                  selected === index
                    ? `opacity-100 ${zoomed ? "scale-150" : "scale-100"}`
                    : "pointer-events-none scale-[.985] opacity-0"
                }`}
              >
                <Image
                  src={photo.display}
                  alt={selected === index ? photo.alt : ""}
                  fill
                  preload={index === 0}
                  sizes="(max-width: 767px) 92vw, 640px"
                  className="object-contain p-[9%]"
                />
              </span>
            ))}
            <span className="absolute bottom-4 right-4 rounded-full border border-[var(--color-border)] bg-white/95 px-4 py-2 text-xs font-semibold shadow-sm">
              {zoomed ? "− Zoom out" : "+ Zoom image"}
            </span>
          </button>
        </ViewTransition>
        {multiple &&
          [
            ["Previous photo", -1, "left-3", "←"],
            ["Next photo", 1, "right-3", "→"],
          ].map(([label, step, side, arrow]) => (
            <button
              key={label as string}
              type="button"
              aria-label={label as string}
              onClick={() => selectPhoto(selected + (step as number))}
              className={`absolute top-1/2 ${side} grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-border)] bg-white/95 text-lg shadow-sm hover:border-[var(--color-text)]`}
            >
              <span aria-hidden="true">{arrow}</span>
            </button>
          ))}
      </div>

      {multiple && (
        <div
          className="mt-3 grid grid-cols-4 gap-3"
          role="group"
          aria-label={`${name} product photos`}
        >
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              ref={(element) => {
                thumbnailRefs.current[index] = element;
              }}
              type="button"
              aria-pressed={selected === index}
              aria-label={`Show ${photo.label}`}
              onClick={() => selectPhoto(index)}
              onKeyDown={(event) => handleKeys(event, index, true)}
              className={`product-stage relative aspect-square overflow-hidden rounded-xl border-2 transition-colors duration-150 ${
                selected === index
                  ? "border-[var(--color-selected)]"
                  : "border-transparent hover:border-[var(--color-control)]"
              }`}
            >
              <Image
                src={photo.display}
                alt=""
                fill
                sizes="140px"
                className="object-contain p-[10%]"
              />
              {selected === index && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1.5 right-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-selected)] text-[11px] font-bold text-[var(--color-on-selected)]"
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <p
        id="gallery-status"
        className="mt-3 text-xs leading-5 text-[var(--color-text-muted)]"
        aria-live="polite"
      >
        {multiple
          ? `Photo ${selected + 1} of ${photos.length}. Swipe, use the arrow keys or the thumbnails to change photos; select the image to zoom.`
          : "Original catalogue photo. Select the image to take a closer look."}
      </p>
    </div>
  );
}
