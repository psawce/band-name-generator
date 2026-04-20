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
  const s = small
    ? { fontSize: 12, padding: "2px 8px" }
    : { fontSize: 13, padding: "5px 12px" };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ ...s, borderRadius: 6, border: "1px solid #ddd", background: "transparent", color: "#666", cursor: "pointer" }}>
        Share ↗
      </button>
      {open && (
        <div onMouseLeave={() => setOpen(false)}
          style={{ position: "absolute", zIndex: 99, right: 0, top: "110%", background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "6px 0", minWidth: 160, boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
          {PLATFORMS.map((p) => (
            <a key={p.name} href={p.url(name)} target="_blank" rel="noreferrer"
              style={{ display: "block", padding: "7px 14px", fontSize: 13, color: "#111", textDecoration: "none" }}>
              {p.name}
            </a>
          ))}
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "4px 0" }} />
          <button onClick={() => { onCopy(name); setOpen(false); }}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 14px", fontSize: 13, background: "transparent", border: "none", color: "#111", cursor: "pointer" }}>
            Copy name
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
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
    if (!saved.includes(name)) { setSaved((s) => [name, ...s]); showToast("Saved!"); }
    else showToast("Already saved");
  };

  const shareList = () =>
    "Band name ideas:\n" + saved.map((n, i) => `${i + 1}. ${n}`).join("\n");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 2rem", gap: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: "0 0 6px" }}>Band Name Generator</h1>
          <p style={{ fontSize: 15, color: "#666", margin: 0 }}>Find the perfect name for your band</p>
        </div>

        <div style={{ minHeight: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%", maxWidth: 440 }}>
          {current && (
            <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease", textAlign: "center", width: "100%" }}>
              <div style={{ fontSize: 30, fontWeight: 600, marginBottom: 12 }}>{current}</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button onClick={() => saveName(current)}
                  style={{ fontSize: 13, padding: "5px 14px", borderRadius: 6, border: "1px solid #ddd", background: "transparent", color: "#666", cursor: "pointer" }}>
                  {saved.includes(current) ? "Saved" : "Save"}
                </button>
                <ShareMenu name={current} onCopy={copyToClipboard} />
              </div>
            </div>
          )}
        </div>

        <button onClick={generate} disabled={loading}
          style={{ padding: "10px 32px", fontSize: 15, fontWeight: 500, borderRadius: 8, border: "1px solid #ccc", background: "#fff", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Generating..." : current ? "Generate another" : "Generate a band name"}
        </button>
      </div>

      <div style={{ width: 230, borderLeft: "1px solid #eee", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#666" }}>Saved ({saved.length})</span>
          {saved.length > 0 && (
            <div style={{ position: "relative" }}>
              <button onClick={() => setListShareOpen((o) => !o)}
                style={{ fontSize: 12, padding: "2px 8px", borderRadius: 6, border: "1px solid #ddd", background: "transparent", color: "#666", cursor: "pointer" }}>
                Share list
              </button>
              {listShareOpen && (
                <div onMouseLeave={() => setListShareOpen(false)}
                  style={{ position: "absolute", zIndex: 99, right: 0, top: "110%", background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "6px 0", minWidth: 170, boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
                  <a href={`https://wa.me/?text=${encodeURIComponent(shareList())}`} target="_blank" rel="noreferrer"
                    style={{ display: "block", padding: "7px 14px", fontSize: 13, color: "#111", textDecoration: "none" }}>
                    Send via WhatsApp
                  </a>
                  <a href={`mailto:?subject=${encodeURIComponent("Band name ideas")}&body=${encodeURIComponent(shareList())}`}
                    style={{ display: "block", padding: "7px 14px", fontSize: 13, color: "#111", textDecoration: "none" }}>
                    Send via email
                  </a>
                  <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "4px 0" }} />
                  <button onClick={() => { copyToClipboard(shareList()); setListShareOpen(false); }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 14px", fontSize: 13, background: "transparent", border: "none", color: "#111", cursor: "pointer" }}>
                    Copy list
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {saved.length === 0 ? (
          <p style={{ fontSize: 13, color: "#aaa", marginTop: 8 }}>Names you save will appear here.</p>
        ) : (
          saved.map((n) => (
            <div key={n} style={{ background: "#f9f9f9", borderRadius: 8, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{n}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <ShareMenu name={n} onCopy={copyToClipboard} small />
                <button onClick={() => setSaved((s) => s.filter((x) => x !== n))}
                  style={{ fontSize: 12, padding: "2px 7px", borderRadius: 6, border: "1px solid #eee", background: "transparent", color: "#aaa", cursor: "pointer" }}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#111", color: "#fff", borderRadius: 8, padding: "8px 18px", fontSize: 13, zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
