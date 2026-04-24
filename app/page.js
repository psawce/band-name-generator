"use client";
import "./globals.css";
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
    <div className="dropdown-wrap">
      <button className="btn-outline" onClick={() => setOpen(o => !o)}>Share ↗</button>
      {open && (
        <ul className="dropdown-menu">
          {PLATFORMS.map(p => (
            <li key={p.name}>
              <a href={p.url(name)} target="_blank" rel="noreferrer" className="dropdown-item">{p.name}</a>
            </li>
          ))}
          <div className="dropdown-divider" />
          <li>
            <button className="dropdown-item" onClick={() => { onCopy(name); setOpen(false); }}>Copy name</button>
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
    <div className="page">
      <div className="wrap">

        <div className="header">
          <h1>Band Name Generator</h1>
          <p className="subtitle">Find the perfect name for your band</p>
        </div>

        <div className="name-area">
          {current ? (
            <div className="fade" style={{ opacity: visible ? 1 : 0, textAlign: "center", width: "100%" }}>
              <div className="band-name">{current}</div>
              <div className="btn-row">
                <button className="btn-outline" onClick={() => saveName(current)}>
                  {saved.includes(current) ? "✓ Saved" : "Save"}
                </button>
                <ShareMenu name={current} onCopy={copyToClipboard} />
              </div>
            </div>
          ) : (
            <p className="placeholder">Your band name will appear here</p>
          )}
        </div>

        <div className="generate-wrap">
          <button className="btn-primary" onClick={generate} disabled={loading}>
            {loading ? "Generating..." : current ? "Generate another" : "Generate a band name"}
          </button>
        </div>

        <div className="divider-wrap">
          <div className="divider-line" />
          <span className="divider-text">Saved names ({saved.length})</span>
          <div className="divider-line" />
        </div>

        {saved.length === 0 ? (
          <p className="empty-text">Names you save will appear here</p>
        ) : (
          <>
            <div className="share-list-wrap">
              <button className="btn-outline" onClick={() => setListShareOpen(o => !o)}>Share list</button>
              {listShareOpen && (
                <ul className="dropdown-menu">
                  <li><a href={`https://wa.me/?text=${encodeURIComponent(shareList())}`} target="_blank" rel="noreferrer" className="dropdown-item">Send via WhatsApp</a></li>
                  <li><a href={`mailto:?subject=${encodeURIComponent("Band name ideas")}&body=${encodeURIComponent(shareList())}`} className="dropdown-item">Send via email</a></li>
                  <div className="dropdown-divider" />
                  <li><button className="dropdown-item" onClick={() => { copyToClipboard(shareList()); setListShareOpen(false); }}>Copy list</button></li>
                </ul>
              )}
            </div>
            <div>
              {saved.map(n => (
                <div key={n} className="saved-item">
                  <span className="saved-name">{n}</span>
                  <div className="saved-actions">
                    <ShareMenu name={n} onCopy={copyToClipboard} />
                    <button className="btn-remove" onClick={() => setSaved(s => s.filter(x => x !== n))}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
