import { useAffiliate } from './useAffiliate'
import allCpus from '~/data/cpus.json'
import allGpus from '~/data/gpus.json'

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
  let recommendedCpu = null

  if (cpu) {
    const requiredScore = game.requirements.cpu.rec || 40

    if (cpu.score < requiredScore) {
      const gap = requiredScore - cpu.score
      cpuBottleneck = Math.min(Math.round(gap * 1.5), 60)
      cpuStatus = 'Bottleneck'

      fps = Math.floor(fps * (1 - cpuBottleneck / 100))

      const isAmd =
        cpu.name.toLowerCase().includes('amd') ||
        cpu.name.toLowerCase().includes('ryzen')
      const isIntel =
        cpu.name.toLowerCase().includes('intel') ||
        cpu.name.toLowerCase().includes('core')

      let candidates = allCpus.filter(c => c.score >= requiredScore + 10)

      const brandCandidates = candidates.filter(c => {
        if (isAmd) return c.name.toLowerCase().includes('amd')
        if (isIntel) return c.name.toLowerCase().includes('intel')
        return true
      })

      if (brandCandidates.length > 0) {
        candidates = brandCandidates
      }

      recommendedCpu = candidates.sort((a, b) => a.score - b.score)[0]

      if (!recommendedCpu) {
        recommendedCpu = allCpus.sort((a, b) => b.score - a.score)[0]
      }
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
      ? `Note: ${game.name} prefers 8GB+ VRAM for Ultra textures. You have ${gpu.vram}GB.`
      : null

  const upgrades = []

  if (ram < game.requirements.ram.rec) {
    const targetRam = game.requirements.ram.rec
    upgrades.push({
      type: 'RAM',
      title: `Upgrade to ${targetRam}GB RAM`,
      reason: `You have ${ram}GB. This game runs significantly smoother with ${targetRam}GB.`,
      link: getLink(`${targetRam}GB DDR4 RAM Kit Desktop`), // Dynamic search link
      btnText: `Find ${targetRam}GB Kits`
    })
  }

  if (cpuBottleneck > 10 && recommendedCpu) {
    upgrades.push({
      type: 'CPU',
      title: `Upgrade to ${recommendedCpu.name}`,
      reason: `Eliminate your ${cpuBottleneck}% bottleneck to unlock your GPU's potential.`,
      link: recommendedCpu.affiliateLink || getLink(recommendedCpu.name),
      btnText: `Check ${recommendedCpu.name} Price`
    })
  }

  const targetGpuScore = game.requirements.gpu.high

  if (gpu.score < targetGpuScore) {
    const betterGpus = allGpus
      .filter(g => g.score >= targetGpuScore)
      .sort((a, b) => a.score - b.score)

    const recommendedGpu = betterGpus[0]

    if (recommendedGpu) {
      upgrades.push({
        type: 'GPU',
        title: `Consider the ${recommendedGpu.name}`,
        reason: `Your current GPU limits you to ${settings} settings. This card handles High/Ultra.`,
        link: recommendedGpu.affiliateLink || getLink(recommendedGpu.name),
        btnText: `Shop ${recommendedGpu.name}`
      })
    }
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
