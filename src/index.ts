/**
 * Wallet Fortune & Meme Generator Agent Plugin
 *
 * Analyzes Solana wallets and generates humorous meme images based on trading behavior.
 * Mock implementation for prototype purposes.
 */

import { type Action, type Plugin, type Memory, type State, type HandlerCallback, type IAgentRuntime } from "@elizaos/core";

/**
 * Action: ANALYZE_WALLET
 * Analyzes a Solana wallet address for meme trading patterns.
 */
const analyzeWalletAction: Action = {
  name: "ANALYZE_WALLET",
  description: "Analyze a Solana wallet address for meme trading patterns.",
  similes: ["CHECK_WALLET", "WALLET_FORTUNE", "SOLANA_ANALYSIS"],
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    // Basic validation: message should contain something that looks like a Solana address
    const text = (message.content as any).text || "";
    const solanaAddressRegex = /[1-9A-HJ-NP-Za-km-z]{32,44}/;
    return solanaAddressRegex.test(text);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    const text = (message.content as any).text || "";
    const solanaAddressRegex = /[1-9A-HJ-NP-Za-km-z]{32,44}/;
    const match = text.match(solanaAddressRegex);
    const address = match ? match[0] : "Unknown";

    // Simulated profiles based on last character of address
    const profiles = [
      "Paper Hands Degenerate (Sold early, missed 100x)",
      "Diamond Hands Legend (Held through -99% to victory)",
      "Meme Coin Hunter (Only buys tokens with cat/dog names)",
      "Rug Pull Survivor (Expert at spotting red flags)",
      "Solana Whale (Actually has 0.1 SOL but thinks they are rich)",
      "The 1000x Sniper (Snipes the absolute bottom, sells at peak)",
      "Institutional Whale (Market moves when you breathe)",
      "Alpha Caller (Your signals are 100% accurate)",
      "Solana Chad (Built differently, never loses a trade)"
    ];
    const profileIndex = address.charCodeAt(address.length - 1) % profiles.length;
    const profile = profiles[profileIndex];

    const response = `Analyzing Solana wallet: ${address}...\nProfile: ${profile}`;

    if (callback) {
      callback({
        text: response,
        content: { address, profile, success: true }
      });
    }

    return true;
  },
  examples: [
    [
      { user: "{{user1}}", content: { text: "Analyze this wallet: Gv8S...1234" } },
      { user: "{{user2}}", content: { text: "Analyzing Solana wallet: Gv8S...1234...\nProfile: Paper Hands Degenerate", action: "ANALYZE_WALLET" } }
    ]
  ]
};

/**
 * Action: GENERATE_MEME
 * Mock image generation action for meme images.
 */
const generateMemeAction: Action = {
  name: "GENERATE_MEME",
  description: "Generate a humorous meme image based on a wallet's trading behavior.",
  similes: ["CREATE_MEME", "MEME_GEN", "MAKE_FUNNY_IMAGE"],
  validate: async () => true,
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    const profile = (state as any).lastAnalyzedProfile || "Degenerate";
    const response = `[MOCK IMAGE GENERATION] 🖼️ Generating a meme for profile: ${profile}...\n(Image link placeholder: https://placehold.co/600x400?text=MEME+FOR+${profile.replace(/\s+/g, '+')})`;

    if (callback) {
      callback({
        text: response,
        content: { success: true, imageUrl: `https://placehold.co/600x400?text=MEME+FOR+${profile.replace(/\s+/g, '+')}` }
      });
    }

    return true;
  },
  examples: [
    [
      { user: "{{user1}}", content: { text: "Generate a meme for my fortune" } },
      { user: "{{user2}}", content: { text: "[MOCK IMAGE GENERATION] 🖼️ Generating a meme...", action: "GENERATE_MEME" } }
    ]
  ]
};

/**
 * The Custom Plugin
 */
export const customPlugin: Plugin = {
  name: "wallet-fortune-meme-plugin",
  description: "Analyzes Solana wallets and generates funny memes.",
  actions: [analyzeWalletAction, generateMemeAction],
  providers: [],
  evaluators: [],
};

export default customPlugin;
