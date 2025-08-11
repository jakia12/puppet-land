"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function DraggablePuppetDetail({ open, onClose, puppet }) {
  const [pos, setPos] = useState({ x: 1260, y: 120 });
  const [dragging, setDragging] = useState(false);
  // a bit larger to match your screenshot proportions
  const size = { w: 420, h: 450 };
  const startRef = useRef({ x: 0, y: 0, left: 0, top: 0 });

  const clamp = (x, y, w, h) => {
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
      const { x, y } = clamp(
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

  if (!open || !puppet) return null;

  return (
    <div
      className="fixed z-[70] select-none"
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
    >
      {/* outer shell */}
      <div className="relative h-full w-full rounded-xl border border-white/10 bg-[#0d0d0f] shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        {/* header (drag handle) */}
        <div
          onPointerDown={onHeaderPointerDown}
          className="cursor-grab active:cursor-grabbing flex items-center justify-between rounded-t-xl px-3 py-2 border-b border-white/10"
        >
          <span className="text-[12px] font-medium text-zinc-200 truncate pixelify">
            {puppet.name} {/* you can append price here like " - $819.21" */}
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-300  cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* image area (full-bleed inside panel) */}
        <div className="relative h-[calc(100%-40px)]">
          <div className="relative h-full w-full overflow-hidden rounded bg-[#19191c] border border-white/10">
            {/* pixel art kept crisp */}
            <Image
              src={puppet.img}
              alt={puppet.name}
              fill
              priority
              sizes="460px"
              className="object-cover"
              style={{ imageRendering: "pixelated" }}
            />

            {/* bottom-left small button overlay */}
            <div className="pointer-events-none absolute inset-0">
              <button
                onClick={() => console.log("Trade", puppet.name)}
                className="pixelify pointer-events-auto absolute left-3 bottom-3 rounded border border-white bg-black/40 px-3 py-1 text-[12px] text-zinc-100 hover:bg-black/55"
              >
                Trade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
