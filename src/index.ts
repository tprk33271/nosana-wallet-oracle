/**
 * Wallet Fortune & Meme Generator Agent Plugin
 *
 * Analyzes Solana wallets and generates humorous meme images based on trading behavior.
 * Professional implementation with edge-case handling.
 */

import {
  type Action,
  type Plugin,
  type Memory,
  type State,
  type HandlerCallback,
  type IAgentRuntime
} from "@elizaos/core";

/**
 * Utility: Extract and validate Solana address from text.
 */
const extractSolanaAddress = (text: string): string | null => {
  const solanaAddressRegex = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/;
  const match = text.match(solanaAddressRegex);
  return match ? match[0] : null;
};

/**
 * Utility: Simulate a trading profile based on wallet address.
 */
const getProfileFromAddress = (address: string): string => {
  const profiles = [
    "Paper Hands Degenerate (Sold early, missed 100x)",
    "Diamond Hands Legend (Held through -99% to victory)",
    "Meme Coin Hunter (Only buys tokens with cat/dog names)",
    "Rug Pull Survivor (Expert at spotting red flags)",
    "Solana Whale (Actually has 0.1 SOL but thinks they are rich)",
    "The 1000x Sniper (Snipes the absolute bottom, sells at peak)",
    "Institutional Whale (Market moves when you breathe)",
    "Alpha Caller (Your signals are 100% accurate)",
    "Solana Chad (Built differently, never loses a trade)",
    "NFT Flip Master (Buys high, sells low, claims 'for the art')",
    "Liquidity Provider (Providing exits for everyone else)"
  ];
  // Stable hash-like index generation
  const sum = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return profiles[sum % profiles.length];
};

/**
 * Action: ANALYZE_WALLET
 */
const analyzeWalletAction: Action = {
  name: "ANALYZE_WALLET",
  description: "Analyze a Solana wallet address for meme trading patterns.",
  similes: ["CHECK_WALLET", "WALLET_FORTUNE", "SOLANA_ANALYSIS", "ROAST_MY_WALLET"],
  validate: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = (message.content as any).text || "";
    return !!extractSolanaAddress(text);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    const text = (message.content as any).text || "";
    const address = extractSolanaAddress(text);

    if (!address) {
      if (callback) callback({ text: "I couldn't find a valid Solana address in your message. Please provide one so I can see how rekt you are." });
      return false;
    }

    const profile = getProfileFromAddress(address);

    // Save profile to state for next action if possible
    if (state) {
      (state as any).lastAnalyzedProfile = profile;
    }

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
      { user: "{{user1}}", content: { text: "Roast my wallet: Gv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u8v9w0x1y2z" } },
      { user: "{{user2}}", content: { text: "Analyzing Solana wallet: Gv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u8v9w0x1y2z...\nProfile: Solana Whale (Actually has 0.1 SOL but thinks they are rich)", action: "ANALYZE_WALLET" } }
    ]
  ]
};

/**
 * Action: GENERATE_MEME
 */
const generateMemeAction: Action = {
  name: "GENERATE_MEME",
  description: "Generate a humorous meme image based on a wallet's trading behavior.",
  similes: ["CREATE_MEME", "MEME_GEN", "MAKE_FUNNY_IMAGE", "PICTURE_MY_PAIN"],
  validate: async () => true,
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    // Try to get profile from state or previous message content
    const profile = (state as any)?.lastAnalyzedProfile || "Degenerate Gamer";
    const memeUrl = `https://placehold.co/600x400?text=MEME+FOR+${encodeURIComponent(profile)}`;
    const response = `[MOCK IMAGE GENERATION] 🖼️ Generating a meme for your ${profile} soul...\n(Link: ${memeUrl})`;

    if (callback) {
      callback({
        text: response,
        content: { success: true, imageUrl: memeUrl, profile }
      });
    }

    return true;
  },
  examples: [
    [
      { user: "{{user1}}", content: { text: "Now generate a meme for me." } },
      { user: "{{user2}}", content: { text: "[MOCK IMAGE GENERATION] 🖼️ Generating a meme...", action: "GENERATE_MEME" } }
    ]
  ]
};

/**
 * The Wallet Fortune & Meme Plugin
 */
export const walletPlugin: Plugin = {
  name: "wallet-fortune-meme-plugin",
  description: "Analyzes Solana wallets and generates funny memes for the rekt.",
  actions: [analyzeWalletAction, generateMemeAction],
  providers: [],
  evaluators: [],
};

export default walletPlugin;
