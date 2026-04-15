<template>
  <main
    class="min-h-screen bg-dark-950 px-6 py-20 text-white sm:px-12 lg:px-24"
  >
    <div
      class="mx-auto max-w-4xl space-y-8 rounded-2xl border border-dark-800 bg-dark-900 p-8"
    >
      <h1 class="mb-8 text-4xl font-bold text-white">Privacy Policy</h1>
      <p class="mb-8 text-sm text-gray-500">
        Last updated: {{ new Date().toLocaleDateString() }}
      </p>

      <section class="space-y-6">
        <div>
          <h2 class="mb-3 text-2xl font-semibold text-white">
            1. Information We Collect
          </h2>
          <p class="leading-relaxed">
            When you visit our website, we may automatically collect data such
            as your IP address, browser type, and operating system for
            analytics, debugging, and security purposes to improve user
            experience.
          </p>
        </div>

        <div>
          <h2 class="mb-3 text-2xl font-semibold text-white">
            2. Cookies and Advertising
          </h2>
          <p class="mb-3 leading-relaxed">
            We use third-party advertising companies, including Google AdSense,
            to serve ads when you visit our website. These companies may use
            cookies (such as the Google DoubleClick cookie) to serve ads based
            on your prior visits to our website or other websites on the
            internet.
          </p>
          <p class="leading-relaxed">
            Users may opt out of personalized advertising by visiting
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              class="text-blue-400 hover:underline"
              >Google's Ads Settings</a
            >.
          </p>
        </div>

        <div>
          <h2 class="mb-3 text-2xl font-semibold text-white">3. Log Files</h2>
          <p class="leading-relaxed">
            Like many standard websites, we utilize log files. This includes
            internet protocol (IP) addresses, browser type, internet service
            provider (ISP), referring/exit pages, platform type, date/time
            stamp, and number of clicks to analyze trends and administer the
            site.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
<script setup lang="ts"></script>
