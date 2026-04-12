# Spec: Wallet Fortune & Meme Generator Agent

## Objective
Create a "Masterpiece" ElizaOS plugin that:
1. **Wallet Analysis Action**: Receives a Solana wallet address and simulates behavioral analysis (e.g., "Meme Coin Degenerate," "Paper Hands," "Diamond Hands").
2. **Meme Image Generator Action**: A mock action that "generates" a humorous meme image based on the wallet's behavioral profile.
3. **Deployment Optimization**: Provide a `Dockerfile.nosana` optimized for Linux/amd64 GPU environments on the Nosana network.

## Tech Stack
- **Framework**: ElizaOS Core (`@elizaos/core`)
- **Runtime**: Node.js / Bun (cloned repo uses Bun lockfile)
- **Language**: TypeScript
- **Infrastructure**: Docker (Nosana GPU compatible)

## Commands
- **Install Dependencies**: `bun install`
- **Build Agent**: `bun run build` (if defined in future)
- **Start Agent**: `bun run start` (or `npm run start`)
- **Nosana Job Definition**: `nosana-cli job submit --file nos_job_def/nosana_eliza_job_definition.json` (example)

## Project Structure
- `src/src/index.ts`: Custom plugin entry point with two actions (`ANALYZE_WALLET`, `GENERATE_MEME`).
- `src/Dockerfile.nosana`: Optimized Dockerfile for GPU-enabled Nosana nodes.

## Code Style (Action Example)
```typescript
const analyzeWalletAction = {
  name: "ANALYZE_WALLET",
  description: "Analyze a Solana wallet address for meme trading patterns.",
  handler: async (runtime, message) => {
    // Simulated logic: check text for Solana address
    const solAddress = extractSolAddress(message.content.text);
    const profile = simulateProfile(solAddress);
    return { status: "success", profile };
  }
};
```

## Testing Strategy
- **Manual Verification**: Run the agent locally and trigger actions via prompt.
- **Unit Tests**: Add basic tests for wallet address extraction and profile simulation logic.

## Boundaries
- **Always**: Follow ElizaOS plugin patterns.
- **Ask First**: If real on-chain integration (Solana Web3.js) is required instead of mock logic.
- **Never**: Commit real API keys for OpenAI/Anthropic/Nosana.

## Success Criteria
1. `src/src/index.ts` contains `customPlugin` with `ANALYZE_WALLET` and `GENERATE_MEME` actions.
2. `src/Dockerfile.nosana` exists and uses an appropriate base image for Linux/amd64 GPU.
3. Code compiles and starts without errors (using mock responses).
