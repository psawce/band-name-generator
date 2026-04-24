"use client";
import { useState } from "react";

const PLATFORMS = [
  { name: "X / Twitter", url: (n) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Our band is called "${n}" 🎸`)}` },
  { name: "Facebook", url: (n) => `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(`Our band is called "${n}" 🎸`)}` },
  { name: "Reddit", url: (n) => `https://reddit.com/submit?title=${encodeURIComponent(`Band name idea: "${n}"`)}` },
  { name: "WhatsApp", url: (n) => `https://wa.me/?text=${encodeURIComponent(`Check out this band name: "${n}" 🎸`)}` },
];

function ShareMenu({ name, onCopy }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className="btn-secondary" onClick={() => setOpen(o => !o)}>
        Share ↗
      </button>
      {open && (
        <ul style={{
          position: "absolute", right: 0, top: "110%", background: "#fff",
          border: "1px solid #eee", borderRadius: 8, padding: "8px 0",
          minWidth: 180, zIndex: 50, listStyle: "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}>
          {PLATFORMS.map(p => (
            <li key={p.name}>
              <a href={p.url(name)} target="_blank" rel="noreferrer" style={{
                display: "block", padding: "8px 16px", fontSize: 14,
                color: "#1a1a1a", textDecoration: "none"
              }}
                onMouseEnter={e => e.target.style.color = "#005dff"}
                onMouseLeave={e => e.target.style.color = "#1a1a1a"}
              >{p.name}</a>
            </li>
          ))}
          <li style={{ borderTop: "1px solid #eee", marginTop: 4, paddingTop: 4 }}>
            <button onClick={() => { onCopy(name); setOpen(false); }} style={{
              display: "block", width: "100%", padding: "8px 16px",
              fontSize: 14, color: "#1a1a1a", background: "none",
              border: "none", textAlign: "left", cursor: "pointer", borderRadius: 0
            }}>Copy name</button>
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
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1>🎸 Band Name Generator</h1>
          <p style={{ marginTop: 8, color: "#888" }}>Find the perfect name for your band</p>
        </div>

        {/* Generated name */}
        <div style={{
          border: "1px solid #eee", borderRadius: 12, minHeight: 140,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1.5rem", padding: "2rem"
        }}>
          {current ? (
            <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 500, color: "#005dff", marginBottom: "1.25rem" }}>
                {current}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-secondary" onClick={() => saveName(current)}>
                  {saved.includes(current) ? "✓ Saved" : "Save"}
                </button>
                <ShareMenu name={current} onCopy={copyToClipboard} />
              </div>
            </div>
          ) : (
            <p style={{ color: "#bbb", fontSize: "1.1rem" }}>Your band name will appear here</p>
          )}
        </div>

        {/* Generate button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <button onClick={generate} disabled={loading} className="btn-primary" style={{ padding: "12px 48px", fontSize: "1rem" }}>
            {loading ? "Generating..." : current ? "Generate another" : "Generate a band name"}
          </button>
        </div>

        {/* Saved names */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, height: "1px", background: "#eee" }} />
          <span style={{ fontSize: 13, color: "#aaa", whiteSpace: "nowrap" }}>Saved names ({saved.length})</span>
          <div style={{ flex: 1, height: "1px", background: "#eee" }} />
        </div>

        {saved.length === 0 ? (
          <p style={{ textAlign: "center", color: "#bbb", padding: "1rem 0" }}>Names you save will appear here</p>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12, position: "relative" }}>
              <button className="btn-secondary" onClick={() => setListShareOpen(o => !o)}>Share list</button>
              {listShareOpen && (
                <ul style={{
                  position: "absolute", right: 0, top: "110%", background: "#fff",
                  border: "1px solid #eee", borderRadius: 8, padding: "8px 0",
                  minWidth: 200, zIndex: 50, listStyle: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
                }}>
                  <li>
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareList())}`} target="_blank" rel="noreferrer"
                      style={{ display: "block", padding: "8px 16px", fontSize: 14, color: "#1a1a1a", textDecoration: "none" }}>
                      Send via WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:?subject=${encodeURIComponent("Band name ideas")}&body=${encodeURIComponent(shareList())}`}
                      style={{ display: "block", padding: "8px 16px", fontSize: 14, color: "#1a1a1a", textDecoration: "none" }}>
                      Send via email
                    </a>
                  </li>
                  <li style={{ borderTop: "1px solid #eee", marginTop: 4, paddingTop: 4 }}>
                    <button onClick={() => { copyToClipboard(shareList()); setListShareOpen(false); }}
                      style={{ display: "block", width: "100%", padding: "8px 16px", fontSize: 14, color: "#1a1a1a", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}>
                      Copy list
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {saved.map(n => (
                <div key={n} style={{
                  border: "1px solid #eee", borderRadius: 8, padding: "12px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <span style={{ fontWeight: 500, color: "#005dff" }}>{n}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <ShareMenu name={n} onCopy={copyToClipboard} />
                    <button className="btn-secondary" onClick={() => setSaved(s => s.filter(x => x !== n))}
                      style={{ color: "#e74c3c", borderColor: "#fdd" }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#005dff", color: "#fff", padding: "10px 24px",
          borderRadius: 8, fontSize: 14, fontWeight: 500, zIndex: 100
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
