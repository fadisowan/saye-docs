// Checks every text/background pair the docs use against WCAG AA (4.5:1), in light and dark.
// The values are the ones in src/styles/custom.css (and the Starlight roles they feed).
const pairs = {
  dark: {
    'text on page': ['#dcd2c3', '#13110e'],
    'heading on page': ['#f3ece1', '#13110e'],
    'muted on page': ['#a59a8a', '#13110e'],
    'muted on card': ['#a59a8a', '#1b1814'],
    'link (accent-high) on page': ['#ecc3a3', '#13110e'],
    'link on card': ['#ecc3a3', '#1b1814'],
    'chip text on accent-low': ['#ecc3a3', '#3a2416'],
    'gold on page': ['#d2b073', '#13110e'],
    'gold on card': ['#d2b073', '#1b1814'],
    'accent on page (eyebrow uses text-accent)': ['#d08a5e', '#13110e'],
    'button text on accent-high (Starlight primary)': ['#3a2416', '#ecc3a3'],
    'code on inline-code bg': ['#dcd2c3', '#25211b'],
    'sidebar text on nav': ['#dcd2c3', '#1b1814'],
  },
  light: {
    'text on page': ['#3b342b', '#efe9df'],
    'heading on page': ['#17130f', '#efe9df'],
    'muted on page': ['#685e51', '#efe9df'],
    'muted on card': ['#685e51', '#f8f4ec'],
    'muted on sf2 (image slot)': ['#3b342b', '#ebe3d6'],
    'link (accent) on page': ['#8d5230', '#efe9df'],
    'link on card': ['#8d5230', '#f8f4ec'],
    'chip text on accent-low': ['#5f3519', '#ecdccb'],
    'gold on page': ['#7a5a26', '#efe9df'],
    'gold on card': ['#7a5a26', '#f8f4ec'],
    'theme gold #a57f43 on page (not used for text)': ['#a57f43', '#efe9df'],
    'button text on accent (Starlight primary)': ['#efe9df', '#8d5230'],
    'code on inline-code bg': ['#3b342b', '#e5dccd'],
    'sidebar text on nav': ['#3b342b', '#f8f4ec'],
  },
  fixed: {
    'hero title on deep': ['#f3ece1', '#17130f'],
    'hero tagline on deep': ['#cfc4b3', '#17130f'],
    'footer link gold on deep': ['#e3c48d', '#17130f'],
    'hero primary button': ['#17130f', '#e3c48d'],
  },
};
const lum = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
let failed = 0;
for (const [mode, list] of Object.entries(pairs)) {
  for (const [name, [fg, bg]] of Object.entries(list)) {
    const r = ratio(fg, bg);
    const info = name.includes('not used') ? ' (معلومة فقط)' : '';
    const ok = r >= 4.5 || info;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${mode.padEnd(5)} ${r.toFixed(2).padStart(5)}  ${name}${info}`);
  }
}
process.exit(failed ? 1 : 0);
