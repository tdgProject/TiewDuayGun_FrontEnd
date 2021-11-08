<template>
<!-- component -->

<div class=" flex items-center justify-center w-full h-screen bg-gray-800"  style="background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url('https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')">
<div class="card-thumbnail w-auto">
          <img
            src="https://www.graphicsprings.com/filestorage/stencils/687abebf7d05bc6f1a807ae8ccf81c63.png?width=500&height=500"
            class="img-fluid opacity-75 fade-in"
            alt=""
          />
        </div>
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between mr-5">
        <div class="border-8 border-red-blue rounded-full bg-white shadow flex w-full fade-in">
             <input
      type="text"
      placeholder="Search Place's Name"
      class="w-full rounded-tl-full rounded-bl-full py-2 px-4 "
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
      <p class="font-semibold text-base uppercase text-white">Search</p>
    </button>
    </a>
        </div>
    </div>
</div>




</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},
props: ['filter','var'],
data(){
    return{
      searchValue: null,
    }
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
    

  

    return {
    
    };
  },
}
</script>