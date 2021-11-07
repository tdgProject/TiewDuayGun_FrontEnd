<template>
  <div class="grid min-h-screen place-items-center mr-48">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
      <form @submit.prevent="EditPlace()">
        <div class="mx-20 w-100 h-3/4">
          <div class="" style="left: -40px">
            <i
              class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"
            ></i>
          </div>
          <h3 class="text-2xl text-gray-900 font-semibold">EditPlace</h3>
          <p class="text-gray-600">เพิ่มสถานที่</p>
          <div class="form-group">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*,"
              @change="upfile"
              
            />
            <div v-if="setPreview()" class="border p-2 mt-3 object-center">
              <template v-if="preview">
                <div class="h-full w-full">
                  <img :src="preview" class="img-fluid" />
                </div>
              </template>
            </div>
          </div>
          <div class="container d-flex align-items-center">
            <div class="my-3 w-50 align-items-center">
              <p class="my-auto">Province</p>
              <select class="form-control" v-model="ptag">
                <option
                  v-for="tp in place.tags"
                  :key="tp.tag.tagId"
                  v-show="tp.tag.tagId <= 77"
                  value=""
                >{{tp.tag.tagName}}</option>
                <option
                  v-for="tagp in provinces"
                  :key="tagp.tagId"
                  :value="tagp.tagId"
                >
                  {{ tagp.tagName }}
                </option>
              </select>
            </div>
            <div class="my-3 px-2 w-50">
              <p class="my-auto">Tags</p>
              <button
                type="button"
                class="w-full btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="setTag()"
              >
                Select Tag
              </button>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <h3>Selecting Tags</h3>
                      <p v-show="false">{{etag}}</p>
                      <div class="container d-flex flex-wrap">
                        <div
                          class="w-1/2 justify-content-between"
                          v-for="tage in etc"
                          :key="tage.tagId"
                        >
                          <input
                            class="invisible"
                            :id="tage.tagName"
                            type="checkbox"
                            :value="tage"
                            v-model="etag"
                          />
                          <label
                            class="
                              my-2
                              w-11/12
                              border-3 border-warning
                              p-2
                              rounded-full
                              text-center
                            "
                            :for="tage.tagName"
                          >
                            {{ tage.tagName }}</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Confirm
                      </button>
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
              v-model="place.placeName"
              required
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
            v-model="place.placeDescription"
            required
          ></textarea>
          <p class="">Insert Your PlaceDescription</p>
          <div class="flex space-x-5 mt-3">
          <input
            type="text"
            name="videoURL"
            id=""
            placeholder="Ex. https://www.youtube.com/watch?v=???"
            class="border p-2 w-full"
            v-model="place.video"
            required
          />
        </div>
        <p class="">Insert Your Video URL</p>
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
      <div class="al w-full h-screen" v-if="complete">
      <div class="stk h-screen d-flex align-items-center justify-content-center ">
        <div class="w-1/5 bg-white d-flex flex-col align-items-center justify-content-center rounded ">
        <div class="bg-dark w-full h-1/6 rounded-top text-start text-white p-1 px-3">Waiting for Process</div>
        <img class="w-1/12 my-4" src="../assets/hug.gif" />
        <p class=" text-2xl ">Editing Place...</p>
        
        </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>

import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["pid"],

  name: "EditPlace",
  data() {
    return {
      preview: null,
      image: null,
      placename: "",
      placeDescription: "",
      ptag: "",
      etag: [],
      editId: "",
      isLocal: false,
      isSet: false,
      previewSet: false,
      complete: false
    };
  },
  methods: {
    setTag(){
      if(!this.isSet){
        if(this.place){
          for(let t of this.place.tags){
                if(t.tag.tagId > 77){
                  this.etag.push(t.tag)
                }
            }
        }
        this.isSet = true;
      }
    },
    setPreview(){
      if(this.preview == null){
        this.preview = this.$store.state.url+"image/place/"+this.place.image;
      }
      this.previewSet = true;
      return this.previewSet
    },
    upfile(e) {
      let file = e.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name);
      this.image = data.get("file");
      this.place.image = URL.createObjectURL(this.image);

      var input = e.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    EditPlace() {
      let allTag = null;
      if(this.ptag != ""){
        allTag = [{ tag: { tagId: this.ptag } }];
      }else{
        if(this.place){
          let tName = "";
          for(let tp of this.place.tags){
            if(tp.tag.tagId <= 77){
              tName = tp.tag.tagId
            }
          }
          allTag = [{ tag: { tagId: tName } }];
        }
      }
      if(this.etag.length != 0){
        for (let t of this.etag) {
        let newTag = { tag: { tagId: t.tagId } };
        allTag.push(newTag);
        }
      }else{
        if(this.place){
          for(let tp of this.place.tags){
            if(tp.tag.tagId > 77){
              let newTag = { tag: { tagId: tp.tag.tagId } };
              allTag.push(newTag);
            }
          }
        }
      }
      let newPlace = {
        placeId: 0,
        placeName: this.place.placeName,
        placeDescription: this.place.placeDescription,
        image: "",
        video: this.place.video,
        tags: allTag,
      };
      const jsonProduct = JSON.stringify(newPlace);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newPlace", blob);
      formdata.append("image", this.image);
      this.$store.dispatch("editPlace", { data: formdata, pid: this.pid });
      setTimeout( () => window.location.href = '/List/All/1', 2000);
      this.complete=true;
      
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch("getPlaceById", props.pid),
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
      place,
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
