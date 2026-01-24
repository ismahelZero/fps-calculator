import parts from '~/data/parts.json'

export const useBuild = (gpu: any, cpu: any) => {
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
  const monitorsDB = parts.monitors as any
  const fansDB = parts.fans as any
  const keyboardsDB = parts.keyboards as any
  const miceDB = parts.mice as any
  const headsetsDB = parts.headsets as any

  const moboOptions = motherboardsDB[socket]
    ? motherboardsDB[socket][tier]
    : motherboardsDB['lga1700']['mid']
  const ramOptions = ramDB[memoryType][tier === 'extreme' ? 'high' : tier]
  const storageOptions = storageDB[tier]
  const psuOptions = psusDB[tier]
  const caseOptions = casesDB[tier]
  const coolerOptions = coolersDB[tier]

  const monitorOptions = monitorsDB[tier]
  const fanOptions = fansDB[tier]
  const keyboardOptions = keyboardsDB[tier]
  const mouseOptions = miceDB[tier]
  const headsetOptions = headsetsDB[tier]

  return [
    {
      category: 'Processor',
      locked: true,
      options: [
        { name: cpu ? cpu.name : 'Select CPU...', query: cpu ? cpu.name : '' }
      ],
      icon: '🧠'
    },
    {
      category: 'Graphics Card',
      locked: true,
      options: [
        { name: gpu ? gpu.name : 'Select GPU...', query: gpu ? gpu.name : '' }
      ],
      icon: '🎮'
    },
    {
      category: 'CPU Cooler',
      locked: false,
      options: coolerOptions || [],
      icon: '❄️'
    },
    {
      category: 'Motherboard',
      locked: false,
      options: moboOptions || [],
      icon: '🔌'
    },
    {
      category: 'Memory (RAM)',
      locked: false,
      options: ramOptions || [],
      icon: '💾'
    },
    {
      category: 'Storage (SSD)',
      locked: false,
      options: storageOptions || [],
      icon: '💽'
    },
    {
      category: 'Power Supply',
      locked: false,
      options: psuOptions || [],
      icon: '⚡'
    },
    {
      category: 'PC Case',
      locked: false,
      options: caseOptions || [],
      icon: '🖥️'
    },
    {
      category: 'Case Fans',
      locked: false,
      options: fanOptions || [],
      icon: '🌀'
    },
    {
      category: 'Monitor',
      locked: false,
      options: monitorOptions || [],
      icon: '🖥️'
    },
    {
      category: 'Keyboard',
      locked: false,
      options: keyboardOptions || [],
      icon: '⌨️'
    },
    {
      category: 'Mouse',
      locked: false,
      options: mouseOptions || [],
      icon: '🖱️'
    },
    {
      category: 'Headset',
      locked: false,
      options: headsetOptions || [],
      icon: '🎧'
    }
  ]
}
