<script setup lang="ts">
const linkList = [
  {
    name: 'youtube',
    link: 'https://www.youtube.com/channel/UCv5rNNzvpx302mekaa4yRmQ',
    icon: ['fab', 'youtube']
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/c__canvas/',
    icon: ['fab', 'instagram']
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/CCanvas0219',
    icon: ['fab', 'twitter']
  }
]
</script>

<template>
  <nav class="fixed top-0 left-0 navbar w-full py-1">
    <div class="container flex justify-between mx-auto">
      <a class="flex no-underline px-2" href="/">
        <img src="/logo.png" alt="c.canvas" class="h-12 w-12">
        <h1 class="logo my-2 ml-2">C.CANVAS</h1>
      </a>
      <div class="px-2 pt-3">
        <a 
          v-for="item in linkList"
          :key="item.name"
          class="px-3 text-white"
          :href="item.link"
          target="_blank"
        >
          <font-awesome-icon :icon="item.icon" size="xl" />
        </a>
      </div>
    </div>
   
  </nav>
</template>


<style scoped>
.navbar {
  background-color: #1C48A8;
}

.logo {
  color: #C2B55B;
}
</style>
