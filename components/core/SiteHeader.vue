<template>
  <header
    class="fixed top-0 z-50 w-full border-b border-white/5 bg-dark-950/80 backdrop-blur-xl transition-all duration-300"
    :class="{ 'py-2': isScrolled, 'py-4': !isScrolled }"
  >
    <div class="container mx-auto flex items-center justify-between px-4">
      <NuxtLink to="/" class="group flex items-center gap-2">
        <div
          class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110"
        >
          <img
            src="/logo.svg"
            alt="MyFPS"
            class="h-8 w-8 transition-transform group-hover:scale-110"
          />
        </div>
        <span class="font-display text-xl font-bold tracking-tight text-white">
          My<span class="text-primary">FPS</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          to="/"
          class="text-sm font-bold text-slate-400 transition-colors hover:text-white"
          active-class="text-white"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/compare"
          class="text-sm font-bold text-slate-400 transition-colors hover:text-white"
          active-class="text-white"
        >
          Compare GPUs
        </NuxtLink>
        <NuxtLink
          to="/build"
          class="text-sm font-bold text-slate-400 transition-colors hover:text-white"
          active-class="text-white"
        >
          PC Builder
        </NuxtLink>

        <NuxtLink
          to="/what-can-i-play"
          class="group relative flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-dark-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          active-class="bg-primary text-dark-950"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 group-hover:bg-dark-900"
            ></span>
            <span
              class="relative inline-flex h-2 w-2 rounded-full bg-primary group-hover:bg-dark-900"
            ></span>
          </span>
          What Can I Play?
        </NuxtLink>
      </nav>

      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="text-white md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="mobileMenuOpen"
      class="absolute left-0 top-full h-screen w-full bg-dark-950 px-4 py-8 md:hidden"
    >
      <nav class="flex flex-col gap-6 text-center">
        <NuxtLink
          to="/"
          @click="mobileMenuOpen = false"
          class="text-xl font-bold text-white"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/what-can-i-play"
          @click="mobileMenuOpen = false"
          class="text-xl font-bold text-primary"
          >What Can I Play?</NuxtLink
        >
        <NuxtLink
          to="/compare"
          @click="mobileMenuOpen = false"
          class="text-xl font-bold text-white"
          >Compare</NuxtLink
        >
        <NuxtLink
          to="/build"
          @click="mobileMenuOpen = false"
          class="text-xl font-bold text-white"
          >PC Builder</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
