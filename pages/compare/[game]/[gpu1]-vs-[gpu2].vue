<template>
  <div class="min-h-screen bg-dark-950 p-4 font-sans text-white">
    <nav
      class="container mx-auto mb-8 flex items-center justify-between py-6 text-sm text-slate-400"
    >
      <NuxtLink to="/compare" class="hover:text-primary"
        >← New Comparison</NuxtLink
      >
      <span>{{ game.name }} Benchmark</span>
    </nav>

    <main class="container mx-auto max-w-6xl">
      <div class="mb-16 text-center">
        <h1 class="mb-4 font-display text-4xl font-black md:text-6xl">
          <span class="text-primary">{{ gpu1.name }}</span>
          <span class="mx-4 align-middle text-2xl text-slate-600">VS</span>
          <span class="text-secondary">{{ gpu2.name }}</span>
        </h1>
        <div
          v-if="winner"
          class="inline-block rounded-full border border-success/30 bg-dark-800 px-6 py-2 font-bold text-success"
        >
          🏆 Winner: {{ winner.name }} is {{ diffPercent }}% Faster
        </div>
        <div
          v-else
          class="inline-block rounded-full bg-dark-800 px-6 py-2 font-bold text-slate-400"
        >
          It's a Tie!
        </div>
      </div>

      <div class="relative grid grid-cols-1 gap-8 md:grid-cols-2">
        <div
          class="absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dark-700 bg-dark-950 font-black md:flex"
        >
          VS
        </div>

        <div
          class="group relative overflow-hidden rounded-3xl border border-primary/20 bg-dark-900/50 p-8 transition-all hover:border-primary/50"
        >
          <div class="absolute left-0 top-0 h-1 w-full bg-primary"></div>
          <h2 class="mb-6 font-display text-2xl font-bold text-slate-300">
            {{ gpu1.name }}
          </h2>

          <div class="py-8 text-center">
            <div class="mb-2 font-display text-6xl font-black text-white">
              {{ res1.fps }}
            </div>
            <div
              class="text-sm font-bold uppercase tracking-widest text-primary"
            >
              Est. FPS
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between border-b border-dark-700 pb-2">
              <span class="text-slate-500">Settings</span>
              <span :class="res1.badgeColor" class="font-bold">{{
                res1.settings
              }}</span>
            </div>
            <div class="flex justify-between border-b border-dark-700 pb-2">
              <span class="text-slate-500">VRAM</span>
              <span>{{ gpu1.vram }} GB</span>
            </div>
            <div class="flex justify-between border-b border-dark-700 pb-2">
              <span class="text-slate-500">Performance Score</span>
              <span>{{ gpu1.score }} / 100</span>
            </div>
          </div>

          <a
            :href="gpu1.affiliateLink"
            target="_blank"
            class="mt-8 block w-full rounded-xl bg-primary/10 py-3 text-center font-bold text-primary transition-all hover:bg-primary hover:text-dark-950"
          >
            See {{ gpu1.name }} Price
          </a>
        </div>

        <div
          class="group relative overflow-hidden rounded-3xl border border-secondary/20 bg-dark-900/50 p-8 transition-all hover:border-secondary/50"
        >
          <div class="absolute left-0 top-0 h-1 w-full bg-secondary"></div>
          <h2 class="mb-6 font-display text-2xl font-bold text-slate-300">
            {{ gpu2.name }}
          </h2>

          <div class="py-8 text-center">
            <div class="mb-2 font-display text-6xl font-black text-white">
              {{ res2.fps }}
            </div>
            <div
              class="text-sm font-bold uppercase tracking-widest text-secondary"
            >
              Est. FPS
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between border-b border-dark-700 pb-2">
              <span class="text-slate-500">Settings</span>
              <span :class="res2.badgeColor" class="font-bold">{{
                res2.settings
              }}</span>
            </div>
            <div class="flex justify-between border-b border-dark-700 pb-2">
              <span class="text-slate-500">VRAM</span>
              <span>{{ gpu2.vram }} GB</span>
            </div>
            <div class="flex justify-between border-b border-dark-700 pb-2">
              <span class="text-slate-500">Performance Score</span>
              <span>{{ gpu2.score }} / 100</span>
            </div>
          </div>

          <a
            :href="gpu2.affiliateLink"
            target="_blank"
            class="mt-8 block w-full rounded-xl bg-secondary/10 py-3 text-center font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
          >
            See {{ gpu2.name }} Price
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useOptimization } from '@/composables/useOptimization'
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import { createError, useSeoMeta } from 'nuxt/app'

const route = useRoute()
const { game: gameSlug } = route.params

const slug1 = route.params.gpu1
const slug2 = route.params.gpu2

// Data Fetching
const game = games.find(g => g.slug === gameSlug)
const gpu1 = gpus.find(g => g.slug === slug1)
const gpu2 = gpus.find(g => g.slug === slug2)

if (!game || !gpu1 || !gpu2) {
  throw createError({ statusCode: 404, statusMessage: 'Comparison Not Found' })
}

// Run Logic Twice
// Note: We pass null for CPU/RAM to assume "standard" specs for fair GPU comparison
const res1 = useOptimization(gpu1, null, 16, game)
const res2 = useOptimization(gpu2, null, 16, game)

// Calculate Difference
const fpsDiff = res2.fps - res1.fps
const winner = fpsDiff > 0 ? gpu2 : fpsDiff < 0 ? gpu1 : null
const diffPercent = Math.round(
  (Math.abs(fpsDiff) / Math.min(res1.fps, res2.fps)) * 100
)

// SEO
useSeoMeta({
  title: `${gpu1.name} vs ${gpu2.name} - Which runs ${game.name} better?`,
  description: `Head-to-head comparison: ${gpu1.name} vs ${gpu2.name} in ${game.name}. See FPS benchmarks and find the winner.`
})
</script>
