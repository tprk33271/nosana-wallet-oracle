/**
 * Comprehensive Verification Script for Wallet Fortune & Meme Generator
 */

const extractSolanaAddress = (text: string): string | null => {
  // Relax regex to find potential addresses anywhere in text
  const solanaAddressRegex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
  const matches = text.match(solanaAddressRegex);
  
  if (!matches) return null;

  // Filter for common Solana address characteristics (e.g., usually start with something other than a specific pattern if needed, but here we just take the first one that fits length)
  return matches[0];
};

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
  const sum = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return profiles[sum % profiles.length];
};

const testWallets = [
  { name: "Normal Wallet", input: "Check this out: Gv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u8v9w0x1y2z" },
  { name: "Wallet at Start", input: "Gv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u8v9w0x1y2z is my bag" },
  { name: "No Wallet", input: "I have no money, only dreams." },
  { name: "Invalid Wallet", input: "Address: 0x1234...abcd (oops, that's Ethereum!)" },
  { name: "Short Address", input: "Address: 12345" },
  { name: "Multiple Addresses", input: "Between Gv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u8v9w0x1y2z and 8v9w0x1y2zGv8SdqH6XyF7p89zL2kM1nP3q4R5s6t7u" }
];

console.log("=== Wallet Oracle Logic Stress Test ===\n");

testWallets.forEach((test, index) => {
  console.log(`Test ${index + 1}: ${test.name}`);
  console.log(`Input: "${test.input}"`);

  const address = extractSolanaAddress(test.input);
  if (address) {
    const profile = getProfileFromAddress(address);
    console.log(`✅ Success! Address: ${address}`);
    console.log(`🎭 Profile: ${profile}`);
    console.log(`🖼️ Meme URL: https://placehold.co/600x400?text=MEME+FOR+${encodeURIComponent(profile)}`);
  } else {
    console.log(`❌ Failed! No valid Solana address found.`);
  }
  console.log("-".repeat(40));
});

console.log("\n🚀 Verification Completed! Edge cases analyzed.");
