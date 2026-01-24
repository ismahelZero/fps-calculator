export const useOptimization = (gpu: any, cpu: any, ram: number, game: any) => {
  const affiliateTag = 'myfps-20' // Your Tag

  let settings = 'Low'
  let fps = 30
  let badgeColor = 'text-error'
  let description = 'Struggling to run.'

  // --- 1. Base GPU Logic ---
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

  // --- 2. CPU Bottleneck Logic ---
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

  // --- 3. RAM Logic ---
  const ramStatus =
    ram < game.requirements.ram.min
      ? 'Critical'
      : ram < game.requirements.ram.rec
        ? 'Low'
        : 'Good'

  // --- 4. VRAM Logic ---
  const vramWarning =
    gpu.vram < 8 && settings === 'Ultra'
      ? `Note: ${game.name} prefers 8GB+ VRAM. You have ${gpu.vram}GB.`
      : null

  // --- 5. SMART UPGRADE RECOMMENDATIONS (NEW) ---
  const upgrades = []

  // A. Do they need RAM?
  if (ram < game.requirements.ram.rec) {
    upgrades.push({
      type: 'RAM',
      title: `Upgrade to ${game.requirements.ram.rec}GB RAM`,
      reason: `You have ${ram}GB. This game runs best with ${game.requirements.ram.rec}GB.`,
      link: `https://www.amazon.com/s?k=${game.requirements.ram.rec}GB+DDR4+RAM+Kit&tag=${affiliateTag}`,
      btnText: `Find ${game.requirements.ram.rec}GB RAM`
    })
  }

  // B. Do they need a CPU?
  if (cpuBottleneck > 15) {
    // Recommend a solid mid-range CPU (i5-13600K is a safe "good" bet for most gaming)
    upgrades.push({
      type: 'CPU',
      title: 'Upgrade Processor (CPU)',
      reason: `Your ${cpu.name} is slowing you down by ${cpuBottleneck}%.`,
      link: `https://www.amazon.com/s?k=Intel+Core+i5-13600K+Processor&tag=${affiliateTag}`,
      btnText: 'Find Better CPU'
    })
  }

  // C. Do they need a GPU? (Only if settings are Low/Med)
  if (settings === 'Low' || settings === 'Medium') {
    // Recommend RTX 4060 as the standard upgrade
    upgrades.push({
      type: 'GPU',
      title: 'Upgrade Graphics Card',
      reason: 'Your GPU is the main limit for Ultra settings.',
      link: `https://www.amazon.com/s?k=GeForce+RTX+4060+Graphics+Card&tag=${affiliateTag}`,
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
    upgrades // Return the list of needed items
  }
}
