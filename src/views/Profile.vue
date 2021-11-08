<template>
  <!-- Box -->
  <div class="md:flex md:justify-center md:space-x-8 md:px-14 mb-11 mb-14">
    <!-- box-1 -->
    <div
      class="
        mt-16
        py-4
        px-4
        bg-whit
        w-72
        bg-white
        rounded-xl
        shadow-lg
        hover:shadow-xl
        transform
        hover:scale-110
        transition
        duration-500
        mx-auto
        md:mx-0
      "
    >
      <div class="w-sm">
        <img :src="getUserImage(me.image)" />
        <div class="mt-4 text-green-600 text-center">
          <h1 class="text-xl font-bold">{{me.username}}</h1>
          <p class="mt-4 text-gray-600">
           Email:  {{me.email}}
           Tel.:  {{me.telNumber}}
           Role: {{me.roles[0]}}
           
           <button>
               
   <router-link
              class=""
              :to="{
                name: 'EditProfile',
                params: {uid:me.id},
              }"
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z"/></svg></router-link
            >
              </button>
           
          </p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  
  name: "Profile",
  data(){
    
    return{

    }
  },
  methods: {
        getUserImage(image) {
      return `${this.$store.state.url}image/user/${image}`;
    },
  },

  setup() {
    const store = useStore();
        let me = computed(function () {
      return store.state.user;
    });
    

    return {
      
      me
    };
  },
}
</script>
