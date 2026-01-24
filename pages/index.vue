<template>
  <div
    class="relative min-h-screen overflow-hidden bg-dark-950 font-sans text-white"
  >
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]"
    ></div>
    <div
      class="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
    ></div>

    <div
      class="container relative z-10 mx-auto flex h-screen flex-col items-center justify-center px-4"
    >
      <div class="mb-10 text-center">
        <h1
          class="mb-4 font-display text-5xl font-black tracking-tight md:text-7xl"
        >
          CAN I
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >RUN IT?</span
          >
        </h1>
        <p class="mx-auto max-w-2xl font-sans text-lg text-slate-400">
          Build your rig and check FPS.
          <span class="font-bold text-white"
            >{{ gamesData.length }}+ Games</span
          >
          supported.
        </p>
      </div>

      <div
        class="w-full max-w-4xl rounded-3xl border border-dark-700 bg-dark-800/80 p-6 shadow-2xl backdrop-blur-xl md:p-10"
      >
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select Game</label
            >
            <input
              v-model="searchQueryGame"
              @focus="isGameDropdownOpen = true"
              type="text"
              placeholder="Search Game..."
              class="w-full rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div
              v-if="isGameDropdownOpen && filteredGames.length"
              class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
            >
              <div
                v-for="g in filteredGames"
                :key="g.id"
                @click="selectGame(g)"
                class="cursor-pointer border-b border-dark-700 px-5 py-3 hover:bg-dark-700 hover:text-primary"
              >
                {{ g.name }}
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select GPU</label
            >
            <input
              v-model="searchQueryGpu"
              @focus="isGpuDropdownOpen = true"
              type="text"
              placeholder="Search GPU..."
              class="w-full rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <div
              v-if="isGpuDropdownOpen && filteredGpus.length"
              class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
            >
              <div
                v-for="g in filteredGpus"
                :key="g.id"
                @click="selectGpu(g)"
                class="cursor-pointer border-b border-dark-700 px-5 py-3 hover:bg-dark-700 hover:text-secondary"
              >
                {{ g.name }}
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select CPU (Processor)</label
            >
            <input
              v-model="searchQueryCpu"
              @focus="isCpuDropdownOpen = true"
              type="text"
              placeholder="Search CPU..."
              class="w-full rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white focus:border-info focus:outline-none focus:ring-1 focus:ring-info"
            />
            <div
              v-if="isCpuDropdownOpen && filteredCpus.length"
              class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
            >
              <div
                v-for="c in filteredCpus"
                :key="c.id"
                @click="selectCpu(c)"
                class="cursor-pointer border-b border-dark-700 px-5 py-3 hover:bg-dark-700 hover:text-info"
              >
                {{ c.name }}
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
              >System RAM</label
            >
            <select
              v-model="selectedRam"
              class="w-full appearance-none rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white focus:border-success focus:outline-none focus:ring-1 focus:ring-success"
            >
              <option :value="8">8 GB</option>
              <option :value="16">16 GB (Standard)</option>
              <option :value="32">32 GB (Recommended)</option>
              <option :value="64">64 GB (Extreme)</option>
            </select>
          </div>
        </div>

        <button
          @click="checkPerformance"
          :disabled="!selectedGame || !selectedGpu"
          class="group mt-8 w-full rounded-xl bg-primary py-5 font-display text-lg font-black uppercase tracking-wide text-dark-950 shadow-neon-primary transition-all hover:bg-primary-dim disabled:opacity-50"
        >
          Analyze Build
          <span
            class="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </button>
        <div class="mt-4 text-center">
          <span class="text-sm text-slate-500">or</span>
          <NuxtLink
            to="/compare"
            class="ml-2 text-sm text-primary underline decoration-dashed underline-offset-4 transition-colors hover:text-white"
          >
            Compare two GPUs side-by-side
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import gamesData from '~/data/games.json'
import gpusData from '~/data/gpus.json'
import cpusData from '~/data/cpus.json'

const router = useRouter()

// --- State ---
const searchQueryGame = ref('')
const searchQueryGpu = ref('')
const searchQueryCpu = ref('') // New
const selectedRam = ref(16) // New (Default 16GB)

const selectedGame = ref<null | { name: string; slug: string }>(null)
const selectedGpu = ref<null | { name: string; slug: string }>(null)
const selectedCpu = ref<null | { name: string; id: string }>(null) // New

const isGameDropdownOpen = ref(false)
const isGpuDropdownOpen = ref(false)
const isCpuDropdownOpen = ref(false) // New

// --- Search Logic ---
const filteredGames = computed(() => {
  if (!searchQueryGame.value) return gamesData.slice(0, 50)
  return gamesData
    .filter(g =>
      g.name.toLowerCase().includes(searchQueryGame.value.toLowerCase())
    )
    .slice(0, 10)
})
const filteredGpus = computed(() => {
  if (!searchQueryGpu.value) return gpusData.slice(0, 50)
  return gpusData
    .filter(g =>
      g.name.toLowerCase().includes(searchQueryGpu.value.toLowerCase())
    )
    .slice(0, 10)
})
// New CPU Filter
const filteredCpus = computed(() => {
  if (!searchQueryCpu.value) return cpusData.slice(0, 50)
  return cpusData
    .filter(c =>
      c.name.toLowerCase().includes(searchQueryCpu.value.toLowerCase())
    )
    .slice(0, 10)
})

// --- Selection Handlers ---
const selectGame = (game: any) => {
  selectedGame.value = game
  searchQueryGame.value = game.name
  isGameDropdownOpen.value = false
}
const selectGpu = (gpu: any) => {
  selectedGpu.value = gpu
  searchQueryGpu.value = gpu.name
  isGpuDropdownOpen.value = false
}
const selectCpu = (cpu: any) => {
  selectedCpu.value = cpu
  searchQueryCpu.value = cpu.name
  isCpuDropdownOpen.value = false
}

// --- Navigation ---
const checkPerformance = () => {
  if (selectedGame.value && selectedGpu.value) {
    // Pass CPU and RAM as query params
    const query: any = { ram: selectedRam.value }
    if (selectedCpu.value) query.cpu = selectedCpu.value.id

    router.push({
      path: `/optimize/${selectedGame.value.slug}/${selectedGpu.value.slug}`,
      query
    })
  }
}
</script>
