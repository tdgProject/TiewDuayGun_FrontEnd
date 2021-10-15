<template>
  <div class="grid min-h-screen place-items-center">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
      <h1 class="text-xl font-semibold">Register Your Business</h1>
      <form class="mt-6" @submit.prevent="addHotel()">
        <label
          for="hotelname"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >Hotel Name</label
        >
        <input
          id="text"
          type="text"
          name="text"
          placeholder="enter name"
          v-model="name"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none
            focus:bg-gray-300
            focus:shadow-inner
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
          v-model="address"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none
            focus:bg-gray-300
            focus:shadow-inner
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
          v-model="email"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none
            focus:bg-gray-300
            focus:shadow-inner
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
          v-model="tel"
          class="
            block
            w-full
            p-3
            mt-2
            text-gray-700
            bg-gray-200
            appearance-none
            focus:outline-none
            focus:bg-gray-300
            focus:shadow-inner
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
              @change="upfile"
            />
            <div class="border p-2 mt-3 object-center">
              <p>Preview Here:</p>
              <template v-if="preview">
                <div class="h-56 w-56 object-cover mt-2 rounded-2xl6">
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
            hover:bg-gray-900
            hover:shadow-none
          "
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addhotel",
  data() {
    return {
      name: "",
      address: "",
      email: "",
      tel: "",
      preview: null,
      image: null,
      pic: null,
      resource_uri: "http://localhost:8081/",
    };
  },
  methods: {
    addHotel() {
      let newHotel = {
        hotelId: 0,
        hotelName: this.name,
        telNumber: this.tel,
        address: this.address,
        email: this.email,
        image: this.image,
        owner: {"userId": 2}
      };
      const jsonProduct = JSON.stringify(newHotel);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newHotel", blob);
      formdata.append("image", this.upfile);
      axios.post(`${this.resource_uri}hotel/add`, formdata);
      console.log(newHotel);
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
};
</script>