<template>
  <div class="relative w-full" ref="containerRef">
    <label
      v-if="label"
      class="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-slate-500"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @focus="isOpen = true"
        @click="isOpen = true"
        :placeholder="placeholder"
        class="w-full rounded-xl border border-dark-700 bg-dark-900 px-5 py-4 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-1"
        :class="borderClass"
      />
      <div
        class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-180': isOpen }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>

    <div
      v-if="isOpen"
      class="absolute left-0 top-full z-[100] mt-2 w-full overflow-hidden rounded-xl border border-dark-700 bg-dark-800 shadow-2xl"
    >
      <div class="custom-scrollbar max-h-60 overflow-y-auto">
        <div
          v-if="filteredOptions.length === 0"
          class="px-5 py-3 text-sm text-slate-500"
        >
          No results found.
        </div>

        <div
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="selectOption(option)"
          class="cursor-pointer border-b border-dark-700 px-5 py-3 text-sm text-slate-300 transition-colors last:border-0 hover:bg-dark-700 hover:text-white"
          :class="{ 'bg-dark-700 text-white': modelValue === option }"
        >
          {{ displayKey ? option[displayKey] : option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  modelValue: any
  options: any[]
  label?: string
  placeholder?: string
  color?: 'primary' | 'secondary' | 'info' | 'success'
  displayKey?: string // e.g. 'name' for objects, or null for simple strings
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const containerRef = ref<HTMLElement | null>(null)

// --- Filter Logic (FIXED) ---
const filteredOptions = computed(() => {
  // 1. If search is empty, show top 50
  if (!searchQuery.value) return props.options.slice(0, 50)

  // 2. If the search text matches the currently selected item exactly,
  // assume the user is just reopening the menu -> Show ALL options.
  const currentLabel = props.modelValue
    ? props.displayKey
      ? props.modelValue[props.displayKey]
      : props.modelValue
    : null

  if (currentLabel && searchQuery.value === currentLabel) {
    return props.options.slice(0, 50)
  }

  // 3. Otherwise, filter normally (User is typing)
  const query = searchQuery.value.toLowerCase()
  return props.options
    .filter(opt => {
      const val = props.displayKey ? opt[props.displayKey] : opt
      return String(val).toLowerCase().includes(query)
    })
    .slice(0, 50)
})

// --- handlers ---
const selectOption = (option: any) => {
  emit('update:modelValue', option)
  isOpen.value = false
  // Set search input to the selected name
  searchQuery.value = props.displayKey ? option[props.displayKey] : option
}

// --- Click Outside Logic ---
const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
    // On close, reset search query to match the currently selected value (if any)
    if (props.modelValue) {
      searchQuery.value = props.displayKey
        ? props.modelValue[props.displayKey]
        : props.modelValue
    } else {
      searchQuery.value = ''
    }
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// Watch for external changes
watch(
  () => props.modelValue,
  newVal => {
    if (newVal) {
      searchQuery.value = props.displayKey ? newVal[props.displayKey] : newVal
    } else {
      searchQuery.value = ''
    }
  },
  { immediate: true }
)

// Dynamic Border Color
const borderClass = computed(() => {
  switch (props.color) {
    case 'secondary':
      return 'focus:border-secondary focus:ring-secondary'
    case 'info':
      return 'focus:border-info focus:ring-info'
    case 'success':
      return 'focus:border-success focus:ring-success'
    default:
      return 'focus:border-primary focus:ring-primary'
  }
})
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0f172a; /* dark-900 */
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155; /* dark-700 */
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #475569; /* slate-600 */
}
</style>
