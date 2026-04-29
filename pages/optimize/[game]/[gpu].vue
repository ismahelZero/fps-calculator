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
      <div class="relative z-20 mb-10 text-center">
        <div
          class="mb-2 flex flex-wrap items-center justify-center gap-3 font-display text-3xl font-bold md:text-5xl"
        >
          <div ref="gameWrapper" class="group relative">
            <span
              v-if="!isEditingGame"
              @click="openEditor('game')"
              class="flex cursor-pointer items-center gap-2 border-b-2 border-transparent text-primary transition-all hover:border-primary hover:opacity-80"
            >
              {{ game.name }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </span>
            <div v-else class="w-64 md:w-80">
              <FSelect
                v-model="tempGame"
                :options="games"
                display-key="name"
                placeholder="Search Game..."
                @update:modelValue="switchGame"
                class="text-lg"
              />
            </div>
          </div>

          <span class="px-2 font-sans text-2xl font-normal text-slate-500"
            >on</span
          >

          <div ref="gpuWrapper" class="group relative">
            <span
              v-if="!isEditingGpu"
              @click="openEditor('gpu')"
              class="flex cursor-pointer items-center gap-2 border-b-2 border-transparent text-white transition-all hover:border-white hover:opacity-80"
            >
              {{ gpu.name }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </span>
            <div v-else class="w-64 md:w-80">
              <FSelect
                v-model="tempGpu"
                :options="gpus"
                display-key="name"
                placeholder="Search GPU..."
                @update:modelValue="switchGpu"
                class="text-lg"
              />
            </div>
          </div>
        </div>
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

      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          ref="cpuWrapper"
          class="flex flex-col justify-between rounded-2xl border border-dark-700 bg-dark-900/50 p-6 transition-colors hover:bg-dark-900/70"
        >
          <div class="mb-4 flex items-center justify-between">
            <p
              class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              Processor (CPU)
            </p>
          </div>

          <div v-if="isEditingCpu || !selectedCpu">
            <p v-if="!selectedCpu" class="mb-3 text-sm text-slate-400">
              Select CPU to check bottleneck:
            </p>
            <FSelect
              v-model="selectedCpu"
              :options="cpus"
              display-key="name"
              placeholder="Search CPU Model..."
              class="w-full"
              @update:modelValue="isEditingCpu = false"
            />
          </div>

          <div v-else>
            <div
              class="flex cursor-pointer items-end justify-between"
              @click="openEditor('cpu')"
            >
              <span
                class="mr-2 line-clamp-1 border-b border-dashed border-slate-600 font-bold text-white transition-colors hover:border-white"
              >
                {{ selectedCpu.name }}
              </span>
              <span
                class="text-sm font-bold"
                :class="
                  result.cpu.bottleneck > 10 ? 'text-error' : 'text-success'
                "
              >
                {{
                  result.cpu.bottleneck > 0
                    ? `-${result.cpu.bottleneck}% Loss`
                    : 'Optimal'
                }}
              </span>
            </div>

            <div
              class="mt-3 h-2 w-full overflow-hidden rounded-full bg-dark-700"
            >
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :class="
                  result.cpu.bottleneck > 10
                    ? 'bg-error shadow-[0_0_10px_red]'
                    : 'bg-success shadow-[0_0_10px_green]'
                "
                :style="{
                  width:
                    result.cpu.bottleneck > 0
                      ? `${Math.min(result.cpu.bottleneck, 100)}%`
                      : '100%'
                }"
              ></div>
            </div>

            <p class="mt-3 text-xs text-slate-400">
              {{
                result.cpu.bottleneck > 10
                  ? 'CPU is limiting performance.'
                  : 'Excellent CPU match.'
              }}
            </p>
          </div>
        </div>

        <div
          class="group relative flex flex-col justify-center rounded-2xl border border-dark-700 bg-dark-900/50 p-6 text-center"
        >
          <p
            class="font-display text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            Memory (RAM)
          </p>

          <div
            class="mt-2 flex cursor-pointer select-none items-center justify-center gap-3"
          >
            <button
              class="text-2xl text-slate-600 transition-colors hover:text-white"
              @click="cycleRam(-1)"
            >
              ‹
            </button>
            <p class="w-16 font-display text-xl font-bold text-white">
              {{ ram }} GB
            </p>
            <button
              class="text-2xl text-slate-600 transition-colors hover:text-white"
              @click="cycleRam(1)"
            >
              ›
            </button>
          </div>

          <p
            class="mt-1 text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
          >
            Click arrows to change
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
      <div
        class="mx-auto mt-12 w-full max-w-4xl rounded-2xl border border-dark-700 bg-dark-900/50 p-8 text-left"
      >
        <h2 class="mb-4 text-2xl font-bold text-primary">
          Optimization Analysis: {{ gpu.name }} running {{ game.name }}
        </h2>

        <div
          class="prose prose-invert max-w-none space-y-4 leading-relaxed text-gray-300"
        >
          <p>
            Getting the best performance out of
            <strong>{{ game.name }}</strong> with your
            <strong>{{ gpu.name }}</strong> requires finding the perfect balance
            between visual fidelity and frame rate. Based on our extensive
            benchmark database, this hardware configuration is expected to
            achieve around <strong>{{ result.fps }} FPS</strong> on
            <strong>{{ result.settings }}</strong> settings.
          </p>

          <p>
            {{ optimizationSummary }}
          </p>

          <h3 class="mb-2 mt-6 text-xl font-semibold text-white">
            Tweaking Advice
          </h3>
          <p>
            {{ tweakingAdvice }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import gpus from '~/data/gpus.json'
import games from '~/data/games.json'
import cpus from '~/data/cpus.json'
import { useRoute, useRouter } from 'vue-router'
import { useOptimization } from '@/composables/useOptimization'
import { createError, useSeoMeta, useHead } from 'nuxt/app'

const route = useRoute()
const router = useRouter()

const { game: gameSlug, gpu: gpuSlug } = route.params
const { cpu: cpuId, ram: ramAmount } = route.query

const game = games.find(g => g.slug === gameSlug)
const gpu = gpus.find(g => g.slug === gpuSlug)

if (!game || !gpu) {
  throw createError({ statusCode: 404, statusMessage: 'Combination Not Found' })
}

const isEditingGame = ref(false)
const isEditingGpu = ref(false)
const isEditingCpu = ref(false)

const gameWrapper = ref<HTMLElement | null>(null)
const gpuWrapper = ref<HTMLElement | null>(null)
const cpuWrapper = ref<HTMLElement | null>(null)

const tempGame = ref(game)
const tempGpu = ref(gpu)
const selectedCpu = ref(cpus.find(c => c.id === cpuId) || null)
const ram = ref(Number(ramAmount) || 16)
const useAi = ref(false)

const openEditor = (type: 'game' | 'gpu' | 'cpu') => {
  isEditingGame.value = type === 'game'
  isEditingGpu.value = type === 'gpu'
  isEditingCpu.value = type === 'cpu'
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node

  if (!document.body.contains(target)) return

  if (
    isEditingGame.value &&
    gameWrapper.value &&
    !gameWrapper.value.contains(target)
  ) {
    isEditingGame.value = false
  }

  if (
    isEditingGpu.value &&
    gpuWrapper.value &&
    !gpuWrapper.value.contains(target)
  ) {
    isEditingGpu.value = false
  }

  if (
    isEditingCpu.value &&
    cpuWrapper.value &&
    !cpuWrapper.value.contains(target) &&
    selectedCpu.value
  ) {
    isEditingCpu.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

const switchGame = (newGame: any) => {
  if (newGame && newGame.slug !== game.slug) {
    router.push({
      name: 'optimize-game-gpu',
      params: { game: newGame.slug, gpu: gpu.slug },
      query: route.query
    })
  }
  isEditingGame.value = false
}

const switchGpu = (newGpu: any) => {
  if (newGpu && newGpu.slug !== gpu.slug) {
    router.push({
      name: 'optimize-game-gpu',
      params: { game: game.slug, gpu: newGpu.slug },
      query: route.query
    })
  }
  isEditingGpu.value = false
}

const cycleRam = (val: number) => {
  const options = [8, 16, 32, 64]
  const currentIndex = options.indexOf(ram.value)
  const nextIndex = (currentIndex + val) % options.length
  ram.value = options[nextIndex]
}

watch([selectedCpu, ram], () => {
  router.replace({
    query: {
      ...route.query,
      cpu: selectedCpu.value?.id,
      ram: ram.value.toString()
    }
  })
})

const result = computed(() =>
  useOptimization(gpu, selectedCpu.value, ram.value, game)
)

const optimizationSummary = computed(() => {
  if (result.value.fps >= 144) {
    return `With an estimated frame rate of ${result.value.fps} FPS, your ${gpu.name} is handling ${game.name} exceptionally well. This setup is perfectly optimized for high-refresh-rate monitors (144Hz or 240Hz). You have enough graphical headroom to maintain these frames, making it ideal for competitive gaming where low latency is crucial.`
  } else if (result.value.fps >= 60) {
    return `At ${result.value.fps} FPS, you will experience a very smooth and highly playable session in ${game.name}. The ${gpu.name} provides a solid middle-ground, easily surpassing the 60 FPS gold standard for PC gaming without requiring you to drop all your graphical settings to the minimum.`
  } else {
    return `Achieving ${result.value.fps} FPS means your ${gpu.name} might struggle slightly with ${game.name} during intense scenes or heavy particle effects. To improve this, consider lowering your shadow quality, turning off volumetric fog, and utilizing upscaling technologies like NVIDIA DLSS or AMD FSR if your card supports it.`
  }
})

const tweakingAdvice = computed(() => {
  return `While the ${gpu.name} features ${gpu.vram}GB of VRAM, make sure you keep your graphics drivers fully updated. If you notice micro-stutters in ${game.name} despite a high average FPS, check your CPU utilization using Task Manager, as a processor bottleneck could be holding your graphics card back.`
})

useSeoMeta({
  title: `${game.name} on ${gpu.name} - FPS & Settings`,
  description: `Benchmarks for ${game.name} on ${gpu.name}. Expected FPS: ${result.value.fps}. Bottleneck check included.`
})
</script>
