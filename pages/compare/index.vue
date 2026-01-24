<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark-950 p-4 font-sans"
  >
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]"
    ></div>

    <div class="container relative z-10 max-w-5xl">
      <div class="mb-12 text-center">
        <h1
          class="mb-4 font-display text-5xl font-black text-white md:text-7xl"
        >
          GPU
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >SHOWDOWN</span
          >
        </h1>
        <p class="text-xl text-slate-400">
          Compare two graphics cards side-by-side in any game.
        </p>
      </div>

      <div
        class="rounded-3xl border border-dark-700 bg-dark-800/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase text-slate-500"
              >1. Select Game</label
            >
            <input
              v-model="searchGame"
              @focus="showDropdown.game = true"
              placeholder="e.g. Cyberpunk 2077"
              class="w-full rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            <div
              v-if="showDropdown.game && filteredGames.length"
              class="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
            >
              <div
                v-for="g in filteredGames"
                :key="g.id"
                @click="selectGame(g)"
                class="cursor-pointer px-4 py-3 text-slate-300 hover:bg-dark-700"
              >
                {{ g.name }}
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase text-primary"
              >2. GPU A (Left)</label
            >
            <input
              v-model="searchGpu1"
              @focus="showDropdown.gpu1 = true"
              placeholder="e.g. RTX 3060"
              class="w-full rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            <div
              v-if="showDropdown.gpu1 && filteredGpus1.length"
              class="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
            >
              <div
                v-for="g in filteredGpus1"
                :key="g.id"
                @click="selectGpu1(g)"
                class="cursor-pointer px-4 py-3 text-slate-300 hover:bg-dark-700"
              >
                {{ g.name }}
              </div>
            </div>
          </div>

          <div class="relative">
            <label
              class="mb-2 block font-display text-xs font-bold uppercase text-secondary"
              >3. GPU B (Right)</label
            >
            <input
              v-model="searchGpu2"
              @focus="showDropdown.gpu2 = true"
              placeholder="e.g. RTX 4060"
              class="w-full rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-white focus:border-secondary focus:outline-none"
            />
            <div
              v-if="showDropdown.gpu2 && filteredGpus2.length"
              class="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-dark-700 bg-dark-800 shadow-xl"
            >
              <div
                v-for="g in filteredGpus2"
                :key="g.id"
                @click="selectGpu2(g)"
                class="cursor-pointer px-4 py-3 text-slate-300 hover:bg-dark-700"
              >
                {{ g.name }}
              </div>
            </div>
          </div>
        </div>

        <button
          @click="startComparison"
          :disabled="!selectedGame || !selectedGpu1 || !selectedGpu2"
          class="mt-8 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-5 font-display text-xl font-black uppercase tracking-widest text-dark-950 shadow-neon-primary transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Compare Performance
        </button>
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

// State
const searchGame = ref('')
const searchGpu1 = ref('')
const searchGpu2 = ref('')

const selectedGame = ref<null | { name: string; slug: string }>(null)
const selectedGpu1 = ref<null | { name: string; slug: string }>(null)
const selectedGpu2 = ref<null | { name: string; slug: string }>(null)

const showDropdown = ref({ game: false, gpu1: false, gpu2: false })

// Filter Logic
const filteredGames = computed(() => {
  if (!searchGame.value) return gamesData.slice(0, 50)
  return gamesData
    .filter(g => g.name.toLowerCase().includes(searchGame.value.toLowerCase()))
    .slice(0, 10)
})

const filteredGpus1 = computed(() => {
  if (!searchGpu1.value) return gpusData.slice(0, 50)
  return gpusData
    .filter(g => g.name.toLowerCase().includes(searchGpu1.value.toLowerCase()))
    .slice(0, 10)
})

const filteredGpus2 = computed(() => {
  if (!searchGpu2.value) return gpusData.slice(0, 50)
  return gpusData
    .filter(g => g.name.toLowerCase().includes(searchGpu2.value.toLowerCase()))
    .slice(0, 10)
})

// Select Handlers
const selectGame = (g: any) => {
  selectedGame.value = g
  searchGame.value = g.name
  showDropdown.value.game = false
}
const selectGpu1 = (g: any) => {
  selectedGpu1.value = g
  searchGpu1.value = g.name
  showDropdown.value.gpu1 = false
}
const selectGpu2 = (g: any) => {
  selectedGpu2.value = g
  searchGpu2.value = g.name
  showDropdown.value.gpu2 = false
}

// Navigation
const startComparison = () => {
  if (selectedGame.value && selectedGpu1.value && selectedGpu2.value) {
    router.push(
      `/compare/${selectedGame.value.slug}/${selectedGpu1.value.slug}-vs-${selectedGpu2.value.slug}`
    )
  }
}
</script>
