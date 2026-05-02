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
  "Bear Are People In Costume","Irregardless","The P Drive","The Underhill's Bill",
  "Ham On Five","Tight Gripper","Abbey Normal","Steak Sandwich","Everlasting Gobstopper",
  "Largesse","Jesus H. Christ","Death Is My Exit Strategy","Numbers Game",
  "Four Seasons Total Landscaping","The Snyder Cut","Snake Plisken","Mo Black's Brother",
  "The Obscurely Specific","Dave's Killer Bread","The General Collapse of Society",
  "Hillary Industrial Complex","Sheeple","Service Merchandise","Sauce",
  "Two Pronged Attack","Cultured Meat","Is This Thing On","Five Point Plan",
  "Avant Basic","Bird Aren't Real","Little Lebowski Overachievers","Benghazi Plaza",
  "The UK Variant","Abner Ravenwood Is Dead","Status Indicator","The Duke of New York",
  "Unlimited Breadsticks","Emergent Social Blistering","Your Own Personal El Guapo",
  "Drugs","Tom Cruise Apologist","People With Lasers","Intellectual Zamboni",
  "Semantic Apocalypse","Sunshine Carpet Cleaners","Avocado Toast","The Russian Dossier"
];

const RANDOM_SEEDS = [
  "office supplies","deep sea creatures","obscure sports","medieval professions",
  "kitchen appliances","Cold War era terms","1970s slang","geological formations",
  "fast food items","conspiracy theories","bureaucratic jargon","defunct airlines",
  "vintage software","obsolete technology","regional American foods","legal terminology",
  "weather phenomena","corporate buzzwords","forgotten celebrities","pharmaceutical terms",
  "plumbing fixtures","agricultural equipment","tax terminology","cargo shipping",
  "municipal services","vintage board games","diplomatic language","industrial chemicals",
];

const SHARE_PLATFORMS = [
  { name: "Messages", fn: (t) => { const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent); if (isMobile) { window.location.href = `sms:?body=${encodeURIComponent(t)}`; } else { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); alert("SMS is only available on mobile. Your list has been copied to clipboard!"); } } },
  { name: "WhatsApp", fn: (t) => { window.open(`https://wa.me/?text=${encodeURIComponent(t)}`, "_blank"); } },
  { name: "Facebook", fn: (t) => { window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(t)}`, "_blank"); } },
  { name: "LinkedIn", fn: (t) => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://claude.ai&summary=${encodeURIComponent(t)}`, "_blank"); } },
  { name: "Instagram", fn: (t) => { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); alert("Copied! Paste into Instagram."); } },
  { name: "TikTok", fn: (t) => { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); alert("Copied! Paste into TikTok."); } },
];

// Blue palette
const BLUE      = "#005dff";
const BLUE_10   = "#e5eeff";
const BLUE_20   = "#ccdaff";
const BLUE_40   = "#99b5ff";

const pillBtn = (bg, color, border, small, full) => ({
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
  width: full ? "100%" : "auto",
});

const styles = `
  .bng-btns {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 2rem;
  }
  @media (min-width: 480px) {
    .bng-btns {
      flex-direction: row;
      justify-content: center;
    }
    .bng-btns button {
      width: auto !important;
      min-width: 180px;
    }
  }
`;

export default function App() {
  const [currentName, setCurrentName] = useState(null);
  const [source, setSource] = useState(null);
  const [savedNames, setSavedNames] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const getRandom = () => {
    setCurrentName(LIST_NAMES[Math.floor(Math.random() * LIST_NAMES.length)]);
    setSource("list");
  };

  const getAI = async () => {
    setLoading(true);
    setCurrentName(null);
    setSource(null);
    try {
      const seed = RANDOM_SEEDS[Math.floor(Math.random() * RANDOM_SEEDS.length)];
      const avoidList = aiHistory.slice(-10).join(", ");
      const prompt = `Generate one creative, funny, or absurd band name. Draw loose inspiration from this random theme for variety: "${seed}". The name does NOT need to be literally about that theme — just use it as a creative jumping-off point. Do NOT use any of these recently generated names or repeat their words: ${avoidList || "none yet"}. Reply with ONLY the band name — no explanation, no punctuation at the end, no quotes.`;
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const name = data.text?.trim() || "Unknown Band";
      setCurrentName(name);
      setAiHistory(prev => [...prev, name]);
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
    <>
      <style>{styles}</style>
      <div style={{ background: "#fff", minHeight: "100vh", padding: "2.5rem 1.25rem", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 0.2rem", color: BLUE }}>Band name generator</h1>
            <p style={{ fontSize: 13, color: BLUE_40, margin: 0 }}>Generate, save, and share band names.</p>
          </div>

          <div className="bng-btns">
            <button onClick={getAI} disabled={loading} style={{ ...pillBtn(BLUE, "#fff", BLUE, false), opacity: loading ? 0.5 : 1, cursor: loading ? "default" : "pointer" }}>
              {loading ? "Thinking..." : "AI Generated Name"}
            </button>
            <button onClick={getRandom} style={pillBtn("#fff", BLUE, BLUE, false)}>
              Human Generated Name
            </button>
          </div>

          {(currentName || loading) && (
            <div style={{ background: BLUE_10, border: `1px solid ${BLUE_20}`, borderRadius: 16, padding: "1.75rem 1.5rem", marginBottom: "2rem", minHeight: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
              {loading ? (
                <p style={{ fontSize: 13, color: BLUE_40, margin: 0 }}>Generating...</p>
              ) : (
                <>
                  <span style={{ fontSize: 24, fontWeight: 500, color: BLUE, lineHeight: 1.3 }}>{currentName}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, color: BLUE_40, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {source === "ai" ? "AI generated" : "Human generated"}
                    </span>
                    <span style={{ color: BLUE_20 }}>·</span>
                    <button onClick={saveName} disabled={alreadySaved} style={{ ...pillBtn(BLUE_10, BLUE, BLUE_40, true), opacity: alreadySaved ? 0.4 : 1, cursor: alreadySaved ? "default" : "pointer" }}>
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
                <span style={{ fontSize: 11, fontWeight: 500, color: BLUE_40, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  Your list — {savedNames.length}
                </span>
                <button onClick={() => setShowShare(!showShare)} style={pillBtn(BLUE_10, BLUE, BLUE_20, true)}>
                  {showShare ? "Hide" : "Share List"}
                </button>
              </div>

              <div style={{ border: `1px solid ${BLUE_20}`, borderRadius: 14, overflow: "hidden", marginBottom: "1rem", background: "#fff" }}>
                {savedNames.map((name, i) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderTop: i > 0 ? `1px solid ${BLUE_10}` : "none" }}>
                    <span style={{ fontSize: 14, color: BLUE }}>{name}</span>
                    <button onClick={() => removeName(name)} style={pillBtn(BLUE_10, BLUE, BLUE_20, true)}>Remove</button>
                  </div>
                ))}
              </div>

              {showShare && (
                <div style={{ border: `1px solid ${BLUE_20}`, borderRadius: 14, padding: "1.25rem", background: "#fff" }}>
                  <p style={{ fontSize: 11, color: BLUE_40, margin: "0 0 1rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Share via</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "0.75rem" }}>
                    {SHARE_PLATFORMS.map(p => (
                      <button key={p.name} onClick={() => p.fn(shareText)} style={pillBtn(BLUE_10, BLUE, BLUE_20, true)}>
                        {p.name}
                      </button>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${BLUE_20}`, paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                    <button onClick={copyAll} style={{ ...pillBtn("#fff", BLUE, BLUE, false), width: "100%" }}>
                      {copied ? "Copied!" : "Copy All To Clipboard"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
