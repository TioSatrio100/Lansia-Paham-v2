import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import FormattedMessage from "./FormattedMessage";

type TextContent = { type: "text"; text: string };
type ImageContent = { type: "image_url"; image_url: { url: string } };
type MsgContent = string | (TextContent | ImageContent)[];

interface Message {
  role: "user" | "assistant";
  content: MsgContent;
}

interface ChatBoxProps {
  systemPrompt: string;
  placeholder: string;
  accent: "yellow" | "red";
  starterQuestions?: string[];
}

export default function ChatBox({
  systemPrompt,
  placeholder,
  accent,
  starterQuestions = [],
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isRed = accent === "red";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar (JPG, PNG) yang didukung.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result as string;
      setImageBase64(b64);
      setImagePreview(b64);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageBase64(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function sendMessage(text?: string) {
    const finalText = (text ?? input).trim();
    if (!finalText && !imageBase64) return;

    let userContent: MsgContent;
    if (imageBase64) {
      userContent = [
        ...(finalText ? [{ type: "text" as const, text: finalText }] : []),
        { type: "image_url" as const, image_url: { url: imageBase64 } },
      ];
    } else {
      userContent = finalText;
    }

    const userMsg: Message = { role: "user", content: userContent };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    removeImage();
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: newMessages }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error ?? `Server error ${res.status}`);
      }

      const data = await res.json();
      const reply: string =
        data?.content?.[0]?.text || "Maaf, saya belum bisa menjawab.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      toast.error("Tidak dapat terhubung. Periksa koneksi internet Anda.");
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Maaf, tidak dapat terhubung. Coba lagi ya." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderContent(content: MsgContent, isAssistant: boolean) {
    if (typeof content === "string") {
      return isAssistant ? (
        <FormattedMessage text={content} enableRiskMeter={isRed} />
      ) : (
        <span className="whitespace-pre-wrap">{content}</span>
      );
    }
    return (
      <div className="flex flex-col gap-2">
        {content.map((c, i) => {
          if (c.type === "text")
            return isAssistant ? (
              <FormattedMessage key={i} text={c.text} enableRiskMeter={isRed} />
            ) : (
              <span key={i} className="whitespace-pre-wrap">{c.text}</span>
            );
          if (c.type === "image_url")
            return (
              <img
                key={i}
                src={c.image_url.url}
                alt="Foto formulir yang dikirim"
                className="max-w-[220px] rounded-2xl border border-border"
              />
            );
          return null;
        })}
      </div>
    );
  }

  const accentBg = isRed ? "bg-destructive" : "bg-primary";
  const accentText = "text-primary-foreground";
  const userBubble = "bg-primary text-primary-foreground";
  const aiBubble = "bg-muted text-foreground";

  return (
    <div className="wellness-card flex flex-col h-[68vh] min-h-[480px] overflow-hidden">
      {/* Header chat */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card">
        <span className={`circle-badge w-10 h-10 ${accentBg} ${accentText}`}>
          <span className="text-sm font-bold">AI</span>
        </span>
        <div>
          <p className="text-base font-semibold leading-tight">Asisten Lansia Paham</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Selalu siap membantu
          </p>
        </div>
      </div>

      {/* Pesan */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-5 bg-background">
        {messages.length === 0 && (
          <div className="m-auto text-center max-w-md">
            <div className={`circle-badge w-20 h-20 mx-auto mb-5 ${accentBg} ${accentText}`}>
              <span className="text-3xl">💬</span>
            </div>
            <p className="text-2xl font-medium mb-2 display-serif">
              Mari mulai bertanya
            </p>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              Ketik pertanyaan di bawah, atau tekan tombol{" "}
              <ImageIcon className="inline w-4 h-4 -mt-1" /> untuk mengirim foto.
            </p>
            {starterQuestions.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Contoh Pertanyaan
                </p>
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left px-5 py-3.5 rounded-2xl bg-card border border-border hover:border-primary hover:bg-muted transition-all text-base font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={`flex gap-3 items-end ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`circle-badge w-10 h-10 flex-shrink-0 text-xs font-bold ${
                  isUser ? "bg-foreground text-background" : `${accentBg} ${accentText}`
                }`}
                aria-hidden
              >
                {isUser ? "Anda" : "AI"}
              </div>
              <div
                className={`max-w-[85%] px-4 py-3 rounded-3xl text-base leading-relaxed ${
                  isUser ? `${userBubble} rounded-br-md` : `${aiBubble} rounded-bl-md`
                }`}
              >
                {renderContent(msg.content, !isUser)}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-end">
            <div className={`circle-badge w-10 h-10 ${accentBg} ${accentText} text-xs font-bold`}>
              AI
            </div>
            <div className={`px-4 py-3 rounded-3xl rounded-bl-md ${aiBubble} flex items-center gap-2`}>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
              <span className="text-sm font-medium">Sedang mengetik…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Pratinjau gambar */}
      {imagePreview && (
        <div className="px-4 py-3 border-t border-border bg-muted flex items-center gap-3">
          <img
            src={imagePreview}
            alt="Pratinjau"
            className="w-12 h-12 object-cover rounded-xl border border-border"
          />
          <span className="flex-1 text-sm font-medium">Foto siap dikirim ✓</span>
          <button
            onClick={removeImage}
            aria-label="Hapus foto"
            className="circle-badge w-9 h-9 bg-foreground text-background"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-border bg-card flex gap-2 items-center">
        <button
          onClick={() => fileRef.current?.click()}
          aria-label="Kirim foto formulir"
          className="circle-badge w-12 h-12 bg-muted text-foreground hover:bg-secondary flex-shrink-0 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) sendMessage();
          }}
          placeholder={placeholder}
          aria-label="Pesan Anda"
          className="flex-1 rounded-full px-5 h-12 text-base bg-muted outline-none border border-transparent focus:border-primary focus:bg-card transition-colors"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          aria-label="Kirim pesan"
          className={`circle-badge w-12 h-12 ${accentBg} ${accentText} flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
