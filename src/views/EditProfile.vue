
<template>

<div class="grid min-h-screen place-items-center mr-48">
    <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
      <form @submit.prevent="EditUser()">
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
          <p class="mt-2">EditYourname</p>
          <div class="flex space-x-5 mt-3">
            <input
              type="text"
              name="username"
              id=""
              placeholder="Insert Your Username"
              class="border p-2 w-full"
              v-model="user.username"
              required
            />
          </div>
          <p class="mt-2">EditTelnum</p>
          <input
            name="telNumber"
            id=""
            cols="10"
            rows="3"
            placeholder="Insert Your PlaceDescription"
            class="border p-2 mt-3 w-full"
            v-model="user.telNumber"
            required
          />
    
        <p class=""></p>
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
        <p class=" text-2xl ">Editing Profile...</p>
        
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
  props: ["uid"],
  
  

  name: "EditProfile",
  data() {
    return {
      preview: null,
      image: null,
      username: "",
      telNumber: "",
      email: "",
      editId: "",
      isSet: false,
      previewSet: false,
      complete: false
    };
  },
  methods: {
          EditUser(){
            
        let newUser = {
        userId: 0,
        username: this.user.username,
        password: this.user.password,
        telNumber: this.user.telNumber,
        email: this.user.email,
        image: "",
      };
      const jsonProduct = JSON.stringify(newUser);
      console.log(jsonProduct)
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      console.log(Blob)
      let formdata = new FormData();
      formdata.append("newUser", blob);
      formdata.append("image", this.image);
      setTimeout( () => window.location.href = '/Profile/'+this.user.id, 2000);
       

       
      this.$store.dispatch("editUser", { data:formdata, uid:this.user.id });
      this.complete=true;
      
      //setTimeout( () => window.location.href = '/List/All/1');
    

    },

      setPreview(){
      if(this.preview == null){
        this.preview = this.$store.state.url+"image/user/"+this.user.image;
      }
      this.previewSet = true;
      return this.previewSet
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
    


    let user = computed(function () {
      return store.state.user;
    });




    return {
        user

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

