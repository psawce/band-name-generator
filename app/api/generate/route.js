export async function POST() {
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
        "You generate creative, original band names. Respond with ONLY the band name — no quotes, no explanation, no punctuation at the end. Each name should be unique, evocative, and interesting. Vary styles: poetic, mysterious, funny, punchy, absurd, etc.",
      messages: [{ role: "user", content: "Give me a new band name." }],
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "API error" }), { status: 500 });
  }

  const data = await res.json();
  const name = data.content?.[0]?.text?.trim() || "The Unnamed";
  return new Response(JSON.stringify({ name }), { status: 200 });
}
