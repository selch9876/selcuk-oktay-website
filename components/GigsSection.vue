<template>
  <section id="gigs" class="py-16 px-6 border-t border-neutral-900">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold">{{ t.gigs.title }}</h2>
          <p class="text-neutral-400 text-sm mt-1">{{ t.gigs.subtitle }}</p>
        </div>
      </div>

      <div class="space-y-3">
        <div 
          v-for="gig in sortedGigs" 
          :key="gig.id" 
          :class="[
            'flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border transition relative',
            isPastGig(gig.date) 
              ? 'bg-neutral-900/30 border-neutral-800/40 opacity-50 grayscale-[30%]' 
              : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
          ]"
        >
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span :class="['text-xs font-semibold uppercase tracking-wider', isPastGig(gig.date) ? 'text-neutral-500' : 'text-amber-400']">
                {{ gig.date[currentLang] || gig.date.tr || gig.date }}
              </span>
              <span v-if="isPastGig(gig.date)" class="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/50 uppercase">
                {{ currentLang === 'en' ? 'Past Event' : 'Geçmiş Etkinlik' }}
              </span>
            </div>
            <div class="text-lg font-bold text-neutral-100">{{ gig.venue }}</div>
            <div class="text-xs text-neutral-400">
              {{ gig.address }} • <span class="text-neutral-200 font-medium">{{ gig.project }}</span>
            </div>
          </div>
          
          <div class="mt-3 sm:mt-0 flex items-center gap-3">
            <span class="text-xs font-medium px-3 py-1.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60">
              {{ gig.time }}
            </span>
            <a :href="gig.link" target="_blank" class="text-xs font-semibold px-3 py-1.5 rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-neutral-950 transition">
              {{ currentLang === 'en' ? 'Venue Info ↗' : 'Mekan Bilgisi ↗' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gigs: Array,
  currentLang: String,
  t: Object
})

const parseGigDate = (gigDateObj) => {
  const dateStr = typeof gigDateObj === 'object' ? (gigDateObj.tr || gigDateObj.en) : gigDateObj
  if (!dateStr) return new Date(0)

  const monthMap = {
    'ocak': 0, 'jan': 0, 'şubat': 1, 'feb': 1, 'mart': 2, 'mar': 2, 'nisan': 3, 'apr': 3,
    'mayıs': 4, 'may': 4, 'haziran': 5, 'jun': 5, 'temmuz': 6, 'jul': 6, 'ağustos': 7, 'aug': 7,
    'eylül': 8, 'sep': 8, 'ekim': 9, 'oct': 9, 'kasım': 10, 'nov': 10, 'aralık': 11, 'dec': 11
  }

  const matches = dateStr.match(/(\d{1,2})\s+([a-zA-ZğüşıöçĞÜŞİÖÇ]+)/i)
  if (!matches) return new Date(0)

  const day = parseInt(matches[1], 10)
  const monthName = matches[2].toLowerCase()
  const month = monthMap[monthName]

  if (month === undefined) return new Date(0)

  const yearMatch = dateStr.match(/\b(20\d{2})\b/)
  let targetYear
  
  if (yearMatch) {
    targetYear = parseInt(yearMatch[1], 10)
  } else {
    targetYear = month <= 5 ? 2027 : 2026
  }

  return new Date(targetYear, month, day, 23, 59, 59)
}

const isPastGig = (gigDateObj) => {
  const gigDate = parseGigDate(gigDateObj)
  return gigDate < new Date()
}

const sortedGigs = computed(() => {
  return [...props.gigs].sort((a, b) => {
    const isPastA = isPastGig(a.date)
    const isPastB = isPastGig(b.date)

    if (isPastA && !isPastB) return 1
    if (!isPastA && isPastB) return -1

    const dateA = parseGigDate(a.date)
    const dateB = parseGigDate(b.date)
    
    return isPastA ? dateB - dateA : dateA - dateB
  })
})
</script>