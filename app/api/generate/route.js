const recentNames = [];

export async function POST(request) {
  try {
    const body = await request.json();
    const count = body.count || 1;

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
    const avoidClause = avoidWords.length > 0 ? "Do NOT use any of these overused words: " + avoidWords.join(", ") + "." : "";
    const recentClause = recentNames.length > 0 ? "Do NOT repeat any of these recent names: " + recentNames.slice(-20).join(", ") + "." : "";

    const isOneWord = count % 7 === 0;
    const startWithThe = !isOneWord && count % 8 === 0;
    const positionInTen = count % 10;
    const isShort = !isOneWord && !startWithThe && positionInTen >= 1 && positionInTen <= 7;

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
        system: "You generate creative, original band names. Respond with ONLY the band name, no quotes, no explanation, no punctuation at the end. " + avoidClause + " " + recentClause,
        messages: [{ role: "user", content: "Give me a " + style + " band name. Make it unique and unexpected." }],
      }),
    });

    const raw = await res.text();
    if (!res.ok) return new Response(JSON.stringify({ error: raw }), { status: 500 });

    const data = JSON.parse(raw);
    let name = data.content[0].text.trim();
    let words = name.split(/\s+/).filter(function(w) { return w.length > 0; });

    if (isOneWord) {
      words = [words[0]];
    } else if (startWithThe) {
      if (words[0].toLowerCase() === "the") {
        words = words.slice(0, 2);
      } else {
        words = ["The", words[0]];
      }
    } else if (isShort) {
      words = words.slice(0, 2);
    }

    name = words.join(" ");
    recentNames.push(name);
    if (recentNames.length > 40) recentNames.shift();

    return new Response(JSON.stringify({ name: name }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

function getOverusedWords(names, windowSize, maxCount) {
  var recent = names.slice(-windowSize);
  var wordCount = {};
  for (var i = 0; i < recent.length; i++) {
    var words = recent[i].toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
    for (var j = 0; j < words.length; j++) {
      if (words[j].length > 2) {
        wordCount[words[j]] = (wordCount[words[j]] || 0) + 1;
      }
    }
  }
  return Object.keys(wordCount).filter(function(w) { return wordCount[w] > maxCount; });
}
