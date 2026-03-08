<template>
  <div
    class="flex min-h-screen flex-col bg-dark-950 font-sans text-white selection:bg-primary/30"
  >
    <SiteHeader />
    <main class="flex-grow">
      <AdBanner />

      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
<script setup lang="ts">
import SiteHeader from '@/components/core/SiteHeader.vue'
import SiteFooter from '@/components/core/SiteFooter.vue'
import AdBanner from '@/components/AdBanner.vue'
</script>
