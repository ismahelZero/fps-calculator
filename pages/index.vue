<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white"
  >
    <h1 class="mb-4 text-6xl font-black">Game Optimizer</h1>
    <p class="mb-8 text-xl text-slate-400">
      Check if your GPU can run the latest games.
    </p>

    <div class="flex gap-4">
      <NuxtLink
        to="/optimize/cyberpunk-2077/gtx-1660-ti"
        class="rounded-lg bg-green-500 px-6 py-3 font-bold text-slate-900 transition-all hover:bg-green-400"
      >
        Test Demo: Cyberpunk + 1660 Ti
      </NuxtLink>
    </div>
  </div>
</template>
