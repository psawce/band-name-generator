import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request) {
  const body = await request.json();
  const { prompt } = body;

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 100,
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({ text: message.content[0].text });
}
