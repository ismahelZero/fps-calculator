// generate-data.js
import fs from 'fs'

// --- 1. THE GPU DATABASE (100+ GPUs) ---
const gpus = [
  // NVIDIA RTX 40 Series (DLSS 3 + Frame Gen)
  {
    id: 'rtx-4090',
    name: 'NVIDIA GeForce RTX 4090',
    score: 100,
    vram: 24,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4080-super',
    name: 'NVIDIA GeForce RTX 4080 Super',
    score: 88,
    vram: 16,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4080',
    name: 'NVIDIA GeForce RTX 4080',
    score: 85,
    vram: 16,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4070-ti-super',
    name: 'NVIDIA GeForce RTX 4070 Ti Super',
    score: 78,
    vram: 16,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4070-ti',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    score: 72,
    vram: 12,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4070-super',
    name: 'NVIDIA GeForce RTX 4070 Super',
    score: 68,
    vram: 12,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4070',
    name: 'NVIDIA GeForce RTX 4070',
    score: 65,
    vram: 12,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4060-ti-16gb',
    name: 'NVIDIA GeForce RTX 4060 Ti (16GB)',
    score: 56,
    vram: 16,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4060-ti',
    name: 'NVIDIA GeForce RTX 4060 Ti',
    score: 55,
    vram: 8,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4060',
    name: 'NVIDIA GeForce RTX 4060',
    score: 46,
    vram: 8,
    features: ['dlss', 'frame_gen']
  },

  // NVIDIA RTX 30 Series (DLSS 2)
  {
    id: 'rtx-3090-ti',
    name: 'NVIDIA GeForce RTX 3090 Ti',
    score: 76,
    vram: 24,
    features: ['dlss']
  },
  {
    id: 'rtx-3090',
    name: 'NVIDIA GeForce RTX 3090',
    score: 74,
    vram: 24,
    features: ['dlss']
  },
  {
    id: 'rtx-3080-ti',
    name: 'NVIDIA GeForce RTX 3080 Ti',
    score: 70,
    vram: 12,
    features: ['dlss']
  },
  {
    id: 'rtx-3080-12gb',
    name: 'NVIDIA GeForce RTX 3080 (12GB)',
    score: 68,
    vram: 12,
    features: ['dlss']
  },
  {
    id: 'rtx-3080',
    name: 'NVIDIA GeForce RTX 3080',
    score: 65,
    vram: 10,
    features: ['dlss']
  },
  {
    id: 'rtx-3070-ti',
    name: 'NVIDIA GeForce RTX 3070 Ti',
    score: 58,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-3070',
    name: 'NVIDIA GeForce RTX 3070',
    score: 54,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-3060-ti',
    name: 'NVIDIA GeForce RTX 3060 Ti',
    score: 48,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-3060',
    name: 'NVIDIA GeForce RTX 3060',
    score: 42,
    vram: 12,
    features: ['dlss']
  },
  {
    id: 'rtx-3050',
    name: 'NVIDIA GeForce RTX 3050',
    score: 28,
    vram: 8,
    features: ['dlss']
  },

  // NVIDIA RTX 20 Series (DLSS 2)
  {
    id: 'rtx-2080-ti',
    name: 'NVIDIA GeForce RTX 2080 Ti',
    score: 58,
    vram: 11,
    features: ['dlss']
  },
  {
    id: 'rtx-2080-super',
    name: 'NVIDIA GeForce RTX 2080 Super',
    score: 49,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-2080',
    name: 'NVIDIA GeForce RTX 2080',
    score: 46,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-2070-super',
    name: 'NVIDIA GeForce RTX 2070 Super',
    score: 44,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-2070',
    name: 'NVIDIA GeForce RTX 2070',
    score: 39,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-2060-super',
    name: 'NVIDIA GeForce RTX 2060 Super',
    score: 38,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-2060',
    name: 'NVIDIA GeForce RTX 2060',
    score: 34,
    vram: 6,
    features: ['dlss']
  },

  // NVIDIA GTX 16/10 Series (Most Popular)
  {
    id: 'gtx-1660-ti',
    name: 'NVIDIA GeForce GTX 1660 Ti',
    score: 30,
    vram: 6,
    features: []
  },
  {
    id: 'gtx-1660-super',
    name: 'NVIDIA GeForce GTX 1660 Super',
    score: 29,
    vram: 6,
    features: []
  },
  {
    id: 'gtx-1660',
    name: 'NVIDIA GeForce GTX 1660',
    score: 26,
    vram: 6,
    features: []
  },
  {
    id: 'gtx-1650-super',
    name: 'NVIDIA GeForce GTX 1650 Super',
    score: 22,
    vram: 4,
    features: []
  },
  {
    id: 'gtx-1650',
    name: 'NVIDIA GeForce GTX 1650',
    score: 18,
    vram: 4,
    features: []
  },
  {
    id: 'gtx-1080-ti',
    name: 'NVIDIA GeForce GTX 1080 Ti',
    score: 45,
    vram: 11,
    features: []
  },
  {
    id: 'gtx-1080',
    name: 'NVIDIA GeForce GTX 1080',
    score: 35,
    vram: 8,
    features: []
  },
  {
    id: 'gtx-1070-ti',
    name: 'NVIDIA GeForce GTX 1070 Ti',
    score: 32,
    vram: 8,
    features: []
  },
  {
    id: 'gtx-1070',
    name: 'NVIDIA GeForce GTX 1070',
    score: 28,
    vram: 8,
    features: []
  },
  {
    id: 'gtx-1060-6gb',
    name: 'NVIDIA GeForce GTX 1060 (6GB)',
    score: 20,
    vram: 6,
    features: []
  },
  {
    id: 'gtx-1060-3gb',
    name: 'NVIDIA GeForce GTX 1060 (3GB)',
    score: 18,
    vram: 3,
    features: []
  },
  {
    id: 'gtx-1050-ti',
    name: 'NVIDIA GeForce GTX 1050 Ti',
    score: 14,
    vram: 4,
    features: []
  },
  {
    id: 'gtx-1050',
    name: 'NVIDIA GeForce GTX 1050',
    score: 11,
    vram: 2,
    features: []
  },
  {
    id: 'gt-1030',
    name: 'NVIDIA GeForce GT 1030',
    score: 5,
    vram: 2,
    features: []
  },

  // AMD Radeon RX 7000/6000 (FSR)
  {
    id: 'rx-7900-xtx',
    name: 'AMD Radeon RX 7900 XTX',
    score: 92,
    vram: 24,
    features: ['fsr']
  },
  {
    id: 'rx-7900-xt',
    name: 'AMD Radeon RX 7900 XT',
    score: 80,
    vram: 20,
    features: ['fsr']
  },
  {
    id: 'rx-7800-xt',
    name: 'AMD Radeon RX 7800 XT',
    score: 62,
    vram: 16,
    features: ['fsr']
  },
  {
    id: 'rx-7700-xt',
    name: 'AMD Radeon RX 7700 XT',
    score: 54,
    vram: 12,
    features: ['fsr']
  },
  {
    id: 'rx-7600',
    name: 'AMD Radeon RX 7600',
    score: 40,
    vram: 8,
    features: ['fsr']
  },
  {
    id: 'rx-6950-xt',
    name: 'AMD Radeon RX 6950 XT',
    score: 73,
    vram: 16,
    features: ['fsr']
  },
  {
    id: 'rx-6800-xt',
    name: 'AMD Radeon RX 6800 XT',
    score: 64,
    vram: 16,
    features: ['fsr']
  },
  {
    id: 'rx-6700-xt',
    name: 'AMD Radeon RX 6700 XT',
    score: 48,
    vram: 12,
    features: ['fsr']
  },
  {
    id: 'rx-6600-xt',
    name: 'AMD Radeon RX 6600 XT',
    score: 38,
    vram: 8,
    features: ['fsr']
  },
  {
    id: 'rx-6600',
    name: 'AMD Radeon RX 6600',
    score: 34,
    vram: 8,
    features: ['fsr']
  },

  // AMD Older
  {
    id: 'rx-5700-xt',
    name: 'AMD Radeon RX 5700 XT',
    score: 42,
    vram: 8,
    features: []
  },
  {
    id: 'rx-5600-xt',
    name: 'AMD Radeon RX 5600 XT',
    score: 35,
    vram: 6,
    features: []
  },
  { id: 'rx-580', name: 'AMD Radeon RX 580', score: 19, vram: 8, features: [] },
  { id: 'rx-570', name: 'AMD Radeon RX 570', score: 17, vram: 4, features: [] },

  // Intel Arc
  { id: 'arc-a770', name: 'Intel Arc A770', score: 44, vram: 16, features: [] },
  { id: 'arc-a750', name: 'Intel Arc A750', score: 39, vram: 8, features: [] },
  { id: 'arc-a380', name: 'Intel Arc A380', score: 15, vram: 6, features: [] },

  // Integrated
  {
    id: 'intel-uhd-770',
    name: 'Intel UHD Graphics 770',
    score: 4,
    vram: 0,
    features: []
  },
  {
    id: 'amd-radeon-780m',
    name: 'AMD Radeon 780M (Handhelds)',
    score: 18,
    vram: 4,
    features: []
  },
  // NVIDIA RTX 50 Series (Next Gen - if released)
  {
    id: 'rtx-5090',
    name: 'NVIDIA GeForce RTX 5090',
    score: 110,
    vram: 32,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-5080',
    name: 'NVIDIA GeForce RTX 5080',
    score: 95,
    vram: 16,
    features: ['dlss', 'frame_gen']
  },

  // NVIDIA GTX 900 Series
  {
    id: 'gtx-980-ti',
    name: 'NVIDIA GeForce GTX 980 Ti',
    score: 33,
    vram: 6,
    features: []
  },
  {
    id: 'gtx-980',
    name: 'NVIDIA GeForce GTX 980',
    score: 27,
    vram: 4,
    features: []
  },
  {
    id: 'gtx-970',
    name: 'NVIDIA GeForce GTX 970',
    score: 24,
    vram: 4,
    features: []
  },
  {
    id: 'gtx-960',
    name: 'NVIDIA GeForce GTX 960',
    score: 16,
    vram: 2,
    features: []
  },

  // AMD Radeon RX 5000 Series
  {
    id: 'rx-5700',
    name: 'AMD Radeon RX 5700',
    score: 39,
    vram: 8,
    features: []
  },
  {
    id: 'rx-5500-xt',
    name: 'AMD Radeon RX 5500 XT',
    score: 24,
    vram: 8,
    features: []
  },

  // AMD Radeon RX Vega Series
  {
    id: 'rx-vega-64',
    name: 'AMD Radeon RX Vega 64',
    score: 38,
    vram: 8,
    features: []
  },
  {
    id: 'rx-vega-56',
    name: 'AMD Radeon RX Vega 56',
    score: 34,
    vram: 8,
    features: []
  },

  // AMD Radeon RX 500 Series (More variants)
  { id: 'rx-590', name: 'AMD Radeon RX 590', score: 21, vram: 8, features: [] },
  { id: 'rx-560', name: 'AMD Radeon RX 560', score: 12, vram: 4, features: [] },
  { id: 'rx-550', name: 'AMD Radeon RX 550', score: 8, vram: 2, features: [] },

  // AMD Radeon VII
  {
    id: 'radeon-vii',
    name: 'AMD Radeon VII',
    score: 52,
    vram: 16,
    features: []
  },

  // Intel Arc (More variants)
  { id: 'arc-a580', name: 'Intel Arc A580', score: 32, vram: 8, features: [] },
  { id: 'arc-a310', name: 'Intel Arc A310', score: 12, vram: 4, features: [] },

  // Laptop/Mobile GPUs
  {
    id: 'rtx-4090-laptop',
    name: 'NVIDIA GeForce RTX 4090 Laptop',
    score: 82,
    vram: 16,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4080-laptop',
    name: 'NVIDIA GeForce RTX 4080 Laptop',
    score: 72,
    vram: 12,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4070-laptop',
    name: 'NVIDIA GeForce RTX 4070 Laptop',
    score: 58,
    vram: 8,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-4060-laptop',
    name: 'NVIDIA GeForce RTX 4060 Laptop',
    score: 42,
    vram: 8,
    features: ['dlss', 'frame_gen']
  },
  {
    id: 'rtx-3070-laptop',
    name: 'NVIDIA GeForce RTX 3070 Laptop',
    score: 48,
    vram: 8,
    features: ['dlss']
  },
  {
    id: 'rtx-3060-laptop',
    name: 'NVIDIA GeForce RTX 3060 Laptop',
    score: 38,
    vram: 6,
    features: ['dlss']
  },

  // More Integrated Graphics
  {
    id: 'intel-iris-xe',
    name: 'Intel Iris Xe Graphics',
    score: 8,
    vram: 0,
    features: []
  },
  {
    id: 'amd-radeon-680m',
    name: 'AMD Radeon 680M',
    score: 14,
    vram: 4,
    features: []
  },
  {
    id: 'intel-uhd-630',
    name: 'Intel UHD Graphics 630',
    score: 3,
    vram: 0,
    features: []
  }
]

const cpus = [
  { id: 'i9-14900k', name: 'Intel Core i9-14900K', score: 100, cores: 24 },
  { id: 'r7-7800x3d', name: 'AMD Ryzen 7 7800X3D', score: 95, cores: 8 },
  { id: 'i7-13700k', name: 'Intel Core i7-13700K', score: 85, cores: 16 },
  { id: 'i5-13600k', name: 'Intel Core i5-13600K', score: 75, cores: 14 },
  { id: 'r5-7600x', name: 'AMD Ryzen 5 7600X', score: 65, cores: 6 },
  { id: 'i5-12400f', name: 'Intel Core i5-12400F', score: 50, cores: 6 },
  { id: 'r5-5600x', name: 'AMD Ryzen 5 5600X', score: 48, cores: 6 },
  { id: 'i7-8700k', name: 'Intel Core i7-8700K', score: 40, cores: 6 },
  { id: 'r5-3600', name: 'AMD Ryzen 5 3600', score: 35, cores: 6 },
  { id: 'i7-7700k', name: 'Intel Core i7-7700K', score: 30, cores: 4 },
  { id: 'i5-7400', name: 'Intel Core i5-7400', score: 20, cores: 4 },
  { id: 'i3-10100', name: 'Intel Core i3-10100', score: 22, cores: 4 },
  { id: 'i3-9100f', name: 'Intel Core i3-9100F', score: 18, cores: 4 },
  { id: 'fx-8350', name: 'AMD FX-8350', score: 15, cores: 8 },
  { id: 'i5-2500k', name: 'Intel Core i5-2500K', score: 12, cores: 4 },
  // AMD Ryzen 9000 Series
  { id: 'r9-9950x', name: 'AMD Ryzen 9 9950X', score: 105, cores: 16 },
  { id: 'r9-9900x', name: 'AMD Ryzen 9 9900X', score: 102, cores: 12 },
  { id: 'r7-9700x', name: 'AMD Ryzen 7 9700X', score: 92, cores: 8 },
  { id: 'r5-9600x', name: 'AMD Ryzen 5 9600X', score: 78, cores: 6 },

  // Intel 15th Gen (Arrow Lake)
  { id: 'i9-15900k', name: 'Intel Core i9-15900K', score: 108, cores: 24 },
  { id: 'i7-15700k', name: 'Intel Core i7-15700K', score: 95, cores: 20 },

  // AMD Ryzen 7000 Series (More variants)
  { id: 'r9-7950x3d', name: 'AMD Ryzen 9 7950X3D', score: 98, cores: 16 },
  { id: 'r9-7950x', name: 'AMD Ryzen 9 7950X', score: 97, cores: 16 },
  { id: 'r9-7900x3d', name: 'AMD Ryzen 9 7900X3D', score: 93, cores: 12 },
  { id: 'r9-7900x', name: 'AMD Ryzen 9 7900X', score: 90, cores: 12 },
  { id: 'r7-7700x', name: 'AMD Ryzen 7 7700X', score: 80, cores: 8 },
  { id: 'r5-7600', name: 'AMD Ryzen 5 7600', score: 62, cores: 6 },

  // Intel 12th Gen (More variants)
  { id: 'i9-12900k', name: 'Intel Core i9-12900K', score: 88, cores: 16 },
  { id: 'i7-12700k', name: 'Intel Core i7-12700K', score: 82, cores: 12 },
  { id: 'i5-12600k', name: 'Intel Core i5-12600K', score: 72, cores: 10 },
  { id: 'i5-12400', name: 'Intel Core i5-12400', score: 48, cores: 6 },

  // AMD Ryzen 5000 Series (More variants)
  { id: 'r9-5950x', name: 'AMD Ryzen 9 5950X', score: 78, cores: 16 },
  { id: 'r9-5900x', name: 'AMD Ryzen 9 5900X', score: 75, cores: 12 },
  { id: 'r7-5800x3d', name: 'AMD Ryzen 7 5800X3D', score: 85, cores: 8 },
  { id: 'r7-5800x', name: 'AMD Ryzen 7 5800X', score: 68, cores: 8 },
  { id: 'r7-5700x', name: 'AMD Ryzen 7 5700X', score: 62, cores: 8 },
  { id: 'r5-5600', name: 'AMD Ryzen 5 5600', score: 45, cores: 6 },
  { id: 'r5-5500', name: 'AMD Ryzen 5 5500', score: 42, cores: 6 },

  // Intel 11th Gen
  { id: 'i9-11900k', name: 'Intel Core i9-11900K', score: 65, cores: 8 },
  { id: 'i7-11700k', name: 'Intel Core i7-11700K', score: 58, cores: 8 },
  { id: 'i5-11600k', name: 'Intel Core i5-11600K', score: 52, cores: 6 },
  { id: 'i5-11400f', name: 'Intel Core i5-11400F', score: 46, cores: 6 },

  // Intel 10th Gen
  { id: 'i9-10900k', name: 'Intel Core i9-10900K', score: 62, cores: 10 },
  { id: 'i7-10700k', name: 'Intel Core i7-10700K', score: 55, cores: 8 },
  { id: 'i5-10600k', name: 'Intel Core i5-10600K', score: 47, cores: 6 },
  { id: 'i5-10400f', name: 'Intel Core i5-10400F', score: 43, cores: 6 },

  // AMD Ryzen 3000 Series (More variants)
  { id: 'r9-3950x', name: 'AMD Ryzen 9 3950X', score: 58, cores: 16 },
  { id: 'r9-3900x', name: 'AMD Ryzen 9 3900X', score: 55, cores: 12 },
  { id: 'r7-3800x', name: 'AMD Ryzen 7 3800X', score: 42, cores: 8 },
  { id: 'r7-3700x', name: 'AMD Ryzen 7 3700X', score: 40, cores: 8 },
  { id: 'r5-3600x', name: 'AMD Ryzen 5 3600X', score: 36, cores: 6 },

  // Intel 9th Gen
  { id: 'i9-9900k', name: 'Intel Core i9-9900K', score: 52, cores: 8 },
  { id: 'i7-9700k', name: 'Intel Core i7-9700K', score: 45, cores: 8 },
  { id: 'i5-9600k', name: 'Intel Core i5-9600K', score: 38, cores: 6 },

  // Budget/Older Options
  { id: 'r5-2600', name: 'AMD Ryzen 5 2600', score: 28, cores: 6 },
  { id: 'i7-6700k', name: 'Intel Core i7-6700K', score: 25, cores: 4 },
  { id: 'i5-6600k', name: 'Intel Core i5-6600K', score: 22, cores: 4 },
  { id: 'i5-4690k', name: 'Intel Core i5-4690K', score: 16, cores: 4 },
  { id: 'i7-4790k', name: 'Intel Core i7-4790K', score: 24, cores: 4 }
]

// Add slugs and affiliate links automatically
const processedGPUs = gpus.map(gpu => ({
  ...gpu,
  slug: gpu.id,
  affiliateLink: `https://amazon.com/s?k=${gpu.name.replace(/ /g, '+')}&tag=myfps-20`
}))
const processedCPUs = cpus.map(c => ({
  ...c,
  affiliateLink: `https://amazon.com/s?k=${c.name.replace(/ /g, '+')}&tag=myfps-20`
}))

// --- 2. THE GAME DATABASE (TIER SYSTEM) ---

const tiers = {
  S: {
    gpu: { low: 40, med: 60, high: 80, ultra: 95 },
    cpu: { min: 40, rec: 70 },
    ram: { min: 16, rec: 32 },
    storage: 100
  },
  A: {
    gpu: { low: 30, med: 45, high: 65, ultra: 85 },
    cpu: { min: 30, rec: 60 },
    ram: { min: 16, rec: 16 },
    storage: 80
  },
  B: {
    gpu: { low: 20, med: 35, high: 50, ultra: 70 },
    cpu: { min: 20, rec: 45 },
    ram: { min: 8, rec: 16 },
    storage: 60
  },
  C: {
    gpu: { low: 10, med: 20, high: 30, ultra: 45 },
    cpu: { min: 15, rec: 30 },
    ram: { min: 8, rec: 16 },
    storage: 40
  },
  D: {
    gpu: { low: 5, med: 10, high: 15, ultra: 25 },
    cpu: { min: 10, rec: 20 },
    ram: { min: 4, rec: 8 },
    storage: 20
  },
  E: {
    gpu: { low: 1, med: 3, high: 5, ultra: 10 },
    cpu: { min: 5, rec: 10 },
    ram: { min: 2, rec: 4 },
    storage: 5
  }
}

const gameList = [
  // --- TIER S (EXTREME) ---
  { name: 'Cyberpunk 2077 (2.0)', tier: 'S' },
  { name: 'Alan Wake 2', tier: 'S' },
  { name: 'Black Myth: Wukong', tier: 'S' },
  { name: "Senua's Saga: Hellblade II", tier: 'S' },
  { name: "Dragon's Dogma 2", tier: 'S' },
  { name: 'Ark: Survival Ascended', tier: 'S' },
  { name: 'Avatar: Frontiers of Pandora', tier: 'S' },
  { name: 'Cities: Skylines II', tier: 'S' },
  { name: 'Microsoft Flight Simulator 2024', tier: 'S' },
  { name: 'Star Wars Outlaws', tier: 'S' },
  { name: 'Immortals of Aveum', tier: 'S' },
  { name: 'Lords of the Fallen (2023)', tier: 'S' },
  { name: 'Metro Exodus Enhanced Edition', tier: 'S' },
  { name: 'Portal with RTX', tier: 'S' },
  { name: 'Minecraft (RTX On)', tier: 'S' },
  { name: 'Indiana Jones and the Great Circle', tier: 'S' },
  { name: 'Stalker 2: Heart of Chornobyl', tier: 'S' },
  { name: 'The Callisto Protocol', tier: 'S' },
  { name: 'Forspoken', tier: 'S' },
  { name: 'Atomic Heart', tier: 'S' },

  // --- TIER A (HEAVY AAA) ---
  { name: 'Starfield', tier: 'A' },
  { name: 'Hogwarts Legacy', tier: 'A' },
  { name: 'The Last of Us Part I', tier: 'A' },
  { name: 'Red Dead Redemption 2', tier: 'A' },
  { name: 'God of War Ragnarok', tier: 'A' },
  { name: 'Horizon Forbidden West', tier: 'A' },
  { name: 'Ghost of Tsushima', tier: 'A' },
  { name: 'Elden Ring', tier: 'A' },
  { name: "Baldur's Gate 3", tier: 'A' },
  { name: 'Helldivers 2', tier: 'A' },
  { name: 'Final Fantasy XVI', tier: 'A' },
  { name: 'Final Fantasy VII Rebirth', tier: 'A' },
  { name: 'Resident Evil 4 Remake', tier: 'A' },
  { name: 'Dead Space Remake', tier: 'A' },
  { name: 'Silent Hill 2 Remake', tier: 'A' },
  { name: 'Tekken 8', tier: 'A' },
  { name: 'Mortal Kombat 1', tier: 'A' },
  { name: 'Street Fighter 6', tier: 'A' },
  { name: 'Armored Core VI', tier: 'A' },
  { name: 'A Plague Tale: Requiem', tier: 'A' },
  { name: 'Control', tier: 'A' },
  { name: 'Returnal', tier: 'A' },
  { name: 'Warhammer 40k: Darktide', tier: 'A' },
  { name: 'Warhammer 40k: Space Marine 2', tier: 'A' },
  { name: 'S.T.A.L.K.E.R. 2', tier: 'A' },
  { name: 'Total War: Warhammer III', tier: 'A' },
  { name: 'Forza Motorsport (2023)', tier: 'A' },
  { name: "Assassin's Creed Mirage", tier: 'A' },
  { name: 'Skull and Bones', tier: 'A' },
  { name: 'Suicide Squad: Kill the Justice League', tier: 'A' },
  { name: 'Gotham Knights', tier: 'A' },
  { name: "Marvel's Spider-Man 2", tier: 'A' },
  { name: "Marvel's Spider-Man Remastered", tier: 'A' },
  { name: "Marvel's Miles Morales", tier: 'A' },
  { name: 'Uncharted: Legacy of Thieves', tier: 'A' },
  { name: 'Ratchet & Clank: Rift Apart', tier: 'A' },
  { name: 'Dying Light 2', tier: 'A' },
  { name: 'Far Cry 6', tier: 'A' },
  { name: 'Watch Dogs: Legion', tier: 'A' },
  { name: 'Just Cause 4', tier: 'A' },
  { name: 'The Witcher 3 (Next Gen)', tier: 'A' },
  { name: 'Kingdom Come: Deliverance', tier: 'A' },
  { name: 'Mount & Blade II: Bannerlord', tier: 'A' },
  { name: 'Rust', tier: 'A' },
  { name: 'DayZ', tier: 'A' },
  { name: 'Scum', tier: 'A' },
  { name: 'Escape from Tarkov', tier: 'A' },
  { name: 'Hunt: Showdown', tier: 'A' },
  { name: 'Squad', tier: 'A' },
  { name: 'Hell Let Loose', tier: 'A' },
  { name: 'Ready or Not', tier: 'A' },
  { name: 'Gray Zone Warfare', tier: 'A' },
  { name: 'Manor Lords', tier: 'A' },
  { name: 'Resident Evil 8: Village', tier: 'A' },
  { name: 'Ghostwire: Tokyo', tier: 'A' },
  { name: 'Evil West', tier: 'A' },
  { name: 'Atomic Heart', tier: 'A' },
  { name: 'High on Life', tier: 'A' },
  { name: 'Scorn', tier: 'A' },
  { name: 'The Quarry', tier: 'A' },
  { name: 'Callisto Protocol', tier: 'A' },
  { name: 'Dead Space (2023)', tier: 'A' },
  { name: 'Star Wars Battlefront II', tier: 'A' },
  { name: 'Jedi: Survivor', tier: 'A' },
  { name: 'Halo Infinite', tier: 'A' },
  { name: 'Gears 5', tier: 'A' },
  { name: 'Gears Tactics', tier: 'A' },
  { name: 'Age of Mythology: Retold', tier: 'A' },
  { name: 'Frostpunk', tier: 'A' },
  { name: 'They Are Billions', tier: 'A' },
  { name: 'Homeworld 3', tier: 'A' },
  { name: 'Warhammer 40K: Rogue Trader', tier: 'A' },
  { name: "Baldur's Gate: Dark Alliance", tier: 'A' },
  { name: 'Divinity: Original Sin 2', tier: 'A' },
  { name: 'Wasteland 3', tier: 'A' },
  { name: 'Pillars of Eternity II', tier: 'A' },
  { name: 'Pathfinder: Wrath of the Righteous', tier: 'A' },
  { name: 'Solasta: Crown of the Magister', tier: 'A' },

  // --- TIER B (STANDARD AAA / POPULAR) ---
  { name: 'Grand Theft Auto V', tier: 'B' },
  { name: 'Call of Duty: Modern Warfare III', tier: 'B' },
  { name: 'Call of Duty: Warzone', tier: 'B' },
  { name: 'Apex Legends', tier: 'B' },
  { name: 'Overwatch 2', tier: 'B' },
  { name: 'Rainbow Six Siege', tier: 'B' },
  { name: 'Destiny 2', tier: 'B' },
  { name: 'Warframe', tier: 'B' },
  { name: 'The Finals', tier: 'B' },
  { name: 'XDefiant', tier: 'B' },
  { name: 'Battlefield 2042', tier: 'B' },
  { name: 'Battlefield V', tier: 'B' },
  { name: 'Battlefield 1', tier: 'B' },
  { name: 'Star Wars Jedi: Survivor', tier: 'B' },
  { name: 'Star Wars Jedi: Fallen Order', tier: 'B' },
  { name: 'Hitman 3', tier: 'B' },
  { name: 'Deathloop', tier: 'B' },
  { name: 'Prey', tier: 'B' },
  { name: 'Dishonored 2', tier: 'B' },
  { name: 'Doom Eternal', tier: 'B' },
  { name: 'Wolfenstein II: The New Colossus', tier: 'B' },
  { name: 'Monster Hunter: World', tier: 'B' },
  { name: 'Monster Hunter Rise', tier: 'B' },
  { name: 'Dark Souls III', tier: 'B' },
  { name: 'Sekiro: Shadows Die Twice', tier: 'B' },
  { name: 'Lies of P', tier: 'B' },
  { name: 'Nioh 2', tier: 'B' },
  { name: 'Wo Long: Fallen Dynasty', tier: 'B' },
  { name: 'Devil May Cry 5', tier: 'B' },
  { name: 'Resident Evil Village', tier: 'B' },
  { name: 'Resident Evil 7', tier: 'B' },
  { name: 'Resident Evil 2 Remake', tier: 'B' },
  { name: 'Resident Evil 3 Remake', tier: 'B' },
  { name: 'Dead Island 2', tier: 'B' },
  { name: 'Back 4 Blood', tier: 'B' },
  { name: 'World War Z', tier: 'B' },
  { name: 'Aliens: Fireteam Elite', tier: 'B' },
  { name: 'Remnant 2', tier: 'B' },
  { name: 'Remnant: From the Ashes', tier: 'B' },
  { name: 'Outriders', tier: 'B' },
  { name: 'Borderlands 3', tier: 'B' },
  { name: "Tiny Tina's Wonderlands", tier: 'B' },
  { name: 'Fallout 4', tier: 'B' },
  { name: 'Fallout 76', tier: 'B' },
  { name: 'The Outer Worlds', tier: 'B' },
  { name: 'Mass Effect Legendary Edition', tier: 'B' },
  { name: 'Dragon Age: Inquisition', tier: 'B' },
  { name: 'Skyrim Special Edition', tier: 'B' },
  { name: "No Man's Sky", tier: 'B' },
  { name: 'Sea of Thieves', tier: 'B' },
  { name: 'Grounded', tier: 'B' },
  { name: 'Subnautica: Below Zero', tier: 'B' },
  { name: 'Satisfactory', tier: 'B' },
  { name: 'Forza Horizon 5', tier: 'B' },
  { name: 'Forza Horizon 4', tier: 'B' },
  { name: 'F1 24', tier: 'B' },
  { name: 'Need for Speed Unbound', tier: 'B' },
  { name: 'Need for Speed Heat', tier: 'B' },
  { name: 'Dirt Rally 2.0', tier: 'B' },
  { name: 'Assetto Corsa Competizione', tier: 'B' },
  { name: 'BeamNG.drive', tier: 'B' },
  { name: 'SnowRunner', tier: 'B' },
  { name: 'Farming Simulator 22', tier: 'B' },
  { name: 'Euro Truck Simulator 2', tier: 'B' },
  { name: 'American Truck Simulator', tier: 'B' },
  { name: 'FIFA 23 / FC 24', tier: 'B' },
  { name: 'NBA 2K24', tier: 'B' },
  { name: 'Madden NFL 24', tier: 'B' },
  { name: 'PGA Tour 2K23', tier: 'B' },
  { name: 'WWE 2K24', tier: 'B' },
  { name: 'Civilization VI', tier: 'B' },
  { name: 'Age of Empires IV', tier: 'B' },
  { name: 'Company of Heroes 3', tier: 'B' },
  { name: 'Anno 1800', tier: 'B' },
  { name: 'Frostpunk 2', tier: 'B' },
  { name: 'Jurassic World Evolution 2', tier: 'B' },
  { name: 'Planet Zoo', tier: 'B' },
  { name: 'Planet Coaster', tier: 'B' },
  { name: 'Sims 4 (With DLCs)', tier: 'B' },
  { name: 'Genshin Impact', tier: 'B' },
  { name: 'Honkai: Star Rail', tier: 'B' },
  { name: 'Wuthering Waves', tier: 'B' },
  { name: 'Tower of Fantasy', tier: 'B' },
  { name: 'Zenless Zone Zero', tier: 'B' },
  { name: 'Persona 3 Reload', tier: 'B' },
  { name: 'Persona 5 Royal', tier: 'B' },
  { name: 'Yakuza: Like a Dragon', tier: 'B' },
  { name: 'Like a Dragon: Infinite Wealth', tier: 'B' },
  { name: 'Judgement', tier: 'B' },
  { name: 'Lost Judgment', tier: 'B' },
  { name: 'Tales of Arise', tier: 'B' },
  { name: 'Granblue Fantasy: Relink', tier: 'B' },
  { name: 'Blue Protocol', tier: 'B' },
  { name: 'Throne and Liberty', tier: 'B' },
  { name: 'Black Desert Online', tier: 'B' },
  { name: 'New World', tier: 'B' },
  { name: 'Lost Ark', tier: 'B' },
  { name: 'Path of Exile 2', tier: 'B' },
  { name: 'Diablo IV', tier: 'B' },
  { name: 'Last Epoch', tier: 'B' },
  { name: 'V Rising', tier: 'B' },
  { name: 'Enshrouded', tier: 'B' },
  { name: 'Palworld', tier: 'B' },
  { name: 'Valheim', tier: 'B' },
  { name: 'Sons of the Forest', tier: 'B' },
  { name: 'The Forest', tier: 'B' },
  { name: 'Green Hell', tier: 'B' },
  { name: 'Raft', tier: 'B' },
  { name: 'Smalland', tier: 'B' },
  { name: 'Abiotic Factor', tier: 'B' },
  { name: 'Nightingale', tier: 'B' },
  { name: 'Icarus', tier: 'B' },
  { name: 'Conan Exiles', tier: 'B' },
  { name: 'Ark: Survival Evolved', tier: 'B' },
  { name: '7 Days to Die', tier: 'B' },
  { name: 'Project Zomboid (Heavily Modded)', tier: 'B' },
  { name: 'Teardown', tier: 'B' },
  { name: 'Besiege', tier: 'B' },
  { name: 'Kerbal Space Program 2', tier: 'B' },
  { name: 'Space Engineers', tier: 'B' },
  { name: 'Stormworks', tier: 'B' },
  { name: 'From the Depths', tier: 'B' },
  { name: 'Lethal Company', tier: 'B' },
  { name: 'The Outlast Trials', tier: 'B' },
  { name: 'Sons of The Forest', tier: 'B' },
  { name: 'Chernobylite', tier: 'B' },
  { name: 'Ghostbusters: Spirits Unleashed', tier: 'B' },
  { name: 'The Texas Chain Saw Massacre', tier: 'B' },
  { name: 'Evil Dead: The Game', tier: 'B' },
  { name: 'Friday the 13th: The Game', tier: 'B' },
  { name: 'Stranded Deep', tier: 'B' },
  { name: 'Astroneer', tier: 'B' },
  { name: "No Man's Sky (VR)", tier: 'B' },
  { name: 'Elite Dangerous', tier: 'B' },
  { name: 'Star Citizen', tier: 'B' },
  { name: 'Dual Universe', tier: 'B' },
  { name: 'Empyrion - Galactic Survival', tier: 'B' },
  { name: 'X4: Foundations', tier: 'B' },
  { name: 'Everspace 2', tier: 'B' },
  { name: 'House of the Dying Sun', tier: 'B' },
  { name: 'Project Wingman', tier: 'B' },
  { name: 'Ace Combat 7', tier: 'B' },
  { name: 'DCS World', tier: 'B' },
  { name: 'IL-2 Sturmovik', tier: 'B' },
  { name: 'War Thunder (Max Settings)', tier: 'B' },
  { name: 'Arma 3', tier: 'B' },
  { name: 'Arma Reforger', tier: 'B' },

  // --- TIER C (COMPETITIVE / OPTIMIZED / OLDER AAA) ---
  { name: 'Counter-Strike 2', tier: 'C' },
  { name: 'Valorant', tier: 'C' },
  { name: 'League of Legends', tier: 'C' },
  { name: 'Dota 2', tier: 'C' },
  { name: 'Fortnite (Performance Mode)', tier: 'C' },
  { name: 'Rocket League', tier: 'C' },
  { name: 'Team Fortress 2', tier: 'C' },
  { name: 'Overwatch 2 (Low Settings)', tier: 'C' },
  { name: 'Paladins', tier: 'C' },
  { name: 'Smite', tier: 'C' },
  { name: 'Dead by Daylight', tier: 'C' },
  { name: 'Phasmophobia', tier: 'C' },
  { name: 'Lethal Company', tier: 'C' },
  { name: 'Content Warning', tier: 'C' },
  { name: 'Among Us', tier: 'C' },
  { name: 'Fall Guys', tier: 'C' },
  { name: 'Human Fall Flat', tier: 'C' },
  { name: 'Gang Beasts', tier: 'C' },
  { name: 'Party Animals', tier: 'C' },
  { name: 'Pummel Party', tier: 'C' },
  { name: 'Crab Game', tier: 'C' },
  { name: "Garry's Mod", tier: 'C' },
  { name: 'Left 4 Dead 2', tier: 'C' },
  { name: 'Portal 2', tier: 'C' },
  { name: 'Half-Life 2', tier: 'C' },
  { name: 'Black Mesa', tier: 'C' },
  { name: 'Deep Rock Galactic', tier: 'C' },
  { name: 'Risk of Rain 2', tier: 'C' },
  { name: 'Gunfire Reborn', tier: 'C' },
  { name: 'Roboquest', tier: 'C' },
  { name: 'Borderlands 2', tier: 'C' },
  { name: 'Payday 2', tier: 'C' },
  { name: 'Killing Floor 2', tier: 'C' },
  { name: 'Warhammer: Vermintide 2', tier: 'C' },
  { name: 'Insurgency: Sandstorm', tier: 'C' },
  { name: 'Rising Storm 2: Vietnam', tier: 'C' },
  { name: 'Chivalry 2', tier: 'C' },
  { name: 'Mordhau', tier: 'C' },
  { name: 'For Honor', tier: 'C' },
  { name: 'Sea of Thieves (Low)', tier: 'C' },
  { name: 'World of Tanks', tier: 'C' },
  { name: 'World of Warships', tier: 'C' },
  { name: 'War Thunder', tier: 'C' },
  { name: 'Enlisted', tier: 'C' },
  { name: 'Crossout', tier: 'C' },
  { name: 'Eve Online', tier: 'C' },
  { name: 'Albion Online', tier: 'C' },
  { name: 'Runescape (RS3)', tier: 'C' },
  { name: 'Old School Runescape (HD Plugin)', tier: 'C' },
  { name: 'Guild Wars 2', tier: 'C' },
  { name: 'World of Warcraft (Retail)', tier: 'C' },
  { name: 'World of Warcraft (Classic)', tier: 'C' },
  { name: 'Final Fantasy XIV', tier: 'C' },
  { name: 'Elder Scrolls Online', tier: 'C' },
  { name: 'Star Wars: The Old Republic', tier: 'C' },
  { name: 'Lord of the Rings Online', tier: 'C' },
  { name: 'MapleStory', tier: 'C' },
  { name: 'Path of Exile', tier: 'C' },
  { name: 'Torchlight II', tier: 'C' },
  { name: 'Grim Dawn', tier: 'C' },
  { name: 'Titan Quest', tier: 'C' },
  { name: 'Diablo III', tier: 'C' },
  { name: 'Diablo II: Resurrected', tier: 'C' },
  { name: 'Hades', tier: 'C' },
  { name: 'Hades II', tier: 'C' },
  { name: 'Dead Cells', tier: 'C' },
  { name: 'Hollow Knight', tier: 'C' },
  { name: 'Ori and the Will of the Wisps', tier: 'C' },
  { name: 'Ori and the Blind Forest', tier: 'C' },
  { name: 'Cuphead', tier: 'C' },
  { name: 'Celeste', tier: 'C' },
  { name: 'Super Meat Boy', tier: 'C' },
  { name: 'The Binding of Isaac: Repentance', tier: 'C' },
  { name: 'Enter the Gungeon', tier: 'C' },
  { name: 'Slay the Spire', tier: 'C' },
  { name: 'Monster Train', tier: 'C' },
  { name: 'Balatro', tier: 'C' },
  { name: 'Inscryption', tier: 'C' },
  { name: 'Darkest Dungeon', tier: 'C' },
  { name: 'Darkest Dungeon II', tier: 'C' },
  { name: 'Cult of the Lamb', tier: 'C' },
  { name: "Don't Starve Together", tier: 'C' },
  { name: 'Oxygen Not Included', tier: 'C' },
  { name: 'RimWorld', tier: 'C' },
  { name: 'Factorio', tier: 'C' },
  { name: 'Dwarf Fortress (Steam)', tier: 'C' },
  { name: 'Prison Architect', tier: 'C' },
  { name: 'Two Point Hospital', tier: 'C' },
  { name: 'Cities: Skylines (1)', tier: 'C' },
  { name: 'SimCity 4', tier: 'C' },
  { name: 'RollerCoaster Tycoon 3', tier: 'C' },
  { name: 'Planet Coaster (Low)', tier: 'C' },
  { name: 'Zoo Tycoon', tier: 'C' },
  { name: 'Spore', tier: 'C' },
  { name: 'The Sims 3', tier: 'C' },
  { name: 'Stardew Valley', tier: 'C' },
  { name: 'Terraria', tier: 'C' },
  { name: 'Minecraft (Java)', tier: 'C' },
  { name: 'Minecraft (Bedrock)', tier: 'C' },
  { name: 'Roblox', tier: 'C' },
  { name: 'Unturned', tier: 'C' },
  { name: 'Subnautica', tier: 'C' },
  { name: 'Raft (Low)', tier: 'C' },
  { name: 'Slime Rancher', tier: 'C' },
  { name: 'Slime Rancher 2', tier: 'C' },
  { name: 'House Flipper', tier: 'C' },
  { name: 'PowerWash Simulator', tier: 'C' },
  { name: 'PC Building Simulator', tier: 'C' },
  { name: 'Cooking Simulator', tier: 'C' },
  { name: 'Thief Simulator', tier: 'C' },
  { name: 'Car Mechanic Simulator', tier: 'C' },
  { name: 'Goat Simulator 3', tier: 'C' },
  { name: 'Untitled Goose Game', tier: 'C' },
  { name: 'Stray', tier: 'C' },
  { name: 'Kena: Bridge of Spirits', tier: 'C' },
  { name: 'Tunic', tier: 'C' },
  { name: 'Outer Wilds', tier: 'C' },
  { name: 'Firewatch', tier: 'C' },
  { name: 'What Remains of Edith Finch', tier: 'C' },
  { name: 'The Stanley Parable', tier: 'C' },
  { name: 'Superliminal', tier: 'C' },
  { name: 'Undertale', tier: 'C' },
  { name: 'Deltarune', tier: 'C' },
  { name: 'Omori', tier: 'C' },
  { name: 'Lisa: The Painful', tier: 'C' },
  { name: 'Yume Nikki', tier: 'C' },
  { name: 'Vampire Survivors', tier: 'C' },
  { name: 'Brotato', tier: 'C' },
  { name: 'Halls of Torment', tier: 'C' },
  { name: 'Loop Hero', tier: 'C' },
  { name: 'Dave the Diver', tier: 'C' },
  { name: 'Dredge', tier: 'C' },
  { name: 'Papers, Please', tier: 'C' },
  { name: 'Obra Dinn', tier: 'C' },
  { name: 'Disco Elysium', tier: 'C' },
  { name: 'Citizen Sleeper', tier: 'C' },
  { name: 'Pentiment', tier: 'C' },
  { name: 'Hi-Fi Rush', tier: 'C' },
  { name: 'Neon White', tier: 'C' },
  { name: 'Hotline Miami', tier: 'C' },
  { name: 'Hotline Miami 2', tier: 'C' },
  { name: 'Katana Zero', tier: 'C' },
  { name: 'Sanabi', tier: 'C' },
  { name: 'My Friend Pedro', tier: 'C' },
  { name: 'Superhot', tier: 'C' },
  { name: 'Ghostrunner', tier: 'C' },
  { name: "Mirror's Edge", tier: 'C' },
  { name: 'Dishonored', tier: 'C' },
  { name: 'Bioshock Remastered', tier: 'C' },
  { name: 'Bioshock Infinite', tier: 'C' },
  { name: 'Batman: Arkham Asylum', tier: 'C' },
  { name: 'Batman: Arkham City', tier: 'C' },
  { name: 'Batman: Arkham Knight', tier: 'C' },
  { name: 'Mad Max', tier: 'C' },
  { name: 'Shadow of Mordor', tier: 'C' },
  { name: 'Shadow of War', tier: 'C' },
  { name: 'Sleeping Dogs', tier: 'C' },
  { name: 'Yakuza 0', tier: 'C' },
  { name: 'Yakuza Kiwami', tier: 'C' },
  { name: 'Metal Gear Solid V', tier: 'C' },
  { name: 'Metal Gear Rising', tier: 'C' },
  { name: 'Nier: Automata', tier: 'C' },
  { name: 'Bayonetta', tier: 'C' },
  { name: 'Vanquish', tier: 'C' },
  { name: 'Spec Ops: The Line', tier: 'C' },
  { name: 'Max Payne 3', tier: 'C' },
  { name: 'LA Noire', tier: 'C' },
  { name: 'Bully', tier: 'C' },
  { name: 'Manhunt', tier: 'C' },
  { name: 'Grand Theft Auto IV', tier: 'C' },
  { name: 'Grand Theft Auto: San Andreas', tier: 'C' },
  { name: 'Saints Row: The Third', tier: 'C' },
  { name: 'Saints Row IV', tier: 'C' },
  { name: 'Just Cause 3', tier: 'C' },
  { name: 'Far Cry 3', tier: 'C' },
  { name: 'Far Cry 4', tier: 'C' },
  { name: 'Far Cry 5', tier: 'C' },
  { name: 'Far Cry Primal', tier: 'C' },
  { name: "Assassin's Creed IV: Black Flag", tier: 'C' },
  { name: "Assassin's Creed Unity", tier: 'C' },
  { name: "Assassin's Creed Syndicate", tier: 'C' },
  { name: "Assassin's Creed Origins", tier: 'C' },
  { name: "Assassin's Creed Odyssey", tier: 'C' },
  { name: "Assassin's Creed Valhalla", tier: 'C' },
  { name: 'Watch Dogs 2', tier: 'C' },
  { name: "Tom Clancy's The Division 2", tier: 'C' },
  { name: "Tom Clancy's Ghost Recon Wildlands", tier: 'C' },
  { name: "Tom Clancy's Ghost Recon Breakpoint", tier: 'C' },
  { name: 'Sniper Elite 4', tier: 'C' },
  { name: 'Sniper Elite 5', tier: 'C' },
  { name: 'Zombie Army 4', tier: 'C' },
  { name: 'Strange Brigade', tier: 'C' },
  { name: 'World War Z: Aftermath', tier: 'C' },
  { name: 'State of Decay 2', tier: 'C' },
  { name: 'Days Gone', tier: 'C' },
  { name: 'Mad Max', tier: 'C' },
  { name: 'Rage 2', tier: 'C' },
  { name: 'Generation Zero', tier: 'C' },
  { name: 'Terminator: Resistance', tier: 'C' },
  { name: 'RoboCop: Rogue City', tier: 'C' },
  { name: 'Apex Legends (Low Settings)', tier: 'C' },
  { name: 'PUBG: Battlegrounds', tier: 'C' },
  { name: 'Call of Duty: Black Ops 3', tier: 'C' },
  { name: 'Call of Duty: Black Ops 4', tier: 'C' },
  { name: 'Splitgate', tier: 'C' },
  { name: 'Halo: The Master Chief Collection', tier: 'C' },
  { name: 'Battlefield 4', tier: 'C' },
  { name: 'Battlefield 3', tier: 'C' },
  { name: 'Titanfall 2', tier: 'C' },
  { name: 'Warface', tier: 'C' },
  { name: 'Ironsight', tier: 'C' },
  { name: 'Combat Arms: Reloaded', tier: 'C' },
  { name: 'Starcraft II', tier: 'C' },
  { name: 'Starcraft: Remastered', tier: 'C' },
  { name: 'Age of Empires II: Definitive Edition', tier: 'C' },
  { name: 'Age of Empires III: Definitive Edition', tier: 'C' },
  { name: 'Warcraft III: Reforged', tier: 'C' },
  { name: 'Command & Conquer Remastered', tier: 'C' },
  { name: 'Supreme Commander', tier: 'C' },
  { name: 'Planetary Annihilation: Titans', tier: 'C' },
  { name: 'They Are Billions', tier: 'C' },
  { name: 'Northgard', tier: 'C' },
  { name: 'Frostpunk (Low)', tier: 'C' },
  { name: 'Banished', tier: 'C' },
  { name: 'Tropico 6', tier: 'C' },
  { name: 'Tropico 5', tier: 'C' },
  { name: 'Parkitect', tier: 'C' },
  { name: 'Parkasaurus', tier: 'C' },
  { name: 'Megaquarium', tier: 'C' },
  { name: 'Game Dev Tycoon', tier: 'C' },
  { name: 'Software Inc.', tier: 'C' },
  { name: 'Startup Company', tier: 'C' },
  { name: 'Mad Games Tycoon 2', tier: 'C' },
  { name: 'Tavern Master', tier: 'C' },
  { name: 'Potion Craft', tier: 'C' },
  { name: 'Dinkum', tier: 'C' },
  { name: 'Sun Haven', tier: 'C' },
  { name: 'My Time at Portia', tier: 'C' },
  { name: 'My Time at Sandrock', tier: 'C' },
  { name: 'Coral Island', tier: 'C' },
  { name: 'Palia', tier: 'C' },
  { name: 'Core Keeper', tier: 'C' },
  { name: 'Graveyard Keeper', tier: 'C' },
  { name: 'Moonlighter', tier: 'C' },
  { name: 'Spiritfarer', tier: 'C' },
  { name: 'Fae Farm', tier: 'C' },
  { name: 'Ooblets', tier: 'C' },
  { name: 'Temtem', tier: 'C' },
  { name: 'Palworld (Low Settings)', tier: 'C' },
  { name: 'Cassette Beasts', tier: 'C' },
  { name: 'Nexomon: Extinction', tier: 'C' },
  { name: 'Monster Sanctuary', tier: 'C' },

  // --- TIER D (LIGHTWEIGHT / INDIE) ---
  { name: 'Fortnite (Low Settings)', tier: 'D' },
  { name: 'Minecraft (Vanilla)', tier: 'D' },
  { name: 'Roblox (Most Games)', tier: 'D' },
  { name: 'Among Us', tier: 'D' },
  { name: 'Fall Guys (Low)', tier: 'D' },
  { name: 'Stumble Guys', tier: 'D' },
  { name: 'Brawlhalla', tier: 'D' },
  { name: 'MultiVersus', tier: 'D' },
  { name: 'Rivals of Aether', tier: 'D' },
  { name: 'Stick Fight: The Game', tier: 'D' },
  { name: 'Duck Game', tier: 'D' },
  { name: 'Ultimate Chicken Horse', tier: 'D' },
  { name: 'Move or Die', tier: 'D' },
  { name: 'Speedrunners', tier: 'D' },
  { name: 'Golf With Your Friends', tier: 'D' },
  { name: 'Golf It!', tier: 'D' },
  { name: 'Witch It', tier: 'D' },
  { name: 'Raft (Very Low)', tier: 'D' },
  { name: 'The Escapists 2', tier: 'D' },
  { name: 'The Escapists', tier: 'D' },
  { name: 'Starbound', tier: 'D' },
  { name: "Don't Starve", tier: 'D' },
  { name: 'Oxygen Not Included (Low)', tier: 'D' },
  { name: 'They Are Billions (Low)', tier: 'D' },
  { name: 'Factorio (Low)', tier: 'D' },
  { name: 'Shapez', tier: 'D' },
  { name: 'Shapez 2', tier: 'D' },
  { name: 'Autonauts', tier: 'D' },
  { name: 'Hydroneer', tier: 'D' },

  // --- TIER E (ULTRA-LIGHTWEIGHT) ---
  { name: 'Minesweeper', tier: 'E' },
  { name: 'Solitaire', tier: 'E' },
  { name: 'FreeCell', tier: 'E' },
  { name: 'Hearts', tier: 'E' },
  { name: 'Pinball FX', tier: 'E' },
  { name: 'Zuma', tier: 'E' },
  { name: 'Bejeweled', tier: 'E' },
  { name: 'Peggle', tier: 'E' },
  { name: 'Plants vs. Zombies', tier: 'E' },
  { name: 'Bloons TD 6', tier: 'E' },
  { name: 'Bloons TD 5', tier: 'E' },
  { name: 'Kingdom Rush', tier: 'E' },
  { name: 'Desktop Tower Defense', tier: 'E' },
  { name: 'Cookie Clicker', tier: 'E' },
  { name: 'Adventure Capitalist', tier: 'E' },
  { name: 'Clicker Heroes', tier: 'E' },
  { name: 'Realm Grinder', tier: 'E' },
  { name: 'NGU Idle', tier: 'E' },
  { name: 'Melvor Idle', tier: 'E' },
  { name: 'Legends of IdleOn', tier: 'E' },
  { name: 'Idle Skilling', tier: 'E' },
  { name: 'RPG MO', tier: 'E' },
  { name: 'Runescape (Old School - Low)', tier: 'E' },
  { name: 'Habitica', tier: 'E' },
  { name: 'Realm of the Mad God', tier: 'E' },
  { name: 'Town of Salem', tier: 'E' },
  { name: 'Skribbl.io', tier: 'E' },
  { name: 'Agar.io', tier: 'E' },
  { name: 'Slither.io', tier: 'E' },
  { name: 'Krunker.io', tier: 'E' },
  { name: 'Shell Shockers', tier: 'E' },
  { name: '1v1.LOL', tier: 'E' },
  { name: 'Surviv.io', tier: 'E' },
  { name: 'Diep.io', tier: 'E' },
  { name: 'Mope.io', tier: 'E' }
]

// --- 3. THE BUILDER LOGIC ---
const processedGames = gameList.map(game => {
  const slug = game.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return {
    id: game.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    name: game.name,
    slug: slug,
    requirements: tiers[game.tier],
    imageLow: `/images/games/${slug}-low.jpg`,
    imageUltra: `/images/games/${slug}-ultra.jpg`
  }
})

// --- 4. OUTPUT TO FILES ---
fs.writeFileSync('data/gpus.json', JSON.stringify(processedGPUs, null, 2))
fs.writeFileSync('data/cpus.json', JSON.stringify(processedCPUs, null, 2))
fs.writeFileSync('data/games.json', JSON.stringify(processedGames, null, 2))

console.log(
  `✅ Generated ${processedGPUs.length} GPUs, ${processedCPUs.length} CPUs, ${processedGames.length} Games`
)
