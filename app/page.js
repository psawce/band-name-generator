"use client";
import { useState } from "react";

const PLATFORMS = [
  { name: "X / Twitter", url: (n) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Our band is called "${n}" 🎸`)}` },
  { name: "Facebook", url: (n) => `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(`Our band is called "${n}" 🎸`)}` },
  { name: "Reddit", url: (n) => `https://reddit.com/submit?title=${encodeURIComponent(`Band name idea: "${n}"`)}` },
  { name: "WhatsApp", url: (n) => `https://wa.me/?text=${encodeURIComponent(`Check out this band name: "${n}" 🎸`)}` },
];

const s = {
  page: { minHeight: "100vh", background: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  wrap: { maxWidth: 560, margin: "0 auto", padding: "3rem 1.5rem" },
  header: { textAlign: "center", marginBottom: "2.5rem" },
  h1: { fontSize: "2rem", fontWeight: 500, color: "#005dff", marginBottom: 8 },
  subtitle: { fontSize: "1rem", color: "#999" },
  nameArea: { minHeight: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", padding: "2rem" },
  bandName: { fontSize: "2rem", fontWeight: 500, color: "#005dff", textAlign: "center", marginBottom: "1.25rem" },
  placeholder: { color: "#ccc", fontSize: "1rem" },
  btnRow: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { background: "transparent", color: "#005dff", border: "1.5px solid #005dff", borderRadius: 6, padding: "10px 36px", fontSize: "1rem", fontWeight: 500, cursor: "pointer" },
  btnOutline: { background: "transparent", color: "#005dff", border: "1.5px solid #005dff", borderRadius: 6, padding: "7px 16px", fontSize: "0.875rem", fontWeight: 400, cursor: "pointer" },
  generateWrap: { display: "flex", justifyContent: "center", marginBottom: "2.5rem" },
  dividerWrap: { display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" },
  dividerLine: { flex: 1, height: 1, background: "#eee" },
  dividerText: { fontSize: 13, color: "#bbb", whiteSpace: "nowrap" },
  emptyText: { textAlign: "center", color: "#ccc", padding: "1rem 0", fontSize: "0.95rem" },
  savedItem: { border: "1px solid #eee", borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  savedName: { fontWeight: 500, color: "#005dff" },
  toast: { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#005dff", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, zIndex: 100 },
  dropdownWrap: { position: "relative", display: "inline-block" },
  dropdownMenu: { position: "absolute", right: 0, top: "110%", background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "6px 0", minWidth: 180, zIndex: 50, listStyle: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" },
  dropdownItem: { display: "block", padding: "8px 16px", fontSize: 14, color: "#1a1a1a", textDecoration: "none", cursor: "pointer", background: "none", border: "none", width: "100%", textAlign: "left" },
  dropdownDivider: { borderTop: "1px solid #eee", margin: "4px 0" },
};

function ShareMenu({ name, onCopy }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={s.dropdownWrap}>
      <button style={s.btnOutline} onClick={() => setOpen(o => !o)}>Share ↗</button>
      {open && (
        <ul style={s.dropdownMenu}>
          {PLATFORMS.map(p => (
            <li key={p.name}>
              <a href={p.url(name)} target="_blank" rel="noreferrer" style={s.dropdownItem}>{p.name}</a>
            </li>
          ))}
          <div style={s.dropdownDivider} />
          <li>
            <button style={s.dropdownItem} onClick={() => { onCopy(name); setOpen(false); }}>Copy name</button>
          </li>
        </ul>
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
  const [count, setCount] = useState(0);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };
  const copyToClipboard = (text) => navigator.clipboard.writeText(text).then(() => showToast("Copied!"));

  const generate = async () => {
    setLoading(true);
    setVisible(false);
    const nextCount = count + 1;
    setCount(nextCount);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: nextCount }),
      });
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
    <div style={s.page}>
      <div style={s.wrap}>

        <div style={s.header}>
          <h1 style={s.h1}>Band Name Generator</h1>
          <p style={s.subtitle}>Find the perfect name for your band</p>
        </div>

        <div style={s.nameArea}>
          {current ? (
            <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease", textAlign: "center", width: "100%" }}>
              <div style={s.bandName}>{current}</div>
              <div style={s.btnRow}>
                <button style={s.btnOutline} onClick={() => saveName(current)}>
                  {saved.includes(current) ? "✓ Saved" : "Save"}
                </button>
                <ShareMenu name={current} onCopy={copyToClipboard} />
              </div>
            </div>
          ) : (
            <p style={s.placeholder}>Your band name will appear here</p>
          )}
        </div>

        <div style={s.generateWrap}>
          <button style={s.btnPrimary} onClick={generate} disabled={loading}>
            {loading ? "Generating..." : current ? "Generate another" : "Generate a band name"}
          </button>
        </div>

        <div style={s.dividerWrap}>
          <div style={s.dividerLine} />
          <span style={s.dividerText}>Saved names ({saved.length})</span>
          <div style={s.dividerLine} />
        </div>

        {saved.length === 0 ? (
          <p style={s.emptyText}>Names you save will appear here</p>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12, position: "relative" }}>
              <button style={s.btnOutline} onClick={() => setListShareOpen(o => !o)}>Share list</button>
              {listShareOpen && (
                <ul style={s.dropdownMenu}>
                  <li><a href={`https://wa.me/?text=${encodeURIComponent(shareList())}`} target="_blank" rel="noreferrer" style={s.dropdownItem}>Send via WhatsApp</a></li>
                  <li><a href={`mailto:?subject=${encodeURIComponent("Band name ideas")}&body=${encodeURIComponent(shareList())}`} style={s.dropdownItem}>Send via email</a></li>
                  <div style={s.dropdownDivider} />
                  <li><button style={s.dropdownItem} onClick={() => { copyToClipboard(shareList()); setListShareOpen(false); }}>Copy list</button></li>
                </ul>
              )}
            </div>
            <div>
              {saved.map(n => (
                <div key={n} style={s.savedItem}>
                  <span style={s.savedName}>{n}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <ShareMenu name={n} onCopy={copyToClipboard} />
                    <button style={{ ...s.btnOutline, color: "#e74c3c", borderColor: "#fdd" }} onClick={() => setSaved(s => s.filter(x => x !== n))}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  );
}
