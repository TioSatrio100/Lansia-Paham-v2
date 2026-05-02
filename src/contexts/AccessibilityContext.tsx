import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Size = "normal" | "besar" | "sangat-besar";

interface AccessibilityState {
  size: Size;
  highContrast: boolean;
  setSize: (s: Size) => void;
  toggleContrast: () => void;
}

const SIZE_PX: Record<Size, string> = {
  normal: "18px",
  besar: "21px",
  "sangat-besar": "25px",
};

const Ctx = createContext<AccessibilityState | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [size, setSizeState] = useState<Size>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lp-size") : null;
    return (stored as Size) || "normal";
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return typeof window !== "undefined" && localStorage.getItem("lp-contrast") === "1";
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--base-font-size", SIZE_PX[size]);
    localStorage.setItem("lp-size", size);
  }, [size]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("lp-contrast", highContrast ? "1" : "0");
  }, [highContrast]);

  return (
    <Ctx.Provider
      value={{
        size,
        highContrast,
        setSize: setSizeState,
        toggleContrast: () => setHighContrast((v) => !v),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAccessibility harus di dalam AccessibilityProvider");
  return ctx;
}
