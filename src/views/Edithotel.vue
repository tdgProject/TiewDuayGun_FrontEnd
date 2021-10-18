<template>
  <div class="grid min-h-screen place-items-center">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
      <h1 class="text-xl font-semibold">Register Your Business</h1>
      <form class="mt-6" @submit.prevent="editHotel()">
        <label
          for="hotelname"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >Hotel Name</label
        >
        
        <input
          id="text"
          type="text"
          name="text"
          placeholder=""
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
          placeholder=""
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
          placeholder=""
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
      </form>
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
      isSet: false
    };
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
        owner: { userId: 2 },
      };
      const jsonProduct = JSON.stringify(newHotel);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newHotel", blob);
      formdata.append("image", this.image);
      this.$store.dispatch("editHotel", { data: formdata, hid: this.hotels.hotelId});
      console.log(newHotel);
      alert("successfully Edited!");
      // axios.post(`${this.resource_uri}hotel/edit`, formdata);
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
    store.dispatch("getMyHotel", store.state.user.userId);
    let hotels = computed(function () {
      return store.state.myHotel;
    });

    return {
    hotels
    };
  },
};
</script>