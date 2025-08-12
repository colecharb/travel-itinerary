/**
 * Return only a JSON object with destinations and an itinerary
 */
const onlyJson = (message: string) => `
You are a travel assistant AI.

Given the user's message below, please respond ONLY with a JSON object containin:

{
  "destinations": [array of main destinations --- cities, landmarks, points of interest --- as strings],
  "itinerary": "A big-picture travel itinerary paragraph that uses the destinations above."
}

and do NOT put the response in backticks (\`\`\`).

User message:
"""${message}"""
`;

export default onlyJson;
