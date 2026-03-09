"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SynapseOasisLogo from "./SynapseOasisLogo";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavBarProps {
  links: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function NavBar({ links, ctaHref = "/#contact", ctaLabel = "Contact Us" }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(23,24,87,0.95)" : "rgba(23,24,87,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <SynapseOasisLogo size={32} />
          <span className="font-bold text-sm tracking-wider text-white">
            SynapseOasis
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isExternal = link.href.startsWith("http");
            return link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wider transition-colors hover:text-white"
                style={{ color: link.active ? "white" : "rgba(255,255,255,0.6)" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm font-semibold uppercase tracking-wider transition-colors hover:text-white"
                style={{ color: link.active ? "white" : "rgba(255,255,255,0.6)" }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            className="hidden sm:inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white px-5 py-2.5 rounded transition-all"
            style={{ background: "var(--blue-cta)", boxShadow: "inset 0 3px 5px 0 rgba(255,255,255,0.2)" }}
          >
            {ctaLabel} <ArrowIcon />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded"
            aria-label="Toggle menu"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <span className="block w-5 h-0.5 bg-white rounded transition-all duration-300" style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span className="block w-5 h-0.5 bg-white rounded mt-1 transition-all duration-300" style={{ opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-0.5 bg-white rounded mt-1 transition-all duration-300" style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? `${links.length * 48 + 80}px` : "0",
          borderTop: open ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-1">
          {links.map((link) => {
            const isExternal = link.href.startsWith("http");
            return link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider py-2.5 transition-colors hover:text-white"
                style={{ color: link.active ? "white" : "rgba(255,255,255,0.6)" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setOpen(false)}
                className="block text-sm font-semibold uppercase tracking-wider py-2.5 transition-colors hover:text-white"
                style={{ color: link.active ? "white" : "rgba(255,255,255,0.6)" }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-white px-5 py-3 rounded mt-2 sm:hidden"
            style={{ background: "var(--blue-cta)", boxShadow: "inset 0 3px 5px 0 rgba(255,255,255,0.2)" }}
          >
            {ctaLabel} <ArrowIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
