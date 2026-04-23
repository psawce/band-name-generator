const recent = [];

export async function POST(req) {
  try {
    const { count = 1 } = await req.json();
    const isOneWord = count % 7 === 0;
    const startWithThe = !isOneWord && count % 8 === 0;
    const isShort = !isOneWord && !startWithThe && count % 10 <= 7;

    const styles = ["poetic","mysterious","funny","punchy","dreamy","nature-inspired","sci-fi","nostalgic","surreal","scientific"];
    const style = styles[Math.floor(Math.random() * styles.length)];

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 50,
        system: "Generate creative band names. Respond with ONLY the band name, nothing else.",
        messages: [{ role: "user", content: "Give me a " + style + " band name." }],
      }),
    });

    const data = await res.json();
    let name = data.content[0].text.trim();
    let words = name.split(" ").filter(function(w) { return w.length > 0; });

    if (isOneWord) { words = [words[0]]; }
    else if (startWithThe) { words = words[0].toLowerCase() === "the" ? words.slice(0,2) : ["The", words[0]]; }
    else if (isShort) { words = words.slice(0,2); }

    name = words.join(" ");
    recent.push(name);
    if (recent.length > 40) recent.shift();

    return new Response(JSON.stringify({ name: name }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
