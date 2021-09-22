<template>
<!-- <div class="border-8 border-red-500 rounded-full bg-white shadow flex w-full">
            <input
                type="text"
                placeholder="Search Your Place....'"
                class="w-full rounded-tl-full rounded-bl-full py-2 px-4" />
            <button class="bg-yellow-300 rounded-tr-full rounded-br-full hover:bg-red-300 py-2 px-4" href="/List">
                <p class="font-semibold text-base uppercase">Search</p>
            </button>
</div> -->
  <div class="grid grid-cols-3 mt-12 md:w-full">
    <div class="px-4 py-2 md:w-full" v-for="place in places" :key="place.placeId">
      <h1 class="text-gray-900 font-bold text-3xl uppercase ">
        {{ place.placeName}}
      </h1>
      

      <!-- <img
        class=" object-cover mt-2 rounded-2xl md:w-full  "
        :src="getimage(place.image)" 
        alt="Place" > -->

    </div>
  </div>

</template>



<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "List",
  components: {},

  setup(){
    const store = useStore();

    store.dispatch('listPlace');

    let places = computed(function () {
      return store.state.places
    });

    return{
      places
    }

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