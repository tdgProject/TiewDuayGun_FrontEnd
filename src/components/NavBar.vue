<template>
<nav class="bg-white px-8 pt-2 shadow-md">
     <div class="-mb-px flex justify-center">
         <a class="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8" href="/">
             Home
         </a>
         <a class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8" href="/Product">
             Products
         </a>
         <a class="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8" href="/About">
              About
         </a>

     </div>
</nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    
  }
}
</script>
