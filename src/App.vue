<script setup lang="ts">
import instagramItemCardVue from './components/instagramItemCard.vue';
import axios from "axios"
import { onMounted, ref } from "vue"

let youtubeItems = ref([])
let instagramItems = ref([])

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

onMounted(()=>{
  // fetchPlayListItems()
  fetchInstagramData()
})

</script>

<template>
  <!-- <img v-for="item in youtubeItems" :key="item.etag" :src="item.snippet.thumbnails.high.url" alt=""> -->
  <instagramItemCardVue v-for="item in instagramItems" :key="item.id" :item="item" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
