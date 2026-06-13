# Denia Bot 🤖

> AI companion Discord bot chat cerdas, web search real-time, dan joki manager.

[![Discord](https://img.shields.io/badge/Add%20to%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1510462661836542063&permissions=8&scope=bot+applications.commands)
[![Website](https://img.shields.io/badge/Website-lyravein.my.id/denia-c084fc?style=for-the-badge)](https://lyravein.my.id/denia)

---

## ✨ Features

- **AI Chat** · Multi-provider (Groq LLaMA 3.3 70B + OpenRouter DeepSeek), fallback otomatis
- **Web Search** · Real-time search via Serper API, trigger dengan kata "cari", "cariin", dll
- **Memory System** · Ingat konteks percakapan per channel
- **Persona System** · Ganti karakter/kepribadian bot
- **Typing Simulation** · Simulate typing sebelum reply

## 🛠 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=flat-square&logo=discord&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## 📂 Structure

```
discordbot/
├── index.js              # Entry point
├── deploy-commands.js    # Deploy slash commands
├── ai/
│   ├── providers.js      # AI provider fallback (Groq → OpenRouter)
│   ├── memory.js         # Conversation memory
│   └── persona.js        # Persona system
├── commands/             # Slash command handlers
├── features/             # Feature modules
│   ├── joki.js           # Joki manager (per-user)
│   ├── webSearch.js      # Web search (Serper)
│   ├── cooldown.js
│   ├── typing.js
│   └── stats.js
└── web/                  # Landing page website
    ├── index.html        # Coming soon
    └── denia/
        └── index.html    # Bot landing page
```

## ⚡ Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Lihat daftar command |
| `/status` | Status bot & provider aktif |
| `/stats` | Total pesan diproses |
| `/forget` | Reset memory channel |
| `/persona [nama]` | Ganti persona bot |

## 🔧 Setup

```bash
git clone https://github.com/Lyravein/discord-bot-project.git
cd discord-bot-project
npm install
cp .env.example .env  # isi API keys
node deploy-commands.js
pm2 start index.js --name denia
```

## 🌐 Website

Landing page bot: [lyravein.my.id/denia](https://lyravein.my.id/denia)

---

Made with 💜 by [lyravein](https://github.com/Lyravein)
