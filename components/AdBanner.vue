<template>
  <div
    class="my-6 flex min-h-[100px] w-full justify-center overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 p-2"
  >
    <ins
      class="adsbygoogle"
      style="display: block; width: 100%"
      data-ad-client="ca-pub-5009121739741215"
      data-ad-slot="1134216011"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Trigger Google AdSense to fill the slot once the component loads in the browser
  try {
    // @ts-ignore
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (error) {
    console.error('AdSense error:', error)
  }
})
</script>
