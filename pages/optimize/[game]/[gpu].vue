<template>
  <div class="container mx-auto flex flex-col items-center px-4 py-12">
    <div class="mb-6 w-full">
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

      <div class="mb-12 flex flex-col items-center justify-center">
        <div
          class="relative w-full max-w-md rounded-3xl border border-dark-700 bg-dark-900/80 p-8 text-center shadow-2xl transition-all hover:border-primary/30"
        >
          <div v-if="result.ai.enabled" class="absolute right-4 top-4">
            <button
              @click="useAi = !useAi"
              class="flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition-all"
              :class="
                useAi
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-dark-600 bg-dark-800 text-slate-500 hover:border-slate-400'
              "
            >
              <span
                class="h-2 w-2 rounded-full transition-colors"
                :class="
                  useAi ? 'bg-primary shadow-[0_0_8px_cyan]' : 'bg-slate-600'
                "
              ></span>
              {{ result.ai.tech }}
            </button>
          </div>

          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            Estimated Performance
          </p>

          <div class="my-4 flex items-baseline justify-center gap-2">
            <span
              class="font-display text-7xl font-black text-white transition-all duration-300"
            >
              {{ useAi ? result.ai.fps : result.fps }}
            </span>
            <span class="text-xl font-bold text-slate-400">FPS</span>
          </div>

          <p class="text-sm font-bold" :class="result.badgeColor">
            {{ result.settings }} Settings
          </p>

          <p v-if="useAi" class="mt-2 animate-pulse text-xs text-primary">
            *Boosted by {{ result.ai.tech }} Balanced Mode
          </p>
        </div>
      </div>

      <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
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

      <div class="mb-12">
        <h3
          class="mb-6 text-center font-display text-lg font-bold uppercase tracking-widest text-slate-300"
        >
          Visual Quality Comparison
        </h3>
        <FVisualSlider
          :before-image="
            game.imageLow ||
            'https://placehold.co/800x400/1e293b/FFFFFF/png?text=Low+Settings'
          "
          :after-image="
            game.imageUltra ||
            'https://placehold.co/800x400/0f172a/06b6d4/png?text=Ultra+Settings'
          "
          before-label="Low Settings"
          after-label="Ultra Settings"
        />
        <p class="mt-4 text-center text-xs text-slate-500">
          Drag the slider to compare visual fidelity.
        </p>
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
import { ref } from 'vue'
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import cpus from '~/data/cpus.json'
import { useRoute } from 'vue-router'
import { useOptimization } from '@/composables/useOptimization'
import { createError, useSeoMeta, useHead } from 'nuxt/app'

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

// State for AI Toggle
const useAi = ref(false)

// --- SEO META TAGS ---
useSeoMeta({
  title: `${game.name} System Requirements on ${gpu.name}`,
  description: `Can ${gpu.name} run ${game.name}? Yes! It achieves ${result.fps} FPS at ${result.settings} settings. Check full performance benchmarks here.`,
  ogTitle: `${game.name} on ${gpu.name} - FPS Test`,
  ogDescription: `Performance results: ${result.fps} FPS on ${result.settings} settings.`
})

// --- SCHEMA MARKUP (Rich Snippets) ---
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `Can I run ${game.name} on ${gpu.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Yes, the ${gpu.name} can run ${game.name} at an estimated ${result.fps} FPS on ${result.settings} settings.`
      }
    },
    {
      '@type': 'Question',
      name: `What FPS will I get in ${game.name} with ${gpu.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `You can expect around ${result.fps} FPS at ${result.settings} graphics settings.`
      }
    }
  ]
}

useHead({
  script: [
    {
      key: 'schema-faq',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema)
    }
  ]
})
</script>
