<template>
  <div class="min-h-screen bg-dark-950 font-sans text-white">
    <div class="border-b border-dark-800 bg-dark-900 pb-12 pt-24">
      <div class="container mx-auto px-4 text-center">
        <h1 class="mb-4 font-display text-4xl font-black md:text-6xl">
          What Can I <span class="text-primary">Play?</span>
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-slate-400">
          Enter your PC specs below. We'll analyze over 100+ games to see
          exactly how they perform on your rig.
        </p>

        <div
          class="mx-auto mt-10 grid max-w-4xl gap-4 rounded-2xl border border-dark-700 bg-dark-800/50 p-6 backdrop-blur-md md:grid-cols-3"
        >
          <div>
            <label class="mb-2 block text-xs font-bold uppercase text-slate-500"
              >Graphics Card</label
            >
            <FSelect
              v-model="myGpu"
              :options="gpus"
              display-key="name"
              placeholder="Select GPU..."
              class="w-full"
            />
          </div>

          <div>
            <label class="mb-2 block text-xs font-bold uppercase text-slate-500"
              >Processor</label
            >
            <FSelect
              v-model="myCpu"
              :options="cpus"
              display-key="name"
              placeholder="Select CPU..."
              class="w-full"
            />
          </div>

          <div>
            <FSelect
              v-model="selectedRam"
              :options="ramOptions"
              displayKey="label"
              label="System RAM"
              placeholder="Select Memory"
              color="success"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="myGpu && myCpu" class="container mx-auto px-4 py-12">
      <div class="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div
          class="rounded-xl border border-dark-700 bg-dark-800 p-4 text-center"
        >
          <div class="text-3xl font-black text-white">
            {{ libraryStats.ultra }}
          </div>
          <div class="text-xs font-bold uppercase text-success">
            Ultra Ready
          </div>
        </div>
        <div
          class="rounded-xl border border-dark-700 bg-dark-800 p-4 text-center"
        >
          <div class="text-3xl font-black text-white">
            {{ libraryStats.high }}
          </div>
          <div class="text-xs font-bold uppercase text-primary">
            High Settings
          </div>
        </div>
        <div
          class="rounded-xl border border-dark-700 bg-dark-800 p-4 text-center"
        >
          <div class="text-3xl font-black text-white">
            {{ libraryStats.playable }}
          </div>
          <div class="text-xs font-bold uppercase text-warning">Playable</div>
        </div>
        <div
          class="rounded-xl border border-dark-700 bg-dark-800 p-4 text-center"
        >
          <div class="text-3xl font-black text-white">
            {{ libraryStats.unplayable }}
          </div>
          <div class="text-xs font-bold uppercase text-error">Unplayable</div>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="game in sortedGames"
          :key="game.slug"
          class="group relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-900 transition-all hover:-translate-y-1 hover:border-primary/50"
        >
          <div class="aspect-video w-full overflow-hidden">
            <img
              :src="
                game.image ||
                'https://placehold.co/600x400/1e293b/475569?text=' + game.name
              "
              class="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-100"
            />
          </div>

          <div class="absolute right-3 top-3">
            <span
              class="rounded px-2 py-1 text-xs font-black uppercase tracking-wide shadow-md"
              :class="getBadgeClass(game.result.settings)"
            >
              {{ game.result.settings }}
            </span>
          </div>

          <div class="p-5">
            <h3
              class="mb-1 line-clamp-1 font-display text-lg font-bold text-white"
            >
              {{ game.name }}
            </h3>

            <div class="mb-4 flex items-baseline gap-2">
              <span class="text-3xl font-black text-white">{{
                game.result.fps
              }}</span>
              <span class="text-xs font-bold text-slate-500">FPS</span>
            </div>

            <div v-if="game.result.cpu.bottleneck > 10" class="mb-4">
              <div
                class="mb-1 flex justify-between text-[10px] uppercase text-slate-500"
              >
                <span>CPU Bottleneck</span>
                <span class="text-error"
                  >{{ game.result.cpu.bottleneck }}%</span
                >
              </div>
              <div class="h-1 w-full rounded-full bg-dark-700">
                <div
                  class="h-full rounded-full bg-error"
                  :style="{ width: game.result.cpu.bottleneck + '%' }"
                ></div>
              </div>
            </div>

            <NuxtLink
              :to="`/optimize/${game.slug}/${myGpu.slug}?cpu=${myCpu.id}&ram=${selectedRam}`"
              class="block w-full rounded bg-dark-700 py-2 text-center text-xs font-bold text-slate-300 transition-colors hover:bg-white hover:text-dark-900"
            >
              View Detailed Report
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-20 text-center">
      <div
        class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-dark-800 text-slate-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <h3 class="mt-6 text-xl font-bold text-white">Build Your Rig Above</h3>
      <p class="mt-2 text-slate-400">
        Select your hardware to unlock performance data for
        {{ games.length }} games.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta } from 'nuxt/app'
import gpus from '~/data/gpus.json'
import cpus from '~/data/cpus.json'
import games from '~/data/games.json'
import { useOptimization } from '@/composables/useOptimization'

// User Selection
const myGpu = ref<any>(null)
const myCpu = ref<any>(null)

// RAM Options
const ramOptions = [
  { label: '8 GB', value: 8 },
  { label: '16 GB (Standard)', value: 16 },
  { label: '32 GB (Recommended)', value: 32 },
  { label: '64 GB (Extreme)', value: 64 }
]
const selectedRam = ref(ramOptions[1])

// Calculate performance for EVERY game
const computedGames = computed(() => {
  if (!myGpu.value || !myCpu.value) return []

  return games.map(game => {
    const result = useOptimization(
      myGpu.value,
      myCpu.value,
      selectedRam.value,
      game
    )
    return {
      ...game,
      image: game.imageUltra, // Use the ultra image for thumbnail
      result
    }
  })
})

// Sort games: Playable first, then by popularity (simulated by array order)
const sortedGames = computed(() => {
  return [...computedGames.value].sort((a, b) => b.result.fps - a.result.fps)
})

// Stats for the Summary Dashboard
const libraryStats = computed(() => {
  const stats = { ultra: 0, high: 0, playable: 0, unplayable: 0 }

  computedGames.value.forEach(g => {
    if (g.result.fps >= 60 && g.result.settings === 'Ultra') stats.ultra++
    else if (g.result.fps >= 60) stats.high++
    else if (g.result.fps >= 30) stats.playable++
    else stats.unplayable++
  })

  return stats
})

// UI Helper
const getBadgeClass = (settings: string) => {
  switch (settings) {
    case 'Ultra':
      return 'bg-success text-dark-950'
    case 'High':
      return 'bg-primary text-dark-950'
    case 'Medium':
      return 'bg-warning text-dark-950'
    default:
      return 'bg-error text-white'
  }
}

// SEO
useSeoMeta({
  title: 'What Can I Play? - PC Performance Calculator',
  description:
    'Enter your PC specs and instantly check FPS for over 100+ games. Find out what your computer can run.'
})
</script>
