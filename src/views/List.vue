<template>


 <div class=""  style="background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url('https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')">
  <div class=" border-4 border-red-blue rounded-full bg-white shadow flex ">
    <input
      type="text"
      placeholder="Search Place's Name"
      class="w-full rounded-tl-full rounded-bl-full py-2 px-4"
      v-model="searchValue"
    />
    <a :href="$router.resolve({name: 'List', params: { filter: 'Name',var: this.searchValue}}).href">
    <button
      class="
        bg-blue-300
        rounded-tr-full rounded-br-full
        hover:bg-blue-500
        py-2
        px-4
      ">
      <p class="font-semibold text-base uppercase">Search</p>
    </button>
    </a>
  </div>

  <div class="">
    <h2 class="mt-4 mb-4"></h2>
 
  <div class="d-flex flex-wrap">
    <!-- Bootstrap 5 card box -->
    <div class="px-4 py-2 w-1/3 d-flex flex-wrap" v-for="place in places" :key="place.placeId">
      <div class="w-full bg-white bg-opacity-50 rounded-lg p-12 flex flex-col justify-center items-center border">
        <div class="card-thumbnail w-auto">
          <img
            :src="getimage(place.image)"
            class="img-fluid border-5"
            alt=""
          />
        </div>
        <h1 class="text-black font-bold text-xl">
         
            {{ place.placeName }}
        </h1>
        <h2 class="text-black-200 font-bold text-xl flex px-4">
          Tag:
          <div v-for="tag in place.tags" :key="tag.tag.tagid" class="">
            <router-link onclick="window.location.reload(true)"   :to="{ name: 'List', params: { filter: 'Tag',var: tag.tag.tagId } }">{{ tag.tag.tagName }},</router-link>
            
          </div>
        </h2>
        <h3 class="text-black-200 font-bold text-xl flex px-4">
          Rating: {{ place.placeRating }}/5
        </h3>
          <router-link class="btn btn-sm btn-danger float-right"
            :to="{ name: 'Placeinfo', params: { pid: place.placeId,pImg: place.image} }"
            >Read mores</router-link
          >
          <button
                      @click="deletePlace(place.placeId)"
                      type="button"
                      class=""
                      
                    >
                    
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
  props: ['filter','var'],
  data(){
    return{
      searchValue: null,
    }
  },
  methods:{
    getimage(image){
      return `${this.$store.state.url}image/place/${image}`
    },
    deletePlace(pid) {
      if(confirm("Do you really want to remove the product?")){
      this.$store.dispatch("removePlace", { pid: pid });
      location.reload();
      }
    },
  }, 
    

  setup(props) {
    const store = useStore();

    switch(props.filter){
      case 'All':
        store.dispatch("listPlace");
        break;
      case 'Tag':
        store.dispatch("listPlaceByTag",props.var);
        break;
      case 'Name':
        store.dispatch("listPlaceByName",props.var);
        break;
      default:
        break;
    }
    

    let places = computed(function () {
      return store.state.places;
    });

    return {
      places
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