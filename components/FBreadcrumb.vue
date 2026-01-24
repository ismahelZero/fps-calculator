<template>
  <nav class="mb-6 flex items-center font-sans text-sm text-slate-500">
    <template v-for="(link, index) in links" :key="index">
      <span v-if="index > 0" class="mx-2 text-dark-700">/</span>

      <NuxtLink
        v-if="link.to"
        :to="link.to"
        class="transition-colors hover:text-primary"
      >
        {{ link.label }}
      </NuxtLink>

      <span v-else class="font-medium text-slate-200">
        {{ link.label }}
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  links: { label: string; to?: string }[]
}>()
</script>
