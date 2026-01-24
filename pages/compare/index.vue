<template>
  <div class="relative overflow-hidden font-sans">
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]"
    ></div>

    <div
      class="container relative z-10 mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-40"
    >
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
        class="w-full max-w-5xl rounded-3xl border border-dark-700 bg-dark-800/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FSelect
            v-model="selectedGame"
            :options="gamesData"
            displayKey="name"
            label="1. Select Game"
            placeholder="Search Game..."
          />

          <FSelect
            v-model="selectedGpu1"
            :options="availableGpus1"
            displayKey="name"
            label="2. GPU A (Left)"
            placeholder="Select First GPU"
            color="primary"
          />

          <FSelect
            v-model="selectedGpu2"
            :options="availableGpus2"
            displayKey="name"
            label="3. GPU B (Right)"
            placeholder="Select Second GPU"
            color="secondary"
          />
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
const selectedGame = ref<null | any>(null)
const selectedGpu1 = ref<null | any>(null)
const selectedGpu2 = ref<null | any>(null)

// --- CROSS FILTERING LOGIC ---
// If GPU 2 is selected, remove it from GPU 1's list
const availableGpus1 = computed(() => {
  if (!selectedGpu2.value) return gpusData
  return gpusData.filter(g => g.slug !== selectedGpu2.value.slug)
})

// If GPU 1 is selected, remove it from GPU 2's list
const availableGpus2 = computed(() => {
  if (!selectedGpu1.value) return gpusData
  return gpusData.filter(g => g.slug !== selectedGpu1.value.slug)
})

const startComparison = () => {
  if (selectedGame.value && selectedGpu1.value && selectedGpu2.value) {
    router.push(
      `/compare/${selectedGame.value.slug}/${selectedGpu1.value.slug}-vs-${selectedGpu2.value.slug}`
    )
  }
}
</script>
