<template>
  <div class="min-h-screen bg-dark-950 px-6 py-20 text-white sm:px-12 lg:px-24">
    <div class="mx-auto max-w-4xl space-y-12">
      <div class="text-center">
        <h1 class="mb-6 text-4xl font-extrabold text-primary md:text-5xl">
          About MyFPS.app
        </h1>
        <p class="text-lg text-gray-400">
          Your ultimate tool for predicting PC gaming performance.
        </p>
      </div>

      <section
        class="rounded-2xl border border-dark-800 bg-dark-900 p-8 shadow-xl"
      >
        <h2 class="mb-4 text-2xl font-bold text-white">Our Mission</h2>
        <p class="mb-4 leading-relaxed text-gray-300">
          At MyFPS, our mission is simple: to help gamers around the world make
          informed decisions about their PC hardware. PC gaming can be
          expensive, and buying the wrong graphics card (GPU) or processor (CPU)
          can lead to frustrating bottlenecks and wasted money.
        </p>
        <p class="leading-relaxed text-gray-300">
          We built this FPS (Frames Per Second) calculator to provide accurate,
          data-driven estimates of how specific games will perform on various
          hardware configurations. Whether you are building a new PC from
          scratch or upgrading your current rig for the latest AAA titles, we
          want to give you the confidence that your system will deliver the
          smooth gameplay you deserve.
        </p>
      </section>

      <section
        class="rounded-2xl border border-dark-800 bg-dark-900 p-8 shadow-xl"
      >
        <h2 class="mb-4 text-2xl font-bold text-white">
          How Our Calculator Works
        </h2>
        <p class="mb-4 leading-relaxed text-gray-300">
          Our FPS predictions are not random guesses. We utilize a
          comprehensive, constantly updated database of hardware benchmarks,
          game engine specifications, and real-world testing data.
        </p>
        <ul class="mb-4 ml-4 list-inside list-disc space-y-2 text-gray-300">
          <li>
            <strong class="text-white">Hardware Profiling:</strong> We analyze
            the compute power, VRAM, and architecture of hundreds of modern and
            legacy GPUs and CPUs.
          </li>
          <li>
            <strong class="text-white">Game Engine Demands:</strong> Different
            games utilize hardware differently. We factor in whether a game is
            CPU-heavy (like competitive shooters) or GPU-heavy (like open-world
            RPGs).
          </li>
          <li>
            <strong class="text-white">Resolution Scaling:</strong> Our
            algorithms adjust expected performance based on your target
            resolution, from standard 1080p to demanding 4K gameplay.
          </li>
        </ul>
        <p class="leading-relaxed text-gray-300">
          While no calculator can be 100% perfect due to variations in
          background software, thermals, and RAM speeds, our tool provides a
          highly reliable baseline to guide your purchasing and optimization
          decisions.
        </p>
      </section>

      <section
        class="rounded-2xl border border-dark-800 bg-dark-900 p-8 shadow-xl"
      >
        <h2 class="mb-4 text-2xl font-bold text-white">Who Built This?</h2>
        <p class="mb-4 leading-relaxed text-gray-300">
          MyFPS was developed by a passionate Front-End Developer and dedicated
          PC gaming enthusiast. Combining years of experience in advanced web
          technologies (like Vue.js and Nuxt) with a deep love for gaming, this
          platform was created to bridge the gap between complex hardware data
          and user-friendly accessibility.
        </p>
        <p class="leading-relaxed text-gray-300">
          We are committed to keeping this tool free, fast, and accurate for the
          community. We continually update our database with the latest hardware
          releases, including the newest NVIDIA RTX and AMD Radeon series
          graphics cards.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About Us - MyFPS Calculator',
  description:
    'Learn about the mission behind MyFPS.app, how our accurate PC gaming FPS calculator works, and the data-driven methodology we use to predict hardware performance.'
})
</script>
