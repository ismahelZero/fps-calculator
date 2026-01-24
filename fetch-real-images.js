// fetch-real-images.js
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

// --- CONFIGURATION ---
const API_KEY = 'd9476e821c6540a8a15d0cf94aa7247d'
const GAMES_FILE = './data/games.json'
const OUTPUT_DIR = './public/images/games'

// --- SETUP ---
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const games = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, GAMES_FILE), 'utf-8')
)

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// --- HELPERS ---
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const downloadImage = async url => {
  const response = await axios({ url, responseType: 'arraybuffer' })
  return Buffer.from(response.data)
}

// --- MAIN LOOP ---
const processGames = async () => {
  console.log(`🚀 Starting processing for ${games.length} games...`)

  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const slug = game.slug
    const ultraPath = path.join(OUTPUT_DIR, `${slug}-ultra.jpg`)
    const lowPath = path.join(OUTPUT_DIR, `${slug}-low.jpg`)

    // Skip if already exists
    if (fs.existsSync(ultraPath) && fs.existsSync(lowPath)) {
      console.log(`[${i + 1}/${games.length}] Skipping ${game.name} (Exists)`)
      continue
    }

    try {
      console.log(`[${i + 1}/${games.length}] Searching for: ${game.name}...`)

      const searchUrl = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(game.name)}&page_size=1`
      const res = await axios.get(searchUrl)

      if (!res.data.results || res.data.results.length === 0) {
        console.warn(`   ⚠️ No results found for ${game.name}`)
        continue
      }

      const imageUrl = res.data.results[0].background_image
      if (!imageUrl) continue

      const imageBuffer = await downloadImage(imageUrl)

      // 1. Save Ultra (Clean)
      await sharp(imageBuffer)
        .resize(800, 450, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(ultraPath)

      // 2. Save Low (Pixelated + Desaturated, Less Blur)
      await sharp(imageBuffer)
        .resize(400, 225, { fit: 'cover' }) // Step A: Shrink (Pixelate)
        .resize(800, 450, { fit: 'cover', kernel: 'nearest' }) // Step B: Scale back up
        .blur(1.5) // Reduced from 5 to 1.5 (Subtle softness)
        .modulate({ saturation: 0.6, brightness: 0.9 }) // Washed out look
        .jpeg({ quality: 40 }) // Compression artifacts
        .toFile(lowPath)

      console.log(`   ✅ Saved images for ${game.name}`)
      await sleep(1000)
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
    }
  }
  console.log('\n🎉 All Done! Visuals generated.')
}

processGames()
