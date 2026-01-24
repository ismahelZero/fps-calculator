import { fileURLToPath } from 'url'

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],

    // Explicitly define the alias
    alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
        'images': fileURLToPath(new URL('./assets/images', import.meta.url))
    },

    typescript: {
        strict: true,
        tsConfig: {
            compilerOptions: {
                baseUrl: '.',
                paths: {
                    "@/*": ["./*"],
                    "~/*": ["./*"]
                }
            }
        }
    },

    nitro: {
        prerender: {
            routes: (() => {
                // We need to import the data here for the config
                // Note: In nuxt.config, we use relative paths because aliases
                // sometimes don't apply inside the config file itself yet.
                const { gpus } = require('./server/data/gpus.ts') // or relative path
                const { games } = require('./server/data/games.ts')

                const routes: string[] = []
                games.forEach((game: any) => {
                    gpus.forEach((gpu: any) => {
                        routes.push(`/optimize/${game.slug}/${gpu.slug}`)
                    })
                })
                return routes
            })()
        }
    }
})