import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import data from './src/data/saye.json' with { type: 'json' };
import { groupSlugs, componentSlugs, movedPages } from './src/data/slugs.mjs';

// Settings groups in the editor's order, under the headings the theme uses for them (sy_guide).
const settingsSections = [
  ['الهوية', ['sy_t_identity', 'sy_t_type', 'sy_t_brand']],
  ['أعلى الصفحة', ['sy_t_announce', 'sy_t_header', 'sy_t_menu']],
  ['المنتجات', ['sy_t_card', 'sy_t_blocks', 'sy_t_nav']],
  ['الصفحات', ['sy_t_product', 'sy_t_product_more', 'sy_t_inner', 'sy_t_pages', 'sy_t_404']],
  ['السلة', ['sy_t_cart', 'sy_t_added']],
  ['اللمسات والحركة', ['sy_t_mascot', 'sy_t_whatsapp', 'sy_t_welcome', 'sy_t_motion', 'sy_t_fx']],
  ['أسفل الصفحة', ['sy_t_footer']],
];
const listed = settingsSections.flatMap(([, ids]) => ids);
const missing = data.groups.map((g) => g.id).filter((id) => !listed.includes(id));
if (missing.length) throw new Error(`مجموعات بلا مكان في القائمة الجانبية: ${missing.join('، ')}`);
const groupTitle = (id) => data.groups.find((g) => g.id === id).title;

const shortTitle = (c) => c.title.replace(/^ساي · /, '');
const blockItem = (c) => ({ label: shortTitle(c), slug: `components/${componentSlugs[c.path]}` });
const sayeBlocks = data.components.filter((c) => c.path.startsWith('home.saye-') || c.path === 'home.brands' || c.path === 'home.custom-testimonials');
const sallaBlocks = data.components.filter((c) => !sayeBlocks.includes(c));

export default defineConfig({
  site: 'https://fadisowan.github.io',
  base: '/saye-docs',
  trailingSlash: 'always',
  redirects: Object.fromEntries(Object.entries(movedPages).map(([from, to]) => [`/${from}/`, `/saye-docs/${to}/`])),
  integrations: [
    starlight({
      title: 'دليل ساي',
      description: 'التوثيق العربي لثيم «ساي» على منصة سلة: الإعدادات العامة، وأقسام الصفحة الرئيسية، وأشكال البطاقة.',
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: { root: { label: 'العربية', lang: 'ar', dir: 'rtl' } },
      customCss: ['./src/styles/custom.css'],
      components: { Head: './src/components/Head.astro' },
      sidebar: [
        { label: 'الرئيسية', link: '/' },
        {
          label: 'البداية',
          items: [
            { label: 'ابدأ هنا', slug: 'docs/start' },
            { label: 'الشعار', slug: 'docs/logo' },
            { label: 'أشكال بطاقة المنتج', slug: 'docs/card-styles' },
            { label: 'الخيارات المشتركة بين الأقسام', slug: 'docs/shared' },
          ],
        },
        {
          label: 'الإعدادات العامة',
          collapsed: true,
          items: [
            { label: 'كل المجموعات', slug: 'settings' },
            ...settingsSections.map(([label, ids]) => ({
              label,
              collapsed: true,
              items: ids.map((id) => ({ label: groupTitle(id), slug: `settings/${groupSlugs[id]}` })),
            })),
          ],
        },
        {
          label: 'أقسام الصفحة الرئيسية',
          collapsed: true,
          items: [
            { label: 'كل الأقسام', slug: 'components' },
            { label: `أقسام ساي (${sayeBlocks.length})`, collapsed: true, items: sayeBlocks.map(blockItem) },
            { label: `أقسام سلة الأساسية (${sallaBlocks.length})`, collapsed: true, items: sallaBlocks.map(blockItem) },
          ],
        },
        {
          label: 'المساعدة',
          items: [
            { label: 'الأسئلة الشائعة', slug: 'docs/faq' },
            { label: 'جديد التوثيق', slug: 'docs/updates' },
            { label: 'حالة الصور والمعاينات', slug: 'docs/preview-status' },
          ],
        },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagination: true,
      lastUpdated: false,
      disable404Route: false,
    }),
  ],
});
