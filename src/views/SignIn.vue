<template>
<div class="grid mt-5 place-items-center">
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
</template>
<script>
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