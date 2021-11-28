
<template>

    <div class="border-4 border-red-black rounded-full bg-white shadow flex ">
      <input
      id="texttest"
        type="text"
        placeholder="Search Place's Name"
        class="w-full rounded-tl-full rounded-bl-full py-2 px-4"
        v-model="searchValue"
      />
      <a
        :href="
          $router.resolve({
            name: 'List',
            params: { filter: 'Name', var: this.searchValue },
          }).href
        "
      >
        <button
          class="
            bg-blue-300
            rounded-tr-full rounded-br-full
            hover:bg-blue-500
            py-2
            px-4
          "
        >
        
          <p class="font-semibold text-base uppercase mt-2" id="texttest"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg></p>
        </button>
      </a>
    </div>
   <div class="nine mt-5">
  <h1>PlaceList<span>สถานที่ท่องเที่ยว</span></h1>
</div>
      
<div class=" eiei fade-in px-10  ">
    <div class="row pl-3" >
        <div class="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 px-0 p-2 " v-for="place in places" :key="place.placeId">
          
            <div class="image "> <img class="shoe-img  rounded-md p-2" :src="getimage(place.image)">
                <div class=" overlay pr-8 pb-7">
                    
                    <p class="thirteen"  id="texttest">{{place.placeName}}</p>
                 
              
                    <ul class="d-flex justify-content-start mt-10" >
                        <p class="text-xl" id="texttest" >Rating:</p>
                      
             <div v-if="place.placeRating == '0'"  id="texttest">No review</div>
                    
                        <li v-for="x in calStar(place.placeRating)[0]" :key="x">
                          <i class="bx bxs-star text-3xl"></i>
                        </li>
                        <li v-for="y in calStar(place.placeRating)[1]" :key="y">
                          <i class="bx bxs-star-half text-3xl"></i>
                        </li>
                        
                      </ul>
                      <h2 class=" flex text-xl ml-8">
              <p id="texttest">Tag:</p>
              <div v-for="tag in place.tags" :key="tag.tag.tagid" class="" >
                <router-link
                  onclick="window.location.reload(true)"
                  :to="{
                    name: 'List',
                    params: { filter: 'Tag', var: tag.tag.tagId },
                    
                  }"
                  ><p id="texttest">{{ tag.tag.tagName }},</p></router-link
                >
              </div>         
            </h2>
            <div class ="float-left ml-8"  >
             <router-link
              class="btn btn-outline-dark btn-icon-text float-right" 
              :to="{
                name: 'Placeinfo',
                params: { pid: place.placeId },
              }"
              ><div id="texttest">Read mores</div></router-link
            >
            </div>
            
             <div class="float-right p-2" >
                        <button @click="deletePlace(place.placeId)" type="button" class="p-2" v-if="showedit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                />
              </svg>
            </button>
             <button>
               
   <router-link
              class="" v-if="showedit"
              :to="{
                name: 'Editplace',
                params: {pid:place.placeId},
              }"
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z"/></svg></router-link
            >
              </button>
             </div>
            
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
  name: "List",
  components: {},
  props: ["filter", "var"],
  data() {
    return {
      searchValue: null,
    };
  },
  methods: {
    calStar(placeRating) {
      let floor = Math.floor(placeRating);
      let half = placeRating - floor;
      return [floor, Math.ceil(half)];
    },
    getimage(image) {
      return `${this.$store.state.url}image/place/${image}`;
    },
    deletePlace(pid) {
      if (confirm("Do you really want to remove the product?")) {
        this.$store.dispatch("removePlace", { pid: pid });
        location.reload();
      }
    },
  },
  computed: {
  

    showedit: function () {
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
    
   

    switch (props.filter) {
      case "All":
        store.dispatch("listPlace");
        break;
      case "Tag":
        store.dispatch("listPlaceByTag", props.var);
        break;
      case "Name":
        store.dispatch("listPlaceByName", props.var);
        break;
      default:
        break;
    }

    let places = computed(function () {
      return store.state.places;
    });
            let me = computed(function () {
      return store.state.user;
    });
    return {
      places,
      me
      
    };
  },

  // data() {
  //   return {
  //     PlaceList: [],
  //     image: "",

  //   };
  // },
  // methods: {

  //   getimage(image){
  //     return `${this.url}/image/${image}`
  //   },

  //   async getPlaceList() {
  //     try {
  //       const res = await fetch(this.url);
  //       const data = await res.json();
  //       return data;
  //     } catch (error) {
  //       console.log(`Could not get! ${error}`);
  //     }
  //   },

  // },

  // async created() {
  //   this.PlaceList = await this.getPlaceList();
  // },
};

</script>
