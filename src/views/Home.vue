<template>
<StyleBg>
  <div class="w-screen h-screen">
    <div class="w-full h-full">
     <nav-bar>
     </nav-bar>
      <slide>
      </slide>

    </div>
    <div>
    </div>
    
  </div>
  </StyleBg>
<Footer>
</Footer>
</template>

<script>
import StyleBg from '@/components/StyleBg.vue'
import NavBar from '@/components/NavBar.vue'
import Slide from '@/components/Slide.vue'
import Footer from '@/components/Footer.vue'




export default {
  name: 'Home',
  components: {
    StyleBg,
    NavBar,
    Slide,
    Footer

  }
}
</script>
