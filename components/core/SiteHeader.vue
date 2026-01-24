<template>
  <header
    class="sticky top-0 z-50 border-b border-dark-700 bg-dark-950/80 backdrop-blur-md"
  >
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <NuxtLink to="/" class="group flex items-center gap-3">
        <img
          src="/logo.svg"
          alt="MyFPS"
          class="h-8 w-8 transition-transform group-hover:scale-110"
        />
        <span
          class="font-display text-xl font-bold tracking-wide text-white transition-colors group-hover:text-primary"
          >MyFPS</span
        >
      </NuxtLink>

      <nav class="hidden gap-8 md:flex">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-slate-300 transition-colors hover:text-primary"
          active-class="text-primary"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/compare"
          class="text-sm font-medium text-slate-300 transition-colors hover:text-primary"
          active-class="text-primary"
          >Compare GPUs</NuxtLink
        >
        <NuxtLink
          to="/build"
          class="text-sm font-medium text-slate-300 transition-colors hover:text-primary"
          active-class="text-primary"
        >
          PC Builder
        </NuxtLink>
      </nav>

      <NuxtLink to="/compare" class="text-sm font-bold text-primary md:hidden"
        >Compare</NuxtLink
      >
    </div>
  </header>
</template>
<script setup lang="ts"></script>
