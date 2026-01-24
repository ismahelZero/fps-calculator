import parts from '~/data/parts.json'
import { useAffiliate } from './useAffiliate'

export const useBuild = (gpu: any, cpu: any) => {
  const { getLink } = useAffiliate()

  let tier = 'mid'
  if (gpu) {
    if (gpu.score >= 90) tier = 'extreme'
    else if (gpu.score >= 70) tier = 'high'
    else if (gpu.score >= 40) tier = 'mid'
    else tier = 'entry'
  }

  let socket = 'lga1700'
  let memoryType = 'ddr5'

  if (cpu) {
    const name = cpu.name.toLowerCase()

    if (name.includes('ryzen')) {
      if (
        name.includes('9000') ||
        name.includes('8000') ||
        name.includes('7000') ||
        name.includes('7800') ||
        name.includes('7600')
      ) {
        socket = 'am5'
        memoryType = 'ddr5'
      } else {
        socket = 'am4'
        memoryType = 'ddr4'
      }
    } else if (name.includes('intel')) {
      if (name.includes('ultra')) {
        socket = 'lga1851'
        memoryType = 'ddr5'
      } else {
        socket = 'lga1700'
        if (tier === 'entry') memoryType = 'ddr4'
        else memoryType = 'ddr5'
      }
    }
  }

  const motherboardsDB = parts.motherboards as any
  const ramDB = parts.ram as any
  const storageDB = parts.storage as any
  const psusDB = parts.psus as any
  const casesDB = parts.cases as any
  const coolersDB = parts.coolers as any

  const mobo = motherboardsDB[socket]
    ? motherboardsDB[socket][tier]
    : motherboardsDB['lga1700']['mid']

  const ram = ramDB[memoryType][tier === 'extreme' ? 'high' : tier]

  const storage = storageDB[tier]
  const psu = psusDB[tier]
  const casePart = casesDB[tier]
  const cooler = coolersDB[tier]

  return [
    {
      category: 'Processor',
      name: cpu ? cpu.name : 'Select a CPU...',
      icon: '🧠',
      link: cpu ? getLink(cpu.name) : '#'
    },
    {
      category: 'CPU Cooler',
      name: cooler.name,
      icon: '❄️',
      link: getLink(cooler.query)
    },
    {
      category: 'Motherboard',
      name: mobo.name,
      icon: '🔌',
      link: getLink(mobo.query)
    },
    {
      category: 'Memory (RAM)',
      name: ram.name,
      icon: '💾',
      link: getLink(ram.query)
    },
    {
      category: 'Graphics Card',
      name: gpu ? gpu.name : 'Select a GPU...',
      icon: '🎮',
      link: gpu ? getLink(gpu.name) : '#'
    },
    {
      category: 'Storage (SSD)',
      name: storage.name,
      icon: '💽',
      link: getLink(storage.query)
    },
    {
      category: 'Power Supply',
      name: psu.name,
      icon: '⚡',
      link: getLink(psu.query)
    },
    {
      category: 'PC Case',
      name: casePart.name,
      icon: '🖥️',
      link: getLink(casePart.query)
    }
  ]
}
