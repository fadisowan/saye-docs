import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://fadisowan.github.io',
  base: '/saye-docs',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'دليل ساي',
      description: 'التوثيق العربي لثيم «ساي» على منصة سلة: التثبيت، والإعدادات العامة، وأقسام الصفحة الرئيسية.',
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: { root: { label: 'العربية', lang: 'ar', dir: 'rtl' } },
      customCss: ['./src/styles/custom.css'],
      components: { Head: './src/components/Head.astro' },
      sidebar: [
        { label: 'الرئيسية', link: '/' },
        { label: 'ابدأ هنا: التثبيت والتفعيل', slug: 'docs/start' },
        { label: 'الخيارات المشتركة بين الأقسام', slug: 'docs/shared' },
        { label: 'الإعدادات العامة', collapsed: false, items: [{ autogenerate: { directory: 'settings' } }] },
        { label: 'أقسام الصفحة الرئيسية', collapsed: true, items: [{ autogenerate: { directory: 'components' } }] },
        { label: 'الأسئلة الشائعة', slug: 'docs/faq' },
        { label: 'جديد التوثيق', slug: 'docs/updates' },
        { label: 'حالة الصور والمعاينات', slug: 'docs/preview-status' },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagination: true,
      lastUpdated: false,
      disable404Route: true,
    }),
  ],
});
