<template>
<div class="grid min-h-screen place-items-center">
  <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12 "> 
    <h1 class="text-xl font-semibold">Hello there 👋, <span class="font-normal">please fill in your information to register</span></h1>
    <form class="mt-6" @submit.prevent="register">
      <div class="flex justify-between gap-3">
       
        <span class="w-1/2">
       
          <label for="email" class="block text-xs font-semibold text-gray-600 uppercase"> Email <span class="text-red-600 text-sm">*</span></label>
          <input id="email" type="Email" v-model="email" placeholder="Enter Your Email" autocomplete="given-name" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required minlength="10" maxlength="100" title="Enter your email address."/>
          
        </span>
        <span class="w-1/2">
      
          <label for="password" class="block text-xs font-semibold text-gray-600 uppercase"> Password <span class="text-red-500">*</span><span class="text-gray-400 text-sm">(atleast 10 character)</span></label>
        <input id="password" type="password" v-model="password" placeholder="Enter Your Password" autocomplete="family-name" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required minlength="8" maxlength="64" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}" title="Must contain at least one numeric and one UPPERCASE and lowercase letter, and at least 8 or more characters" />
       
        </span>
      </div>
      
      <label for="username" class="block mt-2 text-xs font-semibold text-gray-600 uppercase"> Username <span class="text-red-500">*</span></label>
      <input id="username" type="text" v-model="username" placeholder="Enter Your Name" autocomplete="Name" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required minlength="3" maxlength="100" title="Username must be at least 3 or more characters"/>
      
      <label for="tel" class="block mt-2 text-xs font-semibold text-gray-600 uppercase"> Tel. <span class="text-red-600 text-sm">*</span></label>
      <input id="tel" type="tel" v-model="tel" placeholder="Enter Your Telephone Number" autocomplete="new-password" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required minlength="9" maxlength="10" pattern="\d{9,10}" oninput="this.value = this.value.replace(/[^0-9]/g, '');"  title="Telephone number must be 9-10 characters"/>
      
      <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
        Sign up
      </button>
      <router-link class="float-left text-black mt-2" :to="'SignIn'">Already registered ?</router-link>
    </form>
    <div
        v-if="errorMessage"
        class="alert alert-danger" role="alert"
      > {{ errorMessage }}
      </div>
      <div
        v-if="message"
        class="alert alert-success" role="alert"
      > {{ message }}
      </div>
  </div>
</div>
<div class="al w-full h-screen" v-if="complete">
      <div class="stk h-screen d-flex align-items-center justify-content-center ">
        <div class="w-1/5 bg-white d-flex flex-col align-items-center justify-content-center rounded ">
        <div class="bg-dark w-full h-1/6 rounded-top text-start text-white p-1 px-3">Waiting for Process</div>
        <img class="w-1/12 my-4" src="../assets/hug.gif" />
        <p class=" text-2xl ">Registering...</p>
        
        </div>
          </div>
        </div>
</template>
<script>
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      username: null,
      tel: null,
      message: null,
      errorMessage: null,
      complete: false
    };
  },
  methods: {
    register() {
      this.$store.dispatch("auth/register", {
            email : this.email,
            password : this.password,
            username : this.username,
            tel : this.tel}).then(
        data => {
          this.errorMessage = null;
          this.message = data.message;
          this.complete=true;
          setTimeout( () => window.location.href = '/Signin', 2000);
        },
        error => {
          this.message=null;
          this.errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            this.complete=false;
        }
      );
    }
  }
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