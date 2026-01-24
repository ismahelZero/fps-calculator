<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'nuxt/app'
import gamesData from '~/data/games.json'
import gpusData from '~/data/gpus.json'

const router = useRouter()

// --- State ---
const searchQueryGame = ref('')
const searchQueryGpu = ref('')
const selectedGame = ref<null | { name: string; slug: string }>(null)
const selectedGpu = ref<null | { name: string; slug: string }>(null)
const isGameDropdownOpen = ref(false)
const isGpuDropdownOpen = ref(false)

// --- Search Logic ---
// Filter games based on typing
const filteredGames = computed(() => {
  if (!searchQueryGame.value) return gamesData.slice(0, 50) // Show top 50 by default
  return gamesData
    .filter(g =>
      g.name.toLowerCase().includes(searchQueryGame.value.toLowerCase())
    )
    .slice(0, 10) // Limit results for speed
})

// Filter GPUs based on typing
const filteredGpus = computed(() => {
  if (!searchQueryGpu.value) return gpusData.slice(0, 50)
  return gpusData
    .filter(g =>
      g.name.toLowerCase().includes(searchQueryGpu.value.toLowerCase())
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

// --- Navigation Action ---
const checkPerformance = () => {
  if (selectedGame.value && selectedGpu.value) {
    router.push(
      `/optimize/${selectedGame.value.slug}/${selectedGpu.value.slug}`
    )
  }
}
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-[#0B0C15] font-sans text-white"
  >
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]"
    ></div>
    <div
      class="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
    ></div>

    <div
      class="container relative z-10 mx-auto flex h-screen flex-col items-center justify-center px-4"
    >
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-5xl font-black tracking-tight md:text-7xl">
          CAN I
          <span
            class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >RUN IT?</span
          >
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl">
          Check your FPS performance instantly.
          <span class="font-semibold text-white"
            >{{ gamesData.length }}+ Games</span
          >
          and
          <span class="font-semibold text-white"
            >{{ gpusData.length }}+ GPUs</span
          >
          supported.
        </p>
      </div>

      <div
        class="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-10"
      >
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="relative">
            <label
              class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select Game</label
            >
            <div class="relative">
              <input
                v-model="searchQueryGame"
                @focus="isGameDropdownOpen = true"
                type="text"
                placeholder="Search (e.g. Cyberpunk 2077)"
                class="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div
                v-if="isGameDropdownOpen && filteredGames.length"
                class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#1A1C2E] shadow-2xl"
              >
                <div
                  v-for="game in filteredGames"
                  :key="game.id"
                  @click="selectGame(game)"
                  class="cursor-pointer border-b border-white/5 px-5 py-3 text-sm text-slate-300 transition-colors last:border-0 hover:bg-white/5 hover:text-white"
                >
                  {{ game.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select Graphics Card</label
            >
            <div class="relative">
              <input
                v-model="searchQueryGpu"
                @focus="isGpuDropdownOpen = true"
                type="text"
                placeholder="Search (e.g. RTX 4060)"
                class="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div
                v-if="isGpuDropdownOpen && filteredGpus.length"
                class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#1A1C2E] shadow-2xl"
              >
                <div
                  v-for="gpu in filteredGpus"
                  :key="gpu.id"
                  @click="selectGpu(gpu)"
                  class="cursor-pointer border-b border-white/5 px-5 py-3 text-sm text-slate-300 transition-colors last:border-0 hover:bg-white/5 hover:text-white"
                >
                  {{ gpu.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="checkPerformance"
          :disabled="!selectedGame || !selectedGpu"
          class="group mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-5 text-lg font-black uppercase tracking-wide text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Calculate FPS Performance
          <span
            class="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </button>
      </div>

      <div
        class="mt-12 flex flex-wrap justify-center gap-4 text-sm text-slate-500"
      >
        <span>Trending:</span>
        <NuxtLink
          v-if="gamesData[0] && gpusData[1]"
          :to="`/optimize/${gamesData[0].slug}/${gpusData[1].slug}`"
          class="border-b border-indigo-400/30 text-indigo-400 transition-colors hover:text-white"
        >
          {{ gamesData[0].name }} on {{ gpusData[1].name }}
        </NuxtLink>

        <NuxtLink
          v-if="gamesData[2] && gpusData[0]"
          :to="`/optimize/${gamesData[2].slug}/${gpusData[0].slug}`"
          class="border-b border-indigo-400/30 text-indigo-400 transition-colors hover:text-white"
        >
          {{ gamesData[2].name }} on {{ gpusData[0].name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
