// v2
export async function POST() {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 100,
        system: "You generate creative band names. Respond with ONLY the band name.",
        messages: [{ role: "user", content: "Give me a band name." }],
      }),
    });

    const raw = await res.text();
    console.log("STATUS:", res.status);
    console.log("BODY:", raw);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: raw }), { status: 500 });
    }

    const data = JSON.parse(raw);
    const name = data.content?.[0]?.text?.trim() || "The Unnamed";
    return new Response(JSON.stringify({ name }), { status: 200 });

  } catch (err) {
    console.log("ERROR:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
