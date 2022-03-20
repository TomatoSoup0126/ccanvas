<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ 
  item: object,
  index: Number
}>()

const emit = defineEmits(['showImage'])

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
  <div
    class="w-70% sm:w-25% h-70vh rounded-md bg-cover bg-center bg-no-repeat snap-center shrink-0 relative bg-blur cursor-pointer"
    :style="varCss"
    @click="$emit('showImage', { index, youtubeLink })"
  >
    <div class="relative top-0 left-0 info-block flex-col justify-center text-white">
      <div class="px-2">
        {{ title }}
      </div>
      <!-- <div class="w-12 h-12 mx-auto mt-1">
        <font-awesome-icon :icon="['fab', 'youtube']" size="2x" />
      </div> -->
    </div>
  </div>
</template>

<style scoped>
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
