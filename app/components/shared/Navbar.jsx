"use client";

import { useState } from "react";
import { useModal } from "../ModalProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openPuppets } = useModal();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/70 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto flex  items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Brand + Desktop Links */}
        <div className="flex items-center gap-4">
          {/* Brand */}
          <a
            href="/"
            className="flex items-center gap-2 text-white"
            aria-label="Home"
          >
            <span className="text-2xl">
              <img src="/images/logo.png" alt="" />
            </span>
            <span className="sr-only">Brand</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 text-[16px] text-neutral-300 md:flex pixelify">
            <li>
              <a
                href="/"
                className="inline-block rounded-md px-1 py-1 transition hover:text-white"
              >
                drops
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  openPuppets();
                }}
                className="inline-block rounded-md px-1 py-1 transition hover:text-white"
              >
                puppets
              </a>
            </li>
            <li>
              <a
                href="/"
                className="inline-block rounded-md px-1 py-1 transition hover:text-white"
              >
                swap
              </a>
            </li>
            <li>
              <a
                href="/"
                className="inline-block rounded-md px-1 py-1 transition hover:text-white"
              >
                documentation
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Wallet + Hamburger */}
        <div className="flex items-center gap-2">
          {/* Wallet badge (desktop) */}
          <span className="pixelify hidden rounded-full  px-3 py-1 text-[16px] font-medium text-neutral-200 md:inline-block">
            0xA1D…b3e9
          </span>

          {/* Hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-300 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Toggle menu</span>
            {!open ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-neutral-800/70 bg-black/70 backdrop-blur-md"
        >
          <div className="space-y-2 px-4 py-3 pixelify">
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
              onClick={() => setOpen(false)}
            >
              drops
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
              onClick={() => setOpen(false)}
            >
              puppets
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                openPuppets();
              }}
            >
              swap
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
              onClick={() => setOpen(false)}
            >
              documentation
            </a>

            {/* Wallet badge (mobile) */}
            <div className="pt-2">
              <span className="pixelify inline-block rounded-full   px-3 py-1 text-xs font-medium text-neutral-200">
                0xA1D…b3e9
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
