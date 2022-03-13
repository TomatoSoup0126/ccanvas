<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ item: object }>()

const title = computed(() => {
  return props.item.caption ? props.item.caption.split('\n\n')[0] : ''
})

const youtubeLink = computed(() => {
  return props.item.caption ? props.item.caption.split('\n\n')[1]?.split(' ')[1] : ''
})


</script>

<template>
  <div
    class="w-full h-100 sm:w-60% sm:h-150 rounded-md bg-cover bg-center bg-no-repeat snap-center shrink-0 relative"
    :style="`background-image: url(${item.media_url})`"
  >
    <div class="flex flex-col justify-center h-full bg-gray-700 opacity-0 hover:opacity-70">
    <!-- <div class="opacity-0 hover:opacity-100"> -->
      <div>
        {{ title }}
      </div>
      <div class="w-16 h-16 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
      </div>
    </div>
    <!-- <img :src="item.media_url" class="image" /> -->
    <!-- <div>
      <h6>{{ title }}</h6>
      <a :href="youtubeLink" target="_blank">{{ youtubeLink }}</a>
    </div> -->
  </div>
</template>

<style scoped>
/* .image {
  width: 500px;
} */
</style>
