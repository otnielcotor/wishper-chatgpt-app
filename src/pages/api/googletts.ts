import { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const  text  = req.body.text;
    const language = req.body.language;
    console.log("text: " + text)
    console.log("language: " + language)
    if (!text) {
        return res.status(400).json({ error: 'Missing "text" parameter' });
    }

    const request = {
        input: { text: String(text) },
        voice: { languageCode: String(language), ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        // @ts-ignore
        const [response] = await client.synthesizeSpeech(request);
        res.status(200).send(response.audioContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error synthesizing speech' });
    }
}
