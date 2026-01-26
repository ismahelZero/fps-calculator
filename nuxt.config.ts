import gpus from './data/gpus.json'
import games from './data/games.json'
import { fileURLToPath } from 'url'

const sitemapGpus = gpus.filter(g => g.score >= 25)

export default defineNuxtConfig({
  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/sitemap'],

  // Explicitly define the alias
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./', import.meta.url)),
    images: fileURLToPath(new URL('./assets/images', import.meta.url))
  },

  googleFonts: {
    families: {
      Outfit: [300, 400, 600, 700, 900], // For Headlines
      Inter: [400, 500, 600] // For Body text
    },
    display: 'swap'
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@/*': ['./*'],
          '~/*': ['./*']
        }
      }
    }
  },

  site: {
    url: 'https://fpscalculator.vercel.app',
    name: 'MyFPS',
    description: 'PC Performance Calculator & Hardware component picker',
    defaultLocale: 'en'
  },

  sitemap: {
    enabled: true,
    sitemaps: true,

    urls: async () => {
      const routes = []

      games.forEach(game => {
        routes.push({
          loc: `/best-gpu-for-${game.slug}`,
          changefreq: 'weekly',
          priority: 1.0
        })
      })

      games.forEach(game => {
        sitemapGpus.forEach(gpu => {
          routes.push({
            loc: `/optimize/${game.slug}/${gpu.slug}`,
            changefreq: 'monthly',
            priority: 0.7
          })
        })
      })
      return routes
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/build', '/compare', '/what-can-i-play', '/sitemap.xml'],
      ignore: []
    }
  },

  compatibilityDate: '2024-11-18'
})
