<template>
<!-- component -->
<div class="flex items-center justify-center w-screen h-screen bg-gray-800"  style="background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url('https://f.ptcdn.info/566/062/000/pn6aeu4qgnV1qeQRhhv4-o.jpg')">
    <div class="space-y-5 mb-11 ml-6">
      <p class="text-white font-bold text-5xl flex flex-col items-center">
        <span>TiewDuayGun <br /></span>
        <span>----------- <br /></span>
        <span> Search And Travel </span>
      </p>
      <p class="text-white font-semibold text-3xl flex flex-col items-center">Nice Trip. Nice Life.</p>
      
    </div>
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="border-8 border-red-blue rounded-full bg-white shadow flex w-full">
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