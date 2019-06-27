module.exports = {
  title: 'Rise of the Raptors',
  description: 'Infographics on the Toronto Raptors\' path to a championship',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Art', link: '/art/' },
      { text: 'Work', link: '/work/' },
      { text: 'LinkedIn', link: 'https://www.linkedin.com', external: true },
    ]
  },
  head: [
    ['link', { rel: 'icon', href: `/icons/icon.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/icon.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/icon.png', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/icon.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['link', { rel: 'stylesheet', href: `https://fonts.googleapis.com/css?family=Bungee+Shade|Open+Sans:400&display=swap` }],
  ],
  dest: 'dist'
}
