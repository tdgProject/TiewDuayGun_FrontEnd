
<template>

<form @submit.prevent="EditUser()">
    <div class="bg-white shadow rounded-lg p-6 ">
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
    <div class="grid lg:grid-cols-2 gap-6">
      <div class="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
          
        <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <p>
            <label for="name" class="bg-white text-gray-600 px-1 " >Username *</label>
          </p>
        </div>
        <p>
          <input id="name" autocomplete="false" tabindex="0" type="text" class="py-1 px-1 text-gray-900 outline-none block h-full w-full" v-model="user.username">
        </p>
      </div>
      
      <div class="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
        <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
          <p>
            <label for="username" class="bg-white text-gray-600 px-1">Tel *</label>
          </p>
        </div>
        <p>
          <input id="username" autocomplete="false" tabindex="0" type="text" class="py-1 px-1 outline-none block h-full w-full" v-model="user.telNumber">
        </p>
      </div>
      
    </div>
    <div class="border-t mt-6 pt-3">
      <button  class="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300">
        Save
      </button>
    </div>
  </div>
</form>
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
