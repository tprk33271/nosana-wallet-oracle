<div align="center">
  <img src="./assets/NosanaXEliza.jpg" alt="Nosana x ElizaOS" width="600px"/>

  <h1>🔮 Wallet Oracle: The Degen Counselor</h1>
  
  <p><strong>A Sarcastic AI Roast & Education Agent Powered by Nosana's Decentralized GPU Grid</strong></p>
  
  <p>Official submission for the <b>Nosana Builders Challenge: ElizaOS</b>.</p>
</div>

---

## 📝 Project Description (Submission Summary)

The **Wallet Oracle** is an autonomous AI agent built on **ElizaOS v2** and deployed on the **Nosana** decentralized GPU network. 

In the high-stakes world of the Solana ecosystem, traders often get caught in cycles of FOMO and emotional trading. The Wallet Oracle provides a much-needed "reality check" through a unique **Roast & Educate** workflow. 

### Core Logic:
1. **The Roast**: When presented with a wallet or trading history, the Oracle delivers a brutally honest, sarcastic critique of the user's trading archetypes (e.g., *Paper Hands*, *Top-Buyer*, or *Rug-Pull Magnet*).
2. **The Education**: Once the ego is bruised, the Oracle pivots to serious financial literacy. It provides one piece of high-quality, actionable DeFi advice—ranging from risk management strategies to advanced portfolio hedging techniques—empowering the user to become a smarter participant in the network.

### Why Nosana?
By leveraging Nosana’s decentralized inference endpoints for **Qwen3.5-27B** and **Qwen3-Embedding**, the Wallet Oracle avoids the vendor lock-in and high costs of centralized AI providers. The entire agent stack is containerized and deployed on the Nosana grid, showcasing the future of sovereign, personal AI that lives and breathes on decentralized compute infrastructure.

---

## ✨ Features

- 🕵️‍♂️ **Archetype Analysis:** Sarcastic persona designed for the Solana community.
- 🎓 **DeFi Literacy:** Bridges the gap between meme culture and serious trading education.
- 🚀 **Nosana Native:** Fully integrated with Nosana's Qwen3.5-27B-AWQ-4bit hosted inference.
- 🤖 **ElizaOS v2 Framework:** Built using the latest state-of-the-art agentic framework.

---

## 🛠️ Quick Start

### Local Development
```bash
# Clone and Install
git clone https://github.com/tprk33271/nosana-wallet-oracle.git
cd nosana-wallet-oracle
pnpm install

# Configure
cp .env.example .env
# Fill in your Nosana Endpoint details in .env

# Run
pnpm start
```

### Deployment on Nosana
```bash
# Build and Push
docker build -t your-username/nosana-eliza-agent:latest .
docker push your-username/nosana-eliza-agent:latest

# Deploy Job
nosana job post --file nos_job_def/nosana_eliza_job_definition.json --market nvidia-3090 --api <YOUR_API_KEY>
```

---

## 🧠 Project Structure
- `characters/agent.character.json`: The Wallet Oracle persona and model configuration.
- `nos_job_def/nosana_eliza_job_definition.json`: Official Nosana job configuration.
- `Dockerfile`: Optimized container build following the official challenge template.

---

## ✅ Submission Checklist
- [x] Forked repository
- [x] Deployed on Nosana (URL: [YOUR_URL_HERE])
- [x] Starred required Nosana repositories
- [x] Social media post shared
- [x] Video demo recorded (<1 min)

---
<div align="center">
  <i>Built with ElizaOS · Deployed on Nosana · 2026</i>
</div>
