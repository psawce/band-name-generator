export async function POST() {
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
  ];
  const style = styles[Math.floor(Math.random() * styles.length)];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      system:
        "You generate creative, original band names. Respond with ONLY the band name — no quotes, no explanation, no punctuation at the end. Never repeat a name you have given before.",
      messages: [{ role: "user", content: `Give me a ${style} band name. Make it unique and unexpected.` }],
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "API error" }), { status: 500 });
  }

  const data = await res.json();
  const name = data.content?.[0]?.text?.trim() || "The Unnamed";
  return new Response(JSON.stringify({ name }), { status: 200 });
}
