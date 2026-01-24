import type { GPU } from '../server/data/gpus'
import type { Game } from '../server/data/games'

export const useOptimization = (gpu: GPU, game: Game) => {
    let settings = 'Low'
    let fps = 30
    let badgeColor = 'text-red-500' // Tailwind class
    let description = 'Struggling to run.'

    // Logic: Check thresholds
    if (gpu.score >= game.requirements.ultra) {
        settings = 'Ultra'
        fps = 80
        badgeColor = 'text-green-400'
        description = 'Excellent performance. You can max out all settings.'
    } else if (gpu.score >= game.requirements.high) {
        settings = 'High'
        fps = 60
        badgeColor = 'text-green-500'
        description = 'Great performance. Ideal for 1080p gaming.'
    } else if (gpu.score >= game.requirements.med) {
        settings = 'Medium'
        fps = 45
        badgeColor = 'text-yellow-400'
        description = 'Playable experience. You may need to lower shadows.'
    } else if (gpu.score >= game.requirements.low) {
        settings = 'Low'
        fps = 30
        badgeColor = 'text-orange-400'
        description = 'Playable but with compromised visuals.'
    }

    // VRAM Logic
    const vramWarning = (gpu.vram < 8 && settings === 'Ultra')
        ? `Note: ${game.name} prefers 8GB+ VRAM for Ultra textures. You have ${gpu.vram}GB.`
        : null

    return { settings, fps, badgeColor, description, vramWarning }
}