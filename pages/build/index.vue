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
          Select your core components. We'll generate the rest.
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
              <FSelect
                v-model="selectedGpu"
                :options="gpus"
                displayKey="name"
                label="1. Select Graphics Card"
                placeholder="Search GPU..."
                color="primary"
              />
              <FSelect
                v-model="selectedCpu"
                :options="cpus"
                displayKey="name"
                label="2. Select Processor"
                placeholder="Search CPU..."
                color="secondary"
              />

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
                  <span class="text-xl font-black text-white">{{
                    buildTier
                  }}</span>
                </div>
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
                >Compatible ✅</span
              >
            </div>

            <div class="space-y-4">
              <div
                v-for="(partGroup, index) in buildParts"
                :key="index"
                class="border-dark-600 group relative flex flex-col items-start justify-between gap-4 rounded-2xl border bg-dark-900 p-5 transition-all hover:border-primary/50 hover:shadow-lg md:flex-row md:items-center"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-800 text-2xl shadow-inner"
                  >
                    {{ partGroup.icon }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p
                        class="font-display text-xs font-bold uppercase tracking-wider text-slate-500"
                      >
                        {{ partGroup.category }}
                      </p>
                      <span
                        v-if="!partGroup.locked && partGroup.options.length > 1"
                        class="rounded-full bg-dark-800 px-2 text-[10px] text-slate-600"
                      >
                        Option {{ (selectedIndices[index] || 0) + 1 }} /
                        {{ partGroup.options.length }}
                      </span>
                    </div>
                    <h3
                      class="font-bold text-white transition-colors group-hover:text-primary"
                    >
                      {{ getActiveOption(partGroup, index).name }}
                    </h3>
                  </div>
                </div>

                <div
                  class="flex w-full items-center justify-end gap-3 md:w-auto"
                >
                  <button
                    v-if="!partGroup.locked && partGroup.options.length > 1"
                    @click="swapPart(index, partGroup.options.length)"
                    class="border-dark-600 flex items-center gap-1 rounded-lg border bg-dark-800 px-3 py-2 text-xs font-bold text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
                    title="Try another option"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Swap
                  </button>

                  <a
                    :href="getLink(getActiveOption(partGroup, index).query)"
                    target="_blank"
                    class="whitespace-nowrap rounded-lg bg-primary px-5 py-3 text-sm font-bold text-dark-950 transition-transform hover:bg-white active:scale-95"
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
                Always verify specifications on the retailer's page before
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
              Select a GPU and CPU from the left menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSeoMeta } from 'nuxt/app'
import gpus from '~/data/gpus.json'
import cpus from '~/data/cpus.json'
import { useBuild } from '@/composables/useBuild'
import { useAffiliate } from '@/composables/useAffiliate'
import FSelect from '~/components/FSelect.vue'
import FBreadcrumb from '~/components/FBreadcrumb.vue'

const { getLink } = useAffiliate()

const selectedGpu = ref<any>(null)
const selectedCpu = ref<any>(null)

const selectedIndices = ref<Record<number, number>>({})

watch([selectedGpu, selectedCpu], () => {
  selectedIndices.value = {}
})

const buildParts = computed(() => {
  if (!selectedGpu.value || !selectedCpu.value) return []
  return useBuild(selectedGpu.value, selectedCpu.value)
})

const getActiveOption = (group: any, index: number) => {
  const optionIndex = selectedIndices.value[index] || 0
  return group.options[optionIndex]
}

const swapPart = (index: number, totalOptions: number) => {
  const current = selectedIndices.value[index] || 0
  const next = (current + 1) % totalOptions
  selectedIndices.value[index] = next
}

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
    'Select your GPU and CPU to automatically generate a fully compatible gaming PC build list.'
})
</script>
