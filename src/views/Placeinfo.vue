<template>
  <div class="bg-gray-400">
    <div class="container py-4">
      <div class="pt-4 mt-4 text-muted border-top"></div>
      <header class="pb-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center text-dark text-decoration-none"
        >
          <i class="bx bxs-been-here display-6 mr-2"></i>
          <span class="fs-4">{{ place.placeName }}</span>
        </a>
      </header>

      <div onload="getPlaceImage" id="banner"
        class="p-5 pb-1 mb-4 bg-light rounded-3"
        style="background-position: center; background-size: cover;">
        <div class="container-fluid py-5">
          <h1 class="display-1 fw-bold text-end">{{ place.placeName }}</h1>
          <div
            class="col-md-8 bg-black bg-opacity-50 p-4 rounded-lg text-white"
          >
            <p class="fs-4">{{ place.placeDescription }}</p>
          </div>
          <div class="d-flex flex-row flex-wrap mt-2">
            <button
              class="
                mx-2
                px-4
                py-1
                bg-secondary
                rounded-xl
                bg-opacity-50
                text-white
              "
              v-for="tag in place.tags"
              :key="tag.tag.tagId"
            >
              {{ tag.tag.tagName }}
            </button>
          </div>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
                    <div class="h-100 p-4 text-white bg-dark rounded-3">
            <h2 class="mb-3"><i class='bx bxs-star text-3xl'></i> Rating : {{ place.placeRating }} </h2>
            <div class="vid-container" >
              <iframe class="responsive-iframe" src="https://www.youtube.com/embed/A30IuIjQYYg?autoplay=1" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <form @submit.prevent="addReview()">
              <h3>Your Review and Rating</h3>
              <Star :rating="rating" @selected="updateStar"/>

              <div class="form-group">
                <textarea
                  name="review"
                  class="form-control"
                  placeholder="Your Review*"
                  v-model="review"
                  style="width: 100%; height: 150px"
                ></textarea>
              </div>
              <div class="form-group mt-3 d-flex justify-content-end">
                <input
                  type="submit"
                  name="submit"
                  class="py-1 px-2 rounded-xl bg-secondary text-white"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="pt-4 mt-4 text-muted border-top"></div>
      <header class="pb-3 mb-4 border-bottom">
        <a class="d-flex align-items-center text-dark text-decoration-none">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M20 9.999v-2h4v12.001h-3v4l-5.333-4h-7.667v-4h12v-6.001zm-2 4.001h-9.667l-5.333 4v-4h-3v-14.001h18v14.001z"
            />
          </svg>
          <span class="fs-4 p-2">Reviews</span>
        </a>
      </header>
      <!-- list review -->
      <div class="card bg">
        <div class="comment-widgets text-left">
          <!-- Comment Row -->
          <div class="flex-row comment-row m-t-0">
            <div>
              <div
                class="comment-text w-200 border-8 bg-white shadow-2xl"
                v-for="review in reviews"
                :key="review.userId"
              >
                <div v-if="edit == true && review.user.userId == editId">
                  <div class="d-flex pt-4 pb-3 px-5 justify-content-between">
                    <div class="d-flex">
                    <img
                      :src="getUserImage(review.user.image)"
                      alt="user"
                      width="50"
                      class="rounded-circle"
                    />

                    <h6 class="font-medium font-bold mt-4 ml-4">
                      {{ review.user.username }}
                    </h6>
                    </div>
                    <div class="w-1/6">
                      <label for="StarRange" class="container text-center font-bold">Your Rating : {{uRating}}</label>
                      <input type="range" class="form-range" min="0" max="5" step="0.5" v-model="uRating" id="StarRange">
                    </div>
                  </div>
                  <div class="m-auto w-5/6">
                    <textarea
                      class="w-full d-block text-left text-lg border-2 p-2"
                      rows="2"
                      v-model="review.review"
                    ></textarea>
                    <div class="comment-footer text-right">
                      <button
                        class="
                          w-20
                          h-8
                          rounded-lg
                          bg-secondary
                          text-white
                          border-3
                          my-2
                        "
                        @click="editReview(review.review)"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else-if="review.user.userId !== editId">
                  <div class="d-flex pt-4 pb-3 px-5 justify-content-between">
                    <div class="flex">
                    <img
                      :src="getUserImage(review.user.image)"
                      alt="user"
                      width="50"
                      class="rounded-circle"
                    />
                    <h6 class="font-medium font-bold mt-4 ml-4">
                      {{ review.user.username }}
                    </h6>
                    </div>
                    <div>
                      <ul class="d-flex justify-content-start">
                          <li v-for="x in calStar(review.rating)[0]" :key="x">
                            <i class='bx bxs-star text-3xl'></i>
                          </li>
                          <li v-for="y in calStar(review.rating)[1]" :key="y">
                            <i class='bx bxs-star-half text-3xl' ></i>
                          </li>
                      </ul>
                    </div>
                  </div>
                  <span
                    class="m-auto w-5/6 d-block text-left ml-28 mb-10 text-lg"
                    >{{ review.review }}</span
                  >
                  <div class="comment-footer text-right mr-12">
                    <button
                      type="button"
                      class="mr-2"
                      @click="editSwitch(review.rating,review.user.userId)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.473 7.196c-.425-.439-.401-1.127.035-1.552l4.461-4.326c.218-.211.498-.318.775-.318.282 0 .563.11.776.331l-6.047 5.865zm-7.334 11.021c-.092.089-.139.208-.139.327 0 .25.204.456.456.456.114 0 .229-.042.317-.128l.749-.729-.633-.654-.75.728zm6.33-8.425l-2.564 2.485c-1.378 1.336-2.081 2.63-2.73 4.437l1.132 1.169c1.825-.593 3.14-1.255 4.518-2.591l2.563-2.486-2.919-3.014zm7.477-7.659l-6.604 6.405 3.326 3.434 6.604-6.403c.485-.469.728-1.093.728-1.718 0-2.088-2.53-3.196-4.054-1.718zm-1.946 11.333v7.534h-16v-12h8.013l2.058-2h-12.071v16h20v-11.473l-2 1.939z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteReview(review.user.userId)"
                      type="button"
                      class=""
                      
                    >
                    
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Card -->
        </div>
      </div>
      <!-- list review -->

      <!-- hotel -->
<div class="container mt-10">
    <div class="row">
    <div class="col-lg-4 mb-4 " v-for="hotel in hotels" :key="hotel.hotelId" >
    <div class="card">
      <img :src="getHotelImage(hotel.hotel.image)" alt="" class="card-img-top" height="">
      <div class="card-body">
       <p class="">Name: {{ hotel.hotel.hotelName }}</p>
                  <p class="">Address: {{ hotel.hotel.address }}</p>
                  <p class="">Email: {{ hotel.hotel.email }}</p>
                  <p class="">Tel: {{ hotel.hotel.telNumber }}</p>
      </div>
     </div>
    </div>
    </div>
</div>
 
      
      <!-- hotel -->
    </div>

    <footer class="pt-4 mt-4 text-muted border-top"></footer>
  </div>
</template>
<script>

import { computed } from "vue";
import { useStore } from "vuex";

import Star from "../component/Star.vue"
export default {
  name: "Tag",
  props: ["pid"],
  components : {
    Star
  },

  data() {
    return {
      rating: 0,
      uRating: 0,
      review: "",
      ErrorReview: false,
      ErrorRating: false,
      edit: false,
      editId: 0,
    };
  },
  mounted(){
    let pimage = this.$store.state.url+'image/place/'+this.$store.state.place.image;
    document.getElementById("banner").style.backgroundImage="url('"+pimage+"')";
  },
  methods: {
    // validateReview() {
    //   this.ErrorReview = this.review === "" ? true : false;
    //   console.log(`Review: ${this.ErrorReview}`);
    // },
    // validateRating() {
    //   this.ErrorRating = this.rating === 0 ? true : false;
    //   console.log(`Rating: ${this.ErrorRating}`);
    // },
    addReview() {
      let newReview = {
        user: { userId: 2 },
        review: this.review,
        rating: this.rating,
      };
      const jsonProduct = JSON.stringify(newReview);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      const formdata = new FormData();
      formdata.append("newReview", blob);
      this.$store.dispatch("addReview", { data: formdata, pid: this.pid });
      window.location.reload();
    },
    deleteReview(uid) {
      if(confirm("Do you really want to remove the product?")){
      this.$store.dispatch("removeReview", { uid: uid, pid: this.pid });
      location.reload();
      }
    },
    editReview(rev) {
      let newReview = {
        user: { userId: this.editId },
        review: rev,
        rating: this.uRating,
      };
      const jsonProduct = JSON.stringify(newReview);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      const formdata = new FormData();
      formdata.append("newReview", blob);
      this.$store.dispatch("editReview", { data: formdata, pid: this.pid });
      window.location.reload();
    },
    editSwitch(rating,uid) {
      this.uRating = rating;
      this.editId = uid;
      this.edit = !this.edit;
    },
    calStar(rating){
      let floor= Math.floor(rating);
      let half = rating-floor;
      return [floor,Math.ceil(half)];
    },
    updateStar(value){
      this.rating = value;
    },
    getUserImage(image){
      return `${this.$store.state.url}image/user/${image}`
    },
    getHotelImage(image){
      return `${this.$store.state.url}image/hotel/${image}`
    }
    
    
  },
  setup(props) {
    const store = useStore();
    store.dispatch("getPlaceById", props.pid),
      store.dispatch("getHotelById", props.pid),
      store.dispatch("listReview", props.pid);
    let place = computed(function () {
      return store.state.place;
    });
    let hotels = computed(function () {
      return store.state.hotels;
    });
    let reviews = computed(function () {
      return store.state.reviews;
    });

    return {
      place,
      hotels,
      reviews,
    };
  },
};
</script>
<style scoped>
.vid-container{
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>