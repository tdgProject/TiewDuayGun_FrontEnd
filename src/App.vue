<template>
<div class="containers bg-white">
    <nav class="navbar fixed-top h-20 navbar-expand-md navbar-light bg-white">
        <div class="container-fluid p-0"> <a class="navbar-brand text-uppercase fw-800" href="/"><span class="border-red pe-2 ml-5">Tiew</span>DuayGun</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNav" aria-controls="myNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="fas fa-bars"></span> </button>
            <div class="collapse navbar-collapse " id="myNav">
                <div class="navbar-nav bg-white ms-auto align-items-center pb-1">
                  <a class="nav-link " id="texttest" :href="$router.resolve({name: 'List', params: { filter: 'All',var: 1}}).href">List</a> 
                  <a class="nav-link" id="texttest" :href="$router.resolve({name: 'Tag'}).href">Tag</a> 
                  <a class="nav-link mr-3" id="texttest" :href="$router.resolve({name: 'Aboutus'}).href">About Us</a>
                  <div v-if="!loggedIn" class="d-flex" id="texttest">
                    <a class="nav-link mr-3" id="texttest" :href="$router.resolve({name: 'Signin'}).href">Login</a>
                    <a class="nav-link mr-3"  id="texttest" :href="$router.resolve({name: 'Signup'}).href">Sign up</a>
                  </div>
                  <div v-else class="mx-4">
                    <div class="dropdown">
                      <a class="d-flex align-items-center my-0 p-2 rounded-pill text-decoration-none text-black border-2" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <div
                          class="rounded-circle mr-3 w-10 h-10"
                          v-bind:style="{ backgroundImage: 'url(\'' + userImage.replace('\'','\\\'') + '\')',backgroundPosition: 'center center',backgroundSize: 'cover' }"
                        >
                        </div>
                        <div id="texttest">{{me.username}}</div>
                      </a>

                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink" data-offset="flip">
                        <li><a class="dropdown-item " id="texttest" :href="$router.resolve({name: 'Profile', params: { uid:me.id }}).href">Profile </a></li>
                        <!-- <li><a class="dropdown-item" :href="$router.resolve({name: 'Signin'}).href">My Hotel</a></li> -->
                        
                        <li v-if="me.roles[0]!= 'member' "><a class="dropdown-item" id="texttest" :href="$router.resolve({name: 'Myhotel'}).href">My Hotel</a></li>
                        <li><a class="dropdown-item" id="texttest" :href="$router.resolve({name: 'Myreview'}).href">My Reviews</a></li>
                        <li v-if="me.roles[0] == 'member' "><a class="dropdown-item" id="texttest" :href="$router.resolve({name: 'Business'}).href">Business Request</a></li>
                        <li v-if="me.roles[0] == 'admin' "><a class="dropdown-item" id="texttest" :href="$router.resolve({name: 'Addplace'}).href">Add place</a></li>
                        <li v-if="me.roles[0] == 'admin' "><a class="dropdown-item" id="texttest" :href="$router.resolve({name: 'UserManagement'}).href">UserManagement</a></li>
                        <div class="dropdown-divider"></div>
                        <li><button class="dropdown-item" id="texttest" @click="logOut()" >Log Out</button></li>
                      </ul>
                    </div>
                  </div>
                  <!-- <a><svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-purple-600" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.716 9.927l5.403 1.661 2.447-1.245c1.325-.595 3.421-.105 3.434 1.45.009.856-.595 1.927-1.495 2.425l-2.405 1.225-1.836 5.361-2.493 1.196-.263-4.219-1.707.869-.674 1.809-2.19 1.022-.465-3.566-2.617-2.554 2.126-1.093 1.839.527 1.709-.87-3.289-2.73 2.476-1.268zm-3.612 10.639c-4.86 1.436-8.711-3.301-9.104-5.566 1.498 1.65 4.118 2.901 7.188 2.084l1.111 1.085c-1.034.424-2.599.681-3.932.407 1.385.872 2.688 1.133 4.562.653l.175 1.337zm13.177-8.665c-.14-.06-.656-.194-.961-.02l-3.068 1.559-5.094-1.767 3.428 2.615-4.463 2.275-1.616-.704 1.465 1.321.085 1.839.566-1.667 4.289-2.124.221 3.92 1.562-4.865s2.713-1.424 3.104-1.637c.372-.204.482-.745.482-.745m-22.268.61l-.013-.511c0-5.522 4.477-10 10-10 4.462 0 8.243 2.924 9.529 6.961 0 0-1.078.561-1.576.815-.055-.113-4.737-1.474-4.737-1.474-.372-.112-.75-.137-1.372.161l-.271-.404c-.096-.063-.844-.588-.64-.245l.657.654c-.032.022-.172-.239-.172-.048.027-.074.026.152-.007.265l-.073.037-.008-.014c-.045-.074.074-.115.005-.223 0-.071-.188-.14-.226-.188-.105-.129-.381-.414-.531-.483-.042-.019-.637.073-.687.092l-.149.259c-.124.046-.239.105-.349.179l-.131.293c-.058.051-.638.243-.641.25.025-.063-.406-.143-.378-.268.032-.137.178-.566.14-.723-.04-.165.895.237.957-.197.023-.186.037-.405-.262-.437.056.006.579-.205.665-.3.122-.14.401-.369.604-.369.237 0 .185-.344.294-.513.109.044-.058.313.073.423-.009-.086.37.047.407.027.088-.046.571-.019.496-.247-.084-.23.042-.162.151-.21-.02.007.282-.516.335-.344-.036-.177-.351.061-.461.053-.253-.021-.147-.434-.05-.555.074-.096-.203-.213-.206-.03-.005.274-.26.522-.202.887.092.55-.612-.132-.673-.095-.233.141-.424-.178-.303-.371.123-.195.42-.185.543-.395.086-.149.187-.321.321-.434.446-.374.569-.074 1.012-.034.436.04.147.104.088.27-.058.159.238.215.341.083.057-.077.191-.269.248-.412.074-.185.751-.164.278-.447-.311-.185-1.67-.56-2.58-.56-.196 0-.334.219-.484.344-.297.246-1.055.728-1.479.582-.432-.15-1.358.549-1.507.555-.055.002.002-.53.298-.568-.129.018 1.039-.59 1.008-.717-.039-.15-2.333.685-2.231.854.048.075.25.075-.013.245-.15.089-.311.666-.452.666-.421.184-.447-.362-.915.341l-.745.301c-1.106 1.175-1.872 2.664-2.15 4.319-.011.066.279.187.316.233.093.112.093.594.139.751.116.398.399.62.617.982.128.216.342.762.274.989.091-.148.893.679 1.039.852.303.357.546.78.217 1.151-2.727-.374-4.378-3.058-4.378-3.058m7.265 1.234c-.682-.452-.875-1.46-.632-2.23.031-.159-.095-.452-.04-.574.131-.294.401-.623.635-.846.132-.125.301-.093.456-.19.239-.15.242-.46.477-.65.333-.272.788-.266 1.223-.324.232-.031 1.113-.222 1.253-.05l.041.173-1.225.627c-.908.498-1.143 1.516-.75 2.267.168.318.654.734.654.734-.084.034-2.092 1.063-2.092 1.063m1.882-7.496l.09-.026-.042.114c.071.129.018.207.007.277l-.125.076c-.044.056.215.064.218.071.009.028-.313.074-.253.143.079.113.687-.163.59-.147.187-.094.025-.104-.081-.159-.036-.178-.065-.455-.177-.566l.073-.084c-.172-.25-.3.301-.3.301m-.429.455c-.072.029-.142-.017-.073-.087l.073-.088-.007-.04.058-.073.06-.015.124-.087c.036.008.122.079.092.123l-.066.082c-.015.139-.155.138-.259.184l-.002.001.002-.001-.002.001"/>
          </svg></a> -->
              </div> 
            </div>
        </div>
    </nav>
    <div class="h-5">
    </div>
</div>
<router-view />
      <div class="footer-dark">
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-3 item">
                    <h3>Phopthorn Patcharoen</h3>
                    <ul>
                        <li><a href="#">Developer</a></li>
              
                    </ul>
                </div>
                <div class="col-md-3 item">
                    <h3>Somchai chasae</h3>
                    <ul>
                        <li><a href="#">Developer</a></li>
                  
                    </ul>
                </div>
                <div class="col-md-3 item">
                    <h3>Attapon Jeamjumroensuk</h3>
                    <ul>
                        <li><a href="#">Developer</a></li>
    
                    </ul>
                </div>
                <div class="col-md-3 item text">
                    <h3>TiewDuayGun.com © 2021</h3>
                    <p>This Website pround by Intregrated Project[int222]</p>
                </div>
                
            </div>
            <p class="copyright">TiewDuayGun.team © 2021</p>
        </div>
    </footer>
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  data(){
    return{

    }
  },
  setup() {
    const store = useStore();
    let me = computed(function () {
      return store.state.user;
    });
    let userImage = computed(function () {
      return store.state.url + "image/user/" + store.state.user.image;
    });
    return {
      me,
      userImage
    };
  },
  mounted(){
    if(this.$store.state.user.id != 0){
      if(Date.now()>this.$store.state.user.exp){
        this.$store.dispatch('auth/logout');
        
      }
    }
  },
  computed: {
    loggedIn: function () {
      let show = false;
      if (this.$store.state.user.id != 0) {
        show = true;
      }
      return show;
    },
  },
  methods: {
    getUserImage(image) {
      return `${this.$store.state.url}image/user/${image}`;
    },
    logOut(){
      this.$store.dispatch('auth/logout');
      window.location.href = '/';
    }
  }
}
</script>
<style>
.footer {
 bottom: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#home{
  padding: 50px;
}
#all{
  padding: 50px;
}
#tag{
  padding: 50px;
}
#profile{
  padding: 50px;
}
#login{
  padding: 50px;
}
</style>
