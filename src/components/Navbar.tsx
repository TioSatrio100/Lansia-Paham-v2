import { Link, useLocation } from "react-router-dom";
import { Home, FileText, ShieldAlert, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/asisten", label: "Bantu Formulir", icon: FileText },
  { href: "/waspada", label: "Waspada Penipuan", icon: ShieldAlert },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="bg-background/80 backdrop-blur-md sticky top-0 z-40 border-b border-border"
      aria-label="Navigasi utama"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-1 text-2xl md:text-[1.7rem] font-medium tracking-tight"
          style={{ fontFamily: "'Fraunces', serif" }}
          onClick={() => setOpen(false)}
        >
          Lansia Paham
          <span className="text-primary text-3xl leading-none">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                aria-current={active ? "page" : undefined}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-foreground/80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:119"
            className="pill-btn-ghost text-sm py-2.5 px-5"
            aria-label="Hubungi bantuan"
          >
            Hubungi Kami
          </a>
          <a
            href="tel:119"
            className="circle-badge w-11 h-11 bg-primary text-primary-foreground"
            aria-label="Telepon darurat"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden circle-badge w-11 h-11 bg-foreground text-background"
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {links.map((l) => {
              const Icon = l.icon;
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-lg font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" aria-hidden />
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
