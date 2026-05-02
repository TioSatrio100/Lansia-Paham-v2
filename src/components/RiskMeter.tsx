import { ShieldCheck, ShieldAlert, AlertOctagon } from "lucide-react";

interface RiskMeterProps {
  /** Persentase risiko 0–100 */
  percent: number;
  level: "aman" | "mencurigakan" | "penipuan";
}

/**
 * Grafik persentase risiko penipuan.
 * Tampilan donut/progress + label besar yang mudah dibaca lansia.
 */
export default function RiskMeter({ percent, level }: RiskMeterProps) {
  const config = {
    aman: {
      label: "AMAN",
      desc: "Pesan ini terlihat aman.",
      color: "hsl(150 60% 40%)",
      bg: "hsl(150 50% 95%)",
      Icon: ShieldCheck,
    },
    mencurigakan: {
      label: "MENCURIGAKAN",
      desc: "Hati-hati, ada tanda bahaya.",
      color: "hsl(38 95% 50%)",
      bg: "hsl(48 100% 94%)",
      Icon: ShieldAlert,
    },
    penipuan: {
      label: "PENIPUAN",
      desc: "Jangan lakukan apa pun yang diminta!",
      color: "hsl(0 75% 50%)",
      bg: "hsl(0 80% 96%)",
      Icon: AlertOctagon,
    },
  }[level];

  const { Icon } = config;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="rounded-3xl p-5 my-3 flex flex-col sm:flex-row items-center gap-5 border"
      style={{ backgroundColor: config.bg, borderColor: config.color + "33" }}
      role="img"
      aria-label={`Tingkat risiko ${config.label} sebesar ${percent} persen`}
    >
      {/* Donut chart */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={config.color + "22"}
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold leading-none"
            style={{ color: config.color, fontFamily: "'Fraunces', serif" }}
          >
            {percent}%
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
            Tingkat Risiko
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <Icon className="w-6 h-6" style={{ color: config.color }} />
          <span
            className="text-xl font-bold tracking-wide"
            style={{ color: config.color, fontFamily: "'Fraunces', serif" }}
          >
            {config.label}
          </span>
        </div>
        <p className="text-base text-foreground/80 leading-snug">{config.desc}</p>

        {/* Bar mini */}
        <div className="mt-3 h-2 rounded-full overflow-hidden bg-foreground/10">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              backgroundColor: config.color,
              transition: "width 0.8s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
