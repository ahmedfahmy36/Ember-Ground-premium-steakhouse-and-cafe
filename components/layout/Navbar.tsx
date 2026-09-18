"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "The Cuts", href: "#steakhouse" },
  { label: "The Ground", href: "#cafe" },
  { label: "Gallery", href: "#gallery" },
  { label: "Find Us", href: "#location" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Check a tiny 1% band exactly in the middle of the screen
      { rootMargin: "-50% 0px -49% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "bg-charcoal/95 backdrop-blur-sm border-b border-charcoal-600"
            : "bg-gradient-to-b from-charcoal/80 to-transparent"
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-18">
          <Link
            href="#hero"
            className="flex flex-col leading-none group"
            aria-label="Ember & Ground — Home"
          >
            <span className="font-display text-xl font-bold tracking-tight text-cream group-hover:text-brass transition-colors duration-200">
              Ember
            </span>
            <span className="font-body text-xs tracking-ultra-wide uppercase text-brass">
              &amp; Ground
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm tracking-widest uppercase transition-all duration-200 border-b pb-1 ${
                    isActive
                      ? "text-cream border-cream"
                      : "text-smoke border-transparent hover:text-cream hover:border-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="#reservations"
              id="nav-reserve-cta"
              className="font-body text-sm tracking-widest uppercase border border-brass text-brass px-5 py-2 hover:bg-brass hover:text-charcoal transition-colors duration-200"
            >
              Reserve
            </Link>
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 group"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px bg-cream transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-cream transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-cream transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={closeMobileMenu}
        />
        <div
          className={`
            absolute right-0 top-0 bottom-0 w-72 bg-charcoal flex flex-col pt-24 pb-12 px-8
            transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  // Small timeout ensures the navigation triggers before the menu unmounts/hides
                  setTimeout(closeMobileMenu, 150);
                }}
                className={`block font-body text-sm tracking-widest uppercase py-4 border-b border-charcoal-600 transition-all duration-200 ${
                  isActive 
                    ? "text-brass bg-charcoal-800 border-l-4 border-l-brass pl-4" 
                    : "text-smoke hover:text-cream border-l-4 border-l-transparent pl-4"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="#reservations"
            onClick={() => setTimeout(closeMobileMenu, 150)}
            className="mt-8 font-body text-sm tracking-widest uppercase border border-brass text-brass px-5 py-3 text-center hover:bg-brass hover:text-charcoal transition-colors duration-200"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </>
  );
}
