<template>
  <section id="about" class="py-20 px-6 max-w-6xl mx-auto border-t border-neutral-900">
    <div class="grid md:grid-cols-12 gap-12 items-center">
      
      <!-- Profil Fotoğrafı Kartı -->
      <div class="md:col-span-5 space-y-6">
        <div class="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
          <img 
            :key="profileImage"
            :src="profileImage" 
            alt="Selçuk Oktay" 
            class="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition duration-500" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
          <div class="absolute bottom-4 left-6 right-6">
            <h3 class="text-xl font-bold text-neutral-100">Selçuk Oktay</h3>
            <p class="text-xs font-medium text-amber-400 uppercase tracking-wider mt-0.5">
              {{ currentLang === 'en' ? 'Guitarist & Songwriter' : 'Gitarist & Besteci' }}
            </p>
          </div>
        </div>

        <div class="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 space-y-3 text-sm">
          <div class="flex justify-between items-center py-1.5 border-b border-neutral-800/50">
            <span class="text-neutral-400">{{ t.about.experienceLabel }}</span>
            <span class="font-semibold text-neutral-200">35+ {{ currentLang === 'en' ? 'Years' : 'Yıl' }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-neutral-800/50">
            <span class="text-neutral-400">{{ t.about.locationLabel }}</span>
            <span class="font-semibold text-neutral-200">İstanbul, TR</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-neutral-800/50">
            <span class="text-neutral-400">{{ t.about.genresLabel }}</span>
            <span class="font-semibold text-neutral-200">Gypsy Jazz, Rock, Blues</span>
          </div>
          <div class="flex justify-between items-center py-1.5">
            <span class="text-neutral-400">{{ t.about.instrumentsLabel }}</span>
            <span class="font-semibold text-neutral-200">Acoustic & Electric Guitars</span>
          </div>
        </div>
      </div>

      <div class="md:col-span-7 space-y-6">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-neutral-100">{{ t.about.title }}</h2>
          <p class="text-neutral-500 text-sm mt-1">{{ t.about.subtitle }}</p>
        </div>
        <div class="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>{{ t.about.paragraph1 }}</p>
          <p>{{ t.about.paragraph2 }}</p>
          <p>{{ t.about.paragraph3 }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  currentLang: String,
  profileImage: String,
  t: Object
})
</script>