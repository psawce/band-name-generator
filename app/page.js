"use client";
import { useState, useRef } from "react";

const HUMAN_NAMES = [
  "Some U.S. Americans", "Tragically Underseasoned", "The Irrelevant Takes", "Oblong Ball",
  "Diminished by Sandwiches", "Guar Gum", "Independent George", "The Bitter Clingers",
  "Beer and Pussy", "New Potato Adventure", "Omlette Bar", "Assistant To The Regional Manager",
  "Baked Potato Causeway", "That Guy", "Surrender Dorothy", "Idea Man", "Conjugal Visitors",
  "People Under You", "Immersion Blender", "Mitch and Murray", "Duck Tape", "Spider Ricco",
  "The Helsinki Episode", "Binders Full of Deplorables", "Concepts of a Plan",
  "Forget About Him He's Dead", "Spread Eagle", "The Whole Planet Houston",
  "I Heard You Were Dead", "The President of What", "Shinebox", "The Central Park Karens",
  "Vichyssoise Salad", "Acquiescence Tour", "Times New Roman", "Both Sides", "The Internet",
  "Unified Theory of Everything", "Word Processor", "Chef Recommends", "Attack / Decay",
  "Backlash", "Guns and Provolone", "Proper Villains", "The Full Ginsberg", "Portfolio",
  "Team Of Experts", "Very Fine People", "Nakatomi Plaza", "Jumbotron", "David Pecker",
  "Specific Ocean", "Two Corinthians", "Johnny Football Hero", "They Them", "Western Beef",
  "Bomb Cyclone", "The Kugelmass Episode", "Vassaline", "Hostile Womb", "Arena Rock",
  "Tiny Holmes", "Roboto Slab", "Danger Robots", "Deathbed Motorcycle",
  "I Don't Care About Your Band", "Launch Procedure", "Ministry of Ketchup",
  "Elevator Repair Man", "Sorry About Your Daughter", "First Blood", "One Louder",
  "Adult Happy Meal", "Sad Desk Lunch", "Charcuterie", "Bespoke Reality",
  "Heaven or Las Vegas", "Beef Carving Station", "Situationship", "Army of Thugs",
  "Mike Johnson", "Electrolytes", "Baller", "Kate Blanchet", "Dangling Modifier",
  "Broheim", "Cassingle", "Prime Rib", "Service Dog", "Bureaucratic Fools",
  "Fear of Sour Cream", "Willy Mammoth", "Whipped Topping", "Special Counsel",
  "Everywhere Like Such As", "Bear Are People In Costume", "Irregardless",
  "The P Drive", "The Underhill's Bill"
];

export default function Home() {
  const [bandName, setBandName] = useState("");
  const [nameType, setNameType] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [fading, setFading] = useState(false);
  const humanIndexRef = useRef(0);

  const showName = (name, type) => {
    setFading(true);
    setTimeout(() => {
      setBandName(name);
      setNameType(type);
      setFading(false);
    }, 200);
  };

  const generateAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 100,
          messages: [{
            role: "user",
            content: "Generate one single creative, original, and funny band name. Reply with only the band name, nothing else."
          }]
        })
      });
      const data = await res.json();
      const name = data.content?.[0]?.text?.trim() || "Unknown Band";
      showName(name, "AI Generated");
    } catch {
      showName("Error generating name", "AI Generated");
    }
    setLoading(false);
  };

  const generateHuman = () => {
    const name = HUMAN_NAMES[humanIndexRef.current % HUMAN_NAMES.length];
    humanIndexRef.current += 1;
    showName(name, "Human Generated");
  };

  const saveName = () => {
    if (bandName && !saved.includes(bandName)) {
      setSaved([...saved, bandName]);
    }
  };

  const removeName = (name) => {
    setSaved(saved.filter(n => n !== name));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ffffff", fontFamily: "indivisible, sans-serif" }}>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "3rem 2.5rem" }}>

        <p style={{ fontSize: "0.85rem", color: "#1a1a1a", marginBottom: "2rem" }}>
          Find the perfect name for your band
        </p>

        {/* Two Buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "2rem" }}>
          <button
            onClick={generateAI}
            disabled={loading}
            style={{
              padding: "10px 22px", fontSize: "14px", fontWeight: 500,
              border: "1.5px solid #005dff", borderRadius: "6px",
              background: "#ffffff", color: "#005dff",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "indivisible, sans-serif",
              opacity: loading ? 0.6 : 1,
              transition: "background 0.15s, color 0.15s"
            }}
            onMouseEnter={e => { e.target.style.background = "#005dff"; e.target.style.color = "#ffffff"; }}
            onMouseLeave={e => { e.target.style.background = "#ffffff"; e.target.style.color = "#005dff"; }}
          >
            {loading ? "Generating..." : "AI Generated Name"}
          </button>

          <button
            onClick={generateHuman}
            style={{
              padding: "10px 22px", fontSize: "14px", fontWeight: 500,
              border: "1.5px solid #005dff", borderRadius: "6px",
              background: "#005dff", color: "#ffffff",
              cursor: "pointer",
              fontFamily: "indivisible, sans-serif",
              transition: "background 0.15s, color 0.15s"
            }}
            onMouseEnter={e => { e.target.style.background = "#ffffff"; e.target.style.color = "#005dff"; }}
            onMouseLeave={e => { e.target.style.background = "#005dff"; e.target.style.color = "#ffffff"; }}
          >
            Human Generated Name
          </button>
        </div>

        {/* Band Name Display */}
        <div style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.2s",
          marginBottom: "0.5rem"
        }}>
          {bandName ? (
            <>
              <div style={{ fontSize: "3rem", fontWeight: 400, color: "#005dff", fontFamily: "fields-display, sans-serif", lineHeight: 1.2, marginBottom: "0.4rem" }}>
                {bandName}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "1rem" }}>
                {nameType}
              </div>
              <button
                onClick={saveName}
                style={{
                  fontSize: "13px", padding: "6px 16px",
                  border: "1px solid #ddd", borderRadius: "5px",
                  background: "#fff", color: "#1a1a1a",
                  cursor: "pointer", fontFamily: "indivisible, sans-serif"
                }}
              >
                ♡ Save this name
              </button>
            </>
          ) : (
            <div style={{ fontSize: "1.1rem", color: "#ccc" }}>Your band name will appear here</div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        width: "240px", borderLeft: "0.5px solid #e5e5e5",
        padding: "2rem 1.25rem", display: "flex", flexDirection: "column"
      }}>
        <div style={{ fontSize: "12px", fontWeight: 500, color: "#888", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Saved Names ({saved.length})
        </div>

        {saved.length === 0 ? (
          <div style={{ fontSize: "13px", color: "#ccc" }}>Names you save will appear here</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {saved.map((name, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#1a1a1a" }}>
                <span>{name}</span>
                <button
                  onClick={() => removeName(name)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "16px", lineHeight: 1 }}
                >×</button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
