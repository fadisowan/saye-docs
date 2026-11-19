// Page addresses for the settings groups and the home blocks. The key is the theme's own id
// (the group's title id in twilight.json, or the block's path); the value is the page under /settings/ or /components/.
export const groupSlugs = {
  sy_t_identity: '01-colors',
  sy_t_type: '02-type',
  sy_t_announce: '03-announcement',
  sy_t_header: '04-header',
  sy_t_menu: '05-menu',
  sy_t_nav: '06-navigation',
  sy_t_card: '07-card',
  sy_t_product: '08-product',
  sy_t_inner: '09-inner-pages',
  sy_t_cart: '10-cart',
  sy_t_mascot: '11-mascot',
  sy_t_whatsapp: '12-whatsapp',
  sy_t_motion: '13-motion',
  sy_t_fx: '14-effects',
  sy_t_welcome: '15-welcome',
  sy_t_footer: '16-footer',
  sy_t_404: '17-not-found',
};

export const componentSlugs = {
  'home.saye-hero': '01-hero',
  'home.saye-marquee': '02-marquee',
  'home.saye-story': '03-story',
  'home.saye-collections': '04-collections',
  'home.saye-new-season': '05-new-season',
  'home.saye-rail': '06-rail',
  'home.saye-moments': '07-moments',
  'home.saye-night-edit': '08-night-edit',
  'home.saye-stories': '09-stories',
  'home.saye-journal': '10-journal',
  'home.saye-perks': '11-perks',
  'home.saye-flash-sale': '12-flash-sale',
  'home.saye-promo-banners': '13-promo-banners',
  'home.saye-faq': '14-faq',
  'home.saye-order-tracking': '15-order-tracking',
  'home.saye-testimonials': '16-testimonials',
  'home.saye-limited-drop': '17-limited-drop',
  'home.saye-shop-by-occasion': '18-shop-by-occasion',
  'home.saye-shop-the-look': '19-shop-the-look',
  'home.saye-size-finder': '20-size-finder',
  'home.saye-loyalty-club': '21-loyalty-club',
  'home.saye-abaya-quiz': '22-quiz',
  'home.saye-jewelry-vitrine': '23-vitrine',
  'home.saye-instagram-shop': '24-instagram-shop',
  'home.saye-perfume-bar': '25-perfume-bar',
  'home.saye-branches': '26-branches',
  'home.brands': '27-brands',
  'home.custom-testimonials': '28-custom-testimonials',
};

export const base = '/saye-docs';
export const groupHref = (id) => `${base}/settings/${groupSlugs[id]}/`;
export const componentHref = (path) => `${base}/components/${componentSlugs[path]}/`;
