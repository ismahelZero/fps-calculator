<template>
  <div
    ref="containerRef"
    class="group relative h-64 w-full cursor-col-resize select-none overflow-hidden rounded-3xl border border-dark-700 bg-dark-900 shadow-2xl md:h-[400px]"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <img
      :src="afterImage"
      class="absolute inset-0 h-full w-full object-cover"
      draggable="false"
    />
    <div
      class="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md"
    >
      {{ afterLabel || 'Ultra' }}
    </div>

    <div
      class="absolute inset-0 h-full w-full"
      :style="{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }"
    >
      <img
        :src="beforeImage"
        class="absolute inset-0 h-full w-full object-cover"
        draggable="false"
      />
      <div
        class="absolute left-4 top-4 rounded-full border border-primary/30 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md"
      >
        {{ beforeLabel || 'Low' }}
      </div>
    </div>

    <div
      class="absolute inset-y-0 w-1 bg-primary shadow-[0_0_15px_cyan]"
      :style="{ left: `${sliderValue}%` }"
    >
      <div
        class="absolute -left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="h-4 w-4 text-dark-950"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}>()

const sliderValue = ref(50)
const isDragging = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// --- Drag Logic ---
const startDrag = () => {
  isDragging.value = true
}
const stopDrag = () => {
  isDragging.value = false
}

const onMove = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX

  // Calculate percentage (0-100)
  let pos = ((clientX - rect.left) / rect.width) * 100
  pos = Math.max(0, Math.min(100, pos)) // Clamp

  sliderValue.value = pos
}

// Global listeners to handle dragging outside the element
onMounted(() => {
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('touchmove', onMove)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('touchmove', onMove)
})
</script>
