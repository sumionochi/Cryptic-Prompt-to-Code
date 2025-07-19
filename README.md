# Cryptic AI Code Obfuscator 🕵️‍♂️🧬

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Next JS](https://img.shields.io/badge/Built with-Next.js-000?logo=nextdotjs&logoColor=white)
![Prisma + MongoDB](https://img.shields.io/badge/DB-Prisma%20%7C%20MongoDB-green)
![AI Powered](https://img.shields.io/badge/AI-Gemini%20&#124;%20GPT-ff69b4)
![Live Preview](https://img.shields.io/badge/Preview-Sandpack-orange)

<img width="1399" height="803" alt="image" src="https://github.com/user-attachments/assets/1edf6c8d-8d57-43f7-843d-da5af5fd2c07" />

**Cryptic** is an open‑source, AI‑driven platform that can **generate** complete codebases from natural‑language prompts *or* **obfuscate** existing code while keeping behaviour intact.  
Think ChatGPT × CodeSandbox: chat with an LLM, watch it build or refactor code live, then export or deploy with one click.

---

## ✨ Key Features
| Capability | Details |
|------------|---------|
| **AI Code Generation** | Describe an app → get a full React + Tailwind project. |
| **AI Obfuscation** | Paste code or upload a file → receive a functionally identical but harder‑to‑read version. |
| **Conversational UI** | Chat panel guides the build & lets you refine requirements. |
| **Live Editor + Preview** | Powered by Sandpack – instant re‑load as files change. |
| **One‑click Deploy & Export** | Push to a live `.csb.app` URL or open in CodeSandbox editor. |
| **Persistent Workspaces** | All sessions saved to your account; revisit anytime. |
| **Google OAuth** | Quick, secure sign‑in (no passwords stored). |
| **Dark Mode** | Toggle or follow system preference. |

---

## 🏗 Architecture Overview

- **Frontend:** Next.js (App Router) + TypeScript · Tailwind CSS · Radix/shadcn UI  
- **State:** React Context for user data, chat log, and compile actions  
- **Backend:** Next.js API routes (Serverless) · Prisma ORM → **MongoDB**  
- **AI Layer:** Default ‑ Google PaLM / Gemini via `@google/generative‑ai` (model‑agnostic; swap in GPT‑4, Claude, etc.)  
- **Execution Sandbox:** CodeSandbox **Sandpack** → in‑browser bundler & live preview  
- **Auth:** Google OAuth 2 (`@react-oauth/google`)

A user prompt triggers **two parallel flows**:  
1. _Chat_ – brief natural‑language reply (no code) for UX.  
2. _Code Generation_ – LLM returns a JSON manifest of files → merged with default boilerplate → rendered in Sandpack.

All workspace data (chat + file tree) is persisted to MongoDB.

---

## ⚙️ Tech Stack

| Layer      | Tech                                                            |
|------------|-----------------------------------------------------------------|
| Frontend   | Next.js 15 · React 19 · TypeScript                               |
| Styling    | Tailwind CSS · Radix UI · shadcn/ui · Lucide icons               |
| Backend    | Next.js API Routes (Serverless) · Prisma ORM → MongoDB Atlas     |
| AI         | Google Gemini / PaLM (API) · prompt engineering (`dedent`)       |
| Sandbox    | @codesandbox/sandpack‑react (live code editor & preview)        |
| Auth       | Google OAuth 2                                                  |

---

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/sumionochi/Cryptic-ai-code-obfuscator.git
cd Cryptic-ai-code-obfuscator

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local   # then edit values
# DATABASE_URL=mongodb+srv://...
# NEXT_PUBLIC_CLIENT_ID_KEY=<google-oauth-client-id>
# NEXT_PUBLIC_GEMINI_API_KEY=<palm-or-gpt-key>

# 4. Sync DB
npx prisma db push           # creates collections/indexes

# 5. Run dev
npm run dev                  # http://localhost:3000
````

---

## 🖱 Usage Workflow

1. **Sign in with Google.**
2. **Enter a prompt** – e.g. `Create a Pomodoro timer`.
3. Watch chat + code panels populate; **preview** updates live.
4. **Iterate** by chatting (“Add dark mode”, “Obfuscate variable names”).
5. **Export** to CodeSandbox or **Deploy** for a shareable URL.

For existing code, paste it (or use **Upload**) & ask:

> “Obfuscate this function while preserving output.”

---

## 🧩 Config & Extensibility

* **Swap AI providers** – edit `src/app/api/ai_*` routes to call OpenAI, Anthropic, etc.
* **Tweak prompts** – `src/data/Prompt.tsx` controls chat tone & code JSON schema.
* **Add frameworks** – extend `DEFAULT_FILES` for Vue / Svelte templates, adjust prompt.
* **Security / rate‑limits** – wrap API routes with quota checks before model calls.

---

## 🤝 Contributing

1. **Fork → Branch → PR.**
2. Run `npm run lint` & ensure builds pass.
3. Avoid committing secrets; use env vars.
4. For large features, open an issue to discuss first.

We welcome prompts, UI tweaks, new AI integrations, and docs!

---

## 📄 License

Released under the **MIT License** – see [`LICENSE`](LICENSE).

---

> *Made with ☕, 🌊 glassmorphism, and a dash of 🤖 by*[ @sumionochi](https://github.com/sumionochi)\_
