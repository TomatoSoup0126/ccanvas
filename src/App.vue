<script setup lang="ts">
import instagramItemCardVue from './components/instagramItemCard.vue';
import navbar from './components/navbar.vue'
import fixedFooter from './components/footer.vue'
import axios from "axios"
import { onMounted, ref, computed } from "vue"

let youtubeItems = ref([])
let instagramItems = ref([])
let lightboxIndex = ref(0)
let showLightbox = ref(false)
let lightboxLink = ref('')

const items = computed(() => {
  return instagramItems.value.map(item => item.media_url)
})

async function fetchPlayListItems() {
  const { data } = await axios({
    url: `${import.meta.env.VITE_YOUTUBE_API_BASE}playlistItems`,
    params: {
      key: import.meta.env.VITE_YOUTUBE_KEY,
      playlistId: import.meta.env.VITE_PLAYLIST_ID,
      part: 'snippet,contentDetails',
      maxResults: 50
    }
  })
  youtubeItems.value = data.items
}

async function fetchInstagramData() {
  const { data } = await axios({
    url: 'https://graph.instagram.com/me/media?&access_token',
    params: {
      fields:'caption,id,media_type,media_url,timestamp',
      access_token: import.meta.env.VITE_IG_TOKEN
    }
  })
  instagramItems.value = data.data
  instagramItems.value.splice(instagramItems.value.length - 1, 1)
}

function handleShowLightBox({ index, youtubeLink }: {
    index: number;
    youtubeLink: string;
}): void {
  lightboxIndex.value = index
  lightboxLink.value = youtubeLink
  showLightbox.value = true
}

function handleHideLightBox() {
  showLightbox.value = false
}

onMounted(()=>{
  fetchInstagramData()
})

</script>

<template>
  <navbar />
  <main class="mx-auto mt-16">
    <div
      class="w-full flex gap-6 snap-x snap-mandatory overflow-x-auto py-6 gallery"
    >
      <instagramItemCardVue 
        v-for="(item, index) in instagramItems"
        :key="item.id"
        :item="item"
        :index="index"
        @show-image="handleShowLightBox"
      />
    </div>
    <vue-easy-lightbox
      :visible="showLightbox"
      :imgs="items"
      :index="lightboxIndex"
      @hide="handleHideLightBox"
    >
      <template v-slot:prev-btn="{ prev }" />
      <template v-slot:next-btn="{ next }" />
      <template v-slot:toolbar="{ toolbarMethods }">
        <div class="absolute bottom-6 w-100%">
          <a
            class="w-12 h-12 mx-auto mt-auto text-white"
            :href="lightboxLink"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'youtube']" size="2x" />
          </a> 
        </div>
      </template>
    </vue-easy-lightbox>
  </main>
  <fixed-footer></fixed-footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.gallery::-webkit-scrollbar {
  display: none;
}

.vel-modal {
  background: rgba(0,0,0,0.8) !important;
}
</style>
