<template>
   <div class="bbb_viewed_title_container mb-2 container">
                    <h3 class="bbb_viewed_title " id="texttest">PROFILE</h3>
                    <div class="bbb_viewed_nav_container">
                        <div class="bbb_viewed_nav bbb_viewed_prev"><i class="fas fa-chevron-left"></i></div>
                        <div class="bbb_viewed_nav bbb_viewed_next"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
     
  <!-- Box -->
  <div class="md:flex md:justify-center md:space-x-8 md:px-14 mb-11 mb-14" v-if="showdata">
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
      <div class="w-sm ">
        <img class="ml-11 border-1  border-black" :src="getUserImage(me.image)" />
        <div class="mt-4 text-green-600 text-center">
          <h1 class="text-xl font-bold" id="texttest">{{me.username}}</h1>
          <p class=" text-gray-600" id="texttest">
           Email: {{me.email}}
           Tel:  {{me.telNumber}}<br>
           Role: {{me.roles[0]}}<br>
          
           
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

<div class="flex items-center justify-center min-h-screen bg-indigo-500  bg-fixed bg-cover bg-bottom error-bg" v-if="show404"
	style="background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E);">

	<div class="container">
		<div class="row">
			<div class="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
				<div class="relative ">
				<h1 class="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
					<span>4</span><span>0</span><span>4</span></h1>
					<span class="absolute  top-0   -ml-12  text-gray-300 font-semibold">Oops!</span>
					</div>
				<h5 class="text-gray-300 font-semibold -mr-10 -mt-3">You must Login First!</h5>
				<p class="text-gray-100 mt-2 mb-6">You must Login before you go to this Page</p>
				<a
					class="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
					Got to Login
				</a>
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
    computed: {
      show404: function () {
      let show = true;
        if(this.me.id !== 0){
        show = false;
      }
      
      return show;
    },

    showdata: function () {
      let show = true;

      if(this.me.id == 0){
        show = false;
      }
      return show;
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
