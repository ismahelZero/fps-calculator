<template>
  <footer class="border-t border-white/5 bg-dark-950 py-12">
    <div class="container mx-auto px-4">
      <div class="grid gap-8 md:grid-cols-4">
        <div class="md:col-span-1">
          <div class="mb-4 flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary"
            >
              <img src="/logo.svg" alt="MyFPS" class="h-6 w-6" />
            </div>
            <span class="font-display text-xl font-bold text-white"
              >My<span class="text-primary">FPS</span></span
            >
          </div>
          <p class="text-sm text-slate-500">
            Real performance data for real gamers. Calculate FPS, check
            bottlenecks, and build your dream rig.
          </p>
        </div>

        <div>
          <h4 class="mb-4 font-bold text-white">Tools</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li>
              <NuxtLink to="/" class="hover:text-primary"
                >FPS Calculator</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/what-can-i-play" class="hover:text-primary"
                >Can I Run It? (New)</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/compare" class="hover:text-primary"
                >GPU Comparison</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/build" class="hover:text-primary"
                >PC Builder</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 font-bold text-white">Popular Games</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li>
              <NuxtLink
                to="/optimize/cyberpunk-2077-2-0/rtx-4060"
                class="hover:text-primary"
                >Cyberpunk 2077</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/optimize/call-of-duty-warzone/rtx-3060"
                class="hover:text-primary"
                >Warzone</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/optimize/fortnite-performance-mode/gtx-1660-super"
                class="hover:text-primary"
                >Fortnite</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/optimize/valorant/gtx-1650"
                class="hover:text-primary"
                >Valorant</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 font-bold text-white">Popular GPU Guides</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li>
              <NuxtLink
                to="/best-gpu-for-cyberpunk-2077-2-0"
                class="hover:text-primary"
                >Best GPU for Cyberpunk 2077</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/best-gpu-for-fortnite-performance-mode"
                class="hover:text-primary"
                >Best GPU for Fortnite</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/best-gpu-for-call-of-duty-warzone"
                class="hover:text-primary"
                >Best GPU for Warzone</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/best-gpu-for-alan-wake-2"
                class="hover:text-primary"
                >Best GPU for Alan Wake 2</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/best-gpu-for-black-myth-wukong"
                class="hover:text-primary"
                >Best GPU for Black Myth: Wukong</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 border-t border-white/5 pt-8 text-center text-xs text-slate-600"
      >
        &copy; {{ new Date().getFullYear() }} MyFPS. All rights reserved. Game
        content and materials are trademarks and copyrights of their respective
        publisher and its licensors.
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
