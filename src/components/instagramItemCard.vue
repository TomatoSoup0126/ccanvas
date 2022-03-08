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
  <div>
    <img :src="item.media_url" class="image" />
    <h1>{{ title }}</h1>
    <a :href="youtubeLink" target="_blank">{{ youtubeLink }}</a>
  </div>
</template>

<style scoped>
.image {
  width: 500px;
}
</style>
