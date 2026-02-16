<template>
  <div class="relative overflow-hidden font-sans text-white">
    <div
      class="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]"
    ></div>
    <div
      class="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
    ></div>

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
