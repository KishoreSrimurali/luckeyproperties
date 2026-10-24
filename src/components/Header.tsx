"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { nav } from "@/config/site";

export function Header({ logo, cta, mobileFoot }: { logo: ReactNode; cta: ReactNode; mobileFoot: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e.key === "Tab" && menu) {
        const items = [btnRef.current!, ...menu.querySelectorAll<HTMLElement>("a,button")];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="header" data-solid={solid || open} data-hidden={hidden && !open}>
        <div className="wrap header__inner">
          {logo}
          <nav className="nav" aria-label="Main">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions">
            <span className="header__cta">{cta}</span>
            <button
              ref={btnRef}
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="menu-btn__lines" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-menu" ref={menuRef} className="mobile-menu" data-open={open} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                  <span>0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">{mobileFoot}</div>
      </div>
    </>
  );
}
