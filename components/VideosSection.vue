<template>
  <section id="videos" class="py-16 px-6 border-t border-neutral-900">
    <div class="max-w-6xl mx-auto">
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-neutral-100">{{ t.videos.title }}</h2>
        <p class="text-neutral-400 text-sm mt-1">{{ t.videos.subtitle }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="video in videos" :key="video.id" class="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-lg relative group">
          <div class="relative w-full aspect-video bg-neutral-950">
            <iframe 
              :src="'https://www.youtube.com/embed/' + video.youtubeId" 
              :title="video.title[currentLang] || video.title.tr || video.title"
              class="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="p-5 flex justify-between items-center">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-amber-500">{{ video.category }}</span>
              <h3 class="text-lg font-bold text-neutral-100 mt-1">{{ video.title[currentLang] || video.title.tr || video.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  videos: Array,
  currentLang: String,
  t: Object
})
</script>