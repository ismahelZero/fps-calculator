import { useAffiliate } from './useAffiliate'

export const useOptimization = (gpu: any, cpu: any, ram: number, game: any) => {
  const { getLink } = useAffiliate()

  let settings = 'Low'
  let fps = 30
  let badgeColor = 'text-error'
  let description = 'Struggling to run.'

  if (gpu.score >= game.requirements.gpu.ultra) {
    settings = 'Ultra'
    fps = 90
    badgeColor = 'text-success'
    description = 'Excellent performance. Max settings.'
  } else if (gpu.score >= game.requirements.gpu.high) {
    settings = 'High'
    fps = 60
    badgeColor = 'text-success'
    description = 'Great performance. Ideal for 1080p.'
  } else if (gpu.score >= game.requirements.gpu.med) {
    settings = 'Medium'
    fps = 45
    badgeColor = 'text-warning'
    description = 'Playable. Lower shadows/effects.'
  } else if (gpu.score >= game.requirements.gpu.low) {
    settings = 'Low'
    fps = 30
    badgeColor = 'text-error'
    description = 'Playable but with compromised visuals.'
  }

  let cpuBottleneck = 0
  let cpuStatus = 'Good'
  if (cpu) {
    if (cpu.score < game.requirements.cpu.rec) {
      const gap = game.requirements.cpu.rec - cpu.score
      cpuBottleneck = Math.min(Math.round(gap * 1.5), 50)
      cpuStatus = 'Bottleneck'
      fps = Math.floor(fps * (1 - cpuBottleneck / 100))
    }
  }

  const features = gpu.features || []
  let aiFps = fps
  let aiTechnology = null

  if (features.includes('frame_gen')) {
    aiFps = Math.floor(fps * 1.6)
    aiTechnology = 'DLSS 3'
  } else if (features.includes('dlss')) {
    aiFps = Math.floor(fps * 1.35)
    aiTechnology = 'DLSS 2'
  } else if (features.includes('fsr')) {
    aiFps = Math.floor(fps * 1.3)
    aiTechnology = 'FSR 2'
  }

  const ramStatus =
    ram < game.requirements.ram.min
      ? 'Critical'
      : ram < game.requirements.ram.rec
        ? 'Low'
        : 'Good'

  const vramWarning =
    gpu.vram < 8 && settings === 'Ultra'
      ? `Note: ${game.name} prefers 8GB+ VRAM. You have ${gpu.vram}GB.`
      : null

  const upgrades = []
  if (ram < game.requirements.ram.rec) {
    upgrades.push({
      type: 'RAM',
      title: `Upgrade to ${game.requirements.ram.rec}GB RAM`,
      reason: `You have ${ram}GB. This game runs best with ${game.requirements.ram.rec}GB.`,
      link: getLink(`${game.requirements.ram.rec}GB DDR4 RAM Kit`),
      btnText: `Find ${game.requirements.ram.rec}GB RAM`
    })
  }
  if (cpuBottleneck > 15) {
    upgrades.push({
      type: 'CPU',
      title: 'Upgrade Processor (CPU)',
      reason: `Your ${cpu.name} is slowing you down by ${cpuBottleneck}%.`,
      link: getLink('Intel Core i5-13600K Processor'),
      btnText: 'Find Better CPU'
    })
  }

  if (settings === 'Low' || settings === 'Medium') {
    upgrades.push({
      type: 'GPU',
      title: 'Upgrade Graphics Card',
      reason: 'Your GPU is the main limit for Ultra settings.',
      link: getLink('GeForce RTX 4060 Graphics Card'),
      btnText: 'Shop RTX 4060'
    })
  }

  return {
    settings,
    fps,
    badgeColor,
    description,
    vramWarning,
    cpu: { status: cpuStatus, bottleneck: cpuBottleneck },
    ram: ramStatus,
    upgrades,
    ai: { fps: aiFps, tech: aiTechnology, enabled: aiTechnology !== null }
  }
}
