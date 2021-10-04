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

  <div class="container">
    <h2 class="mt-4 mb-4"></h2>
  </div>
  <div class="d-flex flex-wrap">
    <!-- Bootstrap 5 card box -->
    <div class="px-4 py-2 w-1/3 " v-for="place in places" :key="place.placeId">
      <div class="card-box bg-gray-300 opacity-80">
        <div class="card-thumbnail w-auto">
          <img
            :src="getimage(place.image)"
            class="img-fluid"
            alt=""
          />
        </div>
        <h1 class="text-black font-bold text-xl">
         
            {{ place.placeName }}
        </h1>
        <h2 class="text-black-200 font-bold text-xl flex px-4">
          Tag:
          <div v-for="tag in place.tags" :key="tag.tag.tagid">
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