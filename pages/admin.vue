<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Üst Başlık & Çıkış -->
      <div class="flex items-center justify-between border-b border-neutral-800 pb-6 pt-6">
        <div>
          <h1 class="text-2xl font-bold text-amber-500">⚡ Selçuk Oktay - Yönetim Paneli</h1>
          <p class="text-xs text-neutral-400 mt-1">Konser takvimini ve YouTube videolarını buradan yönetebilirsiniz.</p>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-xs text-neutral-400 hover:text-neutral-200 transition">← Siteye Dön</NuxtLink>
          <button v-if="isAdmin" @click="logoutAdmin" class="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition">Çıkış Yap</button>
        </div>
      </div>

      <!-- Giriş Formu -->
      <div v-if="!isAdmin" class="max-w-md mx-auto bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-4 text-center mt-12">
        <h2 class="text-xl font-bold text-white">Admin Girişi</h2>
        <p class="text-xs text-neutral-400">Devam etmek için yönetici şifresini giriniz.</p>
        <input 
          v-model="inputPassword" 
          type="password" 
          placeholder="Şifre" 
          @keyup.enter="loginAdmin"
          class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm text-center focus:border-amber-500 outline-none" 
        />
        <button @click="loginAdmin" class="w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition">
          Giriş Yap
        </button>
      </div>

      <!-- Yönetim Paneli -->
      <div v-else class="grid md:grid-cols-2 gap-8">
        
        <!-- Konser Yönetimi -->
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
          <h3 class="text-lg font-bold text-amber-400">+ Yeni Konser Ekle</h3>
          <div class="space-y-3 text-xs">
            <input v-model="newGig.dateTr" placeholder="Tarih TR (Örn: 25 Eylül Cuma)" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" />
            <input v-model="newGig.dateEn" placeholder="Tarih EN (Örn: Friday, Sep 25)" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" />
            <input v-model="newGig.venue" placeholder="Mekan (Ağaç Ev Kadıköy)" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" />
            <input v-model="newGig.time" placeholder="Saat (23:45)" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" />
            <button @click="addGig" class="w-full py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition">Konseri Kaydet</button>
          </div>

          <div class="mt-6 pt-4 border-t border-neutral-800 space-y-2">
            <h4 class="text-xs font-semibold text-neutral-400 mb-2">Aktif Konser Takvimi (Silmek için tıkla):</h4>
            <div v-for="g in gigs" :key="g.id" class="flex items-center justify-between bg-neutral-950 p-3 rounded-xl text-xs border border-neutral-800/50">
              <div>
                <div class="font-bold text-neutral-200">{{ g.date.tr || g.date }}</div>
                <div class="text-[11px] text-neutral-400">{{ g.venue }} • {{ g.time }}</div>
              </div>
              <button @click="deleteGig(g.id)" class="text-red-400 hover:text-red-300 font-bold px-2.5 py-1.5 bg-red-500/10 rounded-lg border border-red-500/20">Sil ✖</button>
            </div>
          </div>
        </div>

        <!-- Video Yönetimi -->
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
          <h3 class="text-lg font-bold text-amber-400">+ Yeni YouTube Video Ekle</h3>
          <div class="space-y-3 text-xs">
            <input v-model="newVideo.youtubeId" placeholder="YouTube Video ID (Örn: 432RwI4zSIs)" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" />
            <input v-model="newVideo.title" placeholder="Video Başlığı" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500" />
            <select v-model="newVideo.category" class="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white outline-none focus:border-amber-500">
              <option value="Rock & Blues">Rock & Blues</option>
              <option value="Gypsy Jazz">Gypsy Jazz</option>
            </select>
            <button @click="addVideo" class="w-full py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition">Videoyu Kaydet</button>
          </div>

          <div class="mt-6 pt-4 border-t border-neutral-800 space-y-2">
            <h4 class="text-xs font-semibold text-neutral-400 mb-2">Aktif Video Galerisi (Silmek için tıkla):</h4>
            <div v-for="v in videos" :key="v.id" class="flex items-center justify-between bg-neutral-950 p-3 rounded-xl text-xs border border-neutral-800/50">
              <div>
                <div class="font-bold text-neutral-200">{{ v.title.tr || v.title }}</div>
                <div class="text-[11px] text-amber-500">{{ v.category }}</div>
              </div>
              <button @click="deleteVideo(v.id)" class="text-red-400 hover:text-red-300 font-bold px-2.5 py-1.5 bg-red-500/10 rounded-lg border border-red-500/20">Sil ✖</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const ADMIN_PASSWORD = '1234'
const isAdmin = ref(false)
const inputPassword = ref('')

const loginAdmin = () => {
  if (inputPassword.value === ADMIN_PASSWORD) {
    isAdmin.value = true
    inputPassword.value = ''
    if (process.client) localStorage.setItem('admin_logged', 'true')
  } else {
    alert('Hatalı şifre!')
  }
}

const logoutAdmin = () => {
  isAdmin.value = false
  if (process.client) localStorage.removeItem('admin_logged')
}

const defaultGigs = [
  { id: 1, date: { en: 'Saturday, Sep 19', tr: '19 Eylül Cumartesi' }, venue: 'Ağaç Ev Kadıköy', time: '23:45' },
  { id: 2, date: { en: 'Friday, Oct 16', tr: '16 Ekim Cuma' }, venue: 'Ağaç Ev Kadıköy', time: '21:00' }
]

const defaultVideos = [
  { id: 1, youtubeId: '432RwI4zSIs', category: 'Rock & Blues', title: { en: 'Haluk BB Project', tr: 'Haluk BB Project' } }
]

const gigs = ref([...defaultGigs])
const videos = ref([...defaultVideos])

const newGig = ref({ dateTr: '', dateEn: '', venue: 'Ağaç Ev Kadıköy', time: '23:45' })
const newVideo = ref({ youtubeId: '', title: '', category: 'Rock & Blues' })

const addGig = () => {
  if (!newGig.value.dateTr) return alert('Tarih giriniz!')
  gigs.value.unshift({
    id: Date.now(),
    date: { en: newGig.value.dateEn || newGig.value.dateTr, tr: newGig.value.dateTr },
    venue: newGig.value.venue,
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: newGig.value.time,
    link: 'https://agacevbar.com/'
  })
  saveToStorage()
  newGig.value = { dateTr: '', dateEn: '', venue: 'Ağaç Ev Kadıköy', time: '23:45' }
}

const deleteGig = (id) => {
  gigs.value = gigs.value.filter(g => g.id !== id)
  saveToStorage()
}

const addVideo = () => {
  if (!newVideo.value.youtubeId) return alert('Video ID giriniz!')
  videos.value.unshift({
    id: Date.now(),
    youtubeId: newVideo.value.youtubeId,
    category: newVideo.value.category,
    title: { en: newVideo.value.title, tr: newVideo.value.title }
  })
  saveToStorage()
  newVideo.value = { youtubeId: '', title: '', category: 'Rock & Blues' }
}

const deleteVideo = (id) => {
  videos.value = videos.value.filter(v => v.id !== id)
  saveToStorage()
}

const saveToStorage = () => {
  if (process.client) {
    localStorage.setItem('custom_gigs', JSON.stringify(gigs.value))
    localStorage.setItem('custom_videos', JSON.stringify(videos.value))
  }
}

onMounted(() => {
  if (process.client) {
    if (localStorage.getItem('admin_logged') === 'true') isAdmin.value = true
    const savedGigs = localStorage.getItem('custom_gigs')
    const savedVideos = localStorage.getItem('custom_videos')
    if (savedGigs) gigs.value = JSON.parse(savedGigs)
    if (savedVideos) videos.value = JSON.parse(savedVideos)
  }
})
</script>