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
      <div class="mb-12 text-center">
        <h1
          class="mb-4 font-display text-5xl font-black tracking-tight md:text-7xl"
        >
          CAN I
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >RUN IT?</span
          >
        </h1>
        <p
          class="mx-auto max-w-2xl font-sans text-lg text-slate-400 md:text-xl"
        >
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
        class="w-full max-w-4xl rounded-3xl border border-dark-700 bg-dark-800/80 p-6 shadow-2xl backdrop-blur-xl md:p-10"
      >
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select Game</label
            >
            <div class="relative">
              <input
                v-model="searchQueryGame"
                @focus="isGameDropdownOpen = true"
                type="text"
                placeholder="Search (e.g. Cyberpunk 2077)"
                class="w-full rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white placeholder-slate-500 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div
                v-if="isGameDropdownOpen && filteredGames.length"
                class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-2xl"
              >
                <div
                  v-for="game in filteredGames"
                  :key="game.id"
                  @click="selectGame(game)"
                  class="cursor-pointer border-b border-dark-700 px-5 py-3 text-sm text-slate-300 transition-colors last:border-0 hover:bg-dark-700 hover:text-primary"
                >
                  {{ game.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
              >Select Graphics Card</label
            >
            <div class="relative">
              <input
                v-model="searchQueryGpu"
                @focus="isGpuDropdownOpen = true"
                type="text"
                placeholder="Search (e.g. RTX 4060)"
                class="w-full rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white placeholder-slate-500 transition-all focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <div
                v-if="isGpuDropdownOpen && filteredGpus.length"
                class="absolute left-0 top-full z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-2xl"
              >
                <div
                  v-for="gpu in filteredGpus"
                  :key="gpu.id"
                  @click="selectGpu(gpu)"
                  class="cursor-pointer border-b border-dark-700 px-5 py-3 text-sm text-slate-300 transition-colors last:border-0 hover:bg-dark-700 hover:text-secondary"
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
          class="group mt-8 w-full rounded-xl bg-primary py-5 font-display text-lg font-black uppercase tracking-wide text-dark-950 shadow-neon-primary transition-all hover:scale-[1.01] hover:bg-primary-dim disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          Calculate FPS Performance
          <span
            class="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </button>
      </div>

      <div
        class="mt-12 flex flex-wrap justify-center gap-4 font-sans text-sm text-slate-500"
      >
        <span>Trending:</span>
        <NuxtLink
          v-if="gamesData[0] && gpusData[1]"
          :to="`/optimize/${gamesData[0].slug}/${gpusData[1].slug}`"
          class="border-b border-primary/30 text-primary transition-colors hover:text-white"
        >
          {{ gamesData[0].name }} on {{ gpusData[1].name }}
        </NuxtLink>

        <NuxtLink
          v-if="gamesData[2] && gpusData[0]"
          :to="`/optimize/${gamesData[2].slug}/${gpusData[0].slug}`"
          class="border-b border-primary/30 text-primary transition-colors hover:text-white"
        >
          {{ gamesData[2].name }} on {{ gpusData[0].name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

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
