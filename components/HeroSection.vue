<template>
  <header class="relative pt-36 pb-16 px-6 max-w-4xl mx-auto text-center">
    <p class="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-4">
      {{ t.hero.subtitle }}
    </p>
    <h1 class="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-neutral-100">
      {{ t.hero.title }}
    </h1>
    <p class="mt-6 text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
      {{ t.hero.description }}
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <a href="#projects" class="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-semibold text-sm hover:bg-amber-400 transition">
        {{ t.hero.btnProjects }}
      </a>
      <a href="#contact" class="px-5 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 border border-neutral-800 text-sm font-semibold hover:bg-neutral-800 transition">
        {{ t.hero.btnContact }}
      </a>
    </div>
  </header>
</template>

<script setup>
defineProps({
  t: Object
})
</script>