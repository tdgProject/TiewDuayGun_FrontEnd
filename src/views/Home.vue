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
             id="texttest"
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
      <p class="font-semibold text-base uppercase text-white mt-2" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg></p>
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