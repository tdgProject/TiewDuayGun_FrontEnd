<template>
  <div>
    <!-- <div v-for="hotel in hotels" :key="hotel.hotelId">
      {{hotel.hotelName}} -->
    <div class="container mt-10 d-flex flex-wrap justify-content-start">
      <div class="col-lg-4 d-flex flex-wrap p-1">
        <div class="card">
          <img
            :src="getHotelImage(hotels.image)"
            alt=""
            class="card-img-top h-1/2"
          />
          <div class="card-body">
            <p class="">Name: {{ hotels.hotelName }}</p>
            <p class="">Address: {{ hotels.address }}</p>
            <p class="">Email: {{ hotels.email }}</p>
            <p class="">Tel: {{ hotels.telNumber }}</p>
            <button>
              <router-link
                onclick="window.location.reload(true)"
                class=""
                :to="{
                  name: 'Edithotel',
                  params: { uid: 2, himage: hotels.image },
                }"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z"
                  /></svg
              ></router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button>
        <router-link
        onclick="window.location.reload(true)"
          class=""
          :to="{
            name: 'Addhotel',
          }"
          ><svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M7 2c1.695 1.942 2.371 3 4 3h13v17h-24v-20h7zm4 5c-2.339 0-3.537-1.388-4.917-3h-4.083v16h20v-13h-11zm2 6h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"
            /></svg
        ></router-link>
      </button>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Listhotel",
  components: {},
  data() {
    return {};
  },
  methods: {
    getHotelImage(image) {
      return `${this.$store.state.url}image/hotel/${image}`;
    },
  },

  setup() {
    const store = useStore();

    store.dispatch("getMyHotel", 2); /* mockup userid=2*/

    let hotels = computed(function () {
      return store.state.myHotel;
    });
    console.log(hotels);
    return {
      hotels,
    };
  },
};
</script>