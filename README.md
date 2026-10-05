# Africa & The World

## Deploying the AI trip assistant

The trip assistant uses a Vercel serverless function at `/api/trip-chat`, which
calls Google's Gemini API. The Gemini credential stays on the server and is
never sent to the browser.

1. Deploy this project to Vercel.
2. Create or select a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey).
3. In Vercel, open the project settings and add `GEMINI_API_KEY` as an
   environment variable for the environments you deploy (Production, Preview,
   and Development as needed). Do not put the key in `index.js`, HTML, or any
   other browser-delivered file.
4. Redeploy the project so the function receives the new environment variable.
5. Open the deployed site, select a destination, and send a test chat message.

The chat is intended for general country background and itinerary ideas. It
does not have live browsing and cannot verify current security advisories,
visas, or immigration document rules. Travelers must confirm those with their
own government's travel advisory and the destination's official embassy or
immigration authority.

The standalone static server used for local preview does not run Vercel API
functions. To test the API locally, run the project with Vercel's development
environment and configure `GEMINI_API_KEY` locally without committing it.
