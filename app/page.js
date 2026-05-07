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

const HUMAN_NAME_GENRE_BY_NAME = {
  "Some U.S. Americans": "Political Rap",
  "Tragically Underseasoned": "Indie Rock",
  "The Irrelevant Takes": "Post-Punk",
  "Oblong Ball": "Garage Rock",
  "Diminished by Sandwiches": "Alternative Rock",
  "Guar Gum": "Noise Rock",
  "Independent George": "Art Rock",
  "The Bitter Clingers": "Punk Rock",
  "Beer and Pussy": "Hard Rock",
  "New Potato Adventure": "Psychedelic Rock",
  "Omlette Bar": "Dance Pop",
  "Assistant To The Regional Manager": "Indie Pop",
  "Baked Potato Causeway": "Americana",
  "That Guy": "Classic Rock",
  "Surrender Dorothy": "Heartland Rock",
  "Idea Man": "Synth-pop",
  "Conjugal Visitors": "Post-Punk",
  "People Under You": "Alternative Hip-Hop",
  "Immersion Blender": "Math Rock",
  "Mitch and Murray": "Jazz Fusion",
  "Duck Tape": "Garage Rock",
  "Spider Ricco": "Surf Rock",
  "The Helsinki Episode": "Art Rock",
  "Binders Full of Deplorables": "Political Rap",
  "Concepts of a Plan": "Conscious Rap",
  "Forget About Him He's Dead": "Goth Rock",
  "Spread Eagle": "Hard Rock",
  "The Whole Planet Houston": "Progressive Rock",
  "I Heard You Were Dead": "Post-Punk",
  "The President of What": "Alternative Rock",
  "Shinebox": "Old School Hip-Hop",
  "The Central Park Karens": "Punk Rock",
  "Vichyssoise Salad": "Chamber Pop",
  "Acquiescence Tour": "Dream Pop",
  "Times New Roman": "Art Pop",
  "Both Sides": "Soft Rock",
  "The Internet": "Electropop",
  "Unified Theory of Everything": "Progressive Rock",
  "Word Processor": "Synth-pop",
  "Chef Recommends": "Indie Pop",
  "Attack / Decay": "Post-Punk",
  "Backlash": "Punk Rock",
  "Guns and Provolone": "Hard Rock",
  "Proper Villains": "Glam Rock",
  "The Full Ginsberg": "Folk Rock",
  "Portfolio": "Art Rock",
  "Team Of Experts": "Alternative Rock",
  "Very Fine People": "Political Rap",
  "Nakatomi Plaza": "Synthwave",
  "Jumbotron": "Arena Rock",
  "David Pecker": "Garage Rock",
  "Specific Ocean": "Dream Pop",
  "Two Corinthians": "Southern Gospel",
  "Johnny Football Hero": "Heartland Rock",
  "They Them": "Indie Pop",
  "Western Beef": "Country Rock",
  "Bomb Cyclone": "Thrash Metal",
  "The Kugelmass Episode": "Jazz Rap",
  "Vassaline": "Dream Pop",
  "Hostile Womb": "Noise Rock",
  "Arena Rock": "Arena Rock",
  "Tiny Holmes": "Baroque Pop",
  "Roboto Slab": "Industrial",
  "Danger Robots": "Synth Punk",
  "Deathbed Motorcycle": "Doom Metal",
  "I Don't Care About Your Band": "Hardcore Punk",
  "Launch Procedure": "Techno",
  "Ministry of Ketchup": "Indie Rock",
  "Elevator Repair Man": "Post-Punk",
  "Sorry About Your Daughter": "Emo",
  "First Blood": "Metalcore",
  "One Louder": "Hard Rock",
  "Adult Happy Meal": "Bubblegum Pop",
  "Sad Desk Lunch": "Lo-fi Hip-Hop",
  "Charcuterie": "House",
  "Bespoke Reality": "Art Pop",
  "Heaven or Las Vegas": "Dream Pop",
  "Beef Carving Station": "Classic Country",
  "Situationship": "Contemporary R&B",
  "Army of Thugs": "Gangsta Rap",
  "Mike Johnson": "Americana",
  "Electrolytes": "Electro",
  "Baller": "Trap",
  "Kate Blanchet": "Sophisti-pop",
  "Dangling Modifier": "Math Rock",
  "Broheim": "Bro-Country",
  "Cassingle": "Synth-pop",
  "Prime Rib": "Classic Rock",
  "Service Dog": "Contemporary Folk",
  "Bureaucratic Fools": "Conscious Rap",
  "Fear of Sour Cream": "Post-Punk",
  "Willy Mammoth": "Stoner Rock",
  "Whipped Topping": "Dance Pop",
  "Special Counsel": "Political Rap",
  "Everywhere Like Such As": "Pop Punk",
  "Bear Are People In Costume": "Psychedelic Folk",
  "Irregardless": "Alternative Rock",
  "The P Drive": "Synthwave",
  "The Underhill's Bill": "Americana",
  "Ham On Five": "Funk",
  "Tight Gripper": "Garage Rock",
  "Abbey Normal": "Glam Rock",
  "Steak Sandwich": "Blues Rock",
  "Everlasting Gobstopper": "Power Pop",
  "Largesse": "Art Rock",
  "Jesus H. Christ": "Southern Rock",
  "Death Is My Exit Strategy": "Post-Rock",
  "Numbers Game": "Progressive House",
  "Four Seasons Total Landscaping": "Political Rap",
  "The Snyder Cut": "Alternative Rock",
  "Snake Plisken": "Synthwave",
  "Mo Black's Brother": "Jazz Rap",
  "The Obscurely Specific": "Post-Punk",
  "Dave's Killer Bread": "Garage Rock",
  "The General Collapse of Society": "Crust Punk",
  "Hillary Industrial Complex": "Industrial",
  "Sheeple": "Conscious Rap",
  "Service Merchandise": "Cold Wave",
  "Sauce": "Trap",
  "Two Pronged Attack": "Thrash Metal",
  "Cultured Meat": "Art Pop",
  "Is This Thing On": "Classic Rock",
  "Five Point Plan": "Conscious Rap",
  "Avant Basic": "Art Pop",
  "Bird Aren't Real": "Indie Rock",
  "Little Lebowski Overachievers": "Alternative Rock",
  "Benghazi Plaza": "Political Rap",
  "The UK Variant": "Post-Punk",
  "Abner Ravenwood Is Dead": "Goth Rock",
  "Status Indicator": "Synth-pop",
  "The Duke of New York": "Glam Rock",
  "Unlimited Breadsticks": "Dance Pop",
  "Emergent Social Blistering": "Noise",
  "Your Own Personal El Guapo": "Surf Rock",
  "Drugs": "Punk Rock",
  "Tom Cruise Apologist": "Alternative Rock",
  "People With Lasers": "Electropop",
  "Intellectual Zamboni": "Art Rock",
  "Semantic Apocalypse": "Industrial",
  "Sunshine Carpet Cleaners": "Indie Pop",
  "Avocado Toast": "Contemporary Folk",
  "The Russian Dossier": "Post-Punk",
};

const HUMAN_NAME_LIBRARY = LIST_NAMES.map((name) => ({
  name,
  genre: HUMAN_NAME_GENRE_BY_NAME[name] || "Alternative Rock",
}));

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
  .bng-page {
    background: #fff;
    min-height: 100vh;
    padding: 1.25rem 1rem 1.75rem;
    box-sizing: border-box;
  }
  .bng-page-inner {
    width: 100%;
    margin: 0 auto;
    max-width: 1120px;
    font-family: system-ui, sans-serif;
  }
  .bng-header {
    text-align: center;
    margin-bottom: 1rem;
  }
  .bng-title {
    font-size: clamp(1.9rem, 9vw, 2.4rem);
    font-weight: 500;
    margin: 0 0 0.25rem;
    color: #005dff;
    line-height: 1.1;
  }
  .bng-subtitle {
    font-size: 0.94rem;
    color: #999999;
    margin: 0;
  }
  .bng-shell {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bng-result-card {
    background: #005dff;
    border: none;
    border-radius: 16px;
    padding: 1.1rem 1rem;
    margin-bottom: 0.85rem;
    min-height: 108px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    text-align: center;
  }
  .bng-result-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .bng-list-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 0.75rem;
  }
  .bng-saved-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 13px;
  }
  .bng-saved-name {
    font-size: 14px;
    color: #005dff;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  @media (min-width: 640px) {
    .bng-page {
      padding: 1.75rem 1.25rem 2rem;
    }
    .bng-header {
      margin-bottom: 1.25rem;
    }
    .bng-result-card {
      padding: 1.5rem 1.25rem;
      margin-bottom: 1rem;
      min-height: 120px;
    }
    .bng-saved-row {
      padding: 11px 16px;
    }
  }
  @media (min-width: 980px) {
    .bng-page {
      padding: 2.5rem 1.25rem;
    }
    .bng-header {
      margin-bottom: 1.5rem;
    }
    .bng-shell {
      flex-direction: row;
      align-items: stretch;
      gap: 1.5rem;
    }
    .bng-col {
      width: 50%;
      min-width: 0;
    }
    .bng-result-card {
      padding: 1.75rem 1.5rem;
      min-height: 126px;
    }
    .bng-list-header {
      align-items: center;
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
    background: transparent;
    border: none;
    border-radius: 16px;
    padding: 0;
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
    font-size: 16px;
    padding: 12px 14px;
    border: 1.5px solid #e5e5e5;
    border-radius: 999px;
    outline: none;
    box-sizing: border-box;
    background: #fff;
    color: #111;
    margin-bottom: 0.75rem;
    min-height: 46px;
  }
  .bng-input:focus { border-color: #005dff; }
  .bng-input::placeholder { color: #aaa; }
  .bng-select {
    width: 100%;
    font-family: inherit;
    font-size: 16px;
    padding: 12px 14px;
    border: 1.5px solid #e5e5e5;
    border-radius: 999px;
    outline: none;
    box-sizing: border-box;
    background: #fff;
    color: #aaa;
    margin-bottom: 0.75rem;
    appearance: none;
    cursor: pointer;
    min-height: 46px;
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
    padding: 11px 14px;
    font-size: 14px;
    cursor: pointer;
    color: #111;
    border-bottom: 1px solid #f0f0f0;
  }
  .bng-autocomplete-item:last-child { border-bottom: none; }
  .bng-autocomplete-item:hover { background: #f4f6fc; color: #005dff; }
  .bng-btn-full {
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: 999px;
    padding: 11px 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: opacity 0.15s;
    box-sizing: border-box;
    width: 100%;
    margin-top: auto;
    min-height: 56px;
  }
  .bng-btn-primary { background: #005dff; color: #fff; border: 2px solid #005dff; }
  .bng-btn-outline { background: #fff; color: #005dff; border: 2px solid #005dff; }
  .bng-generate-btn {
    position: relative;
  }
  .bng-mode-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-bottom: 0.85rem;
    padding: 7px;
    border-radius: 999px;
    background: #fff;
    position: relative;
    overflow: hidden;
  }
  .bng-mode-toggle::before {
    content: "";
    position: absolute;
    top: 7px;
    bottom: 7px;
    left: 7px;
    width: calc(50% - 7px);
    border-radius: 999px;
    background: #005dff;
    transform: translateX(0%);
    transition: transform 0.2s ease;
    z-index: 0;
  }
  .bng-mode-toggle[data-mode="human"]::before {
    transform: translateX(100%);
  }
  .bng-mode-btn {
    min-height: 48px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: #005dff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: color 0.2s ease;
  }
  .bng-mode-btn--active {
    color: #fff;
  }
  .bng-control-label {
    font-size: 12px;
    color: #005dff;
    margin: 20px 0 8px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .bng-wordcount {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .bng-wordcount-btn {
    min-width: 42px;
    min-height: 38px;
    border-radius: 999px;
    border: 1.5px solid #d6dcea;
    background: #fff;
    color: #005dff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 0 10px;
  }
  .bng-wordcount-btn--active {
    background: #005dff;
    border-color: #005dff;
    color: #fff;
  }
  .bng-card-tabbed {
    padding: 0;
    overflow: hidden;
    border-radius: 14px;
    background: #fff;
  }
  .bng-tab-strip {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    padding: 10px 10px 0 10px;
    background: transparent;
    border-bottom: 1px solid #e5e5e5;
  }
  .bng-tab {
    font-family: inherit;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 10px 18px 11px;
    margin: 0 0 -1px 0;
    border: 1px solid #d6dcea;
    border-bottom: none;
    border-radius: 12px 12px 0 0;
    cursor: pointer;
    background: #fff;
    color: #005dff;
    outline: none;
    position: relative;
    top: 1px;
    transition: background 0.12s, color 0.12s, transform 0.12s;
  }
  .bng-tab:hover:not(.bng-tab--active) {
    background: #fff;
    color: #005dff;
  }
  .bng-tab--active {
    background: #005dff;
    color: #fff;
    border-color: #005dff;
    border-bottom: 1px solid #005dff;
    top: 1px;
    z-index: 1;
    transform: translateY(-1px);
    box-shadow: none;
  }
  .bng-tab-panel {
    background: #fff;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }
  .bng-source-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1rem 1rem 0.75rem;
  }
  @media (max-width: 979px) {
    .bng-card-tabbed {
      background: transparent;
      border: none;
      border-radius: 0;
      overflow: visible;
    }
    .bng-source-toggle {
      margin: 0 0 0.75rem;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }
    .bng-source-btn {
      width: 100% !important;
      min-height: 44px;
    }
    .bng-tab-panel {
      background: transparent;
      padding: 0;
    }
  }
  @media (min-width: 768px) {
    .bng-input,
    .bng-select {
      font-size: 14px;
      padding: 9px 14px;
      min-height: 40px;
      margin-bottom: 0.6rem;
    }
    .bng-btn-full {
      font-size: 13px;
      padding: 9px 22px;
      min-height: 50px;
    }
  }
  @media (max-width: 479px) {
    .bng-tab-panel {
      padding-bottom: calc(4.25rem + env(safe-area-inset-bottom, 0px)) !important;
    }
    .bng-generate-btn {
      position: sticky;
      bottom: calc(0.65rem + env(safe-area-inset-bottom, 0px));
      z-index: 5;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
    }
  }
`;

const pillBtn = (bg, color, border, small, full) => ({
  fontFamily: "inherit",
  fontSize: small ? 12 : 13,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  borderRadius: 999,
  padding: small ? "8px 14px" : "11px 22px",
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
  minHeight: small ? 36 : 44,
});

export default function Home() {
  const [generatorMode, setGeneratorMode] = useState("ai");
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
  const [vibe, setVibe] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleGenreChange = (val) => {
    setGenre(val);
    if (val.trim().length < 1) { setSuggestions([]); return; }
    setSuggestions(GENRES.filter(g => g.toLowerCase().includes(val.toLowerCase())).slice(0, 8));
  };

  const selectGenre = (g) => { setGenre(g); setSuggestions([]); };

  const handleModeKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setGeneratorMode("human");
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setGeneratorMode("ai");
    }
  };

  const getRandom = () => {
    const normalizedGenre = genre.trim().toLowerCase();
    const normalizedRequiredWord = requiredWord.trim().toLowerCase();
    const normalizedVibe = vibe.trim().toLowerCase();
    const desiredWordCount = wordCount ? Number(wordCount) : null;

    const matches = (entry, options) => {
      if (options.genre && entry.genre.toLowerCase() !== normalizedGenre) return false;
      if (options.wordCount && countWordsInBandName(entry.name) !== desiredWordCount) return false;
      if (options.requiredWord && !entry.name.toLowerCase().includes(normalizedRequiredWord)) return false;
      if (options.vibe && !`${entry.name} ${entry.genre}`.toLowerCase().includes(normalizedVibe)) return false;
      return true;
    };

    const tiers = [
      { genre: !!normalizedGenre, wordCount: !!desiredWordCount, requiredWord: !!normalizedRequiredWord, vibe: !!normalizedVibe },
      { genre: !!normalizedGenre, wordCount: !!desiredWordCount, requiredWord: !!normalizedRequiredWord, vibe: false },
      { genre: !!normalizedGenre, wordCount: !!desiredWordCount, requiredWord: false, vibe: !!normalizedVibe },
      { genre: !!normalizedGenre, wordCount: !!desiredWordCount, requiredWord: false, vibe: false },
      { genre: !!normalizedGenre, wordCount: false, requiredWord: !!normalizedRequiredWord, vibe: false },
      { genre: !!normalizedGenre, wordCount: false, requiredWord: false, vibe: false },
      { genre: false, wordCount: !!desiredWordCount, requiredWord: !!normalizedRequiredWord, vibe: !!normalizedVibe },
      { genre: false, wordCount: !!desiredWordCount, requiredWord: !!normalizedRequiredWord, vibe: false },
      { genre: false, wordCount: !!desiredWordCount, requiredWord: false, vibe: false },
      { genre: false, wordCount: false, requiredWord: !!normalizedRequiredWord, vibe: false },
      { genre: false, wordCount: false, requiredWord: false, vibe: !!normalizedVibe },
      { genre: false, wordCount: false, requiredWord: false, vibe: false },
    ];

    let pool = [];
    for (const tier of tiers) {
      pool = HUMAN_NAME_LIBRARY.filter((entry) => matches(entry, tier));
      if (pool.length > 0) break;
    }

    const selection = pool[Math.floor(Math.random() * pool.length)];
    setCurrentName(selection.name);
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
      if (wordCount) prompt += ` The band name MUST be exactly ${wordCount} word${wordCount === "1" ? "" : "s"} long, with a maximum of 6 words.`;
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
      <div className="bng-page">
        <div className="bng-page-inner">
          <div className="bng-header">
            <h1 className="bng-title">Band Name Generator</h1>
            <p className="bng-subtitle">Generate, save, and share band names.</p>
          </div>

          <div className="bng-shell">
            <div className="bng-col">
              <div className="bng-cards">
                <div className="bng-card">
                  <div
                    className="bng-mode-toggle"
                    data-mode={generatorMode}
                    role="radiogroup"
                    aria-label="Name source"
                    onKeyDown={handleModeKeyDown}
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={generatorMode === "ai"}
                      tabIndex={generatorMode === "ai" ? 0 : -1}
                      onClick={() => setGeneratorMode("ai")}
                      className={`bng-mode-btn${generatorMode === "ai" ? " bng-mode-btn--active" : ""}`}
                    >
                      AI Generated
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={generatorMode === "human"}
                      tabIndex={generatorMode === "human" ? 0 : -1}
                      onClick={() => setGeneratorMode("human")}
                      className={`bng-mode-btn${generatorMode === "human" ? " bng-mode-btn--active" : ""}`}
                    >
                      Human Generated
                    </button>
                  </div>

                  <div className="bng-tab-panel">
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
                    <p className="bng-control-label">Number of words (optional, max 6)</p>
                    <div className="bng-wordcount" role="radiogroup" aria-label="Number of words">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={!wordCount}
                        onClick={() => setWordCount("")}
                        className={`bng-wordcount-btn${!wordCount ? " bng-wordcount-btn--active" : ""}`}
                      >
                        Any
                      </button>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={wordCount === String(n)}
                          onClick={() => setWordCount(String(n))}
                          className={`bng-wordcount-btn${wordCount === String(n) ? " bng-wordcount-btn--active" : ""}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={generatorMode === "ai" ? getAI : getRandom}
                      disabled={loading}
                      className="bng-btn-full bng-btn-primary bng-generate-btn"
                      style={{ opacity: loading ? 0.5 : 1, cursor: loading ? "default" : "pointer" }}
                    >
                      {loading ? "Thinking..." : "Generate Name"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bng-col">
              <div className="bng-result bng-result-card">
                {loading ? (
                  <p style={{ fontSize: 13, color: "#fff", margin: 0 }}>Generating...</p>
                ) : currentName ? (
                  <>
                    <span style={{ fontSize: 24, fontWeight: 500, color: "#fff", lineHeight: 1.3 }}>{currentName}</span>
                    <div className="bng-result-actions">
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
                  <div className="bng-list-header">
                    <span style={{ fontSize: 11, fontWeight: 500, color: FAINT, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                      Your list — {savedNames.length}
                    </span>
                    <button onClick={() => setShowShare(!showShare)} style={pillBtn("#fff", MUTED, BORDER, true)}>
                      {showShare ? "Hide" : "Share List"}
                    </button>
                  </div>
                  <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: "1rem", background: "#fff" }}>
                    {savedNames.map((name, i) => (
                      <div key={name} className="bng-saved-row" style={{ borderTop: i > 0 ? `1px solid ${DIVIDER}` : "none" }}>
                        <span className="bng-saved-name">{name}</span>
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
