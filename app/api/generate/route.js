// v8
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

    const avoidWords =
