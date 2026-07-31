<template>
  <nav class="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 px-6 py-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="#" class="flex items-center gap-3.5 group">
        <img 
          src="/images/logo.png" 
          alt="Selçuk Oktay Logo" 
          class="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition duration-300" 
        />
        <span class="text-lg sm:text-xl font-bold tracking-wider uppercase text-neutral-100 group-hover:text-amber-400 transition">
          Selçuk Oktay
        </span>
      </a>

      <div class="flex items-center space-x-6 sm:space-x-8 text-sm font-medium">
        <div class="hidden sm:flex items-center space-x-6 text-neutral-300">
          <a href="#about" class="hover:text-amber-400 transition">{{ t.nav.about }}</a>
          <a href="#projects" class="hover:text-amber-400 transition">{{ t.nav.projects }}</a>
          <a href="#videos" class="hover:text-amber-400 transition">{{ t.nav.videos }}</a>
          <a href="#gallery" class="hover:text-amber-400 transition">{{ t.nav.gallery }}</a>
          <a href="#gigs" class="hover:text-amber-400 transition">{{ t.nav.gigs }}</a>
          <a href="#contact" class="hover:text-amber-400 transition">{{ t.nav.contact }}</a>
        </div>

        <button 
          @click="$emit('toggle-language')" 
          class="px-3 py-1 rounded-lg border border-neutral-700 bg-neutral-900 text-xs font-semibold text-amber-400 hover:border-amber-400 transition uppercase tracking-wider">
          🌐 {{ currentLang === 'en' ? 'TR' : 'EN' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  currentLang: String,
  t: Object
})
defineEmits(['toggle-language'])
</script>