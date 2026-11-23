// Checks the built site: every expected page exists, and every internal link and image in it
// points to a file in dist/. Run after `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { groupSlugs, componentSlugs, movedPages } from '../src/data/slugs.mjs';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = '/saye-docs/';
const pages = [
  '', 'docs/start/', 'docs/logo/', 'docs/card-styles/', 'docs/shared/', 'docs/faq/', 'docs/updates/', 'docs/preview-status/',
  'settings/', ...Object.values(groupSlugs).map((s) => `settings/${s}/`),
  'components/', ...Object.values(componentSlugs).map((s) => `components/${s}/`),
  ...Object.keys(movedPages).map((s) => `${s}/`),
];
const problems = [];

for (const page of pages) {
  if (!fs.existsSync(path.join(dist, page, 'index.html'))) problems.push(`صفحة ناقصة: ${page || '/'}`);
}

// GitHub Pages serves only <root>/404.html for a wrong address; without it the visitor gets GitHub's English page.
const notFound = path.join(dist, '404.html');
if (!fs.existsSync(notFound)) problems.push('صفحة ناقصة: 404.html (صفحة الرابط الخاطئ)');
else if (!/<html[^>]*lang="ar"/.test(fs.readFileSync(notFound, 'utf8'))) problems.push('404.html ليست صفحة الدليل العربية');

const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
})(dist);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    if (!url.startsWith(base)) continue;
    const rel = decodeURI(url.slice(base.length));
    const target = path.join(dist, rel);
    const ok = fs.existsSync(target) && (fs.statSync(target).isFile() || fs.existsSync(path.join(target, 'index.html')));
    if (!ok) problems.push(`رابط مكسور في ${path.relative(dist, file)}: ${url}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`البناء سليم: ${pages.length} صفحة متوقعة، و${htmlFiles.length} ملف HTML بلا روابط داخلية مكسورة.`);
