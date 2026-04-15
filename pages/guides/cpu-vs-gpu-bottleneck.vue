<template>
  <div class="min-h-screen bg-dark-950 px-6 py-20 text-white sm:px-12 lg:px-24">
    <article
      class="mx-auto max-w-3xl rounded-2xl border border-dark-800 bg-dark-900 p-8 shadow-xl md:p-12"
    >
      <header class="mb-10 border-b border-dark-800 pb-8">
        <h1
          class="mb-4 text-3xl font-extrabold leading-tight text-primary md:text-5xl"
        >
          Understanding CPU vs. GPU Bottlenecks in PC Gaming
        </h1>
        <div class="flex items-center space-x-4 text-sm text-gray-400">
          <span>By MyFPS Team</span>
          <span>•</span>
          <span>6 Min Read</span>
        </div>
      </header>

      <div
        class="prose prose-invert max-w-none space-y-6 leading-relaxed text-gray-300"
      >
        <p class="text-lg">
          If you have ever upgraded your graphics card expecting a massive leap
          in frame rates, only to see your games stutter just as much as before,
          you have likely experienced a hardware bottleneck. Understanding the
          delicate balance between your processor (CPU) and your graphics card
          (GPU) is the single most important factor in building or upgrading a
          gaming PC.
        </p>

        <h2 class="mb-4 mt-10 text-2xl font-bold text-white">
          What Exactly is a Bottleneck?
        </h2>
        <p>
          In computing, a bottleneck occurs when the capacity of an application
          or a computer system is limited by a single component. Think of it
          like a funnel: no matter how much water you pour into the top (your
          GPU's raw rendering power), it can only come out as fast as the
          narrowest part of the neck allows (your CPU's processing speed).
        </p>
        <p>
          Every game handles this differently. Some games rely heavily on
          physics calculations and artificial intelligence, taxing the CPU.
          Others feature massive, sprawling landscapes with high-resolution
          textures, pushing the GPU to its absolute limits.
        </p>

        <h2 class="mb-4 mt-10 text-2xl font-bold text-white">
          The CPU Bottleneck (The Bad Kind)
        </h2>
        <p>
          A CPU bottleneck happens when your processor is too slow to feed
          instructions to your graphics card. Your brand new RTX 4080 might be
          capable of generating 200 frames per second, but if your older Intel
          Core i5 can only process the game logic for 90 frames per second, your
          GPU is forced to sit idle and wait.
        </p>
        <h3 class="mb-2 mt-6 text-xl font-semibold text-white">
          Symptoms of a CPU Bottleneck:
        </h3>
        <ul class="ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>Low GPU Utilization:</strong> If you check your task manager
            while gaming and your GPU is only at 40% to 60% usage, your CPU is
            holding it back.
          </li>
          <li>
            <strong>Stuttering and 1% Lows:</strong> You might see a high
            average FPS, but experience severe micro-stutters when looking
            around quickly or when explosions happen.
          </li>
          <li>
            <strong>Lowering Settings Does Nothing:</strong> If dropping your
            game from Ultra to Low settings doesn't increase your frame rate,
            your CPU is the limit.
          </li>
        </ul>

        <h2 class="mb-4 mt-10 text-2xl font-bold text-white">
          The GPU Bottleneck (The Good Kind)
        </h2>
        <p>
          Believe it or not, you <em>want</em> a GPU bottleneck. A GPU
          bottleneck means your graphics card is operating at 99% or 100%
          capacity. It is giving you every ounce of performance you paid for. In
          this scenario, your CPU is fast enough to send all the necessary data
          to the GPU without breaking a sweat.
        </p>
        <p>
          This is typically what you experience when playing visually demanding
          AAA single-player games like <em>Cyberpunk 2077</em> or
          <em>Red Dead Redemption 2</em> at 1440p or 4K resolutions. The
          workload is shifted almost entirely onto the graphics card.
        </p>

        <h2 class="mb-4 mt-10 text-2xl font-bold text-white">
          How to Find the Perfect Balance
        </h2>
        <p>
          The goal of any PC builder is to match a CPU and GPU that complement
          each other for their specific target resolution. If you play at 1080p
          on a 240Hz monitor, you need a highly capable CPU. If you play at 4K
          on a 60Hz TV, you need to invest almost your entire budget into a
          high-end GPU.
        </p>
        <p>
          Before spending hundreds of dollars on an upgrade, it's crucial to
          test your desired configuration. You can use our
          <NuxtLink to="/" class="text-primary hover:underline"
            >MyFPS Calculator</NuxtLink
          >
          to mix and match different processors and graphics cards. Select the
          games you play the most, and our tool will help you identify potential
          bottlenecks before you make a purchase, ensuring your rig runs as
          smoothly as possible.
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'CPU vs GPU Bottlenecks Explained | MyFPS Guides',
  description:
    'Learn the difference between CPU and GPU bottlenecks, how to identify them, and how to choose the right hardware to avoid stuttering and low frame rates.'
})
</script>
