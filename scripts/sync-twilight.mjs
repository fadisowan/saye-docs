// Reads the theme's twilight.json (read-only) and writes a trimmed, normalised copy to src/data/saye.json:
// the 17 settings groups with their settings, and the home blocks with their fields.
// The docs pages render their settings lists from that file, so the names, defaults and hints
// stay the theme's own. Run again after the theme changes:  npm run sync [-- path/to/twilight.json]
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const source = path.resolve(root, process.argv[2] ?? '../SAYERact/twilight.json');
const out = path.join(root, 'src/data/saye.json');
const theme = JSON.parse(fs.readFileSync(source, 'utf8'));

const ar = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v.ar ?? v.en ?? '' : v);
const text = (html) => String(html ?? '').replace(/<[^>]+>/g, '\n').split('\n').map((s) => s.trim()).filter(Boolean);

/** Keep only what the docs show: no icons, no inline styles, no internal keys. */
function field(f) {
  const item = {
    id: f.id,
    type: f.type,
    format: f.format,
    label: ar(f.label) ?? '',
  };
  if (f.source && f.source !== 'Manual') item.source = f.source;
  if (f.description) item.description = ar(f.description);
  if (f.options?.length) item.options = f.options.map((o) => ({ value: o.value, label: ar(o.label) }));
  if (f.type === 'boolean') item.default = Boolean(f.value ?? f.selected);
  else if (f.type === 'items' && f.selected?.length && !item.source) item.default = f.selected.map((o) => ar(o.label)).join('، ');
  else if (f.value !== undefined && f.value !== null && f.value !== '' && f.type !== 'static') item.default = ar(f.value);
  if (f.minimum !== undefined) item.min = f.minimum;
  if (f.maximum !== undefined) item.max = f.maximum;
  if (f.maxLength !== undefined && f.type !== 'items') item.maxLength = f.maxLength;
  if (f.multichoice) item.multi = true;
  if (f.multilanguage) item.multilanguage = true;
  if (f.conditions?.length) item.conditions = f.conditions.map((c) => ({ id: c.id, op: c.operation, value: c.value }));
  if (f.type === 'static') item.value = text(f.value).join(' ');
  if (f.fields?.length) item.fields = f.fields.map(field);
  return item;
}

const groups = [];
let intro = null;
for (const s of theme.settings) {
  if (s.type === 'static') {
    const lines = text(s.value);
    if (/^\d+\/\d+$/.test(lines[1] ?? '')) {
      groups.push({ id: s.id, title: lines[0], order: Number(lines[1].split('/')[0]), summary: lines[2] ?? '', scope: lines[3] ?? '', settings: [] });
    } else intro = { id: s.id, lines };
    continue;
  }
  if (!groups.length) continue;
  groups.at(-1).settings.push(field(s));
}

const components = theme.components.map((c) => ({
  path: c.path,
  title: ar(c.title),
  titleEn: c.title?.en ?? '',
  fields: (c.fields ?? []).map(field),
}));

const data = {
  name: ar(theme.name),
  nameEn: theme.name?.en ?? '',
  description: ar(theme.description),
  features: theme.features ?? [],
  intro,
  groups,
  components,
};
fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log(`كُتب ${path.relative(root, out)}: ${groups.length} مجموعة إعدادات (${groups.reduce((n, g) => n + g.settings.length, 0)} إعداداً)، و${components.length} قسماً للرئيسية.`);
