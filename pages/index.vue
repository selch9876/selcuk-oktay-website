<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">
    
    <!-- Üst Menü / Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        
        <!-- Logo / İsim -->
        <a href="#" class="text-lg font-bold tracking-wider uppercase text-neutral-100 hover:text-amber-400 transition">
          Selçuk Oktay
        </a>

        <!-- Menü & Dil Değiştirici -->
        <div class="flex items-center space-x-6 sm:space-x-8 text-sm font-medium">
          <div class="hidden sm:flex items-center space-x-6 text-neutral-300">
            <a href="#about" class="hover:text-amber-400 transition">{{ t.nav.about }}</a>
            <a href="#projects" class="hover:text-amber-400 transition">{{ t.nav.projects }}</a>
            <a href="#videos" class="hover:text-amber-400 transition">{{ t.nav.videos }}</a>
            <a href="#gigs" class="hover:text-amber-400 transition">{{ t.nav.gigs }}</a>
            <a href="#contact" class="hover:text-amber-400 transition">{{ t.nav.contact }}</a>
          </div>

          <!-- Dil Değiştirme Butonu (TR / EN) -->
          <button 
            @click="toggleLanguage" 
            class="px-3 py-1 rounded-lg border border-neutral-700 bg-neutral-900 text-xs font-semibold text-amber-400 hover:border-amber-400 transition uppercase tracking-wider">
            🌐 {{ currentLang === 'en' ? 'TR' : 'EN' }}
          </button>
        </div>

      </div>
    </nav>

    <!-- Hero / Giriş Alanı -->
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

    <!-- Hakkımda (About) Bölümü -->
    <section id="about" class="py-20 px-6 max-w-6xl mx-auto border-t border-neutral-900">
      <div class="grid md:grid-cols-12 gap-12 items-start">
        
        <!-- Sol Taraf: Özet Kart -->
        <div class="md:col-span-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 p-8 space-y-6">
          <div class="border-b border-neutral-800 pb-6">
            <h3 class="text-2xl font-bold text-neutral-100">Selçuk Oktay</h3>
            <p class="text-xs font-medium text-amber-500 uppercase tracking-wider mt-1">
              {{ currentLang === 'en' ? 'Guitarist & Songwriter' : 'Gitarist & Besteci' }}
            </p>
          </div>

          <div class="space-y-4 text-sm">
            <div class="flex justify-between items-center py-2 border-b border-neutral-800/50">
              <span class="text-neutral-400">{{ t.about.experienceLabel }}</span>
              <span class="font-semibold text-neutral-200">35+ {{ currentLang === 'en' ? 'Years' : 'Yıl' }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-neutral-800/50">
              <span class="text-neutral-400">{{ t.about.locationLabel }}</span>
              <span class="font-semibold text-neutral-200">İstanbul, TR</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-neutral-800/50">
              <span class="text-neutral-400">{{ t.about.genresLabel }}</span>
              <span class="font-semibold text-neutral-200">Gypsy Jazz, Rock, Blues</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-neutral-400">{{ t.about.instrumentsLabel }}</span>
              <span class="font-semibold text-neutral-200">Acoustic & Electric Guitars</span>
            </div>
          </div>
        </div>

        <!-- Sağ Taraf: Biyografi Metni -->
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

    <!-- Projeler -->
    <section id="projects" class="py-16 px-6 max-w-6xl mx-auto border-t border-neutral-900">
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-neutral-100">{{ t.projects.sectionTitle }}</h2>
        <p class="text-neutral-400 text-sm mt-1">{{ t.projects.sectionSubtitle }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        
        <!-- Gypsy Jazz Card -->
        <div class="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-8 hover:border-amber-500/40 transition">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Gypsy Jazz / Swing</span>
          <h3 class="text-xl font-bold mt-2 mb-3">Gypsy Jazz Trio & Quartet</h3>
          <p class="text-neutral-400 text-sm leading-relaxed">
            {{ t.projects.gypsyDesc }}
          </p>
        </div>

        <!-- Rock & Blues Card -->
        <div class="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-8 hover:border-neutral-700 transition">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Electric / Live Band</span>
          <h3 class="text-xl font-bold mt-2 mb-3">Haluk BB - Rock & Blues Project</h3>
          <p class="text-neutral-400 text-sm leading-relaxed">
            {{ t.projects.rockDesc }}
          </p>
        </div>

      </div>
    </section>

    <!-- YouTube Video Galerisi -->
    <section id="videos" class="py-16 px-6 bg-neutral-900/20 border-t border-neutral-900">
      <div class="max-w-6xl mx-auto">
        <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold text-neutral-100">{{ t.videos.title }}</h2>
            <p class="text-neutral-400 text-sm mt-1">{{ t.videos.subtitle }}</p>
          </div>
        </div>

        <!-- Video Izgarası (Grid) -->
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="video in videos" :key="video.id" class="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-lg">
            
            <!-- YouTube Embed İframe -->
            <div class="relative w-full aspect-video bg-neutral-950">
              <iframe 
                :src="'https://www.youtube.com/embed/' + video.youtubeId" 
                :title="video.title[currentLang]"
                class="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>

            <!-- Video Başlık ve Etiket -->
            <div class="p-5">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-500">
                {{ video.category }}
              </span>
              <h3 class="text-lg font-bold text-neutral-100 mt-1">
                {{ video.title[currentLang] }}
              </h3>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Sahneler (Gigs) -->
    <section id="gigs" class="py-16 px-6 border-t border-neutral-900">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold">{{ t.gigs.title }}</h2>
            <p class="text-neutral-400 text-sm mt-1">{{ t.gigs.subtitle }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div v-for="gig in gigs" :key="gig.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition">
            <div class="space-y-1">
              <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {{ gig.date[currentLang] }}
              </div>
              <div class="text-lg font-bold text-neutral-100">
                {{ gig.venue }}
              </div>
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

    <!-- İletişim (Contact) Bölümü -->
    <section id="contact" class="py-20 px-6 max-w-6xl mx-auto border-t border-neutral-900">
      <div class="grid md:grid-cols-12 gap-12">
        
        <!-- Sol Taraf: İletişim Bilgileri ve Sosyal Medya -->
        <div class="md:col-span-5 space-y-6">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-neutral-100">{{ t.contact.title }}</h2>
            <p class="text-neutral-400 text-sm mt-2">{{ t.contact.subtitle }}</p>
          </div>

          <div class="space-y-4 pt-2">
            <!-- E-posta Kartı -->
            <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div class="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
                {{ t.contact.emailLabel }}
              </div>
              <a href="mailto:selcukoktay@gmail.com" class="text-base font-semibold text-neutral-200 hover:text-amber-400 transition">
                selcukoktay@gmail.com
              </a>
            </div>

            <!-- Konum Kartı -->
            <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div class="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
                {{ t.contact.locationLabel }}
              </div>
              <p class="text-base font-semibold text-neutral-200">
                İstanbul, Türkiye
              </p>
            </div>
          </div>

          <!-- Sosyal Medya Bağlantıları -->
          <div class="pt-2 flex flex-wrap gap-3">
            <a 
              href="https://www.youtube.com/@selcukoktay" 
              target="_blank" 
              class="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition flex items-center gap-2">
              <span>YouTube</span> ↗
            </a>
            <a 
              href="https://www.instagram.com/selch1/" 
              target="_blank" 
              class="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition flex items-center gap-2">
              <span>Instagram</span> ↗
            </a>
          </div>
        </div>

        <!-- Sağ Taraf: İletişim Formu (Formspree Entegreli) -->
        <div class="md:col-span-7 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-8">
          <form action="https://formspree.io/f/selcukoktay@gmail.com" method="POST" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                {{ t.contact.formName }}
              </label>
              <input 
                type="text" 
                name="name"
                required
                class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 transition"
                :placeholder="currentLang === 'en' ? 'Your name' : 'Adınız Soyadınız'"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                {{ t.contact.formEmail }}
              </label>
              <input 
                type="email" 
                name="email"
                required
                class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 transition"
                :placeholder="currentLang === 'en' ? 'your.email@example.com' : 'eposta@ornek.com'"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                {{ t.contact.formMessage }}
              </label>
              <textarea 
                name="message"
                rows="4" 
                required
                class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 transition"
                :placeholder="currentLang === 'en' ? 'Your message or booking inquiry...' : 'Mesajınız veya sahne teklifiniz...'"
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="w-full py-3.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm hover:bg-amber-400 transition shadow-lg shadow-amber-500/10">
              {{ t.contact.formSubmit }}
            </button>
          </form>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <footer class="py-10 border-t border-neutral-900 text-center text-xs text-neutral-500">
      <p>© 2026 Selçuk Oktay. {{ t.footer.rights }}</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Başlangıç dili varsayılan olarak İngilizce
const currentLang = ref('en')

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'tr' : 'en'
}

const translations = {
  en: {
    nav: { about: 'About', projects: 'Projects', videos: 'Videos', gigs: 'Shows', contact: 'Contact' },
    hero: {
      subtitle: 'Guitarist & Musician',
      title: 'Gypsy Jazz & Rock / Blues Performances',
      description: 'Istanbul-based guitarist performing live with acoustic gypsy jazz projects and rock/blues lineups under the Haluk BB project.',
      btnProjects: 'Explore Projects',
      btnContact: 'Get in Touch'
    },
    about: {
      title: 'About Me',
      subtitle: 'Musician & Guitarist based in Istanbul',
      experienceLabel: 'Experience',
      locationLabel: 'Location',
      genresLabel: 'Primary Genres',
      instrumentsLabel: 'Instruments',
      paragraph1: 'Playing the guitar for over 35 years, my musical journey spans a diverse spectrum—from the acoustic elegance of gypsy jazz to the raw, high-energy drive of electric rock and blues.',
      paragraph2: 'Deeply inspired by the jazz harmony and improvisational traditions of Django Reinhardt and classical swing, I actively perform with acoustic gypsy jazz ensembles in various formats.',
      paragraph3: 'Simultaneously, I continue performing regularly on live music venues as part of the Haluk BB rock & blues project, delivering dynamic electric guitar performances.'
    },
    projects: {
      sectionTitle: 'Musical Projects',
      sectionSubtitle: 'Active live concepts and lineups',
      gypsyDesc: 'An acoustic swing repertoire based on manouche rhythms and traditional gypsy jazz improvisation.',
      rockDesc: 'Energetic live rock and blues performances as part of the Haluk BB project.'
    },
    videos: {
      title: 'Live Performances',
      subtitle: 'Selected stage recordings and performances'
    },
    gigs: { 
      title: 'Show Dates',
      subtitle: 'Ağaç Ev Kadıköy Live Schedule'
    },
    contact: {
      title: 'Contact & Booking',
      subtitle: 'For live bookings, collaborations, or general inquiries',
      emailLabel: 'Email Direct',
      locationLabel: 'Base Location',
      formName: 'Name',
      formEmail: 'Email Address',
      formMessage: 'Message',
      formSubmit: 'Send Message'
    },
    footer: { rights: 'All rights reserved.' }
  },
  tr: {
    nav: { about: 'Hakkımda', projects: 'Projeler', videos: 'Videolar', gigs: 'Takvim', contact: 'İletişim' },
    hero: {
      subtitle: 'Gitarist & Müzisyen',
      title: 'Gypsy Jazz ve Rock / Blues Sahneleri',
      description: 'İstanbul merkezli gitarist. Akustik gypsy jazz projeleri ve Haluk BB bünyesindeki rock/blues grup performanslarıyla aktif olarak sahnelerde yer almaktadır.',
      btnProjects: 'Projeleri İncele',
      btnContact: 'İletişime Geç'
    },
    about: {
      title: 'Hakkımda',
      subtitle: 'İstanbul merkezli müzisyen ve gitarist',
      experienceLabel: 'Deneyim',
      locationLabel: 'Konum',
      genresLabel: 'Ana Tarzlar',
      instrumentsLabel: 'Enstrümanlar',
      paragraph1: '35 yılı aşkın gitar geçmişimle müzikal yolculuğum, gypsy jazz’ın akustik zarafetinden rock ve blues’un dinamik sahne enerjisine uzanan geniş bir yelpazeyi kapsıyor.',
      paragraph2: 'Django Reinhardt ve caz armonisinin empravizasyon geleneğinden ilham alarak, akustik gypsy jazz topluluklarıyla şık ve samimi sahnelerde yer alıyorum.',
      paragraph3: 'Eş zamanlı olarak, Haluk BB projesi bünyesinde canlı performans mekanlarında elektrik gitar performansları ile rock ve blues sahnelerine devam ediyorum.'
    },
    projects: {
      sectionTitle: 'Müzikal Projeler',
      sectionSubtitle: 'Aktif olarak sahne aldığım konseptler',
      gypsyDesc: 'Manouche ritimleri ve akustik empravizasyonlara dayalı, şık ve samimi akustik swing repertuvarı.',
      rockDesc: 'Haluk BB projesi kapsamında klasik/modern rock ve blues standartlarından oluşan canlı sahne performansları.'
    },
    videos: {
      title: 'Canlı Performanslar',
      subtitle: 'Sahne ve stüdyo kayıtlarından seçkiler'
    },
    gigs: { 
      title: 'Konser Takvimi',
      subtitle: 'Ağaç Ev Kadıköy Sahne Tarihleri'
    },
    contact: {
      title: 'İletişim & Sahne Teklifleri',
      subtitle: 'Konser, etkinlik ve organizasyon teklifleri için',
      emailLabel: 'E-Posta',
      locationLabel: 'Şehir',
      formName: 'Adınız',
      formEmail: 'E-Posta Adresiniz',
      formMessage: 'Mesajınız',
      formSubmit: 'Mesaj Gönder'
    },
    footer: { rights: 'Tüm hakları saklıdır.' }
  }
}

const t = computed(() => translations[currentLang.value])

// YouTube Video Listesi (Sabit ID'ler)
const videos = ref([
  {
    id: 1,
    youtubeId: '432RwI4zSIs',
    category: 'Rock & Blues',
    title: { 
      en: 'Haluk BB Project - Live Performance', 
      tr: 'Haluk BB Project - Canlı Sahne Performansı' 
    }
  },
  {
    id: 2,
    youtubeId: '7t1torWTREc',
    category: 'Gypsy Jazz',
    title: { 
      en: 'Gypsy Jazz Trio - Acoustic Swing Session', 
      tr: 'Gypsy Jazz Trio - Akustik Swing Kaydı' 
    }
  }
])

// Ağaç Ev Kadıköy - Haluk BB Projesi Konser Listesi
const gigs = ref([
  {
    id: 1,
    date: { en: 'Saturday, Sep 19', tr: '19 Eylül Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 2,
    date: { en: 'Friday, Oct 16', tr: '16 Ekim Cuma' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '21:00',
    link: 'https://agacevbar.com/'
  },
  {
    id: 3,
    date: { en: 'Saturday, Nov 07', tr: '7 Kasım Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 4,
    date: { en: 'Saturday, Dec 19', tr: '19 Aralık Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 5,
    date: { en: 'Saturday, Jan 16', tr: '16 Ocak Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 6,
    date: { en: 'Saturday, Feb 27', tr: '27 Şubat Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 7,
    date: { en: 'Saturday, Mar 20', tr: '20 Mart Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 8,
    date: { en: 'Saturday, Apr 10', tr: '10 Nisan Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 9,
    date: { en: 'Saturday, May 15', tr: '15 Mayıs Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  },
  {
    id: 10,
    date: { en: 'Saturday, Jun 12', tr: '12 Haziran Cumartesi' },
    venue: 'Ağaç Ev Kadıköy',
    address: 'Osmancık Sk. No:13/B, Kadıköy',
    project: 'Haluk BB (Rock & Blues)',
    time: '23:45',
    link: 'https://agacevbar.com/'
  }
])
</script>