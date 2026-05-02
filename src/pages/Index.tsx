import { Link } from "react-router-dom";
import {
  FileText,
  ShieldAlert,
  ArrowUpRight,
  Heart,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
} from "lucide-react";
import Layout from "@/components/Layout";
import elderlyCouple from "@/assets/elderly-couple.jpg";
import elderlyWoman from "@/assets/elderly-woman.jpg";
import elderlyManReading from "@/assets/elderly-man-reading.jpg";

const Index = () => {
  return (
    <Layout>
      {/* ======================= HERO ======================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Kolom kiri: kecil */}
            <div className="lg:col-span-3 order-2 lg:order-1 flex lg:flex-col gap-4 items-start">
              <div className="flex -space-x-2">
                <span className="circle-badge w-10 h-10 bg-primary text-primary-foreground text-sm font-bold border-2 border-background">
                  👵
                </span>
                <span className="circle-badge w-10 h-10 bg-secondary text-secondary-foreground text-sm font-bold border-2 border-background">
                  👴
                </span>
                <span className="circle-badge w-10 h-10 bg-foreground text-background text-sm font-bold border-2 border-background">
                  +
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-[180px] leading-snug">
                Bergabung dengan ribuan keluarga yang sudah merasa lebih tenang.
              </p>
              <div className="hidden lg:block w-32 h-12 mt-2">
                <svg viewBox="0 0 120 40" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 20 L20 20 L25 8 L35 32 L45 12 L55 28 L65 18 L75 22 L120 20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Tengah: Headline */}
            <div className="lg:col-span-6 order-1 lg:order-2 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 text-foreground text-xs font-semibold tracking-wider uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Asisten Digital Lansia
              </span>
              <h1 className="display-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-6">
                Selamat Datang,<br />
                <em>Bapak / Ibu</em>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                Sebelum mengisi formulir atau menjawab pesan asing, mari kami bantu
                Anda dengan sabar dan bahasa yang sederhana.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/asisten" className="pill-btn-primary">
                  Mulai Sekarang
                  <span className="circle-badge w-7 h-7 bg-primary-foreground/20 -mr-3">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
                <a href="#cara-pakai" className="pill-btn-ghost">
                  <span className="circle-badge w-6 h-6 bg-foreground text-background">
                    ▶
                  </span>
                  Lihat Cara Pakai
                </a>
              </div>
            </div>

            {/* Foto kanan */}
            <div className="lg:col-span-3 order-3 relative">
              <div className="photo-rounded aspect-[4/5] max-w-xs mx-auto">
                <img
                  src={elderlyWoman}
                  alt="Ibu lansia tersenyum bahagia"
                  width={768}
                  height={1024}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-2 lg:-left-8 circle-badge w-24 h-24 bg-secondary rotate-[-8deg] shadow-lg">
                <div className="text-center">
                  <div className="text-base font-bold leading-none">GRATIS</div>
                  <div className="text-[10px] uppercase tracking-wider mt-1">Selamanya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= STATS BAR ======================= */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "10rb+", l: "Lansia Terbantu" },
            { n: "24/7", l: "Selalu Tersedia" },
            { n: "98%", l: "Merasa Lebih Tenang" },
            { n: "100%", l: "Aman & Pribadi" },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="text-4xl md:text-5xl font-medium mb-1"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {s.n}
              </div>
              <div className="text-sm text-background/70 uppercase tracking-wider">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= LAYANAN UTAMA ======================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Kartu Formulir */}
          <article className="wellness-card p-7 md:p-9 bg-card relative overflow-hidden group">
            <div className="circle-badge w-16 h-16 bg-secondary mb-6">
              <FileText className="w-8 h-8 text-foreground" aria-hidden />
            </div>
            <h2 className="text-3xl md:text-4xl mb-3 display-serif">
              Bantu Isi <em>Formulir</em>
            </h2>
            <p className="text-base text-muted-foreground mb-7 leading-relaxed">
              Foto formulir Anda — kami jelaskan setiap kolom, langkah demi langkah,
              dengan bahasa yang sederhana dan mudah dipahami.
            </p>
            <ul className="space-y-2 mb-8">
              {["KTP & Kartu Keluarga", "BPJS Kesehatan", "Formulir Bank"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <Link to="/asisten" className="pill-btn-primary w-full">
              Mulai Sekarang
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </article>

          {/* Kartu Penipuan */}
          <article
            className="rounded-3xl p-7 md:p-9 relative overflow-hidden group"
            style={{ backgroundColor: "hsl(var(--forest))" }}
          >
            <div className="circle-badge w-16 h-16 bg-primary text-primary-foreground mb-6">
              <ShieldAlert className="w-8 h-8" aria-hidden />
            </div>
            <h2 className="text-3xl md:text-4xl mb-3 display-serif text-background">
              Waspada <em className="text-secondary not-italic" style={{ fontStyle: "italic" }}>Penipuan</em>
            </h2>
            <p className="text-base text-background/80 mb-7 leading-relaxed">
              Ceritakan pesan, telepon, atau situasi mencurigakan. Kami bantu
              periksa apakah itu penipuan — tanpa menghakimi.
            </p>
            <ul className="space-y-2 mb-8">
              {["Cek pesan WhatsApp", "Verifikasi telepon bank", "Deteksi modus undian palsu"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-base text-background">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <Link to="/waspada" className="pill-btn bg-secondary text-foreground px-7 py-4 w-full hover:brightness-95">
              Periksa Sekarang
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </article>
        </div>
      </section>

      {/* ======================= MITRA TERPERCAYA (foto + teks) ======================= */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Mitra Tepercaya Anda
            </span>
            <h2 className="display-serif text-4xl md:text-5xl mt-3 mb-5 leading-[1.1]">
              Teman digital yang <em>sabar</em>,<br />kapan pun Anda butuh.
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Kami percaya teknologi seharusnya membuat hidup lebih mudah — bukan
              membingungkan. Itulah mengapa kami merancang setiap kata, tombol,
              dan jawaban khusus untuk Bapak dan Ibu.
            </p>
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <div
                className="text-5xl font-medium"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                1 <span className="text-primary italic">dari</span> 5
              </div>
              <p className="text-sm text-muted-foreground max-w-[200px] leading-snug">
                Lansia Indonesia pernah menjadi target penipuan online. Mari
                lindungi keluarga Anda.
              </p>
            </div>
          </div>
          <div className="photo-rounded aspect-[4/3]">
            <img
              src={elderlyCouple}
              alt="Pasangan lansia bahagia menggunakan ponsel bersama"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ======================= CARA PAKAI ======================= */}
      <section id="cara-pakai" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Mudah Sekali
          </span>
          <h2 className="display-serif text-4xl md:text-5xl mt-3 mb-4">
            Tiga langkah <em>sederhana</em>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tidak perlu paham teknologi. Cukup pilih, ketik atau foto, lalu dapatkan jawaban.
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Pilih Bantuan",
              d: "Tekan kartu kuning untuk formulir, atau hijau untuk cek penipuan.",
              icon: Users,
            },
            {
              n: "02",
              t: "Ketik atau Foto",
              d: "Ketik pertanyaan dengan kata-kata Anda sendiri, atau kirim foto.",
              icon: FileText,
            },
            {
              n: "03",
              t: "Dapat Jawaban",
              d: "Asisten menjawab dengan bahasa sederhana, langkah demi langkah.",
              icon: CheckCircle2,
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.n} className="wellness-card p-7 relative">
                <div
                  className="text-sm font-semibold text-muted-foreground mb-4"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {s.n}
                </div>
                <div className="circle-badge w-14 h-14 bg-secondary mb-4">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl mb-2 display-serif">{s.t}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {s.d}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ======================= CTA AKHIR ======================= */}
      <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <div className="rounded-3xl overflow-hidden bg-secondary/40 grid md:grid-cols-2">
          <div className="aspect-[4/3] md:aspect-auto">
            <img
              src={elderlyManReading}
              alt="Bapak lansia membaca dokumen dengan tenang"
              width={1024}
              height={768}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="display-serif text-3xl md:text-5xl leading-tight mb-5">
              Tidak perlu khawatir lagi —<br />
              kami <em>menemani</em> Bapak Ibu.
            </h2>
            <p className="text-lg text-muted-foreground mb-7 leading-relaxed">
              Kapan pun ada formulir membingungkan atau pesan mencurigakan, kami
              siap membantu dengan tenang dan tanpa terburu-buru.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/asisten" className="pill-btn-primary">
                Coba Sekarang
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <a href="tel:119" className="pill-btn-ghost">
                <Phone className="w-5 h-5" />
                Telepon Bantuan 119
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
