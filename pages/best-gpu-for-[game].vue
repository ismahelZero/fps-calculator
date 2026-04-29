<template>
  <div
    class="min-h-screen bg-dark-950 font-sans text-white selection:bg-primary selection:text-dark-950"
  >
    <div class="pointer-events-none fixed inset-0">
      <div
        class="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"
      ></div>
      <div
        class="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[100px]"
      ></div>
    </div>

    <div class="container relative mx-auto px-4 py-8">
      <FBreadcrumb
        :links="[
          { label: 'Home', to: '/' },
          { label: 'Best GPUs', to: '/' },
          { label: game.name }
        ]"
        class="mb-8"
      />

      <div class="grid gap-12 lg:grid-cols-12">
        <aside class="lg:col-span-4 xl:col-span-3">
          <div class="sticky top-8 space-y-8">
            <div
              class="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-dark-700 shadow-2xl"
            >
              <img
                :src="
                  game.imageUltra ||
                  'https://placehold.co/600x800/0f172a/06b6d4/png?text=Cover+Art'
                "
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Game Cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent"
              ></div>

              <div class="absolute bottom-6 left-6 right-6">
                <h1
                  class="font-display text-3xl font-bold leading-tight text-white shadow-black drop-shadow-md"
                >
                  {{ game.name }}
                </h1>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    class="border-dark-600 inline-flex items-center rounded-md border bg-dark-800/80 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
                  >
                    {{ game.genre || 'Action' }}
                  </span>
                  <span
                    class="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm"
                  >
                    High Demand
                  </span>
                </div>
              </div>
            </div>

            <div
              class="rounded-2xl border border-dark-700 bg-dark-800/50 p-6 backdrop-blur-xl"
            >
              <div class="mb-4 flex items-center justify-between">
                <h2
                  class="text-sm font-bold uppercase tracking-widest text-slate-400"
                >
                  Your Config
                </h2>
                <div
                  v-if="selectedCpu"
                  class="h-2 w-2 animate-pulse rounded-full bg-success shadow-[0_0_8px_#4ade80]"
                ></div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="mb-2 block text-xs font-semibold text-slate-500"
                    >Target CPU</label
                  >
                  <FSelect
                    v-model="selectedCpu"
                    :options="cpus"
                    display-key="name"
                    placeholder="Select CPU..."
                    class="w-full"
                  />
                </div>

                <div v-if="selectedCpu" class="rounded-lg bg-dark-900 p-3">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-400">Processor Score</span>
                    <span class="font-mono font-bold text-white"
                      >{{ selectedCpu.score }} pts</span
                    >
                  </div>
                  <div
                    class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-dark-700"
                  >
                    <div
                      class="h-full bg-slate-500"
                      :style="{ width: Math.min(selectedCpu.score, 100) + '%' }"
                    ></div>
                  </div>
                </div>

                <p class="text-xs leading-relaxed text-slate-500">
                  {{
                    selectedCpu
                      ? 'Recommendations are now tailored to avoid bottlenecks with your specific processor.'
                      : 'Select your CPU to filter out graphics cards that are too powerful for your system.'
                  }}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main class="lg:col-span-8 xl:col-span-9">
          <div class="mb-8 border-b border-dark-700 pb-8">
            <h2 class="font-display text-4xl font-bold text-white">
              Top Performance Picks
            </h2>
            <p class="mt-2 text-lg text-slate-400">
              Ranked by efficiency and raw power for
              <span class="text-primary">{{ game.name }}</span
              >.
            </p>
          </div>

          <div class="space-y-6">
            <div
              class="group relative overflow-hidden rounded-2xl border bg-dark-800 transition-all hover:border-primary/50"
              :class="
                picks.ultimate.bottleneck > 15
                  ? 'border-error/30 bg-error/5'
                  : 'border-dark-700'
              "
            >
              <div
                class="absolute -right-12 top-4 w-48 rotate-45 bg-dark-950 py-1 text-center text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm"
              >
                4K Elite
              </div>

              <div class="grid items-center gap-6 p-6 md:grid-cols-12 md:p-8">
                <div
                  class="hidden flex-col items-center justify-center border-r border-dark-700 pr-6 md:col-span-2 md:flex"
                >
                  <span
                    class="font-display text-5xl font-black text-dark-700 transition-colors group-hover:text-white"
                    >01</span
                  >
                </div>

                <div class="md:col-span-6">
                  <h3
                    class="font-display text-2xl font-bold text-white transition-colors group-hover:text-primary"
                  >
                    {{ picks.ultimate.name }}
                  </h3>
                  <div class="mt-2 flex items-center gap-3">
                    <span
                      class="rounded bg-dark-900 px-2 py-1 text-xs font-bold text-slate-300"
                      >Ultra Settings</span
                    >
                    <span class="text-xs text-slate-500">•</span>
                    <span
                      class="text-xs font-bold"
                      :class="
                        picks.ultimate.bottleneck > 15
                          ? 'text-error'
                          : 'text-success'
                      "
                    >
                      {{
                        picks.ultimate.bottleneck > 15
                          ? 'High Bottleneck'
                          : 'Great Match'
                      }}
                    </span>
                  </div>

                  <div class="mt-4">
                    <div
                      class="mb-1 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      <span>CPU Efficiency</span>
                      <span>{{ 100 - picks.ultimate.bottleneck }}%</span>
                    </div>
                    <div
                      class="h-2 w-full overflow-hidden rounded-full bg-dark-900"
                    >
                      <div
                        class="h-full transition-all duration-1000"
                        :class="
                          picks.ultimate.bottleneck > 15
                            ? 'bg-error'
                            : 'bg-success'
                        "
                        :style="{
                          width: 100 - picks.ultimate.bottleneck + '%'
                        }"
                      ></div>
                    </div>
                    <p
                      v-if="picks.ultimate.bottleneck > 15"
                      class="mt-1 text-xs text-error"
                    >
                      ⚠️ Your CPU limits this card's power by ~{{
                        picks.ultimate.bottleneck
                      }}%.
                    </p>
                  </div>
                </div>

                <div
                  class="flex flex-col items-end justify-center gap-4 md:col-span-4"
                >
                  <div class="text-right">
                    <div class="font-display text-5xl font-black text-white">
                      {{ picks.ultimate.fps }}
                    </div>
                    <div class="text-sm font-bold uppercase text-slate-500">
                      FPS Estimate
                    </div>
                  </div>
                  <a
                    :href="getLink(picks.ultimate.name)"
                    target="_blank"
                    class="w-full rounded-lg bg-white py-3 text-center text-sm font-bold text-dark-950 transition-transform hover:scale-105 hover:bg-primary active:scale-95"
                  >
                    View Prices
                  </a>
                </div>
              </div>
            </div>

            <div
              class="relative overflow-hidden rounded-2xl border border-primary bg-dark-800/80 shadow-[0_0_40px_rgba(6,182,212,0.1)]"
            >
              <div class="absolute left-0 top-0 h-full w-1 bg-primary"></div>

              <div class="grid items-center gap-6 p-6 md:grid-cols-12 md:p-8">
                <div
                  class="hidden flex-col items-center justify-center border-r border-dark-700 pr-6 md:col-span-2 md:flex"
                >
                  <span class="font-display text-5xl font-black text-primary"
                    >02</span
                  >
                </div>

                <div class="md:col-span-6">
                  <div class="mb-1 flex items-center gap-2">
                    <span
                      class="inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dark-950"
                    >
                      Recommended
                    </span>
                    <span class="text-xs font-bold text-slate-400"
                      >1440p Target</span
                    >
                  </div>
                  <h3 class="font-display text-2xl font-bold text-white">
                    {{ picks.value.name }}
                  </h3>
                  <p class="mt-2 text-sm text-slate-400">
                    {{
                      selectedCpu
                        ? 'The absolute best performance your CPU can handle without wasting money.'
                        : 'The best balance of price and performance for this title.'
                    }}
                  </p>

                  <div
                    v-if="selectedCpu"
                    class="mt-4 flex items-center gap-3 rounded-lg border border-dark-700/50 bg-dark-900/50 p-2"
                  >
                    <div
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="text-xs">
                      <div class="font-bold text-white">Perfect Match</div>
                      <div class="text-slate-500">0% Performance Waste</div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-col items-end justify-center gap-4 md:col-span-4"
                >
                  <div class="text-right">
                    <div class="font-display text-5xl font-black text-primary">
                      {{ picks.value.fps }}
                    </div>
                    <div class="text-sm font-bold uppercase text-slate-500">
                      FPS Estimate
                    </div>
                  </div>
                  <a
                    :href="getLink(picks.value.name)"
                    target="_blank"
                    class="w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-dark-950 shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                  >
                    Best Deal ↗
                  </a>
                </div>
              </div>
            </div>

            <div
              class="group relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-900 transition-all hover:bg-dark-800"
            >
              <div class="grid items-center gap-6 p-6 md:grid-cols-12 md:p-8">
                <div
                  class="hidden flex-col items-center justify-center border-r border-dark-700 pr-6 md:col-span-2 md:flex"
                >
                  <span
                    class="font-display text-5xl font-black text-dark-700 transition-colors group-hover:text-slate-600"
                    >03</span
                  >
                </div>

                <div class="md:col-span-6">
                  <h3 class="font-display text-xl font-bold text-slate-200">
                    {{ picks.budget.name }}
                  </h3>
                  <div class="mt-1 flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-500"
                      >1080p Entry Level</span
                    >
                  </div>
                  <p class="mt-3 text-sm text-slate-400">
                    Excellent value choice. Capable of running the game smoothly
                    at standard definition without breaking the bank.
                  </p>
                </div>

                <div
                  class="flex flex-col items-end justify-center gap-4 md:col-span-4"
                >
                  <div class="text-right">
                    <div class="font-display text-4xl font-bold text-slate-200">
                      {{ picks.budget.fps }}
                    </div>
                    <div class="text-xs font-bold uppercase text-slate-500">
                      FPS (Medium)
                    </div>
                  </div>
                  <a
                    :href="getLink(picks.budget.name)"
                    target="_blank"
                    class="border-dark-600 w-full rounded-lg border bg-transparent py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white hover:text-dark-950"
                  >
                    Check Price
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-12 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 p-8 text-center"
          >
            <h3 class="mb-2 text-xl font-bold text-white">
              Need a full computer?
            </h3>
            <p class="mb-6 text-slate-400">
              We can help you pick every part around these graphics cards.
            </p>
            <NuxtLink
              to="/build"
              class="inline-flex items-center gap-2 font-bold text-primary hover:text-white hover:underline"
            >
              Go to PC Builder <span>→</span>
            </NuxtLink>
          </div>

          <div
            class="mx-auto mt-16 w-full max-w-5xl rounded-2xl border border-dark-700 bg-dark-900/50 p-8"
          >
            <h2 class="mb-4 text-2xl font-bold text-primary">
              Hardware Requirements for {{ game.name }}
            </h2>

            <div
              class="prose prose-invert max-w-none space-y-4 leading-relaxed text-gray-300"
            >
              <p>
                {{ gameReview }}
              </p>

              <p>
                Our automated tier list above categorizes graphics cards into
                Budget, Recommended, and Enthusiast tiers based on their
                predicted frame rates. We constantly update our benchmark data
                to ensure you are getting accurate recommendations before you
                make a purchase.
              </p>

              <h3 class="mb-2 mt-6 text-xl font-semibold text-white">
                Upgrade Considerations
              </h3>
              <p>
                {{ upgradeAdvice }}
              </p>
            </div>
          </div>
        </main>
      </div>
      <div class="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <article
          class="mb-8 rounded-xl border border-dark-700 bg-dark-900/50 p-6 shadow-lg md:p-8"
        >
          <h1 class="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            Best GPU for {{ gameName || 'this game' }}
          </h1>
          <p class="text-lg leading-relaxed text-gray-300">
            {{ dynamicSeoText }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { createError, useSeoMeta, useHead } from 'nuxt/app'
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import cpus from '~/data/cpus.json'
import { useOptimization } from '@/composables/useOptimization'
import { useAffiliate } from '@/composables/useAffiliate'

const route = useRoute()
const { getLink } = useAffiliate()

// 1. Get Game Data
const gameSlug = route.params.game as string
const game = games.find(g => g.slug === gameSlug)
const gameName = game?.name

if (!game) {
  throw createError({ statusCode: 404, statusMessage: 'Game Not Found' })
}

// 2. User CPU State
const selectedCpu = ref<any>(null)

// 3. Logic: Find the Best GPUs (Responsive to CPU)
const picks = computed(() => {
  // Use selected CPU or a high-end reference to prevent limiting
  const activeCpu = selectedCpu.value || {
    id: 'ref',
    name: 'Reference CPU',
    score: 100
  }
  const ram = 32

  // Sort all GPUs by raw power initially
  const sorted = [...gpus].sort((a, b) => b.score - a.score)

  // A. ULTIMATE: Always the strongest card
  const ultimate = sorted[0]
  const ultimateResult = useOptimization(ultimate, activeCpu, ram, game)

  // B. VALUE / SWEET SPOT:
  // If CPU selected: The strongest card with < 10% bottleneck
  // If no CPU: A mid-high range card (Score ~70-85)
  let value = null

  if (selectedCpu.value) {
    // Iterate from strongest. First one acceptable is the sweet spot.
    value = sorted.find(gpu => {
      const res = useOptimization(gpu, activeCpu, ram, game)
      return res.cpu.bottleneck < 15 // Allow slightly more headroom
    })
  }

  // Fallback / Default
  if (!value) {
    value = sorted.find(g => g.score <= 85 && g.score >= 60) || sorted[5]
  }

  const valueResult = useOptimization(value, activeCpu, ram, game)

  // C. BUDGET: Reliable 1080p card
  let budget =
    sorted.find(g => g.score <= 50 && g.score >= 30) ||
    sorted[sorted.length - 5]
  const budgetResult = useOptimization(budget, activeCpu, ram, game)

  return {
    ultimate: {
      ...ultimate,
      fps: ultimateResult.fps,
      bottleneck: ultimateResult.cpu.bottleneck
    },
    value: {
      ...value,
      fps: valueResult.fps,
      bottleneck: valueResult.cpu.bottleneck
    },
    budget: {
      ...budget,
      fps: budgetResult.fps,
      bottleneck: budgetResult.cpu.bottleneck
    }
  }
})

const dynamicSeoText = computed(() => {
  if (!game) return ''
  return `Finding the best graphics card for ${gameName} depends entirely on your target resolution and desired visual settings. Released as a demanding title, ${gameName} relies heavily on a robust GPU architecture to render its complex environments without dropping frames. For competitive players, maintaining a consistent frame rate is crucial for reducing input latency. Below, we break down how different tiers of modern graphics cards handle this game's engine to help you optimize your build.`
})

const gameReview = computed(() => {
  return `Finding the best graphics card for ${game.name} depends heavily on your target resolution and desired frame rate. Different game engines utilize hardware in unique ways. Some titles are highly CPU-bound, relying on processor speeds to calculate physics and AI, while others push your GPU to its absolute limits rendering 4K textures and ray-traced shadows.`
})

const upgradeAdvice = computed(() => {
  return `When upgrading your PC specifically to play ${game.name}, pay close attention to the VRAM (Video RAM) specifications of the GPUs listed above. As modern games become more demanding, having 8GB to 12GB of VRAM is quickly becoming the new baseline for avoiding texture pop-in and stuttering at 1440p resolutions.`
})

// 4. SEO Meta
useSeoMeta({
  title: `Best GPU for ${game.name} - FPS Benchmarks`,
  description: `Top 3 graphics cards for ${game.name}. ${selectedCpu.value ? 'Optimized for ' + selectedCpu.value.name : 'Benchmarks for 4K, 1440p, and 1080p'}.`,
  ogTitle: `Best GPU for ${game.name}`
})
</script>
