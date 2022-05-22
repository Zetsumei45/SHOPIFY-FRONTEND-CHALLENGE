const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

export default async (req, res) => {

    let prompt = `${req.body.name}\n`;

    const gptResponse = await openai.complete({
        engine: 'text-curie-001',
        prompt: prompt,
        temperature: 0.5,
        maxTokens: 64,
        topP: 1.0,
        presencePenalty: 0.0,
        frequencyPenalty: 0.0,
    });

    res.status(200).json({ text: `${gptResponse.data.choices[0].text}` })
}
