<template>
<div class="grid mt-5 place-items-center" v-if="showdata">
  <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
   <span class="font-normal">Sign In</span>
    <form class="" @submit.prevent="login">
      <input id="email" type="email" v-model="email" placeholder="Email" autocomplete="new-password" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
      <input id="password-confirm" type="text" v-model="password" placeholder="Password" autocomplete="new-password" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
      <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
        Sign in
      </button>
    </form>
    <div
        v-if="message"
        class="alert alert-danger" role="alert"
      > {{ message }}
      </div>
  </div>
  <div class="al w-full h-screen" v-if="complete">
      <div class="stk h-screen d-flex align-items-center justify-content-center ">
        <div class="w-1/5 bg-white d-flex flex-col align-items-center justify-content-center rounded ">
        <div class="bg-dark w-full h-1/6 rounded-top text-start text-white p-1 px-3">Waiting for Process</div>
        <img class="w-1/12 my-4" src="../assets/hug.gif" />
        <p class=" text-2xl ">Login...</p>
        
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
					<span>Alreadylogin</span><span></span><span></span></h1>
					<span class="absolute  top-0   -ml-12  text-gray-300 font-semibold"></span>
					</div>
				<h5 class="text-gray-300 font-semibold -mr-10 -mt-3"></h5>
				<p class="text-gray-100 mt-2 mb-6">we are sorry, but the page you requested was not found</p>
				<a
					class="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
					Got to Home
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
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      message: null,
      complete: false
    };
  },

  methods: {
    login() {
      this.$store.dispatch("auth/login", {
            email : this.email,
            password : this.password}).then(
        data => {
          this.message = data.message;
          this.complete=true;
          setTimeout( () => window.location.href = '/', 2000);
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            this.complete=false;
        }
      );
    }
  },
  
computed: {
      show404: function () {
      let show = true;
    if(this.me.id == 0){
        show = false;
      }
      return show;
    },
 


    showdata: function () {
      let show = true;

      if(this.me.id !== 0){
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
};
</script>
<style scoped>
.al{
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
}
.stk{
  z-index: 6;
  top: 0;
  left: 0;
  position: sticky;
  background-color:rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

</style>