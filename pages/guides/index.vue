<template>
  <div class="min-h-screen bg-dark-950 px-6 py-20 text-white sm:px-12 lg:px-24">
    <div class="mx-auto max-w-5xl space-y-12">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-extrabold text-primary md:text-5xl">
          PC Gaming Performance Guides
        </h1>
        <p class="text-lg text-gray-400">
          Expert tips on hardware, optimization, and getting the maximum FPS out
          of your rig.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          to="/guides/how-to-boost-fps"
          class="group block flex flex-col overflow-hidden rounded-2xl border border-dark-800 bg-dark-900 transition-colors hover:border-primary"
        >
          <div
            class="flex h-48 items-center justify-center overflow-hidden bg-dark-800"
          >
            <span
              class="text-6xl text-gray-500 transition-colors group-hover:text-primary"
              >🎮</span
            >
          </div>
          <div class="flex-grow p-6">
            <span
              class="text-xs font-bold uppercase tracking-wider text-primary"
              >Optimization</span
            >
            <h2
              class="mb-3 mt-2 text-xl font-bold text-white transition-colors group-hover:text-primary"
            >
              How to Boost FPS in Competitive Games
            </h2>
            <p class="line-clamp-3 text-sm text-gray-400">
              Struggling with frame drops in Valorant or CS2? Learn the ultimate
              Windows and in-game settings to maximize your competitive
              advantage.
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/guides/cpu-vs-gpu-bottleneck"
          class="group block flex flex-col overflow-hidden rounded-2xl border border-dark-800 bg-dark-900 transition-colors hover:border-primary"
        >
          <div
            class="flex h-48 items-center justify-center overflow-hidden bg-dark-800"
          >
            <span
              class="text-6xl text-gray-500 transition-colors group-hover:text-primary"
              >🖥️</span
            >
          </div>
          <div class="flex-grow p-6">
            <span
              class="text-xs font-bold uppercase tracking-wider text-primary"
              >Hardware</span
            >
            <h2
              class="mb-3 mt-2 text-xl font-bold text-white transition-colors group-hover:text-primary"
            >
              Understanding CPU vs GPU Bottlenecks
            </h2>
            <p class="line-clamp-3 text-sm text-gray-400">
              Why isn't your new graphics card giving you more FPS? Learn how to
              identify hardware bottlenecks and balance your PC build.
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'PC Gaming Performance Guides & Tips | MyFPS.app',
  description:
    'Read expert guides on how to optimize your PC, choose the right GPU/CPU combo, and increase your FPS in the latest games.'
})
</script>
