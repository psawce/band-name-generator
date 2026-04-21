// v5
const recentNames = [];
let generateCount = 0;

export async function POST() {
  try {
    generateCount++;

    const styles = [
      "poetic and abstract",
      "dark and mysterious",
      "funny and absurd",
      "punchy and aggressive",
      "dreamy and ethereal",
      "political and provocative",
      "nature-inspired",
      "sci-fi and futuristic",
      "nostalgic and romantic",
      "weird and surreal",
      "mathematical or scientific",
      "food or drink inspired",
      "historical or mythological",
      "color or texture inspired",
      "emotion or feeling inspired",
    ];
    const style = styles[Math.floor(Math.random() * styles.length)];

    const avoidWords = getOverusedWords(recentNames, 40, 2);
    const avoidClause = avoidWords.length > 0
      ? `Do NOT use any of these overused words: ${avoidWords.join(", ")}.`
      : "";

    const recentClause = recentNames.length > 0
      ? `Do NOT repeat any of these recent names: ${recentNames.slice(-20).join(", ")}.`
      : "";

    const isOneWord = generateCount % 7 === 0;
    const startWithThe = !isOneWord && generateCount % 8 === 0;

    let structureClause = "";
    if (isOneWord) {
      structureClause = "The name MUST be exactly ONE single word with no spaces.";
    } else if (startWithThe) {
      structureClause = 'The name MUST begin with the word "The".';
    }

    let name = null;
    let attempts = 0;

    while (attempts < 5) {
      attempts++;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 100,
          system: `You generate creative, original band names. Respond with ONLY the band name — no quotes, no explanation, no punctuation at the end. Be highly varied in your vocabulary and structure. ${structureClause} ${avoidClause} ${recentClause}`,
          messages: [{ role: "user", content: `Give me a ${style} band name. Make it unique and unexpected.` }],
        }),
      });

      const raw = await res.text();
      if (!res.ok) {
        return new Response(JSON.stringify({ error: raw }), { status: 500 });
      }

      const data = JSON.parse(raw);
      const candidate = data.content?.[0]?.text?.trim() || "The Unnamed";

      if (isOneWord && candidate.includes(" ")) {
        continue;
      }

      if (startWithThe && !candidate.toLowerCase().startsWith("the ")) {
        continue;
      }

      name = candidate;
      break;
    }

    if (!name) {
      name = isOneWord ? "Eclipse" : "The Unnamed";
    }

    recentNames.push(name);
    if (recentNames.length > 40) recentNames.shift();

    return new Response(JSON.stringify({ name }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

function getOverusedWords(names, window, maxCount) {
  const recent = names.slice(-window);
  const wordCount = {};
  for (const name of recent) {
    const words = name.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
    for (const word of words) {
      if (word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }
  }
  return Object.entries(wordCount)
    .filter(([, count]) => count > maxCount)
    .map(([word]) => word);
}
