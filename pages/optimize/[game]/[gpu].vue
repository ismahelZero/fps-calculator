<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-slate-100"
  >
    <nav class="mb-8 text-sm text-slate-400">
      <NuxtLink to="/" class="hover:text-white">Home</NuxtLink> / optimize /
      {{ game.slug }}
    </nav>

    <main
      class="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-2xl"
    >
      <div class="mb-10 text-center">
        <h1 class="mb-2 text-3xl font-bold md:text-5xl">
          <span class="text-indigo-400">{{ game.name }}</span>
          <span class="px-2 text-2xl text-slate-500">on</span>
          <span>{{ gpu.name }}</span>
        </h1>
        <p class="mt-2 text-slate-400">
          Performance Report & Optimization Guide
        </p>
      </div>

      <div class="mb-8 grid grid-cols-2 gap-4">
        <div
          class="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-center"
        >
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400">
            Settings
          </p>
          <p class="mt-2 text-4xl font-black" :class="result.badgeColor">
            {{ result.settings }}
          </p>
        </div>
        <div
          class="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 text-center"
        >
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400">
            Est. FPS
          </p>
          <p class="mt-2 text-4xl font-black text-white">{{ result.fps }}</p>
        </div>
      </div>

      <div class="prose prose-invert mb-8 max-w-none">
        <p class="text-lg leading-relaxed">
          The <strong>{{ gpu.name }}</strong> ({{ gpu.vram }}GB VRAM) running
          <strong>{{ game.name }}</strong> results in a
          <span :class="result.badgeColor" class="font-bold">{{
            result.description
          }}</span>
        </p>
        <p
          v-if="result.vramWarning"
          class="rounded border border-yellow-700/50 bg-yellow-900/20 p-3 text-sm text-yellow-300"
        >
          ⚠️ {{ result.vramWarning }}
        </p>
      </div>

      <a
        :href="gpu.affiliateLink"
        target="_blank"
        class="group block w-full rounded-xl bg-indigo-600 py-4 text-center font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-indigo-500/25"
      >
        Check {{ gpu.name }} Price
        <span
          class="ml-2 inline-block transition-transform group-hover:translate-x-1"
          >→</span
        >
      </a>
    </main>

    <footer class="mt-12 text-sm text-slate-500">
      Generated automatically by MyFPS
    </footer>
  </div>
</template>

<script setup lang="ts">
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import { useRoute } from 'vue-router'
import { useOptimization } from '@/composables/useOptimization'
import { createError, useSeoMeta } from 'nuxt/app'

const route = useRoute()
const { game: gameSlug, gpu: gpuSlug } = route.params

// 1. Find Data
const game = games.find(g => g.slug === gameSlug)
const gpu = gpus.find(g => g.slug === gpuSlug)

// 2. Handle 404
if (!game || !gpu) {
  throw createError({ statusCode: 404, statusMessage: 'Combination Not Found' })
}

// 3. Run Logic
const result = useOptimization(gpu, game)

// 4. SEO Tags
useSeoMeta({
  title: `${game.name} settings for ${gpu.name} - FPS Guide`,
  description: `Can the ${gpu.name} run ${game.name}? We recommend ${result.settings} settings.`
})
</script>
