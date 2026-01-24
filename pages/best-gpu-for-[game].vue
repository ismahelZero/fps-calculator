<template>
  <div class="relative min-h-screen overflow-hidden font-sans text-white">
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]"
    ></div>
    <div
      class="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
    ></div>

    <div class="container relative z-10 mx-auto px-4 py-12">
      <FBreadcrumb
        :links="[
          { label: 'Home', to: '/' },
          { label: 'Best GPUs', to: '/' },
          { label: game.name }
        ]"
        class="mb-8"
      />

      <header class="mb-12 text-center">
        <h1 class="mb-6 font-display text-4xl font-black md:text-6xl">
          Best GPUs for <span class="text-primary">{{ game.name }}</span>
        </h1>
        <p class="mx-auto max-w-3xl text-xl text-slate-400">
          We analyzed performance data to find the best graphics cards for
          {{ game.name }} at 1080p, 1440p, and 4K.
        </p>
      </header>

      <div
        class="relative mx-auto mb-16 h-64 w-full max-w-4xl overflow-hidden rounded-3xl border border-dark-700 shadow-2xl md:h-96"
      >
        <img
          :src="
            game.imageUltra ||
            'https://placehold.co/800x450/0f172a/06b6d4/png?text=Ultra+Settings'
          "
          class="h-full w-full object-cover opacity-80"
          alt="Game Benchmark Visual"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"
        ></div>

        <div class="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <div class="flex flex-wrap gap-3">
            <div
              class="border-dark-600 rounded-lg border bg-dark-900/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-md"
            >
              <span class="text-slate-400">Tier:</span>
              <span class="text-primary">{{
                game.requirements.gpu.ultra >= 90 ? 'Extreme' : 'Standard'
              }}</span>
            </div>
            <div
              class="border-dark-600 rounded-lg border bg-dark-900/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-md"
            >
              <span class="text-slate-400">Rec. RAM:</span>
              <span class="text-secondary"
                >{{ game.requirements.ram.rec }}GB</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <div
          class="relative flex flex-col justify-between rounded-3xl border border-purple-500/30 bg-dark-900 p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
        >
          <div
            class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-6 py-1 text-xs font-black uppercase tracking-widest text-white shadow-lg"
          >
            Ultimate 4K Experience
          </div>

          <div>
            <h3
              class="mb-2 text-center font-display text-2xl font-bold text-white"
            >
              {{ picks.ultimate.name }}
            </h3>
            <div class="mb-6 flex justify-center gap-2">
              <span
                class="rounded bg-dark-800 px-2 py-1 text-xs font-bold text-purple-400"
                >Ultra Settings</span
              >
              <span
                class="rounded bg-dark-800 px-2 py-1 text-xs font-bold text-purple-400"
                >{{ picks.ultimate.fps }} FPS</span
              >
            </div>

            <p class="mb-6 text-center text-sm text-slate-400">
              Destroy {{ game.name }} at max settings. Zero compromises. The
              best performance money can buy.
            </p>
          </div>

          <div class="mt-auto">
            <a
              :href="getLink(picks.ultimate.name)"
              target="_blank"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-4 font-bold text-white transition-all hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-900/50"
            >
              Check Price ↗
            </a>
          </div>
        </div>

        <div
          class="relative flex flex-col justify-between rounded-3xl border border-primary/30 bg-dark-800 p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] lg:-mt-8 lg:mb-8"
        >
          <div
            class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-1 text-xs font-black uppercase tracking-widest text-dark-950 shadow-lg shadow-primary/20"
          >
            Best Overall Value
          </div>

          <div>
            <h3
              class="mb-2 text-center font-display text-3xl font-bold text-white"
            >
              {{ picks.value.name }}
            </h3>
            <div class="mb-6 flex justify-center gap-2">
              <span
                class="rounded bg-dark-900 px-2 py-1 text-xs font-bold text-primary"
                >High Settings</span
              >
              <span
                class="rounded bg-dark-900 px-2 py-1 text-xs font-bold text-primary"
                >{{ picks.value.fps }} FPS</span
              >
            </div>

            <p class="mb-6 text-center text-sm text-slate-300">
              The perfect balance of price and performance. Runs
              {{ game.name }} smoothly without breaking the bank.
            </p>
          </div>

          <div class="mt-auto">
            <a
              :href="getLink(picks.value.name)"
              target="_blank"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-dark-950 transition-all hover:bg-white hover:shadow-lg hover:shadow-primary/50"
            >
              Check Price ↗
            </a>
          </div>
        </div>

        <div
          class="relative flex flex-col justify-between rounded-3xl border border-dark-700 bg-dark-900 p-8"
        >
          <div
            class="border-dark-600 absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border bg-dark-700 px-6 py-1 text-xs font-black uppercase tracking-widest text-slate-300"
          >
            Budget 1080p
          </div>

          <div>
            <h3
              class="mb-2 text-center font-display text-2xl font-bold text-white"
            >
              {{ picks.budget.name }}
            </h3>
            <div class="mb-6 flex justify-center gap-2">
              <span
                class="rounded bg-dark-800 px-2 py-1 text-xs font-bold text-slate-400"
                >Med/High</span
              >
              <span
                class="rounded bg-dark-800 px-2 py-1 text-xs font-bold text-slate-400"
                >{{ picks.budget.fps }} FPS</span
              >
            </div>

            <p class="mb-6 text-center text-sm text-slate-400">
              Great entry-level performance. Delivers a solid 60 FPS experience
              at 1080p.
            </p>
          </div>

          <div class="mt-auto">
            <a
              :href="getLink(picks.budget.name)"
              target="_blank"
              class="hover:bg-dark-600 flex w-full items-center justify-center gap-2 rounded-xl bg-dark-700 py-4 font-bold text-white transition-all hover:text-primary"
            >
              Check Price ↗
            </a>
          </div>
        </div>
      </div>

      <article
        class="prose prose-invert prose-lg mx-auto mt-20 max-w-3xl text-slate-400"
      >
        <h3>Choosing a Graphics Card for {{ game.name }}</h3>
        <p>
          {{ game.name }} is a demanding title, requiring a GPU that can handle
          complex shaders and textures. Our recommendations above are based on
          achieving a stable 60 FPS at different resolution targets.
        </p>
        <p>
          If you are building a new PC for {{ game.name }}, we highly recommend
          pairing these GPUs with at least
          <strong class="text-white"
            >{{ game.requirements.ram.rec }}GB of RAM</strong
          >
          and a modern CPU to avoid bottlenecks.
        </p>

        <div class="mt-8 rounded-2xl bg-dark-800 p-6">
          <h4 class="mt-0 text-white">Full PC Build Recommendation</h4>
          <p class="text-sm">
            Want to see a complete parts list compatible with the
            <strong>{{ picks.value.name }}</strong
            >?
          </p>
          <NuxtLink
            :to="`/build`"
            class="font-bold text-primary no-underline hover:underline"
          >
            Go to PC Builder →
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { createError, useSeoMeta, useHead } from 'nuxt/app'
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import { useOptimization } from '@/composables/useOptimization'
import { useAffiliate } from '@/composables/useAffiliate'

const route = useRoute()
const { getLink } = useAffiliate()

// 1. Get Game Data
const gameSlug = route.params.game as string
const game = games.find(g => g.slug === gameSlug)

if (!game) {
  throw createError({ statusCode: 404, statusMessage: 'Game Not Found' })
}

// 2. Logic: Find the Best GPUs
// We use a "Reference High-End CPU" (i9-14900K score ~100) to ensure we measure pure GPU power without CPU bottlenecks.
const referenceCpu = { id: 'ref', name: 'Reference CPU', score: 100, cores: 24 }
const referenceRam = 32

const picks = computed(() => {
  // Sort all GPUs by score (descending)
  const sorted = [...gpus].sort((a, b) => b.score - a.score)

  // A. ULTIMATE: The single most powerful card
  const ultimate = sorted[0]
  const ultimateResult = useOptimization(
    ultimate,
    referenceCpu,
    referenceRam,
    game
  )

  // B. VALUE: The first card that hits ~60 FPS on "High" settings (approx score 60-80 range)
  // We look for a card with score around 70-80, or fall back to 60.
  let value = sorted.find(g => g.score <= 85 && g.score >= 60) || sorted[5]
  const valueResult = useOptimization(value, referenceCpu, referenceRam, game)

  // C. BUDGET: The card that hits ~60 FPS on "Medium" (approx score 30-50 range)
  let budget =
    sorted.find(g => g.score <= 50 && g.score >= 30) ||
    sorted[sorted.length - 5]
  const budgetResult = useOptimization(budget, referenceCpu, referenceRam, game)

  return {
    ultimate: { ...ultimate, fps: ultimateResult.fps },
    value: { ...value, fps: valueResult.fps },
    budget: { ...budget, fps: budgetResult.fps }
  }
})

// 3. SEO Meta
useSeoMeta({
  title: `Best GPU for ${game.name} - 2024 Benchmark Guide`,
  description: `Top 3 graphics cards for ${game.name}. 1080p, 1440p, and 4K benchmarks. Find the best budget and high-end GPUs for smooth 60FPS gameplay.`,
  ogTitle: `Best Graphics Cards for ${game.name}`,
  ogDescription: `Benchmarks and recommendations: What GPU do you need for ${game.name}?`,
  ogImage: game.imageUltra // Use the generated game image
})

// 4. Schema Markup (Article)
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `Best GPUs for ${game.name}`,
  image: [game.imageUltra],
  datePublished: '2024-01-20',
  author: [{ '@type': 'Organization', name: 'FPS Calculator' }]
}

useHead({
  script: [
    {
      key: 'schema-article',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema)
    }
  ]
})
</script>
