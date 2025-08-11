"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DraggablePuppetDetail from "./DraggablePuppetDetail";

export default function DraggablePuppetsModal({ open, onClose }) {
  const [pos, setPos] = useState({ x: 600, y: 400 });
  const [dragging, setDragging] = useState(false);
  const size = { w: 520, h: 420 };
  const startRef = useRef({ x: 0, y: 0, left: 0, top: 0 });

  // detail modal state
  const [detailOpen, setDetailOpen] = useState(false);
  const [activePuppet, setActivePuppet] = useState(null);

  const clampToViewport = (x, y, w, h) => {
    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(0, window.innerHeight - h);
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    };
  };

  const onHeaderPointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: rect.left,
      top: rect.top,
    };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;
      const { x, y } = clampToViewport(
        startRef.current.left + dx,
        startRef.current.top + dy,
        size.w,
        size.h
      );
      setPos({ x, y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  if (!open) return null;

  // click handlers (no mapping, place items by hand)
  const openDetail = (puppet) => {
    setActivePuppet(puppet);
    setDetailOpen(true);
  };

  return (
    <>
      <div
        className="fixed z-50 select-none w-full h-auto lg:w-[530px] lg:h-[450px]"
        style={{ left: pos.x, top: pos.y }}
      >
        {/* neon shell */}
        <div className="relative h-full w-full ">
          {/* inner panel */}
          <div className="absolute inset-[6px]  text-zinc-100 rounded-lg border border-white/10  bg-[#0B0B0C]">
            {/* header (drag handle) */}
            <div
              onPointerDown={onHeaderPointerDown}
              className="cursor-grab active:cursor-grabbing flex items-center justify-between px-4 py-2"
            >
              <span className="text-sm font-medium pixelify">Puppets</span>
              <button
                aria-label="Close"
                onClick={onClose}
                className="rounded-md p-1.5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* canvas for absolute items */}
            <div className="relative h-[calc(100%-120px)] px-4 py-3">
              {/* each tile: absolute, hand-placed; click to open detail */}
              <PuppetTile
                style={{ left: 8, top: 55 }}
                name={"Kraven-1,\nthe Iron Maw"}
                img="/images/1.png"
                bg="#0b3d66"
                onClick={() =>
                  openDetail({
                    id: "1",
                    name: "Kraven-1, the Iron Maw",
                    img: "/images/b1.png",
                  })
                }
              />
              <PuppetTile
                style={{ left: 129, top: 85 }}
                name={"radiohead"}
                img="/images/2.png"
                bg="#0b3d66"
                onClick={() =>
                  openDetail({
                    id: "2",
                    name: "radiohead",
                    img: "/images/b2.png",
                  })
                }
              />
              <PuppetTile
                style={{ left: 300, top: 50 }}
                name={"Agent Thunder"}
                img="/images/3.png"
                bg="#79D5D5"
                onClick={() =>
                  openDetail({
                    id: "3",
                    name: "Agent Thunder",
                    img: "/images/b3.png",
                  })
                }
              />
              <PuppetTile
                style={{ left: 58, top: 168 }}
                name={"Virelle"}
                img="/images/4.png"
                bg="#7A4C7C"
                onClick={() =>
                  openDetail({
                    id: "4",
                    name: "Virelle",
                    img: "/images/b4.png",
                  })
                }
              />
              <PuppetTile
                style={{ left: 217, top: 133 }}
                name={"Marionette"}
                img="/images/5.png"
                bg="#7A4C7C"
                onClick={() =>
                  openDetail({
                    id: "5",
                    name: "Marionette",
                    img: "/images/5.png",
                  })
                }
              />
              <PuppetTile
                style={{ left: 339, top: 150 }}
                name={"Vorusk the\nMaw"}
                img="/images/6.png"
                bg="#7A4C7C"
                onClick={() =>
                  openDetail({
                    id: "6",
                    name: "Vorusk the Maw",
                    img: "/images/b6.png",
                  })
                }
              />
            </div>

            {/* footer CTA */}
            <div className="flex items-center justify-center px-4 ">
              <Link href="/">
                <button className="bg-[#1c111d] rounded border border-[3FC62FF]  px-3 py-[6px] text-sm hover:bg-white/10 pixelify text-[#FC62FF] cursor-pointer">
                  View All Puppets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* detail modal on top (draggable) */}
      <DraggablePuppetDetail
        open={detailOpen}
        puppet={activePuppet}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}

/* Small square with name (absolute) */
function PuppetTile({ style, name, img, bg = "#2a2a2a", onClick }) {
  return (
    <button
      className="absolute flex w-[150px] select-none flex-col items-center gap-2 text-left cursor-pointer"
      style={style}
      onClick={onClick}
    >
      <div
        className="h-[54px] w-[54px] overflow-hidden rounded-md"
        style={{ background: bg }}
      >
        <Image
          src={img}
          alt={name}
          width={54}
          height={54}
          className="h-[54px] w-[54px] object-cover"
        />
      </div>
      <div className="pixelify whitespace-pre-line text-center text-[12px] leading-tight text-zinc-300">
        {name}
      </div>
    </button>
  );
}
