# Post ideas

The blog should work as technical proof, not content marketing. Best posts are short, specific, and show taste: what broke, what I tried, what shipped, and what I would do differently.

## Near-term drafts

1. **You're not thinking agentically enough**
   - Practical notes on treating agents as coworkers, not autocomplete.
   - Show concrete loops: planning, verification, browser work, tests, handoff notes.
   - Keep the tone grounded; avoid AI hype.

2. **I reluctantly ragecoded my own dictation app**
   - Story behind GroqDictate.
   - Cover the real constraint: existing tools were either too slow, too heavy, or not shaped for the way I work.
   - Include macOS menu bar app details, Groq Whisper, clipboard/keyboard flow, and tradeoffs.

3. **Drizzle, Expo SQLite, and local-first mobile notes**
   - Use `drizzle-expo-sqlite` as the artifact.
   - Explain schema, migrations, local-first shape, and the rough edges.

4. **File-oriented code review notes in Neovim**
   - Use `patchmarks.nvim` as the artifact.
   - Explain why file-level annotations help when reviewing patches with humans or agents.

5. **Generating link previews on Cloudflare Workers**
   - Expand the existing post from a demo into a clearer technical proof piece.
   - Cover Hono, validation, metadata fetching, rendering, and cache boundaries.

## Publishing rule

Each post should answer:

- What was the problem?
- What did I build or change?
- What were the constraints?
- What did I learn?
- Where is the code/demo?

Short and useful beats long and polished.
