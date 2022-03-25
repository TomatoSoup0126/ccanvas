<script setup lang="ts">
import instagramItemCardVue from './components/instagramItemCard.vue';
import navbar from './components/navbar.vue'
import fixedFooter from './components/footer.vue'
import axios from "axios"
import { onMounted, ref, computed } from "vue"

let instagramItems = ref([])
let lightboxIndex = ref(0)
let showLightbox = ref(false)
let lightboxLink = ref('')
let lightboxTitle = ref('')
const snapScroller = ref(null)

interface item {
  media_url: string,
  id: number
}

const items = computed(() => {
  return instagramItems.value.map((item:item) => item.media_url)
})

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

function handleShowLightBox({ index, youtubeLink, title }: {
    index: number;
    youtubeLink: string;
    title: string;
}): void {
  lightboxIndex.value = index
  lightboxLink.value = youtubeLink
  lightboxTitle.value = title
  showLightbox.value = true
}

function handleHideLightBox() {
  showLightbox.value = false
}

function scroll (type:string):void {
  const scroller:any = snapScroller
  const width =  scroller.value.querySelector('div').clientWidth
  scroller.value.scrollBy({
    top: 0,
    left: type === 'next' ? width : -width,
    behavior : "smooth"
  })
}

onMounted(()=>{
  fetchInstagramData()
})

</script>

<template>
  <navbar />
  <main class="mx-auto mt-16">
    <div class="relative w-full flex">
      <button
        @click="scroll('next')"
        class="hidden sm:block absolute top-50% right-2 z-99 h-10 w-10 rounded-full bg-white border-1 border-gray cursor-pointer">
        <font-awesome-icon icon="angle-right" />
      </button>
      <button
        @click="scroll('prev')"
        class="hidden sm:block absolute top-50% left-2 z-99 h-10 w-10 rounded-full bg-white border-1 border-gray cursor-pointer">
        <font-awesome-icon icon="angle-left" />
      </button>
      <div
        ref="snapScroller"
        class="w-full sm:w-90% mx-auto flex gap-6 snap-x snap-mandatory overflow-x-auto py-6 gallery"
      >
        <instagramItemCardVue 
          v-for="(item, index) in (instagramItems as any)"
          :key="item.id"
          :item="item"
          :index="index"
          @show-image="handleShowLightBox"
        />
      </div>
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
          <p class="sm:hidden text-white">{{ lightboxTitle }}</p>
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
