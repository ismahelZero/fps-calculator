<template>
  <div class="relative overflow-hidden font-sans text-white">
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]"
    />
    <div
      class="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
    />

    <div
      class="container relative z-10 mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-20"
    >
      <div class="mb-10 text-center">
        <h1
          class="mb-4 font-display text-5xl font-black tracking-tight md:text-7xl"
        >
          CAN I
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >RUN IT?</span
          >
        </h1>
        <p class="mx-auto max-w-2xl font-sans text-lg text-slate-400">
          Build your rig and check FPS.
          <span class="font-bold text-white"
            >{{ gamesData.length }}+ Games</span
          >
          supported.
        </p>
      </div>

      <div
        class="w-full max-w-4xl rounded-3xl border border-dark-700 bg-dark-800/80 p-6 shadow-2xl backdrop-blur-xl md:p-10"
      >
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FSelect
            v-model="selectedGame"
            :options="gamesData"
            displayKey="name"
            label="Select Game"
            placeholder="Search Game..."
          />

          <FSelect
            v-model="selectedGpu"
            :options="gpusData"
            displayKey="name"
            label="Select GPU"
            placeholder="Search GPU..."
            color="secondary"
          />

          <FSelect
            v-model="selectedCpu"
            :options="cpusData"
            displayKey="name"
            label="Select CPU"
            placeholder="Search Processor..."
            color="info"
          />

          <FSelect
            v-model="selectedRam"
            :options="ramOptions"
            displayKey="label"
            label="System RAM"
            placeholder="Select Memory"
            color="success"
          />
        </div>

        <button
          @click="checkPerformance"
          :disabled="!selectedGame || !selectedGpu"
          class="group mt-8 w-full rounded-xl bg-primary py-5 font-display text-lg font-black uppercase tracking-wide text-dark-950 shadow-neon-primary transition-all hover:bg-primary-dim disabled:opacity-50"
        >
          Analyze Build
          <span
            class="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </button>

        <div class="mt-6 text-center">
          <span class="text-sm text-slate-500">or</span>
          <NuxtLink
            to="/compare"
            class="ml-2 text-sm font-bold text-primary underline decoration-dashed underline-offset-4 transition-colors hover:text-white"
          >
            Compare two GPUs side-by-side
          </NuxtLink>
        </div>
      </div>
    </div>

    <section
      class="mx-auto mb-24 mt-16 max-w-5xl px-4 text-gray-300 sm:px-6 lg:px-8"
    >
      <div class="rounded-2xl border border-gray-800 bg-dark-900 p-8">
        <h2 class="mb-4 text-2xl font-bold text-white sm:text-3xl">
          How Our FPS Calculator Works
        </h2>
        <p class="mb-6 leading-relaxed">
          Building the perfect gaming PC or upgrading your current rig can be a
          daunting task. Our platform analyzes hardware benchmarks across
          popular titles to give you an accurate frame rate estimation. Whether
          you are trying to hit an unwavering 144Hz in competitive shooters or
          want to enjoy AAA single-player games at maximum graphical fidelity,
          understanding your potential hardware bottlenecks is the first step.
        </p>

        <h3 class="mb-6 mt-10 text-xl font-bold text-white">
          Frequently Asked Questions
        </h3>
        <div class="space-y-6">
          <div>
            <h4 class="text-lg font-semibold text-white">
              What causes low FPS in games?
            </h4>
            <p class="mt-2 text-gray-400">
              Low frame rates are typically caused by a hardware bottleneck,
              usually either your CPU (processor) or GPU (graphics card)
              reaching 100% utilization. Other contributing factors include
              insufficient RAM speed, outdated graphics drivers, or thermal
              throttling when components get too hot.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-white">
              CPU vs. GPU Bottleneck: Which is worse?
            </h4>
            <p class="mt-2 text-gray-400">
              A GPU bottleneck is generally preferred because it means your
              graphics card is rendering as many frames as it possibly can. A
              CPU bottleneck often results in severe stuttering and frame timing
              issues, making gameplay feel incredibly choppy even if average
              frame rates seem high.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      class="mx-auto mb-12 mt-24 max-w-6xl rounded-2xl border border-dark-800 bg-dark-900 p-8"
    >
      <h2 class="mb-6 text-3xl font-bold text-primary">
        Why Use an FPS Calculator?
      </h2>

      <div class="grid gap-8 leading-relaxed text-gray-300 md:grid-cols-2">
        <div>
          <h3 class="mb-2 text-xl font-semibold text-white">
            Avoid Hardware Bottlenecks
          </h3>
          <p class="mb-4">
            A hardware bottleneck occurs when one PC component limits the
            potential of another. For example, pairing a high-end NVIDIA RTX
            4090 with an older Intel Core i3 processor will cause the GPU to
            wait for the CPU, resulting in stuttering and lower frame rates. Our
            FPS calculator helps you identify potential bottlenecks before you
            buy, ensuring you get the perfect balance of CPU and GPU power for
            your budget.
          </p>
          <h3 class="mb-2 text-xl font-semibold text-white">
            Optimize In-Game Settings
          </h3>
          <p>
            Different games demand different resources. Competitive tactical
            shooters like Valorant and CS2 rely heavily on CPU performance to
            push 240+ FPS for high refresh rate monitors. Meanwhile, visually
            immersive games like Cyberpunk 2077 or Red Dead Redemption 2 demand
            immense graphical processing power (GPU). By using our tool, you can
            see exactly which settings (Low, Medium, High, Ultra) your current
            rig can handle at 1080p, 1440p, or 4K.
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-xl font-semibold text-white">
            Plan Your PC Build
          </h3>
          <p class="mb-4">
            Building a gaming PC is a big investment. Don't guess how your
            system will perform. Simply select your desired processor, graphics
            card, and the games you want to play. Our extensive benchmark
            database will calculate estimated frame rates instantly. Compare
            different GPU architectures, test AMD Ryzen against Intel Core
            processors, and find the sweet spot for your gaming needs.
          </p>
          <h3 class="mb-2 text-xl font-semibold text-white">
            Constantly Updated Data
          </h3>
          <p>
            The gaming hardware landscape moves fast. As new drivers are
            released and games receive optimization patches, performance metrics
            change. MyFPS is dedicated to providing up-to-date hardware
            statistics and frame rate estimates so you can stay ahead of the
            curve.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useHead, useSeoMeta } from 'nuxt/app'
import gamesData from '~/data/games.json'
import gpusData from '~/data/gpus.json'
import cpusData from '~/data/cpus.json'

const router = useRouter()

const selectedGame = ref<null | any>(null)
const selectedGpu = ref<null | any>(null)
const selectedCpu = ref<null | any>(null)

// RAM Options
const ramOptions = [
  { label: '8 GB', value: 8 },
  { label: '16 GB (Standard)', value: 16 },
  { label: '32 GB (Recommended)', value: 32 },
  { label: '64 GB (Extreme)', value: 64 }
]
const selectedRam = ref(ramOptions[1])

const checkPerformance = () => {
  if (selectedGame.value && selectedGpu.value) {
    const query: any = { ram: selectedRam.value?.value }
    if (selectedCpu.value) query.cpu = selectedCpu.value.id

    router.push({
      path: `/optimize/${selectedGame.value.slug}/${selectedGpu.value.slug}`,
      query
    })
  }
}

// --- SCHEMA ---
useHead({
  script: [
    {
      key: 'schema-website',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'MyFPS',
        url: 'https://myfps.app',
        description:
          'Check if your PC can run games. FPS Calculator and GPU Benchmark tool.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://myfps.app/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

useSeoMeta({
  title: 'FPS Calculator - Test Your PC Performance',
  description:
    'Can I run it? Check FPS estimates for thousands of games with your GPU and CPU.',
  ogTitle: 'FPS Calculator - MyFPS.app',
  ogDescription:
    'Check FPS estimates for thousands of games with your GPU and CPU.',
  ogImage: 'https://www.myfps.app/logo.svg',
  twitterCard: 'summary_large_image'
})
</script>
