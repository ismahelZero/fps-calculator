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
        :links="[{ label: 'Home', to: '/' }, { label: 'PC Builder' }]"
        class="mb-8"
      />

      <div class="mb-12 text-center">
        <h1 class="mb-4 font-display text-4xl font-black md:text-6xl">
          PC
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >BUILDER</span
          >
        </h1>
        <p class="mx-auto max-w-2xl text-xl text-slate-400">
          Select your core components, and we'll auto-generate a compatible
          build list.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <div
            class="sticky top-8 rounded-3xl border border-dark-700 bg-dark-800/80 p-6 shadow-2xl backdrop-blur-xl"
          >
            <h2
              class="mb-6 font-display text-xl font-bold uppercase tracking-widest text-slate-300"
            >
              Core Parts
            </h2>

            <div class="space-y-6">
              <div>
                <FSelect
                  v-model="selectedGpu"
                  :options="gpus"
                  displayKey="name"
                  label="1. Select Graphics Card"
                  placeholder="Search GPU..."
                  color="primary"
                />
              </div>

              <div>
                <FSelect
                  v-model="selectedCpu"
                  :options="cpus"
                  displayKey="name"
                  label="2. Select Processor"
                  placeholder="Search CPU..."
                  color="secondary"
                />
              </div>

              <div
                v-if="selectedGpu"
                class="rounded-xl border border-dark-700 bg-dark-900/50 p-4"
              >
                <p
                  class="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  Build Tier
                </p>
                <div class="flex items-center gap-2">
                  <div class="h-3 w-3 rounded-full" :class="tierColor"></div>
                  <span class="text-xl font-black text-white"
                    >{{ buildTier }} Performance</span
                  >
                </div>
                <p class="mt-2 text-[11px] leading-tight text-slate-500">
                  Parts selected for balanced performance with no bottlenecks.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div
            v-if="selectedGpu && selectedCpu"
            class="rounded-3xl border border-dark-700 bg-dark-800/50 p-6 md:p-8"
          >
            <div class="mb-8 flex items-center justify-between">
              <h2 class="font-display text-2xl font-bold text-white">
                Your Optimized Build
              </h2>
              <span
                class="hidden rounded-full border border-success/20 bg-success/10 px-4 py-1 text-xs font-bold text-success sm:block"
                >Compatibility Checked ✅</span
              >
            </div>

            <div class="space-y-4">
              <div
                v-for="(part, i) in buildParts"
                :key="i"
                class="border-dark-600 group relative flex flex-col items-start justify-between gap-4 rounded-2xl border bg-dark-900 p-5 transition-all hover:border-primary/50 hover:shadow-lg md:flex-row md:items-center"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-800 text-2xl shadow-inner"
                  >
                    {{ part.icon }}
                  </div>
                  <div>
                    <p
                      class="font-display text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      {{ part.category }}
                    </p>
                    <h3
                      class="font-bold text-white transition-colors group-hover:text-primary"
                    >
                      {{ part.name }}
                    </h3>
                  </div>
                </div>

                <div class="flex w-full items-center justify-end md:w-auto">
                  <a
                    :href="part.link"
                    target="_blank"
                    class="whitespace-nowrap rounded-lg bg-primary px-6 py-3 text-sm font-bold text-dark-950 transition-transform hover:bg-white active:scale-95"
                  >
                    Check Price ↗
                  </a>
                </div>
              </div>
            </div>

            <div
              class="border-dark-600 mt-8 rounded-xl border border-dashed bg-dark-900/50 p-6 text-center"
            >
              <p class="text-sm text-slate-400">
                This build is automatically generated based on compatibility
                logic.
                <br />Always verify specifications on the retailer's page before
                purchasing.
              </p>
            </div>
          </div>

          <div
            v-else
            class="flex h-full min-h-[500px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-dark-700 bg-dark-800/30 p-8 text-center"
          >
            <div class="mb-4 text-6xl opacity-20">🖥️</div>
            <h3 class="font-display text-2xl font-bold text-slate-500">
              Start Your Build
            </h3>
            <p class="mx-auto mt-2 max-w-md text-slate-600">
              Select a GPU and CPU from the left menu to generate a complete,
              compatible parts list instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta } from 'nuxt/app'
import gpus from '~/data/gpus.json'
import cpus from '~/data/cpus.json'
import { useBuild } from '@/composables/useBuild'
import FSelect from '~/components/FSelect.vue'
import FBreadcrumb from '~/components/FBreadcrumb.vue'

const selectedGpu = ref<any>(null)
const selectedCpu = ref<any>(null)

const buildParts = computed(() => {
  if (!selectedGpu.value || !selectedCpu.value) return []
  return useBuild(selectedGpu.value, selectedCpu.value)
})

const buildTier = computed(() => {
  if (!selectedGpu.value) return 'Standard'
  const score = selectedGpu.value.score
  if (score >= 90) return 'Extreme'
  if (score >= 70) return 'High-End'
  if (score >= 40) return 'Mid-Range'
  return 'Entry-Level'
})

const tierColor = computed(() => {
  if (!selectedGpu.value) return 'bg-slate-500'
  const score = selectedGpu.value.score
  if (score >= 90) return 'bg-purple-500 shadow-[0_0_10px_purple]'
  if (score >= 70) return 'bg-primary shadow-[0_0_10px_cyan]'
  if (score >= 40) return 'bg-yellow-500'
  return 'bg-green-500'
})

useSeoMeta({
  title: 'PC Part Picker - AI Custom Build Generator',
  description:
    'Select your GPU and CPU to automatically generate a fully compatible gaming PC build list tailored to your performance needs.'
})
</script>
