<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ item: object }>()

const title = computed(() => {
  return props.item.caption ? props.item.caption.split('\n\n')[0] : ''
})

const youtubeLink = computed(() => {
  const isChannelLInk = props.item.caption.includes('🎨')
  if (isChannelLInk) {
    return 'https://www.youtube.com/channel/UCv5rNNzvpx302mekaa4yRmQ'
  }
  return props.item.caption ? props.item.caption.split('\n\n')[1]?.split(' ')[1] : ''
})

const varCss = computed(() => {
  return {
    '--bg-image': `url(${props.item.media_url})`
  }
})

</script>

<template>
  <a
    class="w-70% h-50 sm:w-25% sm:h-50 rounded-md bg-cover bg-center bg-no-repeat snap-center shrink-0 relative bg-blur cursor-pointer no-underline"
    :style="varCss"
    :href="youtubeLink"
    target="_blank"
  >
    <div class="relative top-0 left-0 info-block flex-col justify-center text-white">
      <div class="px-2">
        {{ title }}
      </div>
      <div class="w-12 h-12 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#fff">
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
        </svg>
      </div>
    </div>
  </a>
</template>

<style scoped>
/* TODO: SCSS*/
.bg-blur {
  overflow: hidden;
  background-image: var(--bg-image);
  -webkit-transition: 1s -webkit-filter linear;
  -moz-transition: 1s -moz-filter linear;
  -moz-transition: 1s filter linear;
  -ms-transition: 1s -ms-filter linear;
  -o-transition: 1s -o-filter linear;
  transition: 1s filter linear, 1s -webkit-filter linear;
}
.info-block {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  display: flex;
  height: 100%;
  z-index: 2;
}
.bg-blur:hover .info-block {
  opacity: 1;
}
.bg-blur::before {
  transition: opacity 0.3s ease-in-out;
  content: '';
  background-image: var(--bg-image);
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  filter: blur(50px);
  opacity: 0;
}
.bg-blur:hover::before {
  opacity: 1;
}
</style>
