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
      <div class="container d-flex align-items-center">
        <div class="my-3 w-50 align-items-center">
        <p class="my-auto">Province</p>
        <select class="form-control" v-model="ptag">
            <option v-for="tagp in provinces" :key="tagp.tagId" :value="tagp.tagId">
              {{ tagp.tagName }}
            </option>
          </select>
          </div>
          <div class="my-3 px-2 w-50">
            <p class="my-auto">Tags</p>
            <button type="button" class="w-full btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Select Tag
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h3>Selecting Tags</h3>
                    <div class="container d-flex flex-wrap">
                      <div class="w-1/2 justify-content-between" v-for="tage in etc" :key="tage.tagId">
                        <input class="invisible" :id="tage.tagName" type="checkbox" :value="tage.tagId" v-model="etag">
                        <label class="my-2 w-11/12 border-3 border-warning p-2 rounded-full text-center" :for="tage.tagName"> {{tage.tagName}}</label>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
                  </div>
                </div>
              </div>
            </div>
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
      ptag: "",
      etag: [],
      resource_uri: "http://localhost:8081",
      editId: "",
      
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
      console.log(this.image)
      let allTag = [{ tag: { tagId : this.ptag}}]
      for(let t of this.etag){
        let newTag = { tag: { tagId : t}};
        allTag.push(newTag);
      }
      let newPlace = {
        placeId: 0,
        placeName: this.enteredplaceName,
        placeDescription: this.enteredplaceDescription,
        image: "",
        tags: allTag
      };
      const jsonProduct = JSON.stringify(newPlace);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newPlace", blob);
      formdata.append("image", this.image);
      this.$store.dispatch("addPlace",  formdata );
      // setTimeout(location.href="http://localhost:8080/List/All/1", 3000);
      //axios.post(`${this.resource_uri}place/add`, formdata);
      
    },

  },
  setup() {
    const store = useStore();
    store.dispatch("listProvinceTag");
    store.dispatch("listEtcTag");
    
    

        let place = computed(function () {
      return store.state.place;
    });

    let provinces = computed(function () {
      return store.state.provinces;

    });
    let etc = computed(function () {
      return store.state.etc;

    });

    return {
      provinces,
      etc,
      place
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

input[type="checkbox"]:checked + label {
    background: purple;
    color: white;
}
</style>
