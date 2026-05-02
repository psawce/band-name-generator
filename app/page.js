"use client";

import { useState } from "react";

const LIST_NAMES = [
  "Some U.S. Americans","Tragically Underseasoned","The Irrelevant Takes","Oblong Ball",
  "Diminished by Sandwiches","Guar Gum","Independent George","The Bitter Clingers",
  "Beer and Pussy","New Potato Adventure","Omlette Bar","Assistant To The Regional Manager",
  "Baked Potato Causeway","That Guy","Surrender Dorothy","Idea Man","Conjugal Visitors",
  "People Under You","Immersion Blender","Mitch and Murray","Duck Tape","Spider Ricco",
  "The Helsinki Episode","Binders Full of Deplorables","Concepts of a Plan",
  "Forget About Him He's Dead","Spread Eagle","The Whole Planet Houston",
  "I Heard You Were Dead","The President of What","Shinebox","The Central Park Karens",
  "Vichyssoise Salad","Acquiescence Tour","Times New Roman","Both Sides","The Internet",
  "Unified Theory of Everything","Word Processor","Chef Recommends","Attack / Decay",
  "Backlash","Guns and Provolone","Proper Villains","The Full Ginsberg","Portfolio",
  "Team Of Experts","Very Fine People","Nakatomi Plaza","Jumbotron","David Pecker",
  "Specific Ocean","Two Corinthians","Johnny Football Hero","They Them","Western Beef",
  "Bomb Cyclone","The Kugelmass Episode","Vassaline","Hostile Womb","Arena Rock",
  "Tiny Holmes","Roboto Slab","Danger Robots","Deathbed Motorcycle",
  "I Don't Care About Your Band","Launch Procedure","Ministry of Ketchup",
  "Elevator Repair Man","Sorry About Your Daughter","First Blood","One Louder",
  "Adult Happy Meal","Sad Desk Lunch","Charcuterie","Bespoke Reality",
  "Heaven or Las Vegas","Beef Carving Station","Situationship","Army of Thugs",
  "Mike Johnson","Electrolytes","Baller","Kate Blanchet","Dangling Modifier","Broheim",
  "Cassingle","Prime Rib","Service Dog","Bureaucratic Fools","Fear of Sour Cream",
  "Willy Mammoth","Whipped Topping","Special Counsel","Everywhere Like Such As",
  "Bear Are People In Costume","Irregardless","The P Drive","The Underhill's Bill"
];

const SHARE_PLATFORMS = [
  { name: "Messages", fn: (t) => { const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent); if (isMobile) { window.location.href = `sms:?body=${encodeURIComponent(t)}`; } else { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); alert("SMS is only available on mobile. Your list has been copied to clipboard!"); } } },
  { name: "WhatsApp", fn: (t) => { window.open(`https://wa.me/?text=${encodeURIComponent(t)}`, "_blank"); } },
  { name: "Facebook", fn: (t) => { window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(t)}`, "_blank"); } },
  { name: "LinkedIn", fn: (t) => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://claude.ai&summary=${encodeURIComponent(t)}`, "_blank"); } },
  { name: "Instagram", fn: (t) => { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); alert("Copied! Paste into Instagram."); } },
  { name: "TikTok", fn: (t) => { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); alert("Copied! Paste into TikTok."); } },
];

const getTheme = (dark) => ({
  bg:             dark ? "#0e0e0e" : "#ffffff",
  surface:        dark ? "#1a1a1a" : "#f9f9f9",
  border:         dark ? "#2e2e2e" : "#e5e5e5",
  divider:        dark ? "#222222" : "#f0f0f0",
  text:           dark ? "#f0f0f0" : "#005dff",
  textMuted:      dark ? "#888888" : "#999999",
  textFaint:      dark ? "#555555" : "#aaaaaa",
  btnPrimaryBg:     dark ? "#f0f0f0" : "#005dff",
  btnPrimaryText:   dark ? "#005dff" : "#ffffff",
  btnPrimaryBorder: dark ? "#f0f0f0" : "#005dff",
  btnOutlineBg:     dark ? "#0e0e0e" : "#ffffff",
  btnOutlineText:   dark ? "#f0f0f0" : "#005dff",
  btnOutlineBorder: dark ? "#f0f0f0" : "#005dff",
  btnGhostBg:       dark ? "#0e0e0e" : "#ffffff",
  btnGhostText:     dark ? "#888888" : "#555555",
  btnGhostBorder:   dark ? "#333333" : "#cccccc",
  toggleBg:         dark ? "#f0f0f0" : "#005dff",
  toggleText:       dark ? "#005dff" : "#ffffff",
});

export default function Home() {
  const [dark, setDark] = useState(false);
  const [currentName, setCurrentName] = useState(null);
  const [source, setSource] = useState(null);
  const [savedNames, setSavedNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = getTheme(dark);

  const pillBtn = (bg, color, border, small) => ({
    fontFamily: "inherit",
    fontSize: small ? 12 : 13,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    borderRadius: 999,
    padding: small ? "5px 14px" : "9px 22px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: bg,
    color,
    border: `${small ? "1.5px" : "2px"} solid ${border}`,
    outline: "none",
    whiteSpace: "nowrap",
    transition: "opacity 0.15s",
    boxSizing: "border-box",
  });

  const getRandom = () => {
    setCurrentName(LIST_NAMES[Math.floor(Math.random() * LIST_NAMES.length)]);
    setSource("list");
  };

  const getAI = async () => {
    setLoading(true);
    setCurrentName(null);
    setSource(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Generate one creative, funny, or absurd band name. Reply with ONLY the band name — no explanation, no punctuation at the end, no quotes."
        }),
      });
      const data = await res.json();
      setCurrentName(data.text?.trim() || "Unknown Band");
      setSource("ai");
    } catch {
      setCurrentName("Error — try again");
    }
    setLoading(false);
  };

  const saveName = () => {
    if (currentName && !savedNames.includes(currentName))
      setSavedNames([...savedNames, currentName]);
  };

  const removeName = (n) => setSavedNames(savedNames.filter(s => s !== n));

  const shareText = `My band name shortlist:\n\n${savedNames.map((n, i) => `${i + 1}. ${n}`).join("\n")}\n\n(Band Name Generator)`;

  const copyAll = () => {
    const ta = document.createElement("textarea");
    ta.value = shareText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const alreadySaved = currentName && savedNames.includes(currentName);

  return (
    <div style={{ background: t.bg, minHeight: "100vh", transition: "background 0.2s", padding: "2.5rem 1.25rem", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div style={{ textAlign: "left" }}>
            <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 0.2rem", color: t.text }}>Band name generator</h1>
            <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>Generate, save, and share band names.</p>
          </div>
          <button onClick={() => setDark(!dark)} style={{ ...pillBtn(t.toggleBg, t.toggleText, t.toggleBg, true), flexShrink: 0, marginLeft: 16 }}>
            {dark ? "☀ Light" : "☾ Dark"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: "2rem" }}>
          <button onClick={getAI} disabled={loading} style={{ ...pillBtn(t.btnPrimaryBg, t.btnPrimaryText, t.btnPrimaryBorder, false), minWidth: 130, opacity: loading ? 0.5 : 1, cursor: loading ? "default" : "pointer" }}>
            {loading ? "Thinking..." : "AI Name"}
          </button>
          <button onClick={getRandom} style={{ ...pillBtn(t.btnOutlineBg, t.btnOutlineText, t.btnOutlineBorder, false), minWidth: 130 }}>
            Random Name
          </button>
        </div>

        {(currentName || loading) && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: "1.75rem 1.5rem", marginBottom: "2rem", minHeight: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, transition: "background 0.2s, border-color 0.2s" }}>
            {loading ? (
              <p style={{ fontSize: 13, color: t.textFaint, margin: 0 }}>Generating...</p>
            ) : (
              <>
                <span style={{ fontSize: 24, fontWeight: 500, color: t.text, lineHeight: 1.3 }}>{currentName}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: t.textFaint, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {source === "ai" ? "AI generated" : "From the list"}
                  </span>
                  <span style={{ color: t.border }}>·</span>
                  <button onClick={saveName} disabled={alreadySaved} style={{ ...pillBtn(t.btnGhostBg, t.btnGhostText, t.btnGhostBorder, true), opacity: alreadySaved ? 0.4 : 1, cursor: alreadySaved ? "default" : "pointer" }}>
                    {alreadySaved ? "Saved" : "+ Save"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {savedNames.length > 0 && (
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: t.textFaint, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                Your list — {savedNames.length}
              </span>
              <button onClick={() => setShowShare(!showShare)} style={pillBtn(t.btnGhostBg, t.btnGhostText, t.btnGhostBorder, true)}>
                {showShare ? "Hide" : "Share List"}
              </button>
            </div>

            <div style={{ border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden", marginBottom: "1rem", background: t.bg, transition: "background 0.2s, border-color 0.2s" }}>
              {savedNames.map((name, i) => (
                <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderTop: i > 0 ? `1px solid ${t.divider}` : "none" }}>
                  <span style={{ fontSize: 14, color: t.text }}>{name}</span>
                  <button onClick={() => removeName(name)} style={pillBtn(t.btnGhostBg, t.btnGhostText, t.btnGhostBorder, true)}>Remove</button>
                </div>
              ))}
            </div>

            {showShare && (
              <div style={{ border: `1px solid ${t.border}`, borderRadius: 14, padding: "1.25rem", background: t.bg, transition: "background 0.2s, border-color 0.2s" }}>
                <p style={{ fontSize: 11, color: t.textFaint, margin: "0 0 1rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Share via</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "0.75rem" }}>
                  {SHARE_PLATFORMS.map(p => (
                    <button key={p.name} onClick={() => p.fn(shareText)} style={pillBtn(t.btnGhostBg, t.btnGhostText, t.btnGhostBorder, true)}>
                      {p.name}
                    </button>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${t.divider}`, paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                  <button onClick={copyAll} style={{ ...pillBtn(t.btnOutlineBg, t.btnOutlineText, t.btnOutlineBorder, false), width: "100%" }}>
                    {copied ? "Copied!" : "Copy All To Clipboard"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
