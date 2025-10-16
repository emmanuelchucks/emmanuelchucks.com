const prefersDark = globalThis.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
const color = prefersDark ? "white" : "black";
console.log(
  "%c" + atob("ZW1tYW51ZWxjaHVja3MuY29t"),
  `color:${color};font-size:16px;font-weight:900;text-shadow:2px 2px 5px rgba(0,0,0,0.1);`,
);
