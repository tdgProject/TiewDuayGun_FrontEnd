<template>
<div class=""  style="background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url('https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')">
  <div class="container-fluid pt-12">
    <div class="w-3/4 m-auto py-12 justify-content-md-center">
      <ul>
        <li v-for="type in types" :key="type.typeId">
          <div class="border-b-2 border-secondary d-flex justify-content-start mx-5 pl-12 pb-2 fw-bold fs-3 text-white">{{ type.typeName }}</div>
          <ul class="mx-5 my-3 d-flex flex-wrap">
            <li v-for="tag in type.tag" :key="tag.tagId">
            <router-link :to="{ name: 'List', params: { filter: 'Tag',var: tag.tagId } }">
              <button class="w-32 h-12 mx-3 my-2 justify-content-center border border-secondary rounded-pill shadow-sm bg-white opacity-75">{{ tag.tagName }}</button>
            </router-link>
            </li>
          </ul>
        </li>
      </ul> 
    </div>
  </div>
</div>
</template>
<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Tag",
  components: {},

  setup(){
    const store = useStore();

    store.dispatch('listTag');

    let types = computed(function () {
      return store.state.types
    });

    return{
      types
    }

  },
};
</script>
