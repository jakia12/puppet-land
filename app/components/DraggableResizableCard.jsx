"use client";

import { useEffect, useRef, useState } from "react";
import PuppetAscii from "./PuppetAscii";
import Link from "next/link";

export default function DraggableCard() {
  const [open, setOpen] = useState(true);
  const [pos, setPos] = useState({ x: 50, y: 100 });
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0, left: 0, top: 0 });

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
        420, // card width
        300 // card height
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

  if (!open) return null; // ✅ Close completely when open = false

  return (
    <div
      className="fixed z-50 select-none rounded-xl border border-white/10 bg-[#0B0B0C] text-zinc-100 shadow-xl w-full h-auto lg:w-[530px] lg:h-[450px]"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Header */}
      <div
        className="cursor-grab active:cursor-grabbing flex items-center justify-between rounded-t-xl px-4 py-2  border-b border-white/10"
        onPointerDown={onHeaderPointerDown}
      >
        <span className="text-[17px] font-medium pixelify">
          Welcome to Puppet Land!
        </span>
        <button
          aria-label="Close"
          onClick={() => setOpen(false)} // ✅ Close box
          className="rounded-md p-1.5  cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-sm text-zinc-300 overflow-auto h-[calc(100%-48px)]">
        <PuppetAscii />
        <p className="mt-3 pixelify">
          Puppet Land is a persistent, on-chain world inhabited by AI-generated
          pixel beings called puppets. Each puppet emerges unpredictably, as if
          discovered rather than created — a rogue entity with its own
          personality, memories, and place in a sprawling, non-linear narrative
          that slowly unravels over time.
        </p>
        <p className="mt-3 pixelify">
          The AI behind Puppet Land weaves these beings into an evolving mythos,
          revealing fragments of their histories and relationships through
          interactive dialogue and emergent events.
        </p>
        <p className="mt-3 pixelify">
          Trade these emergent narratives with any Ethereum based wallet. 80% of
          all platform fees are redirected to $PEG holders and traders.
        </p>
        <Link href="/">
          <button className="mt-[26px] rounded border border-white  px-3 py-[6px] text-sm hover:bg-white/10 pixelify text-white cursor-pointer">
            Start trading
          </button>
        </Link>
      </div>
    </div>
  );
}
