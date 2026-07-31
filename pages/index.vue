<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">
    <Navbar 
      :currentLang="currentLang" 
      :t="t" 
      @toggle-language="toggleLanguage" 
    />

    <HeroSection :t="t" />

    <AboutSection 
      :currentLang="currentLang" 
      :profileImage="profileImage" 
      :t="t" 
    />

    <ProjectsSection :t="t" />

    <VideosSection 
      :videos="videos" 
      :currentLang="currentLang" 
      :t="t" 
    />

    <GallerySection 
      :galleryPhotos="galleryPhotos" 
      :t="t" 
    />

    <GigsSection 
      :gigs="gigs" 
      :currentLang="currentLang" 
      :t="t" 
    />

    <ContactSection 
      :currentLang="currentLang" 
      :t="t" 
    />

    <footer class="py-10 border-t border-neutral-900 text-center text-xs text-neutral-500">
      <p>© 2026 Selçuk Oktay. {{ t?.footer?.rights || 'Tüm hakları saklıdır.' }}</p>
    </footer>

    <AdminModal 
      :show="showAdminModal"
      :isAdmin="isAdmin"
      :adminPassword="ADMIN_PASSWORD"
      :galleryPhotos="galleryPhotos"
      :gigs="gigs"
      :videos="videos"
      :translations="translations"
      @login="handleLogin"
      @logout="handleLogout"
      @close="showAdminModal = false"
      @update-profile-img="updateProfileImage"
      @add-photo="addPhoto"
      @update-photo="updatePhoto"
      @delete-photo="deletePhoto"
      @add-gig="addGig"
      @update-gig="updateGig"
      @delete-gig="deleteGig"
      @add-video="addVideo"
      @update-video="updateVideo"
      @delete-video="deleteVideo"
      @update-translations="updateTranslations"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '../utils/supabase'

// Dil Yönetimi
const currentLang = ref('en')
const toggleLanguage = () => { currentLang.value = currentLang.value === 'en' ? 'tr' : 'en' }

// Admin State
const ADMIN_PASSWORD = 'ibanezJem7'
const showAdminModal = ref(false)
const isAdmin = ref(false)

const handleLogin = () => {
  isAdmin.value = true
  if (process.client) localStorage.setItem('admin_logged', 'true')
}

const handleLogout = () => {
  isAdmin.value = false
  showAdminModal.value = false
  if (process.client) localStorage.removeItem('admin_logged')
}

const handleKeyDown = (event) => {
  if (event.altKey && (event.key === 'a' || event.key === 'A')) {
    event.preventDefault()
    showAdminModal.value = !showAdminModal.value
  }
}

// Varsayılan Çeviriler
const defaultTranslations = {
  en: {
    nav: { about: 'About', projects: 'Projects', videos: 'Videos', gallery: 'Gallery', gigs: 'Shows', contact: 'Contact' },
    hero: { subtitle: 'Guitarist & Musician', title: 'Gypsy Jazz & Rock / Blues Performances', description: 'Istanbul-based guitarist performing live with acoustic gypsy jazz projects and rock/blues lineups under the Haluk BB project.', btnProjects: 'Explore Projects', btnContact: 'Get in Touch' },
    about: { title: 'About Me', subtitle: 'Musician & Guitarist based in Istanbul', experienceLabel: 'Experience', locationLabel: 'Location', genresLabel: 'Primary Genres', instrumentsLabel: 'Instruments', paragraph1: 'Playing the guitar for over 35 years, my musical journey spans a diverse spectrum—from acoustic gypsy jazz to electric rock and blues.', paragraph2: 'Deeply inspired by Django Reinhardt and jazz harmony, I actively perform with acoustic gypsy jazz ensembles.', paragraph3: 'Simultaneously, I perform regularly on live music venues as part of the Haluk BB rock & blues project.' },
    projects: { sectionTitle: 'Musical Projects', sectionSubtitle: 'Active live concepts and lineups', gypsyDesc: 'An acoustic swing repertoire based on manouche rhythms and gypsy jazz improvisation.', rockDesc: 'Energetic live rock and blues performances as part of the Haluk BB project.' },
    gallery: { title: 'Photo Gallery', subtitle: 'Snapshots from stages, rehearsals, and studio sessions' },
    videos: { title: 'Live Performances', subtitle: 'Selected stage recordings and performances' },
    gigs: { title: 'Show Dates', subtitle: 'Ağaç Ev Kadıköy Live Schedule' },
    contact: { title: 'Contact & Booking', subtitle: 'For live bookings, collaborations, or general inquiries', emailLabel: 'Email Direct', locationLabel: 'Base Location', formName: 'Name', formEmail: 'Email Address', formMessage: 'Message', formSubmit: 'Send Message' },
    footer: { rights: 'All rights reserved.' }
  },
  tr: {
    nav: { about: 'Hakkımda', projects: 'Projeler', videos: 'Videolar', gallery: 'Galeri', gigs: 'Takvim', contact: 'İletişim' },
    hero: { subtitle: 'Gitarist & Müzisyen', title: 'Gypsy Jazz ve Rock / Blues Sahneleri', description: 'İstanbul merkezli gitarist. Akustik gypsy jazz projeleri ve Haluk BB bünyesindeki rock/blues grup performanslarıyla sahnelerde.', btnProjects: 'Projeleri İncele', btnContact: 'İletişime Geç' },
    about: { title: 'Hakkımda', subtitle: 'İstanbul merkezli müzisyen ve gitarist', experienceLabel: 'Deneyim', locationLabel: 'Konum', genresLabel: 'Ana Tarzlar', instrumentsLabel: 'Enstrümanlar', paragraph1: '35 yılı aşkın gitar geçmişimle müzikal yolculuğum, gypsy jazz’ın akustik zarafetinden rock ve blues’un sahne enerjisine uzanıyor.', paragraph2: 'Django Reinhardt ve caz armonisinden ilham alarak, akustik gypsy jazz topluluklarıyla sahnelerde yer alıyorum.', paragraph3: 'Eş zamanlı olarak, Haluk BB projesi bünyesinde canlı müzik mekanlarında elektrik gitar performansları sergiliyorum.' },
    projects: { sectionTitle: 'Müzikal Projeler', sectionSubtitle: 'Aktif olarak sahne aldığım konseptler', gypsyDesc: 'Manouche ritimleri ve empravizasyonlara dayalı akustik swing repertuvarı.', rockDesc: 'Haluk BB projesi kapsamında klasik/modern rock ve blues canlı sahne performansları.' },
    gallery: { title: 'Fotoğraf Galerisi', subtitle: 'Sahnelerden, provalardan ve stüdyodan kareler' },
    videos: { title: 'Canlı Performanslar', subtitle: 'Sahne ve stüdyo kayıtlarından seçkiler' },
    gigs: { title: 'Konser Takvimi', subtitle: 'Ağaç Ev Kadıköy Sahne Tarihleri' },
    contact: { title: 'İletişim & Sahne Teklifleri', subtitle: 'Konser ve etkinlik teklifleri için', emailLabel: 'E-Posta', locationLabel: 'Şehir', formName: 'Adınız', formEmail: 'E-Posta Adresiniz', formMessage: 'Mesajınız', formSubmit: 'Mesaj Gönder' },
    footer: { rights: 'Tüm hakları saklıdır.' }
  }
}

const translations = ref({ ...defaultTranslations })

// Güvenli 't' tanımı (Herhangi bir aksilikte defaultTranslations nesnesine düşer)
const t = computed(() => {
  return translations.value[currentLang.value] || defaultTranslations[currentLang.value] || defaultTranslations.en
})

// Default State
const profileImage = ref('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop')
const defaultGallery = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', caption: 'Live Guitar Performance' },
  { id: 2, url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop', caption: 'Stage & Atmosphere' },
  { id: 3, url: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=800&auto=format&fit=crop', caption: 'Acoustic Gypsy Session' }
]
const defaultVideos = [
  { id: 1, youtubeId: '432RwI4zSIs', category: 'Rock & Blues', title: { en: 'Haluk BB Project - Live Performance', tr: 'Haluk BB Project - Canlı Sahne Performansı' } },
  { id: 2, youtubeId: '7t1torWTREc', category: 'Gypsy Jazz', title: { en: 'Gypsy Jazz Trio - Acoustic Swing Session', tr: 'Gypsy Jazz Trio - Akustik Swing Kaydı' } }
]
const defaultGigs = [
  { id: 1, date: { en: 'Saturday, Sep 19, 2026', tr: '19 Eylül 2026 Cumartesi' }, venue: 'Ağaç Ev Kadıköy', address: 'Osmancık Sk. No:13/B, Kadıköy', project: 'Haluk BB (Rock & Blues)', time: '23:45', link: 'https://agacevbar.com/' },
  { id: 2, date: { en: 'Friday, Oct 16, 2026', tr: '16 Ekim 2026 Cuma' }, venue: 'Ağaç Ev Kadıköy', address: 'Osmancık Sk. No:13/B, Kadıköy', project: 'Haluk BB (Rock & Blues)', time: '21:00', link: 'https://agacevbar.com/' },
  { id: 3, date: { en: 'Saturday, Nov 07, 2026', tr: '7 Kasım 2026 Cumartesi' }, venue: 'Ağaç Ev Kadıköy', address: 'Osmancık Sk. No:13/B, Kadıköy', project: 'Haluk BB (Rock & Blues)', time: '23:45', link: 'https://agacevbar.com/' }
]

const galleryPhotos = ref([...defaultGallery])
const videos = ref([...defaultVideos])
const gigs = ref([...defaultGigs])

// Tarih Çeviri Fonksiyonu
const translateDateToEn = (trDate) => {
  if (!trDate) return ''
  let translated = trDate
  const map = {
    'Pazartesi': 'Monday', 'Salı': 'Tuesday', 'Çarşamba': 'Wednesday', 'Perşembe': 'Thursday', 'Cuma': 'Friday', 'Cumartesi': 'Saturday', 'Pazar': 'Sunday',
    'Ocak': 'Jan', 'Şubat': 'Feb', 'Mart': 'Mar', 'Nisan': 'Apr', 'Mayıs': 'May', 'Haziran': 'Jun', 'Temmuz': 'Jul', 'Ağustos': 'Aug', 'Eylul': 'Sep', 'Eylül': 'Sep', 'Ekim': 'Oct', 'Kasım': 'Nov', 'Aralık': 'Dec'
  }
  Object.keys(map).forEach(key => {
    const reg = new RegExp(key, 'gi')
    translated = translated.replace(reg, map[key])
  })
  
  const parts = translated.split(' ')
  if (parts.length === 4) {
    return `${parts[3]}, ${parts[1]} ${parts[0]}, ${parts[2]}`
  } else if (parts.length === 3) {
    return `${parts[2]}, ${parts[1]} ${parts[0]}`
  }
  return translated
}

// --- SUPABASE VERİ SERVİSLERİ ---
const fetchSiteData = async () => {
  try {
    const { data, error } = await supabase.from('site_content').select('*')
    if (error) {
      console.error('Supabase çekme hatası:', error)
      return
    }

    if (data && data.length > 0) {
      data.forEach(item => {
        if (item.key === 'profile_image' && item.data?.url) profileImage.value = item.data.url
        if (item.key === 'gallery_photos' && Array.isArray(item.data)) galleryPhotos.value = item.data
        if (item.key === 'gigs' && Array.isArray(item.data)) gigs.value = item.data
        if (item.key === 'videos' && Array.isArray(item.data)) videos.value = item.data
        if (item.key === 'translations' && item.data) translations.value = item.data
      })
    }
  } catch (err) {
    console.error('Veritabanına bağlanılamadı:', err)
  }
}

const saveToSupabase = async (key, contentData) => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .upsert(
        { key: key, data: contentData }, 
        { onConflict: 'key' }
      )

    if (error) {
      console.error(`Supabase ${key} kaydetme hatası:`, error.message)
      alert(`Hata: ${error.message}`)
    } else {
      console.log(`${key} başarıyla veritabanına yazıldı!`)
    }
  } catch (err) {
    console.error('Kaydetme hatası:', err)
  }
}

// Actions
const updateTranslations = async (newTranslations) => {
  translations.value = newTranslations
  await saveToSupabase('translations', translations.value)
}

const updateProfileImage = async (newUrl) => {
  if (!newUrl) return alert('Lütfen geçerli bir görsel adresi giriniz!')
  const cleanUrl = newUrl.split('?')[0]
  profileImage.value = `${cleanUrl}?v=${Date.now()}`
  await saveToSupabase('profile_image', { url: profileImage.value })
  alert('Profil fotoğrafınız veritabanında güncellendi!')
}

const addPhoto = async (photoData) => {
  const cleanUrl = photoData.url.split('?')[0]
  galleryPhotos.value.unshift({
    id: Date.now(),
    url: `${cleanUrl}?v=${Date.now()}`,
    caption: photoData.caption || 'Selçuk Oktay Live'
  })
  await saveToSupabase('gallery_photos', galleryPhotos.value)
}

const updatePhoto = async (photoData) => {
  const index = galleryPhotos.value.findIndex(p => p.id === photoData.id)
  if (index !== -1) {
    const cleanUrl = photoData.url.split('?')[0]
    galleryPhotos.value[index] = { ...photoData, url: `${cleanUrl}?v=${Date.now()}` }
    await saveToSupabase('gallery_photos', galleryPhotos.value)
  }
}

const deletePhoto = async (id) => {
  galleryPhotos.value = galleryPhotos.value.filter(p => p.id !== id)
  await saveToSupabase('gallery_photos', galleryPhotos.value)
}

const addGig = async (gigData) => {
  const calculatedEnDate = translateDateToEn(gigData.dateTr)
  gigs.value.unshift({
    id: Date.now(),
    date: { en: calculatedEnDate, tr: gigData.dateTr },
    venue: gigData.venue,
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: gigData.time,
    link: 'https://agacevbar.com/'
  })
  await saveToSupabase('gigs', gigs.value)
}

const updateGig = async (gigData) => {
  const index = gigs.value.findIndex(g => g.id === gigData.id)
  if (index !== -1) {
    const calculatedEnDate = translateDateToEn(gigData.dateTr)
    gigs.value[index] = {
      ...gigs.value[index],
      date: { en: calculatedEnDate, tr: gigData.dateTr },
      venue: gigData.venue,
      time: gigData.time
    }
    await saveToSupabase('gigs', gigs.value)
  }
}

const deleteGig = async (id) => {
  gigs.value = gigs.value.filter(g => g.id !== id)
  await saveToSupabase('gigs', gigs.value)
}

const addVideo = async (videoData) => {
  videos.value.unshift({
    id: Date.now(),
    youtubeId: videoData.youtubeId,
    category: videoData.category,
    title: { en: videoData.title, tr: videoData.title }
  })
  await saveToSupabase('videos', videos.value)
}

const updateVideo = async (videoData) => {
  const index = videos.value.findIndex(v => v.id === videoData.id)
  if (index !== -1) {
    videos.value[index] = {
      ...videos.value[index],
      youtubeId: videoData.youtubeId,
      category: videoData.category,
      title: { en: videoData.title, tr: videoData.title }
    }
    await saveToSupabase('videos', videos.value)
  }
}

const deleteVideo = async (id) => {
  videos.value = videos.value.filter(v => v.id !== id)
  await saveToSupabase('videos', videos.value)
}

// Lifecycle Hooks
onMounted(() => {
  if (process.client) {
    window.addEventListener('keydown', handleKeyDown)
    if (localStorage.getItem('admin_logged') === 'true') isAdmin.value = true
  }
  fetchSiteData()
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>