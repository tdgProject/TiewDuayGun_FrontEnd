<template>
                <div class="bbb_viewed_title_container mb-2 container">
                    <h3 class="bbb_viewed_title ">UserManage</h3>
                    <div class="bbb_viewed_nav_container">
                        <div class="bbb_viewed_nav bbb_viewed_prev"><i class="fas fa-chevron-left"></i></div>
                        <div class="bbb_viewed_nav bbb_viewed_next"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
      
      
    <div class="container" v-for="user in users" :key="user.userId" >
      
      <div class=" border-2 p-10 mb-2 ">
        <div class="flex-wrap flex justify-between ">
          <div class="">
            
                   <img
                        :src="getUserImage(user.image)"
                        alt="user"
                        width="50"
                        
                        class="rounded-circle"
                      />
      
        </div>
         <div class=" mt-2">
        <p class="" >Name</p>
        <p class="" >{{user.username}}</p>

      </div>
      <div class="mt-2 ">
   <p class="" >Email</p>
        <p  >{{user.email}}</p>
      </div>
      <div class=" mt-2">
        <p class="" >telNumber</p>
        <p >{{user.telNumber}}</p>
      </div>
       <div class="mt-2" >
         <p class="" >Role</p>
         <p class="" v-if=" user.userId !== editId">{{user.role}}</p>
        <!-- <option class="" v-if="edit == true && user.userId == editId">

          sdasd
        </option> -->
        <select class="border-2 " v-model="user.role" v-if="edit == true && user.userId == editId">
  <option v-for="role in rolesx" :key="role">
    {{role}}
  </option>
</select>

      </div>
<div class="">
               <button v-if="edit == false"
                      type="button"
                      class="mr-2 mt-8"
                      @click="editSwitch(user.userId)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.473 7.196c-.425-.439-.401-1.127.035-1.552l4.461-4.326c.218-.211.498-.318.775-.318.282 0 .563.11.776.331l-6.047 5.865zm-7.334 11.021c-.092.089-.139.208-.139.327 0 .25.204.456.456.456.114 0 .229-.042.317-.128l.749-.729-.633-.654-.75.728zm6.33-8.425l-2.564 2.485c-1.378 1.336-2.081 2.63-2.73 4.437l1.132 1.169c1.825-.593 3.14-1.255 4.518-2.591l2.563-2.486-2.919-3.014zm7.477-7.659l-6.604 6.405 3.326 3.434 6.604-6.403c.485-.469.728-1.093.728-1.718 0-2.088-2.53-3.196-4.054-1.718zm-1.946 11.333v7.534h-16v-12h8.013l2.058-2h-12.071v16h20v-11.473l-2 1.939z"
                        />
                      </svg>
                    </button>
                                   <button v-if="edit == true && user.userId == editId"
                      type="button"
                      class="mr-2  mb-2"
                      @click="editRole(user.userId,user.role)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z"/></svg>
                    </button>
</div>
      </div>
      </div>
      
      </div>
      
    
    
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";


export default {
  name: "UserManagement",


  data() {
    return {
      editId: 0,
      edit: false,
      role:[],
      rolesx:["member","business","admin"]
      

    };
  },

  methods: {
        editRole(uid,role) {
      let newUser = {
        userId: uid,
        // username: username,
        role:role,
        // role: [],
        // telNumber: tel,
        // email:email

        
      };

        //   for (const role of this.role) {
        //    newUser.role.push(role);
        //  }

      const jsonProduct = JSON.stringify(newUser);
      console.log(jsonProduct)
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      
      const formdata = new FormData();
      formdata.append("newUser", blob);
      this.$store.dispatch("editRole", { data:formdata, uid:this.editId });
      window.location.reload();
    },
    getUserImage(image) {
      return `${this.$store.state.url}image/user/${image}`;
    },
        editSwitch(uid) {
      this.editId = uid;
      this.edit = !this.edit;
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
  setup() {
    const store = useStore();
    store.dispatch("listUser");


    let users = computed(function () {
      return store.state.users;
    });
             let me = computed(function () {
      return store.state.user;
    });

    return {

      users,
      me
   
    };
  },
};
</script>
<style scoped>
 .bbb_viewed_title_container {
     border-bottom: solid 1px #dadada
 }
  .bbb_viewed_title {
     margin-bottom: 14px
 }
  .bbb_viewed_nav_container {
     position: absolute;
     right: -5px;
     bottom: 14px
 }
  .bbb_viewed_nav {
     display: inline-block;
     cursor: pointer
 }
  .bbb_viewed_nav i {
     color: #dadada;
     font-size: 18px;
     padding: 5px;
     -webkit-transition: all 200ms ease;
     -moz-transition: all 200ms ease;
     -ms-transition: all 200ms ease;
     -o-transition: all 200ms ease;
     transition: all 200ms ease
 }
 
</style>>
