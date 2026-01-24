<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">

    <nav class="mb-8 text-sm text-slate-400">
      <NuxtLink to="/" class="hover:text-white">Home</NuxtLink> / optimize / {{ game.slug }}
    </nav>

    <main class="w-full max-w-2xl bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">

      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-5xl font-bold mb-2">
          <span class="text-indigo-400">{{ game.name }}</span>
          <span class="text-slate-500 text-2xl px-2">on</span>
          <span>{{ gpu.name }}</span>
        </h1>
        <p class="text-slate-400 mt-2">Performance Report & Optimization Guide</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-slate-900/50 p-6 rounded-2xl text-center border border-slate-700">
          <p class="text-slate-400 text-xs uppercase font-bold tracking-widest">Settings</p>
          <p class="text-4xl font-black mt-2" :class="result.badgeColor">{{ result.settings }}</p>
        </div>
        <div class="bg-slate-900/50 p-6 rounded-2xl text-center border border-slate-700">
          <p class="text-slate-400 text-xs uppercase font-bold tracking-widest">Est. FPS</p>
          <p class="text-4xl font-black mt-2 text-white">{{ result.fps }}</p>
        </div>
      </div>

      <div class="prose prose-invert max-w-none mb-8">
        <p class="text-lg leading-relaxed">
          The <strong>{{ gpu.name }}</strong> ({{ gpu.vram }}GB VRAM) running <strong>{{ game.name }}</strong> results in a
          <span :class="result.badgeColor" class="font-bold">{{ result.description }}</span>
        </p>
        <p v-if="result.vramWarning" class="text-yellow-300 bg-yellow-900/20 p-3 rounded border border-yellow-700/50 text-sm">
          ⚠️ {{ result.vramWarning }}
        </p>
      </div>

      <a :href="gpu.affiliateLink" target="_blank"
         class="group block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-center py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25">
        Check {{ gpu.name }} Price
        <span class="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </a>

    </main>

    <footer class="mt-12 text-slate-500 text-sm">
      Generated automatically by Nuxt 4 Engine
    </footer>
  </div>
</template>

<script setup lang="ts">
import { gpus } from '../../../server/data/gpus'
import { games } from '../../../server/data/games'
import {createError, useRoute, useSeoMeta} from "nuxt/app";
import {useOptimization} from "../../../composables/useOptimization";

const route = useRoute()
const { game: gameSlug, gpu: gpuSlug } = route.params

// 1. Find Data (Simulating a DB lookup)
const game = games.find(g => g.slug === gameSlug)
const gpu = gpus.find(g => g.slug === gpuSlug)

// 2. Handle 404
if (!game || !gpu) {
  throw createError({ statusCode: 404, statusMessage: 'Combination Not Found' })
}

// 3. Run Logic
const result = useOptimization(gpu, game)

// 4. SEO Tags (Crucial for Money)
useSeoMeta({
  title: `${game.name} settings for ${gpu.name} - FPS Guide`,
  description: `Can the ${gpu.name} run ${game.name}? We recommend ${result.settings} settings.`,
})
</script>
