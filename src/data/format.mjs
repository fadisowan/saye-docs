// Turns a setting from src/data/saye.json into the short Arabic lines the docs show under its name.
const sources = { products: 'اختيار منتجات من متجرك', categories: 'اختيار تصنيفات من متجرك', brands: 'اختيار ماركات من متجرك' };

export function typeLabel(f) {
  if (f.source) return sources[f.source] ?? 'اختيار من متجرك';
  switch (`${f.type}/${f.format}`) {
    case 'boolean/switch': return 'مفتاح تشغيل';
    case 'items/dropdown-list': return f.multi ? 'قائمة (أكثر من خيار)' : 'قائمة منسدلة';
    case 'items/variable-list': return 'رابط من متجرك أو رابط خارجي';
    case 'string/color': return 'لون';
    case 'string/image': return 'صورة';
    case 'string/textarea': return 'نص طويل';
    case 'string/url': return 'رابط';
    case 'string/text': return 'نص';
    case 'number/integer': return 'رقم';
    case 'collection/collection': return 'قائمة عناصر تضيفها';
    default: return f.type;
  }
}

export function defaultLabel(f) {
  if (f.type === 'boolean') return f.default ? 'مفعّل' : 'مطفأ';
  if (f.default === undefined || f.default === '') return null;
  return String(f.default);
}

export function rangeLabel(f) {
  const bits = [];
  if (f.min !== undefined && f.max !== undefined) bits.push(`من ${f.min} إلى ${f.max}`);
  if (f.type === 'collection' && f.maxLength) bits.push(`حتى ${f.maxLength} عناصر`);
  else if (f.maxLength) bits.push(`حتى ${f.maxLength} حرفاً`);
  if (f.multilanguage) bits.push('بالعربية والإنجليزية');
  return bits.join(' · ') || null;
}

/** «يظهر حين …» from the field's conditions, with the other field's name and option label in Arabic. */
export function conditionLabel(f, siblings) {
  if (!f.conditions?.length) return null;
  return f.conditions
    .map((c) => {
      const other = siblings.find((s) => s.id === c.id);
      const name = other?.label ?? c.id;
      let value = c.value;
      if (other?.type === 'boolean' || typeof value === 'boolean') value = value ? 'مفعّل' : 'مطفأ';
      else if (other?.options) value = other.options.find((o) => o.value === c.value)?.label ?? c.value;
      const op = c.op === '!=' ? 'ليس' : 'هو';
      return `«${name}» ${op} «${value}»`;
    })
    .join('، و');
}
