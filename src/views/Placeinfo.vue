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

      <div
        class="p-5 pb-1 mb-4 bg-light rounded-3"
        style="
          background-image: url('https://tatapi.tourismthailand.org/tatfs/image/CustomPOI/Picture/P03006069_1.jpeg');
          background-position: center;
          background-size: cover;
        "
      >
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
          <div class="h-100 p-5 text-white bg-dark rounded-3">
            <h2>Rating : {{ place.placeRating }}</h2>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <form @submit.prevent="addReview()">
              <h3>Your Review and Rating</h3>
              <fieldset
                class="rating d-flex flex-row-reverse justify-content-center"
              >
                <input type="radio" id="star5" v-model="rating" :value="5" />
                <label
                  class="full m-0 p-0"
                  for="star5"
                  title="Awesome - 5 stars"
                ></label>
                <input
                  type="radio"
                  id="star4half"
                  v-model="rating"
                  :value="4.5"
                />
                <label
                  class="half m-0 p-0"
                  for="star4half"
                  title="Pretty good - 4.5 stars"
                ></label>
                <input type="radio" id="star4" v-model="rating" :value="4" />
                <label
                  class="full m-0 p-0"
                  for="star4"
                  title="Pretty good - 4 stars"
                ></label>
                <input
                  type="radio"
                  id="star3half"
                  v-model="rating"
                  :value="3.5"
                />
                <label
                  class="half m-0 p-0"
                  for="star3half"
                  title="Meh - 3.5 stars"
                ></label>
                <input type="radio" id="star3" v-model="rating" :value="3" />
                <label
                  class="full m-0 p-0"
                  for="star3"
                  title="Meh - 3 stars"
                ></label>
                <input
                  type="radio"
                  id="star2half"
                  v-model="rating"
                  :value="2.5"
                />
                <label
                  class="half m-0 p-0"
                  for="star2half"
                  title="Kinda bad - 2.5 stars"
                ></label>
                <input type="radio" id="star2" v-model="rating" :value="2" />
                <label
                  class="full m-0 p-0"
                  for="star2"
                  title="Kinda bad - 2 stars"
                ></label>
                <input
                  type="radio"
                  id="star1half"
                  v-model="rating"
                  :value="1.5"
                />
                <label
                  class="half m-0 p-0"
                  for="star1half"
                  title="Meh - 1.5 stars"
                ></label>
                <input type="radio" id="star1" v-model="rating" :value="1" />
                <label
                  class="full m-0 p-0"
                  for="star1"
                  title="Sucks big time - 1 star"
                ></label>
                <input
                  type="radio"
                  id="starhalf"
                  v-model="rating"
                  :value="0.5"
                />
                <label
                  class="half m-0 p-0"
                  for="starhalf"
                  title="Sucks big time - 0.5 stars"
                ></label>
                <input
                  type="radio"
                  class="reset-option"
                  v-model="rating"
                  :value="reset"
                />
                <span class="h-auto display-6 d-flex align-items-center mx-2">{{
                  rating
                }}</span>
              </fieldset>

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
        <a
          class="d-flex align-items-center text-dark text-decoration-none"
        >
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
                class="comment-text w-200 border-8 bg-white shadow-2xl  "
                v-for="review in reviews"
                :key="review.userId"
              >
              <div v-if="edit == true">
                  <div class="d-flex pt-4 pb-3 px-5">
                    <img
                      src="https://i.imgur.com/Ur43esv.jpg"
                      alt="user"
                      width="50"
                      class="rounded-circle"
                    />

                    <h6 class="font-medium font-bold mt-4 ml-4">
                      {{ review.user.username }}
                    </h6>
                    <!--Star-->
                    <fieldset
                class="rating d-flex flex-row-reverse justify-content-center"
              >
                <input type="radio" id="s5" v-model="uRating" :value="5" />
                <label
                  class="full m-0 p-0"
                  for="s5"
                  title="Awesome - 5 stars"
                ></label>
                <input
                  type="radio"
                  id="s4half"
                  v-model="uRating"
                  :value="4.5"
                />
                <label
                  class="half m-0 p-0"
                  for="s4half"
                  title="Pretty good - 4.5 stars"
                ></label>
                <input type="radio" id="s4" v-model="uRating" :value="4" />
                <label
                  class="full m-0 p-0"
                  for="s4"
                  title="Pretty good - 4 stars"
                ></label>
                <input
                  type="radio"
                  id="s3half"
                  v-model="uRating"
                  :value="3.5"
                />
                <label
                  class="half m-0 p-0"
                  for="s3half"
                  title="Meh - 3.5 stars"
                ></label>
                <input type="radio" id="s3" v-model="uRating" :value="3" />
                <label
                  class="full m-0 p-0"
                  for="s3"
                  title="Meh - 3 stars"
                ></label>
                <input
                  type="radio"
                  id="s2half"
                  v-model="uRating"
                  :value="2.5"
                />
                <label
                  class="half m-0 p-0"
                  for="s2half"
                  title="Kinda bad - 2.5 stars"
                ></label>
                <input type="radio" id="s2" v-model="uRating" :value="2" />
                <label
                  class="full m-0 p-0"
                  for="s2"
                  title="Kinda bad - 2 stars"
                ></label>
                <input
                  type="radio"
                  id="s1half"
                  v-model="uRating"
                  :value="1.5"
                />
                <label
                  class="half m-0 p-0"
                  for="s1half"
                  title="Meh - 1.5 stars"
                ></label>
                <input type="radio" id="s1" v-model="uRating" :value="1" />
                <label
                  class="full m-0 p-0"
                  for="s1"
                  title="Sucks big time - 1 star"
                ></label>
                <input
                  type="radio"
                  id="shalf"
                  v-model="uRating"
                  :value="0.5"
                />
                <label
                  class="half m-0 p-0"
                  for="shalf"
                  title="Sucks big time - 0.5 stars"
                ></label>
                <input
                  type="radio"
                  class="reset-option"
                  v-model="uRating"
                  :value="reset"
                />
                <span class="h-auto display-6 d-flex align-items-center mx-2">{{
                  uRating
                }}</span>
              </fieldset>
                  <!--Star-->
                  </div>
                  <div class="m-auto w-5/6">
                    <textarea class="w-full d-block text-left text-lg border-2 p-2" rows="2" v-model="review.review"></textarea>
                    <div class="comment-footer text-right">
                      <button class="w-20 h-8 rounded-lg bg-secondary text-white border-3 my-2" @click="editReview(review.user.userId,review.review)">Confirm</button> 
                    </div>
                  </div>
                </div>
              <div v-else>
                <div class="d-flex pt-4 pb-3 px-5">
                  <img
                    src="https://i.imgur.com/Ur43esv.jpg"
                    alt="user"
                    width="50"
                    class="rounded-circle"
                  />

                  <h6 class="font-medium font-bold mt-4 ml-4">
                    {{ review.user.username }}
                  </h6>
                  <div>
                    
                   </div>
                </div>
                <span class="m-auto w-5/6 d-block text-left ml-28 mb-10 text-lg">{{
                  review.review
                }}</span>
                <div class="comment-footer text-right mr-5">
                <button type="button" class="mr-2" @click="editSwitch(review.rating)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.473 7.196c-.425-.439-.401-1.127.035-1.552l4.461-4.326c.218-.211.498-.318.775-.318.282 0 .563.11.776.331l-6.047 5.865zm-7.334 11.021c-.092.089-.139.208-.139.327 0 .25.204.456.456.456.114 0 .229-.042.317-.128l.749-.729-.633-.654-.75.728zm6.33-8.425l-2.564 2.485c-1.378 1.336-2.081 2.63-2.73 4.437l1.132 1.169c1.825-.593 3.14-1.255 4.518-2.591l2.563-2.486-2.919-3.014zm7.477-7.659l-6.604 6.405 3.326 3.434 6.604-6.403c.485-.469.728-1.093.728-1.718 0-2.088-2.53-3.196-4.054-1.718zm-1.946 11.333v7.534h-16v-12h8.013l2.058-2h-12.071v16h20v-11.473l-2 1.939z"/></svg></button>
                <button  @click="deleteReview(review.user.userId)" type="button"  class=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button> 
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
      <div class="pt-4 mt-4 text-muted border-top"></div>
      <header class="pb-3 mb-4 border-bottom">
        <a
          class="d-flex align-items-center text-dark text-decoration-none"
        >
          <i class="bx bxs-hotel display-6 mr-2"></i>
          <span class="fs-4">Hotel</span>
        </a>
      </header>
      <div class="container">
        <div class="row">
          <div class="d-flex flex-wrap justify-content-start">
            <!-- Bootstrap 5 card box -->
            <div
              class="w-96 me-auto"
              v-for="hotel in hotels"
              :key="hotel.hotelId"
            >
              <div class="card-box">
                <div class="card-thumbnail">
                  <img
                    src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/71829844.jpg?k=3d674fca31bc34c7af3dbb2b259aada28c54c2df9519ccf1cc84783ca7302e91&o="
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <h1 class="text-black font-bold text-xl">
                  {{ hotel.hotel.hotelName }}
                </h1>

                <a href="#" class="btn btn-sm btn-danger float-right"
                  >Read more ></a
                >
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
<style scoped>
@import url(https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.rating > [id^="star"] {
  display: none;
}
.rating > [id^="s"] {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 2.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}
.rating > .half:before {
  content: "\f089";
  position: absolute;
}
.rating > label {
  color: #ddd;
  float: right;
}
.rating > [id^="star"]:checked ~ label,
.rating > [id^="s"]:checked ~ label,
.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
}
.rating > [id^="star"]:checked + label:hover,
.rating > [id^="star"]:checked ~ label:hover,
.rating > [id^="s"]:checked + label:hover,
.rating > [id^="s"]:checked ~ label:hover,
.rating > label:hover ~ [id^="star"]:checked ~ label,
.rating > [id^="star"]:checked ~ label:hover ~ label {
  color: #ffed85;
}
.rating > [id^="s"]:checked ~ label:hover ~ label {
  color: #ffed85;
}
.reset-option {
  display: none;
}
.reset-button {
  margin: 6px 12px;
  background-color: rgb(255, 255, 255);
  text-transform: uppercase;
}
</style>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Tag",
  props: ["pid"],
  data() {
    return {
      rating: 0,
      uRating: 0,
      review: "",
      ErrorReview: false,
      ErrorRating: false,
      edit: false,
    };
  },
  components: {},
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
      const store = useStore();
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
      store.dispatch("addReview", { data: formdata, pid: this.pid });
      location.reload();
    },
    deleteReview(uid) {
      const store = useStore();
      store.dispatch("removeReview", { uid: uid, pid: this.pid });
      location.reload();
    },
    editReview(uid,rev) {
      const store = useStore();
      let newReview = {
        user: { userId: uid },
        review: rev,
        rating: this.uRating,
      };
      const jsonProduct = JSON.stringify(newReview);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      const formdata = new FormData();
      formdata.append("newReview", blob);
      store.dispatch("editReview", { data: formdata, pid: this.pid });
      location.reload();
    },
    editSwitch(rating){
      this.uRating =rating;
      this.edit = !this.edit;
     
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