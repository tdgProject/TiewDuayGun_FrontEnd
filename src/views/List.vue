
<template>

    <div class="border-4 border-red-black rounded-full bg-white shadow flex">
      <input
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
          <p class="font-semibold text-base uppercase">Search</p>
        </button>
      </a>
    </div>
<div class="containers eiei ">
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 px-0 p-2  " v-for="place in places" :key="place.placeId">
            <div class="image "> <img class="shoe-img pl-5 pl-md-0 " :src="getimage(place.image)">
                <div class="overlay ">
                    <p class="amount">{{place.placeName}}</p>
                    <p class="h4">{{place.placeName}}</p>
                 
              
                    <ul class="d-flex justify-content-start mt-10">
                        <p class="text-xl">Rating:</p>
                        <li v-for="x in calStar(place.placeRating)[0]" :key="x">
                          <i class="bx bxs-star text-3xl"></i>
                        </li>
                        <li v-for="y in calStar(place.placeRating)[1]" :key="y">
                          <i class="bx bxs-star-half text-3xl"></i>
                        </li>
                        
                      </ul>
                      <h2 class=" flex text-xl ml-8">
              Tag:
              <div v-for="tag in place.tags" :key="tag.tag.tagid" class="">
                <router-link
                  onclick="window.location.reload(true)"
                  :to="{
                    name: 'List',
                    params: { filter: 'Tag', var: tag.tag.tagId },
                  }"
                  >{{ tag.tag.tagName }},</router-link
                >
              </div>         
            </h2>
            <div class ="float-left ml-8">
             <router-link
                     
              class="btn btn-outline-dark btn-icon-text float-right"
              :to="{
                name: 'Placeinfo',
                params: { pid: place.placeId, pImg: place.image },
              }"
              >Read mores</router-link
            >
            </div>
             <div class="float-right p-2">
                        <button @click="deletePlace(place.placeId)" type="button" class="p-2">
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
              class=""
              :to="{
                name: 'Editplace',
                params: {pid:place.placeId,pimage:place.image},
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

    return {
      places,
      
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