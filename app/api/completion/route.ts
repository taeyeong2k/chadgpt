import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { log } = await req.json(); // extract the workout log from the request body

  // Here's the prompt, which includes the workout log to be parsed
  const prompt = `
Given the following workout logs, structure them into the following format:

Format:
- Date: MM/DD/YYYY
- Exercises: 
  - Name: Exercise name
  - Weight: Weight used (if applicable)
  - Reps and Sets: Reps x Sets (if applicable)
  - Notes: Additional notes (if applicable)

Workout Logs:
- Date: 01/01/2023
- Exercises:
  - Name: Running
  - Speed: 9km/hr
  - Distance: 1600m
- Date: 01/02/2023
- Exercises:
  - Name: Bench press
  - Weight: 40kg
  - Reps and Sets: 5x5

Now, structure this workout log:

"${log}"
  `;

  // Ask OpenAI for a completion given the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.5, // Lower temperature can help with consistency and structure
    prompt,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
