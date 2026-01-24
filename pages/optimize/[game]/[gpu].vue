<template>
  <div
    class="flex flex-col items-center justify-center p-6 font-sans text-slate-100"
  >
    <div class="mb-6 w-full max-w-4xl">
      <FBreadcrumb
        :links="[
          { label: 'Home', to: '/' },
          { label: 'Optimize', to: '/' },
          { label: game.name }
        ]"
      />
    </div>

    <main
      class="w-full max-w-4xl rounded-3xl border border-dark-700 bg-dark-800/80 p-8 shadow-2xl backdrop-blur-sm"
    >
      <div class="mb-10 text-center">
        <h1 class="mb-2 font-display text-3xl font-bold md:text-5xl">
          <span class="text-primary">{{ game.name }}</span>
          <span class="px-2 font-sans text-2xl font-normal text-slate-500"
            >on</span
          >
          <span class="text-white">{{ gpu.name }}</span>
        </h1>
        <p class="mt-2 text-slate-400">System Performance Report</p>
      </div>

      <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          class="rounded-2xl border border-dark-700 bg-dark-900/50 p-6 text-center"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            Est. FPS
          </p>
          <p class="mt-2 font-display text-4xl font-black text-white">
            {{ result.fps }}
          </p>
          <p class="mt-1 text-sm font-bold" :class="result.badgeColor">
            {{ result.settings }} Settings
          </p>
        </div>
        <div
          class="rounded-2xl border border-dark-700 bg-dark-900/50 p-6 text-center"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            CPU Status
          </p>
          <div v-if="cpu">
            <p
              class="mt-2 line-clamp-1 font-display text-xl font-bold text-white"
            >
              {{ cpu.name }}
            </p>
            <p
              v-if="result.cpu.bottleneck > 0"
              class="mt-1 text-sm font-bold text-error"
            >
              {{ result.cpu.bottleneck }}% Bottleneck
            </p>
            <p v-else class="mt-1 text-sm font-bold text-success">Good Match</p>
          </div>
          <div v-else>
            <p class="mt-4 text-sm text-slate-600">No CPU Selected</p>
          </div>
        </div>
        <div
          class="rounded-2xl border border-dark-700 bg-dark-900/50 p-6 text-center"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            RAM Status
          </p>
          <p class="mt-2 font-display text-xl font-bold text-white">
            {{ ram }} GB
          </p>
          <p
            v-if="result.ram === 'Critical'"
            class="mt-1 text-sm font-bold text-error"
          >
            Upgrade Needed
          </p>
          <p
            v-else-if="result.ram === 'Low'"
            class="mt-1 text-sm font-bold text-warning"
          >
            Minimum Met
          </p>
          <p v-else class="mt-1 text-sm font-bold text-success">Optimal</p>
        </div>
      </div>

      <div class="prose prose-invert mb-10 max-w-none text-center">
        <p class="text-lg leading-relaxed">{{ result.description }}</p>
        <div
          v-if="result.vramWarning"
          class="mt-4 inline-block rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm font-medium text-warning"
        >
          ⚠️ {{ result.vramWarning }}
        </div>
      </div>

      <div v-if="result.upgrades.length > 0" class="mb-8">
        <h3
          class="mb-4 text-center font-display text-lg font-bold uppercase tracking-widest text-slate-300"
        >
          Recommended Upgrades
        </h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div
            v-for="(upgrade, index) in result.upgrades"
            :key="index"
            class="flex flex-col justify-between rounded-xl border border-primary/20 bg-dark-900/80 p-5 shadow-neon-primary transition-all hover:scale-[1.02]"
          >
            <div>
              <div class="mb-2 flex items-center gap-2">
                <span
                  class="rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary"
                  >{{ upgrade.type }}</span
                >
                <h4 class="font-bold text-white">{{ upgrade.title }}</h4>
              </div>
              <p class="mb-4 text-sm text-slate-400">{{ upgrade.reason }}</p>
            </div>
            <a
              :href="upgrade.link"
              target="_blank"
              class="block w-full rounded-lg bg-primary py-2 text-center text-sm font-bold text-dark-950 transition-colors hover:bg-primary-dim"
            >
              {{ upgrade.btnText }} →
            </a>
          </div>
        </div>
      </div>

      <div v-if="result.upgrades.length === 0">
        <a
          :href="gpu.affiliateLink"
          target="_blank"
          class="group block w-full rounded-xl bg-secondary py-4 text-center font-display font-bold text-white shadow-neon-secondary transition-all hover:scale-[1.01] hover:bg-secondary-dim"
        >
          Check Current GPU Price
          <span
            class="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import cpus from '~/data/cpus.json'
import { useRoute } from 'vue-router'
import { useOptimization } from '@/composables/useOptimization'
import { createError, useSeoMeta } from 'nuxt/app'

const route = useRoute()
const { game: gameSlug, gpu: gpuSlug } = route.params
const { cpu: cpuId, ram: ramAmount } = route.query

const game = games.find(g => g.slug === gameSlug)
const gpu = gpus.find(g => g.slug === gpuSlug)
const cpu = cpus.find(c => c.id === cpuId) || null
const ram = Number(ramAmount) || 16

if (!game || !gpu) {
  throw createError({ statusCode: 404, statusMessage: 'Combination Not Found' })
}

const result = useOptimization(gpu, cpu, ram, game)

useSeoMeta({
  title: `${game.name} on ${gpu.name} - FPS & Upgrade Guide`,
  description: `Performance report for ${gpu.name} paired with ${cpu ? cpu.name : 'CPU'} in ${game.name}. Estimated FPS: ${result.fps}.`
})
</script>
