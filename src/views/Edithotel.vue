<template>
<div class="" v-if="showdata">
  <div class="grid min-h-screen place-items-center" >
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12" >
      <h1 class="text-xl font-semibold">Edit Your Business</h1>
      <form class="mt-6" @submit.prevent="editHotel()" v-if="hotels">
        <label
          for="hotelname"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >Hotel Name</label
        >
        
        <input
          id="text"
          type="text"
          name="text"
          placeholder="Enter hotel's name"
          v-model="hotels.hotelName"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none focus:bg-gray-300 focus:shadow-inner
          "
          maxlength="100"
          title="Enter hotel name."
          required
        />

        <label
          for="address"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >Address</label
        >
        <input
          id="text"
          type="text"
          name="text"
          placeholder="Enter hotel's address"
          v-model="hotels.address"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none focus:bg-gray-300 focus:shadow-inner
          "
          maxlength="400"
          title="Enter hotel address."
          required
        />

        <label
          for="email"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >Email</label
        >
        <input
          id="Email"
          type="Email"
          name="Email"
          placeholder="Enter hotel's email address."
          v-model="hotels.email"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none focus:bg-gray-300 focus:shadow-inner
          "
          minlength="10" maxlength="100"
          title="Enter hotel email address."
          required
        />

        <label
          for="tel"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >Tel.</label
        >
        <input
          id="text"
          type="text"
          name="text"
          placeholder=""
          v-model="hotels.telNumber"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none focus:bg-gray-300 focus:shadow-inner
          "
          minlength="9" 
          maxlength="10" 
          pattern="\d{9,10}" 
          oninput="this.value = this.value.replace(/[^0-9]/g, '');"  
          title="Telephone number must be 9-10 characters"
          required
        />
        <div class="d-flex flex-column mt-2">
           <div class="form-group">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*,"
          @change = "upfile"
        />
        <div v-if="setPreview()" class="border p-2 mt-3 object-center ">
          
          <template v-if="preview">
            <div class="h-full w-full ">
              <img :src="preview" class="img-fluid" />
            </div>
          </template>
        </div>
      </div>
        </div>
        <button
          type="submit"
          class="
            w-full
            py-3
            mt-6
            mb-2
            font-medium
            tracking-widest
            text-white
            uppercase
            bg-black
            shadow-lg
            focus:outline-none
            hover:bg-gray-900 hover:shadow-none
          "
        >
          Submit
        </button>
        <div
        v-if="errorMessage"
        class="alert alert-danger" role="alert"
      > {{ errorMessage }}
      </div>
      </form>
      <div class="al w-full h-screen" v-if="complete">
      <div class="stk h-screen d-flex align-items-center justify-content-center ">
        <div class="w-1/5 bg-white d-flex flex-col align-items-center justify-content-center rounded ">
        <div class="bg-dark w-full h-1/6 rounded-top text-start text-white p-1 px-3">Waiting for Process</div>
        <img class="w-1/12 my-4" src="../assets/hug.gif" />
        <p class=" text-2xl ">Editing Hotel...</p>
        
        </div>
          </div>
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
				<h5 class="text-gray-300 font-semibold -mr-10 -mt-3">Page not found</h5>
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
// import axios from "axios";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "hotelEdit",
  data() {
    return {
      name: "",
      address: "",
      email: "",
      tel: "",
      preview: null,
      image: null,
      pic: null,
      isSet: false,
      message: null,
      errorMessage: null,
      complete: false
    };
  },
  computed: {
      show404: function () {
      let show = true;
          if(this.me.roles){
        if(this.me.roles[0] =='admin'){
        show = false;
      }
       if (this.me.roles[0] =='business'){
        show = false;
      }
      }
      return show;
    },

    showdata: function () {
      let show = true;
          if(this.me.roles){
        if(this.me.roles[0] =='member'){
        show = false;
      }
      
      }
      if(this.me.id == 0){
        show = false;
      }
      return show;
    },
  },
  
  methods: {
    setPreview(){
      if(this.preview == null){
        this.preview = this.$store.state.url+"image/hotel/"+this.hotels.image;
      }
      this.isSet = true;
      return this.isSet
    },
    editHotel() {
      let newHotel = {
        hotelId: this.hotels.hotelId,
        hotelName: this.hotels.hotelName,
        telNumber: this.hotels.telNumber,
        address: this.hotels.address,
        email: this.hotels.email,
        image: "",
        owner: { userId: this.me.id },
      };
      const jsonProduct = JSON.stringify(newHotel);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newHotel", blob);
      formdata.append("image", this.image);
      this.$store.dispatch("editHotel", { data: formdata, hid: this.hotels.hotelId}).then(
        data => {
          this.errorMessage = null;
          this.message = data.message;
          this.complete=true;
          setTimeout( () => window.location.href = '/Myhotel', 2000);
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
    },
    upfile(e) {
      let file = e.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name);
      this.image = data.get("file");
      var input = e.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    
  },
  setup() {
    const store = useStore();
     let me = computed(function () {
      return store.state.user;
    });
    //store.dispatch("getMyHotel", store.state.user.userId);
    store.dispatch("getMyHotel", me.value.id);
    let hotels = computed(function () {
      return store.state.myHotel;
    });
    
    return {
    hotels,
    me
    };
  },
};
</script>

<style scoped>
.icon::after {
  content: "";
  display: block;
  position: absolute;
  border-top: 23px solid transparent;
  border-bottom: 17px solid transparent;
  border-left: 12px solid #3182ce;
  left: 100%;
  top: 0;
}


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
