<template>
  <section id="projects" class="py-16 px-6 max-w-6xl mx-auto border-t border-neutral-900">
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-neutral-100">{{ t.projects.sectionTitle }}</h2>
      <p class="text-neutral-400 text-sm mt-1">{{ t.projects.sectionSubtitle }}</p>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-8 hover:border-amber-500/40 transition">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Gypsy Jazz / Swing</span>
        <h3 class="text-xl font-bold mt-2 mb-3">Gypsy Jazz Trio & Quartet</h3>
        <p class="text-neutral-400 text-sm leading-relaxed">{{ t.projects.gypsyDesc }}</p>
      </div>
      <div class="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-8 hover:border-neutral-700 transition">
        <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Electric / Live Band</span>
        <h3 class="text-xl font-bold mt-2 mb-3">Haluk BB - Rock & Blues Project</h3>
        <p class="text-neutral-400 text-sm leading-relaxed">{{ t.projects.rockDesc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  t: Object
})
</script>