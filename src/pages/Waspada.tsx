import Layout from "@/components/Layout";
import ChatBox from "@/components/ChatBox";
import { AlertTriangle, ShieldAlert } from "lucide-react";

const SYSTEM_PROMPT = `Kamu adalah asisten keamanan digital yang membantu lansia Indonesia mendeteksi penipuan.
Gunakan bahasa Indonesia yang sangat sederhana, ramah, tenang, dan tidak menakut-nakuti.

FORMAT JAWABAN WAJIB (urut):
1. BARIS PERTAMA harus salah satu label persis:
   - "✅ AMAN — Tingkat risiko: 10%" (boleh 5-25%)
   - "⚠️ MENCURIGAKAN — Tingkat risiko: 60%" (boleh 40-75%)
   - "🚨 PENIPUAN — Tingkat risiko: 95%" (boleh 80-100%)
2. Setelah itu jelaskan dengan struktur markdown rapi:
   - Gunakan **tebal** untuk kata penting
   - Gunakan daftar bernomor untuk langkah-langkah
   - Gunakan bullet (-) untuk daftar ciri-ciri
   - Buat heading (## Ciri-ciri / ## Yang Harus Dilakukan) bila perlu
3. Jika PENIPUAN: selalu beri langkah aman (jangan transfer, jangan beri OTP, hubungi keluarga, blokir nomor).
4. Selalu tutup dengan kalimat menenangkan dan pujian karena sudah bertanya dulu.

Contoh modus: pura-pura dari bank, hadiah palsu, sumbangan palsu, pinjaman online ilegal, arisan bodong, undian Shopee/BCA palsu.
Jika ada screenshot/foto pesan, baca dan analisis isinya dengan teliti.`;

const STARTERS = [
  "Ada WA bilang saya menang undian, minta nomor rekening",
  "Telepon mengaku dari bank minta kode OTP",
  "Pesan minta klik link untuk hadiah",
  "Ada yang minta transfer untuk biaya admin",
];

const WARNINGS = [
  "Minta transfer uang",
  "Minta kode OTP / PIN",
  "Mengaku menang hadiah",
  "Mengaku dari bank / polisi",
];

export default function WaspadaPage() {
  return (
    <Layout>
      <header
        className="text-background"
        style={{ backgroundColor: "hsl(var(--forest))" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="circle-badge w-12 h-12 bg-primary text-primary-foreground">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-background/70">
              Perlindungan Digital
            </span>
          </div>
          <h1 className="display-serif text-4xl md:text-6xl mb-4 leading-tight text-background">
            Waspada <em className="text-secondary" style={{ fontStyle: "italic" }}>Penipuan</em>
          </h1>
          <p className="text-lg md:text-xl font-medium text-background/80 leading-relaxed max-w-2xl">
            Ceritakan pesan atau telepon yang mencurigakan — kami bantu periksa
            dengan tenang, tanpa menghakimi.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <aside className="wellness-card p-5 md:p-6 mb-6 flex gap-4 items-start" style={{ backgroundColor: "hsl(var(--orange-soft))" }}>
          <span className="circle-badge w-10 h-10 bg-primary text-primary-foreground flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <p className="text-base md:text-lg leading-relaxed">
            <strong>Contoh:</strong> "Ada yang WA bilang saya menang undian dan
            minta nomor rekening" atau "Ada telepon mengaku dari bank minta kode
            OTP, aman tidak?"
          </p>
        </aside>

        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Tanda Bahaya yang Harus Diwaspadai
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {WARNINGS.map((w) => (
              <div
                key={w}
                className="wellness-card p-4 flex items-center gap-3"
                style={{ backgroundColor: "hsl(var(--orange-soft))" }}
              >
                <span className="circle-badge w-9 h-9 bg-primary text-primary-foreground flex-shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <span className="text-base font-semibold">{w}</span>
              </div>
            ))}
          </div>
        </div>

        <ChatBox
          systemPrompt={SYSTEM_PROMPT}
          placeholder="Ceritakan situasinya di sini…"
          accent="red"
          starterQuestions={STARTERS}
        />
      </div>
    </Layout>
  );
}
