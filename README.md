# YourValue.in — Resume Builder

Build your professional resume with a clean, white template (deep blue + saffron accents) and download it as a PDF.

## Tech

- Next.js (App Router)
- Tailwind CSS
- `@react-pdf/renderer` for PDF downloads

## Run locally

1. Install Node.js (with `npm`)
2. Install dependencies:
   - `npm install`
3. Start the dev server:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## Routes

- `/` — Landing page
- `/builder` — Resume builder form
- `/preview` — Resume preview + PDF download

## Notes

- Resume data is stored in `localStorage` during the flow.
- The resume template includes: `Made with YourValue.in` at the bottom.

