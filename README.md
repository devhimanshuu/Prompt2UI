# 🎨 Prompt2UI – The Intelligent AI Design Engine

**Prompt2UI** is a premium, production-grade AI agent that transforms natural language into high-fidelity, interactive mobile interfaces. Built for speed and precision, it eliminates the friction between concept and creation.

---

## ✨ Key Features

- 🤖 **AI-Powered Generation**: Instantly architect complex mobile systems using advanced LLMs (Groq, OpenRouter).
- 🖼️ **Interactive Canvas**: Drag, pan, and zoom through your designs with a high-performance interactive workspace.
- 🎨 **Dynamic Themes**: Switch between curated design systems (Midnight Aurora, Professional Dark, etc.) in real-time.
- 📸 **Generative Screenshots**: Export your AI-generated designs into high-quality PNGs for sharing or documentation.
- 🪝 **Background Workflows**: Powered by **Inngest** for reliable, scalable background design processing.
- 🔐 **Premium Auth**: Secure user management with **Clerk**.
- 🌓 **Midnight Aurora UI**: A stunning, responsive interface optimized for everything from mobile to 2K displays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Vanilla CSS enhancements
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **AI Orchestration**: [AI SDK](https://sdk.vercel.ai/) (Groq & OpenRouter)
- **Visuals**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/) style animations
- **Exports**: [Puppeteer](https://pptr.dev/) & [Sparticuz Chromium](https://github.com/Sparticuz/chromium)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/devhimanshuu/Prompt2UI.git
cd Prompt2UI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file and populate it with your keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
DATABASE_URL=...
GROQ_API_KEY=...
OPENROUTER_API_KEY=...
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

### 4. Database Sync

```bash
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

---

## 🌐 Deployment

This project is optimized for **Vercel**.

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Set up a **Postgres** instance (Vercel Storage).
5. Link your Inngest Cloud account to the production URL.

---

## 📄 License

Professional use requires a commercial license. For more details on usage and licensing, please contact the developer.

---

## ❤️ Support

If this project helps you, consider starring the repository or following the development journey! 🌟
