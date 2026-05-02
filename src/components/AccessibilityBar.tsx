import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Type, Contrast } from "lucide-react";

/**
 * Bar bantuan aksesibilitas — selalu muncul di atas navbar.
 * Gaya lembut, ramah lansia.
 */
export default function AccessibilityBar() {
  const { size, setSize, highContrast, toggleContrast } = useAccessibility();

  const sizes: { key: typeof size; label: string }[] = [
    { key: "normal", label: "A" },
    { key: "besar", label: "A+" },
    { key: "sangat-besar", label: "A++" },
  ];

  return (
    <div className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-3 justify-end">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4" aria-hidden />
          <span className="text-xs font-semibold tracking-wide uppercase">
            Ukuran Teks
          </span>
          <div className="flex gap-1 ml-1" role="group" aria-label="Ukuran teks">
            {sizes.map((s) => (
              <button
                key={s.key}
                onClick={() => setSize(s.key)}
                aria-pressed={size === s.key}
                aria-label={`Ukuran ${s.label}`}
                className={`min-w-9 h-8 px-2 rounded-full text-xs font-bold transition-colors ${
                  size === s.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/10 text-background hover:bg-background/20"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={toggleContrast}
          aria-pressed={highContrast}
          className={`flex items-center gap-2 px-3 h-8 rounded-full text-xs font-semibold transition-colors ${
            highContrast
              ? "bg-primary text-primary-foreground"
              : "bg-background/10 text-background hover:bg-background/20"
          }`}
        >
          <Contrast className="w-4 h-4" aria-hidden />
          <span>Kontras Tinggi</span>
        </button>
      </div>
    </div>
  );
}
