<template>
<div class="border-8 border-red-500 rounded-full bg-white shadow flex ">
            <input
                type="text"
                placeholder="Search Your Place....'"
                class="w-full rounded-tl-full rounded-bl-full py-2 px-4" />
            <button class="bg-yellow-300 rounded-tr-full rounded-br-full hover:bg-red-300 py-2 px-4" href="/List">
                <p class="font-semibold text-base uppercase">Search</p>
            </button>
            
</div>


    
        <div class="container ">
            <h2 class="mt-4 mb-4">List All</h2>
        </div>
        <div class=" d-flex flex-wrap ">
            <!-- Bootstrap 5 card box -->
            <div class="px-4 py-2 w-1/3 " v-for="place in places" :key="place.placeId">
            <div class="card-box">
                <div class="card-thumbnail w-auto">
                    <img src="https://7greens.tourismthailand.org/wp-content/uploads/2020/03/shutterstock_267973889-1-scaled.jpg" class="img-fluid" alt="">
                </div>
                <h1 class="text-black font-bold text-xl ">
        {{ place.placeName}}
      </h1>
                      <h2 class="text-black-200 font-bold text-xl flex  px-4">Tag:
        <div v-for="tag in place.tags" :key="tag.tag.tagid">
           {{ tag.tag.tagName}},
        </div>
      </h2>
      <h3 class="text-black-200 font-bold text-xl flex px-4">Rating:
        {{ place.placeRating}}
      </h3>
                <a href="/Placeinfo" class="btn btn-sm btn-danger float-right">Read more >></a>
            </div>
        </div>
    

</div>

 
      

  
    
      <!-- <img
        class=" object-cover mt-2 rounded-2xl md:w-full  "
        :src="getimage(place.image)" 
        alt="Place" > -->

  

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