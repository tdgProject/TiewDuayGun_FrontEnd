<template>
  <div class="grid min-h-screen place-items-center mr-48 ">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
  <form @submit.prevent="addPlace()">
    <div class="mx-20 w-100 h-3/4">
      <div
        class="
       
        "
        style="left: -40px"
      >
        <i class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i>
      </div>
      <h3 class="text-2xl text-gray-900 font-semibold">Addplace</h3>
      <p class="text-gray-600">เพิ่มสถานที่</p>
      <div class="form-group">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*,"
          @change = "upfile"
        />
        <div class="border p-2 mt-3 object-center ">
          
          <template v-if="preview">
            <div class="h-full w-full ">
              <img :src="preview" class="img-fluid" />
            </div>
          </template>
        </div>
      </div>
      <div class="container">
        <div class="my-3 w-50 d-flex align-items-center">
        <p class="my-auto">Province</p>
        <select class="form-control" v-model="ptag">
            <option v-for="tag in tags" :key="tag.tagId" :value="tag.tagId">
              {{ tag.tagName }}
            </option>
          </select>
          </div>
      </div>
      <div class="flex space-x-5 mt-3">
        <input
          type="text"
          name="placeName"
          id=""
          placeholder="Insert Your PlaceName"
          class="border p-2 w-full"
          v-model.trim="enteredplaceName"
        />
      </div>
 <p class="">Insert Your PlaceName</p>
      <textarea
        name="placeDescription"
        id=""
        cols="10"
        rows="3"
        placeholder="Insert Your PlaceDescription"
        class="border p-2 mt-3 w-full"
        v-model.trim="enteredplaceDescription"
      ></textarea>
<p class="">Insert Your PlaceDescription</p>
      <input
        type="submit"
        value="Submit"
        class="
          w-full
          mt-6
          bg-blue-600
          hover:bg-blue-500
          text-white
          font-semibold
          p-3
        "
      />
    </div>
  </form>
    </div>
  </div>

</template>
<script>
//import axios from "axios";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Addplace",
  data() {
    return {
      preview: null,
      image: null,
      placename: "",
      placeDescription: "",
      enteredplaceName: "",
      enteredplaceDescription: "",
      pid: "",
      tag: "",
      resource_uri: "http://localhost:8081/",
      
    };
  },
  methods: {
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
    addPlace() {
      let newPlace = {
        placeId: 0,
        placeName: this.enteredplaceName,
        placeDescription: this.enteredplaceDescription,
        image: "",
        tags:[],
      };
      const jsonProduct = JSON.stringify(newPlace);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newPlace", blob);
      formdata.append("image", this.image);
      console.log(blob);
      console.log(newPlace);
      console.log(formdata);
      this.$store.dispatch("addPlace",  formdata );
      setTimeout(location.href="http://localhost:8080/List/All/1", 3000);
      //axios.post(`${this.resource_uri}place/add`, formdata);
    },
  },
  setup() {
    const store = useStore();

    store.dispatch("listTag");
    store.dispatch("listType");

    let tags = computed(function () {
      return store.state.tags;

    });
      let types = computed(function () {
      return store.state.types;

    });

    return {
      tags,
      types,
    };
  },
};
</script>
  <style>
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
</style>
