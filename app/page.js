"use client";
import { useState } from "react";

const PLATFORMS = [
  { name: "X / Twitter", url: (n) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Our band is called "${n}" 🎸`)}` },
  { name: "Facebook",    url: (n) => `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(`Our band is called "${n}" 🎸`)}` },
  { name: "Reddit",      url: (n) => `https://reddit.com/submit?title=${encodeURIComponent(`Band name idea: "${n}"`)}` },
  { name: "WhatsApp",    url: (n) => `https://wa.me/?text=${encodeURIComponent(`Check out this band name: "${n}" 🎸`)}` },
];

function ShareMenu({ name, onCopy, small }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ fontSize: small ? 12 : 14, padding: small ? "4px 10px" : "8px 16px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", color: "#666", cursor: "pointer" }}>
        Share ↗
      </button>
      {open && (
        <div onMouseLeave={() => setOpen(false)}
          style={{ position: "absolute", zIndex: 99, right: 0, top: "110%", background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: "6px 0", minWidth: 170, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
          {PLATFORMS.map(p => (
            <a key={p.name} href={p.url(name)} target="_blank" rel="noreferrer"
              style={{ display: "block", padding: "10px 16px", fontSize: 14, color: "#111", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {p.name}
            </a>
          ))}
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "4px 0" }} />
          <button onClick={() => { onCopy(name); setOpen(false); }}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 14, background: "transparent", border: "none", color: "#111", cursor: "pointer" }}>
            Copy name
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [visible, setVisible] = useState(true);
  const [toast, setToast] = useState("");
  const [listShareOpen, setListShareOpen] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };
  const copyToClipboard = (text) => navigator.clipboard.writeText(text).then(() => showToast("Copied!"));

  const generate = async () => {
    setLoading(true);
    setVisible(false);
    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      setCurrent(data.name || "The Unnamed");
      setTimeout(() => setVisible(true), 80);
    } catch {
      setCurrent("Connection Lost");
      setVisible(true);
    }
    setLoading(false);
  };

  const saveName = (name) => {
    if (!saved.includes(name)) { setSaved(s => [name, ...s]); showToast("Saved!"); }
    else showToast("Already saved");
  };

  const shareList = () => "Band name ideas:\n" + saved.map((n, i) => `${i + 1}. ${n}`).join("\n");

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 6px" }}>Band Name Generator</h1>
        <p style={{ fontSize: 15, color: "#666", margin: 0 }}>Find the perfect name for your band</p>
      </div>

      <div style={{ minHeight: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
        {current && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease", textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>{current}</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => saveName(current)}
                style={{ fontSize: 14, padding: "8px 20px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", color: "#666", cursor: "pointer" }}>
                {saved.includes(current) ? "Saved" : "Save"}
              </button>
              <ShareMenu name={current} onCopy={copyToClipboard} />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
        <button onClick={generate} disabled={loading}
          style={{ padding: "14px 40px", fontSize: 16, fontWeight: 500, borderRadius: 10, border: "1px solid #ccc", background: "#fff", cursor: loading ? "not-allowed" : "pointer", width: "100%", maxWidth: 320 }}>
          {loading ? "Generating..." : current ? "Generate another" : "Generate a band name"}
        </button>
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#666" }}>Saved names ({saved.length})</span>
          {saved.length > 0 && (
            <div style={{ position: "relative" }}>
              <button onClick={() => setListShareOpen(o => !o)}
                style={{ fontSize: 13, padding: "5px 12px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", color: "#666", cursor: "pointer" }}>
                Share list
              </button>
              {listShareOpen && (
                <div onMouseLeave={() => setListShareOpen(false)}
                  style={{ position: "absolute", zIndex: 99, right: 0, top: "110%", background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: "6px 0", minWidth: 180, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                  <a href={`https://wa.me/?text=${encodeURIComponent(shareList())}`} target="_blank" rel="noreferrer"
                    style={{ display: "block", padding: "10px 16px", fontSize: 14, color: "#111", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    Send via WhatsApp
                  </a>
                  <a href={`mailto:?subject=${encodeURIComponent("Band name ideas")}&body=${encodeURIComponent(shareList())}`}
                    style={{ display: "block", padding: "10px 16px", fontSize: 14, color: "#111", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    Send via email
                  </a>
                  <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "4px 0" }} />
                  <button onClick={() => { copyToClipboard(shareList()); setListShareOpen(false); }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 14, background: "transparent", border: "none", color: "#111", cursor: "pointer" }}>
                    Copy list
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {saved.length === 0 ? (
          <p style={{ fontSize: 14, color: "#aaa", textAlign: "center", padding: "1rem 0" }}>Names you save will appear here.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {saved.map(n => (
              <div key={n} style={{ background: "#f9f9f9", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 500, flex: 1 }}>{n}</span>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <ShareMenu name={n} onCopy={copyToClipboard} small />
                  <button onClick={() => setSaved(s => s.filter(x => x !== n))}
                    style={{ fontSize: 12, padding: "4px 10px", borderRadius: 8, border: "1px solid #eee", background: "transparent", color: "#aaa", cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#111", color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 14, zIndex: 999, whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
