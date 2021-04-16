<template>
<StyleBg>
  <div class="w-screen h-screen">
    <div class="w-full h-full">
      <div id="app">
     <nav-bar>
     </nav-bar>
      </div>
      <slide>
      </slide>

    </div>
    <div>
    </div>
    
  </div>
  </StyleBg>

  
</template>

<script>
import StyleBg from '@/components/StyleBg.vue'
import Slide from '@/components/Slide.vue'
import NavBar from '@/components/NavBar.vue'


export default {
  name: 'About',
  components: {
    StyleBg,
    Slide,
    NavBar

  }
}
</script>
