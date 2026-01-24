import gpus from './data/gpus.json'
import games from './data/games.json'
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
                const routes: string[] = []
                // Loop through JSON data to generate pages
                games.forEach((game) => {
                    gpus.forEach((gpu) => {
                        routes.push(`/optimize/${game.slug}/${gpu.slug}`)
                    })
                })
                return routes
            })()
        }
    }
})