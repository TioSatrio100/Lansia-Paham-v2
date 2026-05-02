import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import AccessibilityBar from "./AccessibilityBar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AccessibilityBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-foreground text-background mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <div
              className="text-2xl font-medium mb-3 flex items-center gap-1"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Lansia Paham<span className="text-primary text-3xl leading-none">.</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Asisten digital yang sabar dan ramah, dibuat khusus untuk membantu
              lansia Indonesia memahami dunia digital dengan tenang.
            </p>
          </div>
          <div>
            <h4 className="text-background text-base font-semibold mb-3 uppercase tracking-wider">
              Layanan
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/asisten" className="hover:text-primary">Bantu Isi Formulir</Link></li>
              <li><Link to="/waspada" className="hover:text-primary">Periksa Penipuan</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-background text-base font-semibold mb-3 uppercase tracking-wider">
              Bantuan Darurat
            </h4>
            <p className="text-sm text-background/70 mb-2">Layanan SAPA 129 (Pengaduan)</p>
            <p className="text-sm text-background/70">Polisi 110 · Ambulans 119</p>
          </div>
        </div>
        <div className="border-t border-background/10">
          <div className="max-w-7xl mx-auto px-4 py-5 text-center text-sm text-background/60 flex items-center justify-center gap-2">
            Dibuat dengan <Heart className="w-4 h-4 text-primary fill-primary" /> untuk komunitas lansia Indonesia 🇮🇩
          </div>
        </div>
      </footer>
    </div>
  );
}
