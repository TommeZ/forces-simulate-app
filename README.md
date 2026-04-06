# Military Simulator

See yourself in the British Armed Forces. Enter your name, select a military role, and upload a photo — the app generates a personalised portrait of you in uniform, a story about your life in that role, and an audio briefing voiced by AI.

🔗 **Live demo:** https://military-simulator.vercel.app/

> No installation required — just open the link and try it.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI API — story, image, and audio generation
- Prisma ORM
- MongoDB
- Cloudinary — image & audio storage
- Vercel — deployment

---

## Features

- **Personalised story** — AI generates a short military-style briefing based on your role
- **AI portrait** — transforms your uploaded photo into a realistic military image using `gpt-image-1`
- **Audio briefing** — the story is narrated using OpenAI TTS
- **Parallel generation** — story and image generate simultaneously for faster UX
- **Persistent history** — previous simulations are stored and viewable
- **Cloud storage** — images and audio are uploaded to Cloudinary and stored via URL
- **Progressive loading** — UI updates as each asset becomes available
- **Reset flow** — restart without refreshing the page

---

## Architecture Overview

The app follows a full-stack flow:

```text
User input
   ↓
Parallel API calls (story + image)
   ↓
Audio generation
   ↓
Upload image & audio → Cloudinary
   ↓
Store metadata + URLs → MongoDB (via Prisma)
   ↓
Retrieve & render → History page
```

This approach avoids storing large base64 files in the database and allows assets to be served efficiently via CDN.

---

## Project Structure

```
app/
  page.tsx
  history/page.tsx
  api/
    openai/
      story/route.ts
      image/route.ts
      voice/route.ts
    upload/
      image/route.ts
      audio/route.ts
    save/
      route.ts
components/
  RoleSelect.tsx
  ImageUpload.tsx
  StoryCard.tsx
  ImageCard.tsx
  AudioPlayer.tsx
  StatusMessage.tsx
lib/
  api.ts
  prisma.ts
  cloudinary.ts
```

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

### 3. Set up environment variables

Create a `.env` file in the root:

```
OPENAI_API_KEY=your_key
DATABASE_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### 4. Generate Prisma client

```bash
npx prisma generate
```

---

### 5. Run the app

```bash
npm run dev
```

---

## Deployment

Deployed on Vercel with GitHub integration.

Environment variables must be configured in:

**Project Settings → Environment Variables**

---

## Notes

- Media is stored in Cloudinary instead of MongoDB to avoid memory and performance issues with large base64 payloads
- The app uses serverless API routes for orchestration and persistence
- Designed to demonstrate both frontend UX and backend architecture in a short timeframe

---

## Future Improvements

- Pagination for history
- Authentication (user-specific simulations)
- Signed uploads directly to Cloudinary
- Rate limiting on API routes

---
