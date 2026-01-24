import gpus from './data/gpus.json'
import games from './data/games.json'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
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
    name: 'MyFPS'
  },

  sitemap: {
    urls: async () => {
      return games.map(game => ({
        loc: `/best-gpu-for-${game.slug}`,
        changefreq: 'weekly',
        priority: 0.9
      }))
    }
  },

  nitro: {
    prerender: {
      routes: (() => {
        const routes: string[] = []

        games.forEach(game => {
          routes.push(`/best-gpu-for-${game.slug}`)
        })

        games.forEach(game => {
          gpus.forEach(gpu => {
            routes.push(`/optimize/${game.slug}/${gpu.slug}`)
          })
        })
        return routes
      })()
    }
  }
})
