// Look comparison only: copy here is placeholder until Emmanuel writes his own.
export const intro = {
  name: "Emmanuel Chucks",
  line: "Product software across mobile, backend, AI, and devtools.",
  place: "Accra, Ghana",
};

export const contact = [
  { label: "Email", href: "mailto:hi@emmanuelchucks.com" },
  { label: "GitHub", href: "https://github.com/emmanuelchucks" },
  { label: "X", href: "https://x.com/emmanuelchucks" },
];

export type Work = {
  title: string;
  kind: string;
  text: string;
  media: "phone" | "mac" | null;
  mediaLabel?: string;
};

export const work: Work[] = [
  {
    title: "Celedom staff chat",
    kind: "iOS, Android · Cloudflare",
    text: "Celedom's internal chat for its staff, with an assistant built in.",
    media: "phone",
    mediaLabel: "Recording: the chat and its assistant",
  },
  {
    title: "Celebrant and Vendors",
    kind: "iOS, Android",
    text: "Celedom's events marketplace, as two mobile apps.",
    media: "phone",
    mediaLabel: "Screens: Celebrant and Vendors",
  },
  {
    title: "GroqDictate",
    kind: "macOS, iPhone",
    text: "Press Right ⌘, speak, and the text lands where you were working. On iPhone, recordings are kept in five-minute pieces so nothing is lost before it's transcribed.",
    media: "mac",
    mediaLabel: "Recording: GroqDictate in use",
  },
  {
    title: "DataMeter",
    kind: "macOS",
    text: "Shows how much network data each app on your Mac uses, kept locally.",
    media: "mac",
    mediaLabel: "Screen: the DataMeter dashboard",
  },
];

export const next = "Next: calls and shared agent sessions, inside the terminal.";

export const earlier = [
  {
    title: "patchmarks.nvim",
    text: "Git review notes in Neovim",
    href: "https://github.com/emmanuelchucks/patchmarks.nvim",
  },
  {
    title: "react-native-zoom-toolkit",
    text: "Pinch to zoom for React Native",
    href: "https://github.com/emmanuelchucks/react-native-zoom-toolkit",
  },
];

export const article = {
  title: "I reluctantly ragecoded my own dictation app",
  text: "Why I left Superwhisper and built GroqDictate.",
};

export const concepts = [
  { slug: "lit", name: "Lit wall" },
  { slug: "lit-1", name: "Lit wall, saved" },
  { slug: "tiles", name: "Tiles" },
  { slug: "drafting", name: "Drafting table" },
  { slug: "sheet", name: "Sheet on a desk" },
  { slug: "light", name: "Slow light" },
];

// Faint paper grain: SVG noise, tiled. Its alpha is the grain.
export const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
