<template>
  <section id="contact" class="py-20 px-6 max-w-6xl mx-auto border-t border-neutral-900">
    <div class="grid md:grid-cols-12 gap-12">
      <div class="md:col-span-5 space-y-6">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-neutral-100">{{ t.contact.title }}</h2>
          <p class="text-neutral-400 text-sm mt-2">{{ t.contact.subtitle }}</p>
        </div>
        <div class="space-y-4 pt-2">
          <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div class="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">{{ t.contact.emailLabel }}</div>
            <a href="mailto:selcukoktay@gmail.com" class="text-base font-semibold text-neutral-200 hover:text-amber-400 transition">selcukoktay@gmail.com</a>
          </div>
          <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div class="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">{{ t.contact.locationLabel }}</div>
            <p class="text-base font-semibold text-neutral-200">İstanbul, Türkiye</p>
          </div>
        </div>
        <div class="pt-2 flex flex-wrap gap-3">
          <a href="https://www.youtube.com/@selcukoktay" target="_blank" class="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition flex items-center gap-2">YouTube ↗</a>
          <a href="https://www.instagram.com/selch1/" target="_blank" class="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition flex items-center gap-2">Instagram ↗</a>
        </div>
      </div>

      <div class="md:col-span-7 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-8">
        <form action="https://formspree.io/f/selcukoktay@gmail.com" method="POST" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">{{ t.contact.formName }}</label>
            <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 transition" :placeholder="currentLang === 'en' ? 'Your name' : 'Adınız Soyadınız'" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">{{ t.contact.formEmail }}</label>
            <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 transition" :placeholder="currentLang === 'en' ? 'your.email@example.com' : 'eposta@ornek.com'" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">{{ t.contact.formMessage }}</label>
            <textarea name="message" rows="4" required class="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-500 transition" :placeholder="currentLang === 'en' ? 'Your message or booking inquiry...' : 'Mesajınız veya sahne teklifiniz...'"></textarea>
          </div>
          <button type="submit" class="w-full py-3.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm hover:bg-amber-400 transition shadow-lg shadow-amber-500/10">
            {{ t.contact.formSubmit }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  currentLang: String,
  t: Object
})
</script>