<div align="center">
  <img src="./assets/NosanaXEliza.jpg" alt="Nosana x ElizaOS" width="600px"/>

  <h1>🔮 Wallet Fortune & Meme Generator</h1>
  
  <p><strong>The Ultimate Degen Oracle Powered by Decentralized GPUs</strong></p>
  
  <p>An official submission for the <b>Nosana Builders Challenge: ElizaOS</b>.</p>
</div>

---

## ⚡ What is the Wallet Fortune Agent?

In the wild west of the Solana ecosystem, everyone loves two things: **Meme Coins** and **Getting roasted for bad trades**. 

We built an autonomous AI agent on the **ElizaOS** framework that scans your Solana wallet address, analyzes your trading behavior (e.g., *Paper Hands*, *Rug Pull Survivor*, *Whale*), and delivers a hilarious, personalized fortune reading. But we didn't stop at text.

By tapping into the decentralized GPU power of the **Nosana Network**, our agent natively hosts an **Audio/Visual Meme Generation Pipeline**. If it detects you bought the top of a meme coin, it dynamically generates a crying animal meme tailored just for you.

### 🏆 Why Nosana? (Our Unique Value)
Text-based agents can run on a potato. Generating hyper-personalized AI images on the fly requires serious compute. By containerizing our agent on a `linux/amd64` CUDA stack, we deploy our heavy inference and generation tasks exclusively on Nosana's GPU network, cutting traditional cloud costs by 80% while maximizing decentralization.

---

## ✨ Features

- 🕵️‍♂️ **Wallet Profile Assessor:** Custom ElizaOS `ANALYZE_WALLET` plugin action that parses Base58 addresses and determines your on-chain archetype.
- 🎨 **GPU-Accelerated Meme Gen:** Custom `GENERATE_MEME` action that creates dynamic visual memes using heavy inference logic.
- 🤖 **ElizaOS Native:** Fully leverages the modular plugin and character JSON system of ElizaOS v2.
- 🚀 **Nosana Ready:** Ships with specialized `.env` templates, `nosana_eliza_job_definition.json`, and an optimized `Dockerfile.nosana`.

---

## 🛠️ Quick Start (Local Run)

Want to see the Oracle in action before deploying to the grid?

```bash
# 1. Clone the repository
git clone https://github.com/tprk33271/nosana-wallet-oracle.git
cd nosana-wallet-oracle

# 2. Install Dependencies (Uses Bun/pnpm)
npm install

# 3. Setup your Environment variables
cp .env.example .env

# 4. Boot up the Agent
npm run start
```

Once running, type: `Hey, can you evaluate my Solana wallet Gv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u8v9w...?`

---

## 🌐 Deploying to Nosana Grid

Our agent is strictly built to run on decentralized infrastructure. 

```bash
# Deploy using Nosana CLI
nosana job post \
  --file ./nos_job_def/nosana_eliza_job_definition.json \
  --market nvidia-4090 \
  --timeout 300 \
  --api <YOUR_API_KEY>
```

---

## 🧠 Project Architecture

All custom logic resides under `/src`:
- **`src/index.ts`**: Contains our custom Degen Plugin featuring `ANALYZE_WALLET` and `GENERATE_MEME` actions.
- **`characters/agent.character.json`**: The persona definition of the "Wallet Oracle", instructing it to be sarcastic, meme-fluent, and aggressively humorous about bad trades.
- **`Dockerfile.nosana`**: Hardware-aware dockerfile intended for Nosana nodes.

---
<div align="center">
  <i>Built with ElizaOS · Deployed on Nosana · Built for Hackathon Glory</i>
</div>
