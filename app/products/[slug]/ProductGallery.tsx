"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ name, images }: { name: string; images: { src: string; alt: string; label: string }[] }) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const photos = images.slice(0, 3);
  const current = photos[selected];

  return (
    <div>
      <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed} aria-label={`${zoomed ? "Zoom out of" : "Zoom in on"} ${name}`} className={`relative block aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}>
        <Image src={current.src} alt={current.alt} fill preload sizes="(max-width: 767px) 90vw, 600px" className={`object-contain p-6 mix-blend-multiply transition-transform duration-500 ${zoomed ? "scale-150" : "scale-100"}`} />
        <span className="absolute bottom-4 right-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">{zoomed ? "− Zoom out" : "+ Zoom image"}</span>
      </button>
      <div className="mt-4 grid grid-cols-3 gap-3" aria-label={`${name} product photos`}>
        {photos.map((photo, index) => <button key={photo.src} type="button" aria-pressed={selected === index} aria-label={`Show ${photo.label}`} onClick={() => { setSelected(index); setZoomed(false); }} className={`relative aspect-[1.4] overflow-hidden rounded-xl border-2 bg-[#F8FAFC] ${selected === index ? "border-[#008CA6]" : "border-slate-200"}`}><Image src={photo.src} alt={photo.alt} fill sizes="180px" className="object-contain p-3 mix-blend-multiply" /></button>)}
        {Array.from({ length: 3 - photos.length }, (_, index) => <div key={index} className="flex aspect-[1.4] items-center justify-center rounded-xl border border-dashed border-slate-200 p-3 text-center text-xs leading-5 text-slate-500">Additional photo<br />not available</div>)}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500" aria-live="polite">{photos.length} {photos.length === 1 ? "photo available" : "photos available"}. Select a photo, then tap the main image to zoom.</p>
    </div>
  );
}
