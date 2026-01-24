<template>
  <div
    class="flex min-h-screen flex-col bg-dark-950 font-sans text-white selection:bg-primary/30"
  >
    <SiteHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
