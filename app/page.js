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

const GENRES = [
  "Classic Rock","Hard Rock","Soft Rock","Punk Rock","Post-Punk","Garage Rock","Psychedelic Rock","Progressive Rock","Art Rock","Glam Rock","Indie Rock","Alternative Rock","Grunge","Emo","Screamo","Math Rock","Post-Rock","Noise Rock","Surf Rock","Folk Rock","Southern Rock","Heartland Rock","Rockabilly","Stoner Rock","Desert Rock",
  "Heavy Metal","Thrash Metal","Death Metal","Black Metal","Doom Metal","Power Metal","Glam Metal","Hair Metal","Nu-Metal","Groove Metal","Symphonic Metal","Folk Metal","Viking Metal","Metalcore","Deathcore","Djent","Progressive Metal","Sludge Metal",
  "Synth-pop","Electropop","Teen Pop","Bubblegum Pop","Chamber Pop","Dream Pop","Indie Pop","Art Pop","Baroque Pop","Dance Pop","K-Pop","J-Pop","C-Pop","Latin Pop","Pop Rock","Power Pop","Hyperpop","Sophisti-pop",
  "Old School Hip-Hop","East Coast Hip-Hop","West Coast Hip-Hop","Southern Rap","Trap","Drill","Mumble Rap","Conscious Rap","Political Rap","Gangsta Rap","Boom Bap","Lo-fi Hip-Hop","Cloud Rap","Jazz Rap","Crunk","G-Funk","Horrorcore","Emo Rap","Alternative Hip-Hop","Phonk",
  "Classic Soul","Motown","Neo-Soul","Contemporary R&B","Quiet Storm","New Jack Swing","Funk","Gospel","Blue-Eyed Soul","Alternative R&B",
  "House","Deep House","Tech House","Progressive House","Future House","Techno","Detroit Techno","Industrial Techno","Trance","Psytrance","Progressive Trance","Drum & Bass","Liquid DnB","Jungle","Dubstep","Brostep","Future Bass","EDM","Big Room","Electro","Synthwave","Retrowave","Vaporwave","Chillwave","Lo-fi","Ambient","Dark Ambient","IDM","Breakbeat","UK Garage","2-Step","Grime","Footwork","Juke","Jersey Club","Afro House","Melodic Techno",
  "Classic Country","Outlaw Country","Country Pop","Bro-Country","Country Rock","Americana","Bluegrass","Progressive Bluegrass","Honky Tonk","Western Swing","Country Folk","Neo-Traditional Country","Alt-Country",
  "Traditional Jazz","Dixieland","Swing","Bebop","Cool Jazz","Hard Bop","Modal Jazz","Free Jazz","Jazz Fusion","Smooth Jazz","Acid Jazz","Nu-Jazz","Vocal Jazz","Latin Jazz","Afro-Cuban Jazz","Jazz Funk",
  "Delta Blues","Piedmont Blues","Chicago Blues","Electric Blues","Texas Blues","Blues Rock","Swamp Blues","Jump Blues","Soul Blues",
  "Traditional Folk","Contemporary Folk","Anti-Folk","Freak Folk","Psychedelic Folk","Celtic Folk","Singer-Songwriter","Neofolk",
  "Reggaeton","Salsa","Bachata","Cumbia","Merengue","Vallenato","Bossa Nova","Samba","Tango","Tropical","Banda","Norteño","Corridos","Corridos Tumbados","Flamenco","Urbano Latino",
  "Roots Reggae","Dancehall","Ska","Rocksteady","Dub","Lovers Rock","Ragga","Soca","Calypso","Kompa","Zouk",
  "Traditional Gospel","Contemporary Christian Music","Christian Rock","Christian Hip-Hop","Southern Gospel","Black Gospel","Praise & Worship",
  "Orchestral Pop","Cinematic","Film Score","Neoclassical","Contemporary Classical","Minimalism","Post-Minimalism","New Age",
  "Afrobeats","Afropop","Highlife","Amapiano","Kwaito","Gqom","Bollywood","Bhangra","Qawwali","Mandopop","Fado","Klezmer","Celtic","Hawaiian","Slack-Key Guitar","Mbalax",
  "Classic Punk","Hardcore Punk","Pop Punk","Ska Punk","Crust Punk","Anarcho-Punk","Cold Wave","Goth Rock","Darkwave","Synth Punk","Queercore",
  "Noise","Industrial","Power Electronics","Drone","Glitch","Musique Concrète","Lowercase","Plunderphonics","Hauntology","Witch House",
  "Classic Funk","P-Funk","Boogie","Disco","Nu-Disco","Space Disco","Post-Disco","Electro-Funk",
  "Ambient New Age","Nature Sounds","Healing Frequencies","Meditation Music","Space Music"
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

const BLUE    = "#005dff";
const BLUE_BG = "#f4f6fc";
const BORDER  = "#e5e5e5";
const DIVIDER = "#f0f0f0";
const MUTED   = "#999999";
const FAINT   = "#aaaaaa";

function countWordsInBandName(name) {
  return name.trim().split(/\s+/).filter(Boolean).length;
}

const styles = `
  .bng-shell {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  @media (min-width: 980px) {
    .bng-shell {
      flex-direction: row;
      align-items: stretch;
      gap: 1.5rem;
    }
    .bng-col {
      width: 50%;
      min-width: 0;
    }
  }
  .bng-col {
    display: flex;
    flex-direction: column;
  }
  .bng-result {
    flex: 1;
  }
  .bng-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media (min-width: 1200px) {
    .bng-cards {
      flex-direction: row;
      align-items: stretch;
    }
    .bng-card {
      flex: 1;
      min-width: 0;
    }
  }
  .bng-card {
    background: #f4f6fc;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
  }
  .bng-card-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #005dff;
    margin: 0 0 0.75rem;
  }
  .bng-input {
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    padding: 9px 14px;
    border: 1.5px solid #e5e5e5;
    border-radius: 999px;
    outline: none;
    box-sizing: border-box;
    background: #fff;
    color: #111;
    margin-bottom: 0.6rem;
  }
  .bng-input:focus { border-color: #005dff; }
  .bng-input::placeholder { color: #aaa; }
  .bng-select {
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    padding: 9px 14px;
    border: 1.5px solid #e5e5e5;
    border-radius: 999px;
    outline: none;
    box-sizing: border-box;
    background: #fff;
    color: #aaa;
    margin-bottom: 0.6rem;
    appearance: none;
    cursor: pointer;
  }
  .bng-select.has-value { color: #111; }
  .bng-select:focus { border-color: #005dff; }
  .bng-autocomplete {
    background: #fff;
    border: 1.5px solid #e5e5e5;
    border-radius: 12px;
    max-height: 160px;
    overflow-y: auto;
    margin-bottom: 0.6rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  }
  .bng-autocomplete-item {
    padding: 9px 14px;
    font-size: 13px;
    cursor: pointer;
    color: #111;
    border-bottom: 1px solid #f0f0f0;
  }
  .bng-autocomplete-item:last-child { border-bottom: none; }
  .bng-autocomplete-item:hover { background: #f4f6fc; color: #005dff; }
  .bng-btn-full {
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: 999px;
    padding: 9px 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: opacity 0.15s;
    box-sizing: border-box;
    width: 100%;
    margin-top: auto;
  }
  .bng-btn-primary { background: #005dff; color: #fff; border: 2px solid #005dff; }
  .bng-btn-outline { background: #fff; color: #005dff; border: 2px solid #005dff; }
`;

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

export default function Home() {
  const [currentName, setCurrentName] = useState(null);
  const [source, setSource] = useState(null);
  const [savedNames, setSavedNames] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [genre, setGenre] = useState("");
  const [requiredWord, setRequiredWord] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [humanWordCount, setHumanWordCount] = useState("");
  const [vibe, setVibe] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleGenreChange = (val) => {
    setGenre(val);
    if (val.trim().length < 1) { setSuggestions([]); return; }
    setSuggestions(GENRES.filter(g => g.toLowerCase().includes(val.toLowerCase())).slice(0, 8));
  };

  const selectGenre = (g) => { setGenre(g); setSuggestions([]); };

  const getRandom = () => {
    let pool = LIST_NAMES;
    if (humanWordCount) {
      const n = Number(humanWordCount);
      pool = LIST_NAMES.filter((name) => countWordsInBandName(name) === n);
      if (pool.length === 0) pool = LIST_NAMES;
    }
    setCurrentName(pool[Math.floor(Math.random() * pool.length)]);
    setSource("human");
  };

  const getAI = async () => {
    setLoading(true);
    setCurrentName(null);
    setSource(null);
    try {
      const seed = RANDOM_SEEDS[Math.floor(Math.random() * RANDOM_SEEDS.length)];
      const avoidList = aiHistory.slice(-10).join(", ");
      let prompt = `Generate one creative, funny, or absurd band name.`;
      if (genre) prompt += ` The band plays ${genre} music — let the genre subtly influence the name's tone or style.`;
      if (vibe) prompt += ` The overall vibe or feeling of the name should be: "${vibe}".`;
      if (requiredWord) prompt += ` The band name MUST include the word "${requiredWord}".`;
      if (wordCount) prompt += ` The band name MUST be exactly ${wordCount} word${wordCount === "1" ? "" : "s"} long.`;
      if (!genre && !requiredWord && !vibe && !wordCount) prompt += ` Draw loose inspiration from this random theme for variety: "${seed}".`;
      prompt += ` Do NOT use any of these recently generated names or repeat their words: ${avoidList || "none yet"}. Reply with ONLY the band name — no explanation, no punctuation at the end, no quotes.`;
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
        <div style={{ width: "100%", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
          <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: 32, fontWeight: 500, margin: "0 0 0.2rem", color: BLUE }}>Band Name Generator</h1>
            <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>Generate, save, and share band names.</p>
          </div>

          <div className="bng-shell">
            <div className="bng-col">
              <div className="bng-cards">
                <div className="bng-card">
                  <p className="bng-card-label">Human Generated</p>
                  <select
                    className={`bng-select${humanWordCount ? " has-value" : ""}`}
                    value={humanWordCount}
                    onChange={(e) => setHumanWordCount(e.target.value)}
                  >
                    <option value="">Number of words (optional)</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} word{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <button onClick={getRandom} className="bng-btn-full bng-btn-outline">
                    Human Generated Name
                  </button>
                </div>

                <div className="bng-card">
                  <p className="bng-card-label">AI Generated</p>
                  <div style={{ position: "relative" }}>
                    <input
                      className="bng-input"
                      placeholder="Genre (optional)"
                      value={genre}
                      onChange={e => handleGenreChange(e.target.value)}
                      onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                    />
                    {suggestions.length > 0 && (
                      <div className="bng-autocomplete">
                        {suggestions.map(s => (
                          <div key={s} className="bng-autocomplete-item" onMouseDown={() => selectGenre(s)}>{s}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    className="bng-input"
                    placeholder="Vibe or mood, e.g. Angry, Mellow (optional)"
                    value={vibe}
                    onChange={e => setVibe(e.target.value)}
                  />
                  <input
                    className="bng-input"
                    placeholder="Must include this word (optional)"
                    value={requiredWord}
                    onChange={e => setRequiredWord(e.target.value)}
                  />
                  <select
                    className={`bng-select${wordCount ? " has-value" : ""}`}
                    value={wordCount}
                    onChange={e => setWordCount(e.target.value)}
                  >
                    <option value="">Number of words (optional)</option>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} word{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                  <button onClick={getAI} disabled={loading} className="bng-btn-full bng-btn-primary" style={{ opacity: loading ? 0.5 : 1, cursor: loading ? "default" : "pointer" }}>
                    {loading ? "Thinking..." : "AI Generated Name"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bng-col">
              <div className="bng-result" style={{ background: BLUE, border: "none", borderRadius: 16, padding: "1.75rem 1.5rem", marginBottom: "1rem", minHeight: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
                {loading ? (
                  <p style={{ fontSize: 13, color: "#fff", margin: 0 }}>Generating...</p>
                ) : currentName ? (
                  <>
                    <span style={{ fontSize: 24, fontWeight: 500, color: "#fff", lineHeight: 1.3 }}>{currentName}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {source === "ai" ? "AI generated" : "Human generated"}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.55)" }}>·</span>
                      <button onClick={saveName} disabled={alreadySaved} style={{ ...pillBtn("transparent", "#fff", "#fff", true), opacity: alreadySaved ? 0.45 : 1, cursor: alreadySaved ? "default" : "pointer" }}>
                        {alreadySaved ? "Saved" : "+ Save"}
                      </button>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: 13, color: "#fff", margin: 0 }}>Your band name will appear here.</p>
                )}
              </div>

              {savedNames.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: FAINT, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                      Your list — {savedNames.length}
                    </span>
                    <button onClick={() => setShowShare(!showShare)} style={pillBtn("#fff", MUTED, BORDER, true)}>
                      {showShare ? "Hide" : "Share List"}
                    </button>
                  </div>
                  <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: "1rem", background: "#fff" }}>
                    {savedNames.map((name, i) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderTop: i > 0 ? `1px solid ${DIVIDER}` : "none" }}>
                        <span style={{ fontSize: 14, color: BLUE }}>{name}</span>
                        <button onClick={() => removeName(name)} style={pillBtn("#fff", MUTED, BORDER, true)}>Remove</button>
                      </div>
                    ))}
                  </div>
                  {showShare && (
                    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: "1.25rem", background: "#fff" }}>
                      <p style={{ fontSize: 11, color: FAINT, margin: "0 0 1rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Share via</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "0.75rem" }}>
                        {SHARE_PLATFORMS.map(p => (
                          <button key={p.name} onClick={() => p.fn(shareText)} style={pillBtn("#fff", MUTED, BORDER, true)}>
                            {p.name}
                          </button>
                        ))}
                      </div>
                      <div style={{ borderTop: `1px solid ${DIVIDER}`, paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                        <button onClick={copyAll} style={pillBtn("#fff", BLUE, BLUE, false, true)}>
                          {copied ? "Copied!" : "Copy All To Clipboard"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
