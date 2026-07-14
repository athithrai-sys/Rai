// One-off generator for placeholder listing artwork (public/listings/*.svg).
// These stand in until real photos are uploaded to Supabase Storage.
// Run with: node scripts/generate-placeholders.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const items = [
  ["bosch-accuboormachine", "🛠️", "Accuboormachine"],
  ["karcher-hogedrukreiniger", "💦", "Hogedrukreiniger"],
  ["partytent", "⛺", "Partytent"],
  ["ps4-controller", "🎮", "PS4 controller"],
  ["ladder", "🪜", "Ladder"],
  ["elektrische-gitaar", "🎸", "Elektrische gitaar"],
  ["grasmaaier", "🌱", "Grasmaaier"],
  ["heggenschaar", "✂️", "Heggenschaar"],
  ["nintendo-switch", "🕹️", "Nintendo Switch"],
  ["saxofoon", "🎷", "Saxofoon"],
  ["zitzak", "🛋️", "Zitzak"],
  ["klaptafel-stoelen", "🪑", "Klaptafel"],
  ["vouwfiets", "🚲", "Vouwfiets"],
];

// Soft, warm gradients that sit well on the white cards
const palettes = [
  ["#FDE7D2", "#F6C79B"],
  ["#E9F4E4", "#C4E3C1"],
  ["#EFE9FA", "#D3C6F1"],
  ["#FEF3DD", "#F7DA9A"],
];

const outDir = join(import.meta.dirname, "..", "public", "listings");
mkdirSync(outDir, { recursive: true });

items.forEach(([slug, emoji, label], i) => {
  const [from, to] = palettes[i % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="400" cy="265" r="150" fill="#ffffff" opacity="0.55"/>
  <text x="400" y="330" font-size="170" text-anchor="middle">${emoji}</text>
  <text x="400" y="520" font-family="Poppins, sans-serif" font-size="34" font-weight="600" fill="#26201b" opacity="0.55" text-anchor="middle">${label}</text>
</svg>
`;
  writeFileSync(join(outDir, `${slug}.svg`), svg);
  console.log(`wrote ${slug}.svg`);
});
