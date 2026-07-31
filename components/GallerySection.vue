<template>
  <section id="gallery" class="py-12 px-6 bg-neutral-900/20 border-t border-neutral-900 overflow-hidden">
    <div class="max-w-4xl mx-auto">
      <div class="mb-6 flex items-end justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-neutral-100">{{ t.gallery.title }}</h2>
          <p class="text-neutral-400 text-xs sm:text-sm mt-0.5">{{ t.gallery.subtitle }}</p>
        </div>
        <div class="flex gap-2" v-if="galleryPhotos.length > 1">
          <button 
            @click="prevSlide" 
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-neutral-300 hover:border-amber-500 hover:text-amber-400 transition">
            ❮
          </button>
          <button 
            @click="nextSlide" 
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-neutral-300 hover:border-amber-500 hover:text-amber-400 transition">
            ❯
          </button>
        </div>
      </div>

      <div v-if="galleryPhotos.length" class="relative max-w-2xl mx-auto">
        <div class="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-xl group cursor-pointer" @click="activeLightbox = true">
          <img 
            :src="galleryPhotos[currentSlide].url" 
            class="absolute inset-0 w-full h-full object-cover blur-md opacity-25 scale-110" 
          />
          <img 
            :src="galleryPhotos[currentSlide].url" 
            :alt="galleryPhotos[currentSlide].caption"
            class="relative z-10 w-full h-full object-contain p-2 transition-all duration-300"
          />
          <div class="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          
          <div class="absolute bottom-4 left-4 right-4 z-30 flex justify-between items-end">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {{ currentSlide + 1 }} / {{ galleryPhotos.length }}
              </span>
              <p class="text-xs sm:text-sm font-semibold text-neutral-100 mt-1.5">{{ galleryPhotos[currentSlide].caption }}</p>
            </div>
            <span class="text-[11px] text-neutral-400 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-800 flex items-center gap-1 group-hover:text-amber-400 transition">
              🔍 Büyüt
            </span>
          </div>
        </div>

        <div class="flex justify-center gap-1.5 mt-3" v-if="galleryPhotos.length > 1">
          <button 
            v-for="(_, index) in galleryPhotos" 
            :key="index"
            @click="currentSlide = index"
            :class="['h-1.5 rounded-full transition-all duration-300', currentSlide === index ? 'w-6 bg-amber-500' : 'w-1.5 bg-neutral-800 hover:bg-neutral-700']">
          </button>
        </div>
      </div>

      <div v-else class="text-center py-8 text-neutral-500 text-xs">
        Galeriye henüz fotoğraf eklenmedi.
      </div>
    </div>

    <!-- Tam Ekran Lightbox -->
    <div v-if="activeLightbox" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4" @click.self="activeLightbox = false">
      <button @click="activeLightbox = false" class="absolute top-6 right-6 text-white text-2xl font-bold bg-neutral-800/80 hover:bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center">✕</button>
      <div class="max-w-5xl w-full text-center space-y-4">
        <img :src="galleryPhotos[currentSlide].url" :alt="galleryPhotos[currentSlide].caption" class="max-h-[80vh] mx-auto rounded-xl object-contain shadow-2xl" />
        <p class="text-sm text-neutral-300 font-medium">{{ galleryPhotos[currentSlide].caption }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  galleryPhotos: Array,
  t: Object
})

const currentSlide = ref(0)
const activeLightbox = ref(false)

const nextSlide = () => {
  if (props.galleryPhotos.length === 0) return
  currentSlide.value = (currentSlide.value + 1) % props.galleryPhotos.length
}

const prevSlide = () => {
  if (props.galleryPhotos.length === 0) return
  currentSlide.value = (currentSlide.value - 1 + props.galleryPhotos.length) % props.galleryPhotos.length
}
</script>