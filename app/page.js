"use client"; // v2
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
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-outline btn-sm" onClick={() => setOpen(o => !o)}>
        Share ↗
      </button>
      {open && (
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 z-50">
          {PLATFORMS.map(p => (
            <li key={p.name}>
              <a href={p.url(name)} target="_blank" rel="noreferrer">{p.name}</a>
            </li>
          ))}
          <div className="divider my-1"></div>
          <li><button onClick={() => { onCopy(name); setOpen(false); }}>Copy name</button></li>
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
    <div className="min-h-screen bg-base-100">
      <div className="max-w-xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">🎸 Band Name Generator</h1>
          <p className="text-base-content/60">Find the perfect name for your band</p>
        </div>

        {/* Generated name */}
        <div className="card bg-base-200 shadow-xl mb-6 min-h-36 flex items-center justify-center">
          <div className="card-body items-center text-center">
            {current ? (
              <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}>
                <h2 className="card-title text-3xl font-bold text-secondary mb-4 justify-center">{current}</h2>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={() => saveName(current)} className="btn btn-outline btn-secondary btn-sm">
                    {saved.includes(current) ? "✓ Saved" : "Save"}
                  </button>
                  <ShareMenu name={current} onCopy={copyToClipboard} />
                </div>
              </div>
            ) : (
              <p className="text-base-content/40 text-lg">Your band name will appear here</p>
            )}
          </div>
        </div>

        {/* Generate button */}
        <div className="flex justify-center mb-10">
          <button onClick={generate} disabled={loading} className="btn btn-primary btn-wide btn-lg">
            {loading ? <span className="loading loading-spinner"></span> : null}
            {loading ? "Generating..." : current ? "Generate another" : "Generate a band name"}
          </button>
        </div>

        {/* Saved names */}
        <div className="divider">Saved Names ({saved.length})</div>

        {saved.length === 0 ? (
          <p className="text-center text-base-content/40 py-4">Names you save will appear here</p>
        ) : (
          <>
            <div className="flex justify-end mb-3">
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-outline btn-sm" onClick={() => setListShareOpen(o => !o)}>
                  Share list
                </button>
                {listShareOpen && (
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-56 z-50">
                    <li>
                      <a href={`https://wa.me/?text=${encodeURIComponent(shareList())}`} target="_blank" rel="noreferrer">
                        Send via WhatsApp
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:?subject=${encodeURIComponent("Band name ideas")}&body=${encodeURIComponent(shareList())}`}>
                        Send via email
                      </a>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button onClick={() => { copyToClipboard(shareList()); setListShareOpen(false); }}>
                        Copy list
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {saved.map(n => (
                <div key={n} className="card bg-base-200 shadow">
                  <div className="card-body py-3 px-4 flex-row items-center justify-between">
                    <span className="font-semibold text-base">{n}</span>
                    <div className="flex gap-2">
                      <ShareMenu name={n} onCopy={copyToClipboard} />
                      <button onClick={() => setSaved(s => s.filter(x => x !== n))} className="btn btn-ghost btn-sm text-error">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-bottom toast-center z-50">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
