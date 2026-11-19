"use client";

import Image from "next/image";
import { useRef, useState, ViewTransition } from "react";

type ProductPhoto = { src: string; alt: string; label: string };

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
  const photos = images.slice(0, 3);

  function selectPhoto(index: number, moveFocus = false) {
    setSelected(index);
    setZoomed(false);
    if (moveFocus) thumbnailRefs.current[index]?.focus();
  }

  function handleThumbnailKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % photos.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + photos.length) % photos.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = photos.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectPhoto(nextIndex, true);
  }

  return (
    <div>
      <ViewTransition
        name={`product-${slug}`}
        share="product-image"
        default="none"
      >
        <button
          type="button"
          onClick={() => setZoomed((current) => !current)}
          aria-pressed={zoomed}
          aria-label={`${zoomed ? "Zoom out of" : "Zoom in on"} ${name}`}
          aria-describedby="gallery-status"
          className={`relative block aspect-square w-full overflow-hidden product-stage rounded-2xl ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        >
          {photos.map((photo, index) => (
            <span
              key={photo.src}
              aria-hidden={selected !== index}
              className={`absolute inset-0 transition-[opacity,transform] duration-200 ease-out ${
                selected === index
                  ? `opacity-100 ${zoomed ? "scale-150" : "scale-100"}`
                  : "pointer-events-none scale-[.985] opacity-0"
              }`}
            >
              <Image
                src={photo.src}
                alt={selected === index ? photo.alt : ""}
                fill
                preload={index === 0}
                sizes="(max-width: 767px) 90vw, 600px"
                className="object-contain p-6"
              />
            </span>
          ))}
          <span className="absolute bottom-4 right-4 rounded-full border border-[var(--color-border)] bg-white/95 px-4 py-2 text-xs font-semibold text-[var(--color-secondary)] shadow-sm backdrop-blur-sm">
            {zoomed ? "− Zoom out" : "+ Zoom image"}
          </span>
        </button>
      </ViewTransition>

      <div
        className="mt-4 grid grid-cols-4 gap-3"
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
            onKeyDown={(event) => handleThumbnailKeyDown(event, index)}
            className={`relative aspect-[1.4] overflow-hidden rounded-xl border-2 bg-white transition-[border-color,box-shadow] duration-150 ${
              selected === index
                ? "border-[var(--color-primary)]"
                : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
            }`}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="180px"
              className="object-contain p-3"
            />
            {selected === index ? (
              <span
                className="absolute bottom-2 right-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[11px] font-bold text-[var(--color-primary)]"
                aria-hidden="true"
              >
                ✓
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <p
        id="gallery-status"
        className="mt-4 text-xs leading-5 text-[var(--color-neutral)]"
        aria-live="polite"
      >
        {photos.length === 1
          ? "Original catalogue photo. Select the image to take a closer look."
          : "Use the thumbnails or arrow keys to change photos. Select the image to zoom."}
      </p>
    </div>
  );
}
