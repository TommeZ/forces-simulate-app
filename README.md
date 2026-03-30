# Military-Simulator

See yourself in the British Armed Forces. Enter your name, select a military role, and upload a photo — the app generates a personalised portrait of you in uniform, a story about your life in that role, and an audio briefing voiced by AI.

🔗 **Live demo:** [military-simulator.vercel.app](https://military-simulator.vercel.app/)

> No installation required to try it — just visit the link above.

---

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI API](https://platform.openai.com/) — story, image, and audio generation

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/military-simulator.git
cd military-simulator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your OpenAI API key

Create a `.env` file in the root of the project:

```
OPENAI_API_KEY=sk-your-key-here
```

You can get an API key from [platform.openai.com](https://platform.openai.com/api-keys).

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

- **Personalised story** — GPT generates a vivid description of life in your chosen role
- **AI portrait** — your uploaded photo is transformed into a military portrait using `gpt-image-1`
- **Audio briefing** — the story is read aloud using OpenAI's TTS with a commanding military voice
- **Progressive loading** — story, image, and audio load independently as they're ready
- **Reset** — start fresh without refreshing the page

---

## Project Structure

```
app/
  page.tsx                  # Main page
  api/
    openai/
      story/route.ts        # Story generation
      image/route.ts        # Image generation
      voice/route.ts        # Audio generation
components/
  RoleSelect.tsx            # Military role dropdown
  ImageUpload.tsx           # Photo upload with preview
  StoryCard.tsx             # Story display card
  ImageCard.tsx             # Generated image card
  AudioPlayer.tsx           # Play/pause audio player
  StatusMessage.tsx         # Form status indicator
lib/
  api.ts                    # Client-side fetch helpers
```

---

## Environment Variables

| Variable         | Description         |
| ---------------- | ------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key |

---

## Deployment

The app is deployed on [Vercel](https://vercel.com/). To deploy your own instance, import the repo into Vercel and add `OPENAI_API_KEY` under **Settings → Environment Variables**.
