"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
type ImageItem = { color?: string; label: string; src?: string };
type Item = { title: string; description: string; images: ImageItem[] };
const items: Item[] = [
  {
    title: "Trip at Five",
    description:
      "A travel service interface with clear trip discovery and planning experiences.",
    images: [
      { src: "/gallery/trip-at-five/trip-at-five-01.png", label: "trip-at-five / 01" },
      { src: "/gallery/trip-at-five/trip-at-five-02.png", label: "trip-at-five / 02" },
      { src: "/gallery/trip-at-five/trip-at-five-03.jpg", label: "trip-at-five / 03" },
      { src: "/gallery/trip-at-five/trip-at-five-04.png", label: "trip-at-five / 04" },
      { src: "/gallery/trip-at-five/trip-at-five-05.png", label: "trip-at-five / 05" },
      { src: "/gallery/trip-at-five/trip-at-five-06.png", label: "trip-at-five / 06" },
    ],
  },
  {
    title: "Internship next.js frontend dashboard",
    description:
      "During my summer break internship, I built a test dashboard using Next.js for a software program developed by one of our outsourcing vendors.",
    images: [
      { src: "/gallery/internship-next-frontend/internship-next-frontend-01.png", label: "internship-next-frontend / 01" },
      { src: "/gallery/internship-next-frontend/internship-next-frontend-02.png", label: "internship-next-frontend / 02" },
      { src: "/gallery/internship-next-frontend/internship-next-frontend-03.png", label: "internship-next-frontend / 03" },
      { src: "/gallery/internship-next-frontend/internship-next-frontend-04.png", label: "internship-next-frontend / 04" },
      { src: "/gallery/internship-next-frontend/internship-next-frontend-05.png", label: "internship-next-frontend / 05" },
      { src: "/gallery/internship-next-frontend/internship-next-frontend-06.png", label: "internship-next-frontend / 06" },
    ],
  },
];
export default function Gallery() {
  const [selected, setSelected] = useState<Item | null>(null);
  const [index, setIndex] = useState(0);
  function open(item: Item) {
    setSelected(item);
    setIndex(0);
  }
  function move(step: number) {
    if (!selected) return;
    setIndex(
      (current) =>
        (current + step + selected.images.length) % selected.images.length,
    );
  }
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!selected) return;
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button
            className="gallery-item"
            key={item.title}
            onClick={() => open(item)}
          >
            <div
              className="gallery-placeholder"
              style={{
                background: item.images[0].color ? `linear-gradient(135deg, ${item.images[0].color}, #181818)` : "#181818",
              }}
            >
              {item.images[0].src ? <Image src={item.images[0].src} alt={`${item.title} preview`} fill sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 33vw" className="gallery-real-image" /> : <span>{item.images[0].label}</span>}
              <b>{item.images.length} images</b>
              {!item.images[0].src && <i />}
            </div>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="gallery-modal-backdrop"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <button
              className="gallery-arrow gallery-arrow-left"
              onClick={() => move(-1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div
              className="gallery-modal-image"
              style={{
                background: selected.images[index].color ? `linear-gradient(135deg, ${selected.images[index].color}, #181818)` : "#181818",
              }}
            >
              {selected.images[index].src ? <Image src={selected.images[index].src} alt={selected.images[index].label} fill sizes="(max-width: 560px) calc(100vw - 48px), 860px" className="gallery-real-image gallery-real-image-detail" /> : <><span>{selected.images[index].label}</span><i /></>}
            </div>
            <button
              className="gallery-arrow gallery-arrow-right"
              onClick={() => move(1)}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="gallery-counter">
              {index + 1} / {selected.images.length}
            </div>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
