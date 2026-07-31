<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      
      <!-- Giriş Yapılmadıysa -->
      <div v-if="!isAdmin" class="space-y-4 text-center">
        <h3 class="text-xl font-bold text-white">Yönetici Girişi</h3>
        <p class="text-xs text-neutral-400">Site içeriğini yönetmek için şifreyi giriniz.</p>
        <input 
          v-model="inputPassword" 
          type="password" 
          placeholder="Şifre" 
          @keyup.enter="loginAdmin"
          class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm text-center focus:border-amber-500 outline-none" 
        />
        <div class="flex gap-2">
          <button @click="loginAdmin" class="w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition">Giriş Yap</button>
          <button @click="$emit('close')" class="px-5 py-3 rounded-xl bg-neutral-800 text-neutral-300 font-semibold text-sm">Kapat</button>
        </div>
      </div>

      <!-- Giriş Yapıldıysa -->
      <div v-else class="space-y-6">
        <div class="flex justify-between items-center border-b border-neutral-800 pb-4">
          <h3 class="text-lg font-bold text-amber-400">⚡ Admin Yönetim Paneli</h3>
          <button @click="$emit('logout')" class="text-xs text-red-400 hover:underline">Çıkış Yap</button>
        </div>

        <!-- Sekme Menüsü (Tab Navigation) -->
        <div class="flex gap-2 border-b border-neutral-800 pb-3 text-xs font-semibold overflow-x-auto">
          <button 
            @click="activeTab = 'texts'" 
            :class="['px-3 py-1.5 rounded-lg transition', activeTab === 'texts' ? 'bg-amber-500 text-black' : 'bg-neutral-950 text-neutral-400 hover:text-white']">
            📝 Site Metinleri
          </button>
          <button 
            @click="activeTab = 'gigs'" 
            :class="['px-3 py-1.5 rounded-lg transition', activeTab === 'gigs' ? 'bg-amber-500 text-black' : 'bg-neutral-950 text-neutral-400 hover:text-white']">
            🎸 Konserler
          </button>
          <button 
            @click="activeTab = 'gallery'" 
            :class="['px-3 py-1.5 rounded-lg transition', activeTab === 'gallery' ? 'bg-amber-500 text-black' : 'bg-neutral-950 text-neutral-400 hover:text-white']">
            🖼️ Galeri & Profil
          </button>
          <button 
            @click="activeTab = 'videos'" 
            :class="['px-3 py-1.5 rounded-lg transition', activeTab === 'videos' ? 'bg-amber-500 text-black' : 'bg-neutral-950 text-neutral-400 hover:text-white']">
            📺 Videolar
          </button>
        </div>

        <!-- 1. SEKME: SITE METİNLERİ DÜZENLEME -->
        <div v-if="activeTab === 'texts'" class="space-y-4 text-xs">
          <div class="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <h4 class="font-bold text-amber-400 uppercase tracking-wider">Hero (Karşılama Bölümü)</h4>
            <div>
              <label class="block text-neutral-400 mb-1">Hero Alt Başlık (TR)</label>
              <input v-model="localTranslations.tr.hero.subtitle" class="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white" />
            </div>
            <div>
              <label class="block text-neutral-400 mb-1">Hero Ana Başlık (TR)</label>
              <input v-model="localTranslations.tr.hero.title" class="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white" />
            </div>
            <div>
              <label class="block text-neutral-400 mb-1">Hero Açıklama (TR)</label>
              <textarea v-model="localTranslations.tr.hero.description" rows="2" class="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white"></textarea>
            </div>
          </div>

          <div class="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <h4 class="font-bold text-amber-400 uppercase tracking-wider">Hakkımda Bölümü</h4>
            <div>
              <label class="block text-neutral-400 mb-1">Paragraf 1 (TR)</label>
              <textarea v-model="localTranslations.tr.about.paragraph1" rows="2" class="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white"></textarea>
            </div>
            <div>
              <label class="block text-neutral-400 mb-1">Paragraf 2 (TR)</label>
              <textarea v-model="localTranslations.tr.about.paragraph2" rows="2" class="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white"></textarea>
            </div>
            <div>
              <label class="block text-neutral-400 mb-1">Paragraf 3 (TR)</label>
              <textarea v-model="localTranslations.tr.about.paragraph3" rows="2" class="w-full p-2 bg-neutral-900 border border-neutral-800 rounded text-white"></textarea>
            </div>
          </div>

          <button @click="saveTranslations" class="w-full py-2.5 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition">
            💾 Tüm Metin Değişikliklerini Kaydet
          </button>
        </div>

        <!-- 2. SEKME: KONSERLER (Ekle & Düzenle) -->
        <div v-if="activeTab === 'gigs'" class="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <div class="flex justify-between items-center">
            <h4 class="text-sm font-bold text-white">{{ editingGigId ? '✏️ Konser Bilgisini Düzenle' : '+ Yeni Konser Ekle' }}</h4>
            <button v-if="editingGigId" @click="cancelGigEdit" class="text-xs text-amber-400 underline">Vazgeç</button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <input v-model="newGig.dateTr" placeholder="Tarih TR (Örn: 25 Eylül 2026 Cuma)" class="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
            <input v-model="newGig.venue" placeholder="Mekan (Ağaç Ev Kadıköy)" class="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
            <input v-model="newGig.time" placeholder="Saat (23:45)" class="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
          </div>
          <button @click="handleAddOrUpdateGig" class="w-full py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition">
            {{ editingGigId ? 'Konseri Güncelle' : 'Konser Kaydet' }}
          </button>

          <div class="mt-4 pt-3 border-t border-neutral-800/60 space-y-2">
            <h5 class="text-xs font-semibold text-neutral-400">Mevcut Konser Listesi:</h5>
            <div v-for="g in gigs" :key="g.id" class="flex items-center justify-between bg-neutral-900 p-2 rounded-lg text-xs">
              <span class="truncate max-w-[280px]">{{ g.date.tr || g.date }} - {{ g.venue }} ({{ g.time }})</span>
              <div class="flex gap-1.5">
                <button @click="editGig(g)" class="text-emerald-400 hover:text-emerald-300 font-bold px-2 py-1 bg-emerald-500/10 rounded">Düzenle ✏️</button>
                <button @click="$emit('delete-gig', g.id)" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 bg-red-500/10 rounded">Kaldır ✖</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. SEKME: GALERİ VE PROFİL (Ekle & Düzenle) -->
        <div v-if="activeTab === 'gallery'" class="space-y-4">
          <div class="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <h4 class="text-sm font-bold text-white">🖼️ Profil Fotoğrafını Değiştir</h4>
            <input v-model="tempProfileImage" placeholder="Fotoğraf URL'si (ör. /images/selcuk.jpg)" class="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-xs" />
            <button @click="$emit('update-profile-img', tempProfileImage)" class="w-full py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition">Profil Fotoğrafını Güncelle</button>
          </div>

          <div class="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div class="flex justify-between items-center">
              <h4 class="text-sm font-bold text-white">{{ editingPhotoId ? '✏️ Fotoğraf Bilgisini Düzenle' : '+ Galeriye Yeni Fotoğraf Ekle' }}</h4>
              <button v-if="editingPhotoId" @click="cancelPhotoEdit" class="text-xs text-amber-400 underline">Vazgeç</button>
            </div>
            <div class="space-y-2 text-xs">
              <input v-model="newPhoto.url" placeholder="ör. /images/selcuk.jpg" class="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
              <input v-model="newPhoto.caption" placeholder="Açıklama" class="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
            </div>
            <button @click="handleAddOrUpdatePhoto" class="w-full py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition">
              {{ editingPhotoId ? 'Fotoğrafı Güncelle' : 'Fotoğraf Ekle' }}
            </button>

            <div class="mt-4 pt-3 border-t border-neutral-800/60 space-y-2">
              <h5 class="text-xs font-semibold text-neutral-400">Mevcut Galeri:</h5>
              <div v-for="p in galleryPhotos" :key="p.id" class="flex items-center justify-between bg-neutral-900 p-2 rounded-lg text-xs">
                <span class="truncate max-w-[280px]">{{ p.caption || p.url }}</span>
                <div class="flex gap-1.5">
                  <button @click="editPhoto(p)" class="text-emerald-400 hover:text-emerald-300 font-bold px-2 py-1 bg-emerald-500/10 rounded">Düzenle ✏️</button>
                  <button @click="$emit('delete-photo', p.id)" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 bg-red-500/10 rounded">Kaldır ✖</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. SEKME: VİDEOLAR (Ekle & Düzenle) -->
        <div v-if="activeTab === 'videos'" class="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <div class="flex justify-between items-center">
            <h4 class="text-sm font-bold text-white">{{ editingVideoId ? '✏️ Video Bilgisini Düzenle' : '+ Yeni YouTube Video Ekle' }}</h4>
            <button v-if="editingVideoId" @click="cancelVideoEdit" class="text-xs text-amber-400 underline">Vazgeç</button>
          </div>
          <div class="space-y-2 text-xs">
            <input v-model="newVideo.youtubeId" placeholder="YouTube Video ID" class="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
            <input v-model="newVideo.title" placeholder="Video Başlığı" class="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
            <select v-model="newVideo.category" class="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white">
              <option value="Rock & Blues">Rock & Blues</option>
              <option value="Gypsy Jazz">Gypsy Jazz</option>
            </select>
          </div>
          <button @click="handleAddOrUpdateVideo" class="w-full py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition">
            {{ editingVideoId ? 'Videoyu Güncelle' : 'Video Kaydet' }}
          </button>

          <div class="mt-4 pt-3 border-t border-neutral-800/60 space-y-2">
            <h5 class="text-xs font-semibold text-neutral-400">Mevcut Videolar:</h5>
            <div v-for="v in videos" :key="v.id" class="flex items-center justify-between bg-neutral-900 p-2 rounded-lg text-xs">
              <span class="truncate max-w-[280px]">{{ v.title.tr || v.title }} ({{ v.category }})</span>
              <div class="flex gap-1.5">
                <button @click="editVideo(v)" class="text-emerald-400 hover:text-emerald-300 font-bold px-2 py-1 bg-emerald-500/10 rounded">Düzenle ✏️</button>
                <button @click="$emit('delete-video', v.id)" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 bg-red-500/10 rounded">Kaldır ✖</button>
              </div>
            </div>
          </div>
        </div>

        <button @click="$emit('close')" class="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl transition">
          Paneli Kapat ve Siteyi Gör
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  isAdmin: Boolean,
  adminPassword: String,
  galleryPhotos: Array,
  gigs: Array,
  videos: Array,
  translations: Object
})

const emit = defineEmits([
  'login', 'logout', 'close', 
  'update-profile-img', 
  'add-photo', 'update-photo', 'delete-photo', 
  'add-gig', 'update-gig', 'delete-gig', 
  'add-video', 'update-video', 'delete-video',
  'update-translations'
])

const activeTab = ref('texts')
const inputPassword = ref('')
const tempProfileImage = ref('')

// Form durumları ve Düzenleme ID'leri
const editingPhotoId = ref(null)
const newPhoto = ref({ url: '', caption: '' })

const editingGigId = ref(null)
const newGig = ref({ dateTr: '', venue: 'Ağaç Ev Kadıköy', time: '23:45' })

const editingVideoId = ref(null)
const newVideo = ref({ youtubeId: '', title: '', category: 'Rock & Blues' })

const localTranslations = ref(JSON.parse(JSON.stringify(props.translations)))

watch(() => props.translations, (newVal) => {
  localTranslations.value = JSON.parse(JSON.stringify(newVal))
}, { deep: true })

const saveTranslations = () => {
  emit('update-translations', localTranslations.value)
  alert('Site metinleri başarıyla güncellendi!')
}

const loginAdmin = () => {
  if (inputPassword.value === props.adminPassword) {
    emit('login')
    inputPassword.value = ''
  } else {
    alert('Hatalı şifre!')
  }
}

// GALERİ DÜZENLEME & EKLEME
const editPhoto = (photo) => {
  editingPhotoId.value = photo.id
  newPhoto.value = { url: photo.url, caption: photo.caption }
}
const cancelPhotoEdit = () => {
  editingPhotoId.value = null
  newPhoto.value = { url: '', caption: '' }
}
const handleAddOrUpdatePhoto = () => {
  if (!newPhoto.value.url) return alert('Fotoğraf URL\'si giriniz!')
  if (editingPhotoId.value) {
    emit('update-photo', { id: editingPhotoId.value, ...newPhoto.value })
    editingPhotoId.value = null
  } else {
    emit('add-photo', { ...newPhoto.value })
  }
  newPhoto.value = { url: '', caption: '' }
}

// KONSER DÜZENLEME & EKLEME
const editGig = (gig) => {
  editingGigId.value = gig.id
  const dateText = typeof gig.date === 'object' ? gig.date.tr : gig.date
  newGig.value = { dateTr: dateText, venue: gig.venue, time: gig.time }
}
const cancelGigEdit = () => {
  editingGigId.value = null
  newGig.value = { dateTr: '', venue: 'Ağaç Ev Kadıköy', time: '23:45' }
}
const handleAddOrUpdateGig = () => {
  if (!newGig.value.dateTr) return alert('Tarih giriniz!')
  if (editingGigId.value) {
    emit('update-gig', { id: editingGigId.value, ...newGig.value })
    editingGigId.value = null
  } else {
    emit('add-gig', { ...newGig.value })
  }
  newGig.value = { dateTr: '', venue: 'Ağaç Ev Kadıköy', time: '23:45' }
}

// VİDEO DÜZENLEME & EKLEME
const editVideo = (video) => {
  editingVideoId.value = video.id
  const titleText = typeof video.title === 'object' ? video.title.tr : video.title
  newVideo.value = { youtubeId: video.youtubeId, title: titleText, category: video.category }
}
const cancelVideoEdit = () => {
  editingVideoId.value = null
  newVideo.value = { youtubeId: '', title: '', category: 'Rock & Blues' }
}
const handleAddOrUpdateVideo = () => {
  if (!newVideo.value.youtubeId) return alert('Video ID giriniz!')
  if (editingVideoId.value) {
    emit('update-video', { id: editingVideoId.value, ...newVideo.value })
    editingVideoId.value = null
  } else {
    emit('add-video', { ...newVideo.value })
  }
  newVideo.value = { youtubeId: '', title: '', category: 'Rock & Blues' }
}
</script>