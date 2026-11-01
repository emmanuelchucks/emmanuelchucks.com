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

export const looks = [
  { slug: "paper", name: "Paper", font: "Newsreader (serif)" },
  { slug: "instrument", name: "Instrument", font: "Geist (sans)" },
  { slug: "console", name: "Console", font: "JetBrains Mono" },
];
