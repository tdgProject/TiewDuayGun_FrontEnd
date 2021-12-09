<template>

<div class="" v-if="showdata">
  <div class="grid min-h-screen place-items-center mr-48">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
      <form @submit.prevent="EditPlace()" v-if="place" class="">
        <div class="mx-20 w-100 h-3/4 p-10 border">
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
              maxlength="100"
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
            maxlength="5000"
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
            maxlength="500"
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
              mb-2
            "
            
          />
          <div
        v-if="errorMessage"
        class="alert alert-danger" role="alert"
      > {{ errorMessage }}
      </div>
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
				<a href="/"
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
      message: null,
      errorMessage: null,
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
      if(this.preview == null && this.place){
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
      this.$store.dispatch("editPlace", { data: formdata, pid: this.pid }).then(
        data => {
          this.errorMessage = null;
          this.message = data.message;
          this.complete=true;
          setTimeout( () => window.location.href = '/List/All/1', 2000);
          
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
      )
    },
  },
  computed: {
      show404: function () {
      let show = true;
          if(this.me.roles){
        if(this.me.roles[0] =='admin'){
        show = false;
      }
      }
      return show;
    },

    showdata: function () {
      let show = true;
          if(this.me.roles){
        if(this.me.roles[0] !=='admin'){
        show = false;
      }
      }
      if(this.me.id == 0){
        show = false;
      }
      return show;
    },
  },
  
  setup(props) {
    
    const store = useStore();
    store.dispatch("getPlaceById", props.pid),
    store.dispatch("listProvinceTag");
    store.dispatch("listEtcTag");
    
    // if(store.state.user.roles && store.state.user.roles[0] !== 'business'){
    //          if(store.state.user.roles && store.state.user.roles[0] !== 'admin'){     
    //      setTimeout( () => window.location.href = '/Lis');   
    //   }
    //   }
    //  if(store.state.user.id == 0){
    //     setTimeout( () => window.location.href = '/Lis'); 
    //   }

      

      
    

    let place = computed(function () {
      return store.state.place;
    });

    let provinces = computed(function () {
      return store.state.provinces;
    });
    let etc = computed(function () {
      return store.state.etc;
    });
        let me = computed(function () {
      return store.state.user;
    });
    

    

    return {
      provinces,
      etc,
      place,
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

