# دليل ساي

موقع التوثيق العربي لثيم «ساي / SAYE» على منصة سلة. مبني بـ Astro Starlight (نفس أدوات «دليل كوتش» و«دليل لازورا»)، عربي من اليمين لليسار، وجاهز للنشر على GitHub Pages في:

`https://fadisowan.github.io/saye-docs/` (لم يُنشر بعد)

## البنية

```text
astro.config.mjs                 الرابط الأساسي /saye-docs، اللغة العربية، القائمة الجانبية
src/content/docs/index.mdx       الصفحة الأولى: الواجهة، والروابط، والمزايا
src/content/docs/docs/           ابدأ هنا، والشعار، وأشكال البطاقة، والخيارات المشتركة، والأسئلة، وجديد التوثيق، وحالة الصور
src/content/docs/settings/       صفحة لكل مجموعة من الإعدادات العامة (٢٢)
src/content/docs/components/     صفحة لكل قسم من أقسام الصفحة الرئيسية (٣٩)
src/data/saye.json               نسخة مختصرة من twilight.json الثيم (تُولَّد، لا تُعدَّل يدوياً)
src/data/slugs.mjs               عنوان صفحة كل مجموعة وكل قسم، والعناوين القديمة وتحويلها
src/components/                  قوائم الإعدادات والحقول، والفهارس، وشارة «يُكمل لاحقاً»، وإطار الصورة، ونافذة التكبير
src/styles/custom.css            هوية ساي: ألوان _tokens.scss في الفاتح والداكن، وخطوط التصميم، والحواف
scripts/sync-twilight.mjs        يقرأ twilight.json الثيم ويكتب src/data/saye.json
scripts/check-contrast.mjs       يفحص تباين كل زوج نص وخلفية (AA)
scripts/validate-build.mjs       بعد البناء: الصفحات موجودة ولا روابط داخلية مكسورة
images-todo.md                   الصور المنتظرة بأسمائها
.github/workflows/pages.yml      البناء والنشر على GitHub Pages مع كل دفع إلى main
```

## التشغيل

يحتاج Node 24. الإصدارات مثبّتة في `package-lock.json` (astro 7.3.8، و@astrojs/starlight 0.42.6)، فاستعمل `npm ci`.

```bash
npm ci
npm run sync       # بعد أي تغيير في twilight.json الثيم (المسار الافتراضي ../SAYERact/twilight.json)
npm run build
npm run validate
npm run contrast
npm run preview    # http://127.0.0.1:5395/saye-docs/
```

## الكتابة

- أسماء الإعدادات وأنواعها وقيمها الافتراضية وشرحها تُرسم من `src/data/saye.json`، فتبقى مطابقة للمحرّر. لا تكتبها يدوياً في الصفحات.
- الشرح مكتوب في ملف MDX كل صفحة. عند قسم أو مجموعة جديدة في الثيم: `npm run sync`، ثم أضف عنوانها في `src/data/slugs.mjs` (ومكانها في القائمة الجانبية في `astro.config.mjs` للمجموعات)، ثم صفحتها.
- إن تغيّر عنوان صفحة، أضف القديم إلى `movedPages` في `slugs.mjs` فيُحوَّل.
- الصور: ضع الملف في `src/assets/previews/` بالاسم المذكور في `images-todo.md`، ولا حاجة لتعديل أي صفحة.

## ما بقي

- روابط حقيقية بدل `#` في `src/content/docs/index.mdx` (متجر المعاينة، وصفحة الثيم في سلة، والدعم)، وكلها معلَّمة بـ `TODO` و`data-todo`.
- الصور (`images-todo.md`)، وجوابا الدعم والتحديثات في الأسئلة، ورقم إصدار الثيم في «جديد التوثيق».
- إنشاء المستودع على GitHub وتفعيل Pages (لم يُنشأ).
