import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RiskMeter from "./RiskMeter";

interface FormattedMessageProps {
  text: string;
  /** Tampilkan RiskMeter jika terdeteksi label risiko */
  enableRiskMeter?: boolean;
}

/**
 * Mendeteksi label risiko di awal teks dan memetakan ke persen.
 * Mendukung emoji + kata kunci bahasa Indonesia.
 */
function detectRisk(text: string): { level: "aman" | "mencurigakan" | "penipuan"; percent: number } | null {
  const lower = text.toLowerCase().slice(0, 200);

  if (/🚨|penipuan|scam|sangat berbahaya|jangan transfer/i.test(lower)) {
    // Cari angka persen jika disebut, kalau tidak default 90
    const m = text.match(/(\d{1,3})\s*%/);
    const p = m ? Math.min(100, parseInt(m[1])) : 92;
    return { level: "penipuan", percent: p };
  }
  if (/⚠️|mencurigakan|hati-hati|waspada|kemungkinan penipuan/i.test(lower)) {
    const m = text.match(/(\d{1,3})\s*%/);
    const p = m ? Math.min(100, parseInt(m[1])) : 60;
    return { level: "mencurigakan", percent: p };
  }
  if (/✅|aman|tidak berbahaya|asli|sah/i.test(lower)) {
    const m = text.match(/(\d{1,3})\s*%/);
    const p = m ? Math.min(100, parseInt(m[1])) : 15;
    return { level: "aman", percent: p };
  }
  return null;
}

export default function FormattedMessage({ text, enableRiskMeter }: FormattedMessageProps) {
  const risk = enableRiskMeter ? detectRisk(text) : null;

  return (
    <div className="prose-elderly">
      {risk && <RiskMeter level={risk.level} percent={risk.percent} />}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          h1: ({ children }) => (
            <h3 className="text-xl font-bold mb-2 mt-3 first:mt-0" style={{ fontFamily: "'Fraunces', serif" }}>
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="text-lg font-bold mb-2 mt-3 first:mt-0" style={{ fontFamily: "'Fraunces', serif" }}>
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h4>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 mb-3 ml-1 list-none">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 mb-3 ml-1 list-none counter-reset-list">{children}</ol>
          ),
          li: ({ children, ...props }) => {
            // ordered list pakai counter, unordered pakai bullet bulat
            const isOrdered = (props as { ordered?: boolean }).ordered;
            return (
              <li className="flex gap-2.5 items-start leading-relaxed">
                <span
                  className={`flex-shrink-0 mt-1 ${
                    isOrdered
                      ? "circle-badge w-6 h-6 bg-primary text-primary-foreground text-xs font-bold list-counter"
                      : "w-2 h-2 rounded-full bg-primary mt-2.5"
                  }`}
                  aria-hidden
                />
                <span className="flex-1">{children}</span>
              </li>
            );
          },
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-foreground/10 text-sm font-mono">
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 font-medium"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 my-3 italic text-foreground/80">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-4 border-foreground/10" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
