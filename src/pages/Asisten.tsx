import Layout from "@/components/Layout";
import ChatBox from "@/components/ChatBox";
import { Lightbulb, FileText } from "lucide-react";

const SYSTEM_PROMPT = `Kamu adalah asisten yang membantu lansia Indonesia mengisi formulir.
Gunakan bahasa Indonesia yang sangat sederhana, ramah, dan sabar.

FORMAT JAWABAN:
- Mulai dengan sapaan hangat ("Halo Bapak/Ibu")
- Pakai **tebal** untuk kata penting (misal nama kolom)
- Gunakan **daftar bernomor** untuk langkah-langkah
- Gunakan bullet (-) untuk daftar contoh
- Pakai heading (## Langkah Mengisi / ## Tips) bila jawabannya panjang
- Akhiri dengan kalimat menyemangati

Hindari istilah teknis. Jika ada istilah sulit (NIK, NPWP, dst.), selalu jelaskan artinya dengan kalimat sederhana.
Contoh formulir: KTP, BPJS, Kartu Keluarga, formulir bank, formulir vaksin.
Jika ada foto formulir yang dikirim, baca dan jelaskan kolom-kolomnya satu per satu.`;

const STARTERS = [
  "Cara isi formulir BPJS Kesehatan",
  "Apa itu NIK dan di mana letaknya di KTP?",
  "Cara daftar KTP elektronik baru",
  "Saya mau buka rekening bank, harus isi apa?",
];

export default function AsistenPage() {
  return (
    <Layout>
      {/* Header halaman */}
      <header className="bg-secondary/40">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="circle-badge w-12 h-12 bg-foreground text-background">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Layanan Bantuan
            </span>
          </div>
          <h1 className="display-serif text-4xl md:text-6xl mb-4 leading-tight">
            Bantu Isi <em>Formulir</em>
          </h1>
          <p className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed max-w-2xl">
            Foto formulir Anda atau ketik pertanyaan — kami bantu langkah demi
            langkah dengan bahasa sederhana.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <aside className="wellness-card p-5 md:p-6 mb-6 flex gap-4 items-start bg-secondary/20">
          <span className="circle-badge w-10 h-10 bg-secondary flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-foreground" />
          </span>
          <p className="text-base md:text-lg leading-relaxed">
            <strong>Contoh:</strong> "Saya mau daftar BPJS, harus isi apa saja?" —
            atau foto formulir KTP lalu tanya kolom mana yang diisi lebih dulu.
          </p>
        </aside>

        <ChatBox
          systemPrompt={SYSTEM_PROMPT}
          placeholder="Ketik pertanyaan Anda di sini…"
          accent="yellow"
          starterQuestions={STARTERS}
        />
      </div>
    </Layout>
  );
}
