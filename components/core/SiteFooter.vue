<template>
  <footer class="border-t border-dark-700 bg-dark-900 pb-8 pt-16 font-sans">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div class="col-span-1 md:col-span-2">
          <div class="mb-4 flex items-center gap-2">
            <img src="/logo.svg" alt="MyFPS" class="h-10 w-10" />
            <span class="font-display text-xl font-bold text-slate-200"
              >MyFPS</span
            >
          </div>
          <p class="max-w-xs text-sm leading-relaxed text-slate-500">
            The ultimate performance tool for PC gamers. Check FPS, calculate
            bottlenecks, and optimize your rig for the latest games.
          </p>
        </div>

        <div>
          <h3 class="mb-4 font-display font-bold text-white">Features</h3>
          <ul class="space-y-3 text-sm text-slate-400">
            <li>
              <NuxtLink to="/" class="transition-colors hover:text-primary"
                >FPS Calculator</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/compare"
                class="transition-colors hover:text-primary"
                >GPU Showdown</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/build"
                class="transition-colors hover:text-primary"
              >
                PC Builder
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-display font-bold text-white">Legal</h3>
          <ul class="space-y-3 text-sm text-slate-400">
            <li>
              <a href="#" class="transition-colors hover:text-primary"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-primary"
                >Terms of Service</a
              >
            </li>
            <li>
              <a href="#" class="transition-colors hover:text-primary"
                >Affiliate Disclosure</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 border-t border-dark-800 pt-8 text-center text-xs text-slate-600"
      >
        &copy; {{ new Date().getFullYear() }} MyFPS.org. All rights reserved.
        Not affiliated with NVIDIA or AMD.
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
