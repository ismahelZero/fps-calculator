<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-dark-950 p-6 font-sans text-slate-100"
  >
    <nav class="mb-8 text-sm text-slate-400">
      <NuxtLink to="/" class="transition-colors hover:text-primary"
        >Home</NuxtLink
      >
      <span class="mx-2 text-dark-700">/</span> optimize
      <span class="mx-2 text-dark-700">/</span> {{ game.slug }}
    </nav>

    <main
      class="w-full max-w-2xl rounded-3xl border border-dark-700 bg-dark-800/80 p-8 shadow-2xl backdrop-blur-sm"
    >
      <div class="mb-10 text-center">
        <h1 class="mb-2 font-display text-3xl font-bold md:text-5xl">
          <span class="text-primary">{{ game.name }}</span>
          <span class="px-2 font-sans text-2xl font-normal text-slate-500"
            >on</span
          >
          <span class="text-white">{{ gpu.name }}</span>
        </h1>
        <p class="mt-2 text-slate-400">
          Performance Report & Optimization Guide
        </p>
      </div>

      <div class="mb-8 grid grid-cols-2 gap-4">
        <div
          class="rounded-2xl border border-dark-700 bg-dark-900/50 p-6 text-center transition-all hover:border-primary/30"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            Settings
          </p>
          <p
            class="mt-2 font-display text-4xl font-black"
            :class="result.badgeColor"
          >
            {{ result.settings }}
          </p>
        </div>
        <div
          class="rounded-2xl border border-dark-700 bg-dark-900/50 p-6 text-center transition-all hover:border-success/30"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            Est. FPS
          </p>
          <p class="mt-2 font-display text-4xl font-black text-white">
            {{ result.fps }}
          </p>
        </div>
      </div>

      <div class="prose prose-invert mb-8 max-w-none">
        <p class="text-lg leading-relaxed">
          The <strong class="text-white">{{ gpu.name }}</strong> ({{
            gpu.vram
          }}GB VRAM) running
          <strong class="text-white">{{ game.name }}</strong> results in a
          <span :class="result.badgeColor" class="font-bold">{{
            result.description
          }}</span>
        </p>
        <p
          v-if="result.vramWarning"
          class="rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm font-medium text-warning"
        >
          ⚠️ {{ result.vramWarning }}
        </p>
      </div>

      <a
        :href="gpu.affiliateLink"
        target="_blank"
        class="group block w-full rounded-xl bg-primary py-4 text-center font-display font-bold text-dark-950 shadow-neon-primary transition-all hover:scale-[1.01] hover:bg-primary-dim"
      >
        Check {{ gpu.name }} Price
        <span
          class="ml-2 inline-block transition-transform group-hover:translate-x-1"
          >→</span
        >
      </a>
    </main>

    <footer class="mt-12 font-display text-sm text-slate-600">
      Generated automatically by <span class="text-slate-500">MyFPS</span>
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
