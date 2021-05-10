<template>
  <nav-bar> </nav-bar>
  <div class="pb-96 p-8">
     <button v-for="tab in tabs" :key="tab" @click="selected = tab">
      {{ tab }}
    </button>
    <component :is="selected">></component>
    
  </div>

  <foot> </foot>
</template>

<script>
import AddProduct from "@/components/AddProduct";
import ShowProduct from "@/components/ShowProduct";

export default {
  data() {
    return {
      tabs: ["AddProduct", "ShowProduct"],
      selected: "ShowProduct",
      isedit: false,
      
    };
  },
  components: {
    AddProduct,
    ShowProduct,
  },
  methods: {
 
 
  },
};
</script>