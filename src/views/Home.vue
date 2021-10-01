<template>
<!-- component -->
<div class="flex items-center justify-center w-screen h-screen bg-gray-800">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="border-8 border-red-500 rounded-full bg-white shadow flex w-full">
            <input
                type="text"
                placeholder="Search Your Place....'"
                class="w-full rounded-tl-full rounded-bl-full py-2 px-4" />
            <button class="bg-yellow-300 rounded-tr-full rounded-br-full hover:bg-red-300 py-2 px-4" href="/List">
                <p class="font-semibold text-base uppercase">Search</p>
            </button>
        </div>
    </div>
</div>


<!-- BUY ME A PIZZA AND HELP SUPPORT OPEN-SOURCE RESOURCES -->


</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},

  setup() {
    const store = useStore();

    store.dispatch("onstart");

  }
}
</script>