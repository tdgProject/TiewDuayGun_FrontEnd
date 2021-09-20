<template>
<div class="border-8 border-red-500 rounded-full bg-white shadow flex w-full">
            <input
                type="text"
                placeholder="Search Your Place....'"
                class="w-full rounded-tl-full rounded-bl-full py-2 px-4" />
            <button class="bg-yellow-300 rounded-tr-full rounded-br-full hover:bg-red-300 py-2 px-4" href="/List">
                <p class="font-semibold text-base uppercase">Search</p>
            </button>
</div>
  <div class="grid grid-cols-3 mt-12 md:w-full">
    <div class="px-4 py-2 md:w-full" v-for="Place in PlaceList" :key="Place.id">
      <h1 class="text-gray-900 font-bold text-3xl uppercase ">
        {{ Place.PlaceName }}
      </h1>
      

      <img
        class=" object-cover mt-2 rounded-2xl md:w-full  "
        :src="getimage(Place.image)" 
        alt="Place" >

    </div>
  </div>

</template>



<script>
export default {
  name: "ShowPlace",
  components: {},
  data() {
    return {
      editId: "",
      url:"http://40.76.71.12:8081",    
      PlaceList: [],
      image: "",
           
      
    };
  },
  methods: {
    
 
      
    getimage(image){
      return `${this.url}/image/${image}`
    },
  
    
   
    
    async getPlaceList() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
    
 

  },
  async created() {
    this.PlaceList = await this.getPlaceList();
  },
  
};
</script>