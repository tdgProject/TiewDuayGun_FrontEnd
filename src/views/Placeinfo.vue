<template>
  <div class="bg-gray-400">
    <div class="container py-4">
      <header class="pb-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center text-dark text-decoration-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="32"
            class="me-2"
            viewBox="0 0 118 94"
            role="img"
          >
            <title>Bootstrap</title>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
              fill="currentColor"
            ></path>
          </svg>
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
            <form>
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
        <!-- list review -->
      <div class="d-flex comment-row m-t-0 justify-content-center mt-100 mb-100"  >
        <div class="col-lg-6" >
          <div class="card">
            <div class="card-body text-center">
              <h4 class="card-title">Reviews</h4>
            </div>
            <div class="comment-widgets text-left">
              <!-- Comment Row -->
              <div class="d-flex flex-row comment-row m-t-0">
                <div class="p-2">
                  <img
                    src="https://i.imgur.com/Ur43esv.jpg"
                    alt="user"
                    width="50"
                    class="rounded-circle"
                  />
                </div>
                 <div>
                <div class=" comment-text w-200" v-for="review in reviews" :key="review.userId">
                  <h6 class="font-medium font-bold mt-4">{{ review.user.username}}</h6>
                  <span class="m-b-15 d-block">{{ review.review}}</span>
                  <div class="comment-footer">
                    <button type="button" class="btn btn-cyan btn-sm">
                      Edit
                    </button>
                    <button type="button" class="btn btn-success btn-sm ">
                      Submit
                    </button>
                    <button type="button" class="btn btn-danger btn-sm ml-3">
                      Delete
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <!-- Card -->
          </div>
        </div>
      </div>
 <!-- list review -->
      <!-- hotel -->
      <header class="pb-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center text-dark text-decoration-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="32"
            class="me-2"
            viewBox="0 0 118 94"
            role="img"
          >
            <title>Bootstrap</title>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
              fill="currentColor"
            ></path>
          </svg>
          <span class="fs-4">Hotel</span>
        </a>
      </header>
      <div class="container">
        <div class="row">
          <div class="d-flex flex-wrap justify-content-start">
            <!-- Bootstrap 5 card box -->
            <div class="w-96 me-auto " v-for="hotel in hotels" :key="hotel.hotelId">
              <div class="card-box">
                <div class="card-thumbnail">
                  <img
                    src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/71829844.jpg?k=3d674fca31bc34c7af3dbb2b259aada28c54c2df9519ccf1cc84783ca7302e91&o="
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <h1 class="text-black font-bold text-xl"> {{ hotel.hotel.hotelName }} </h1>

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
.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
}
.rating > [id^="star"]:checked + label:hover,
.rating > [id^="star"]:checked ~ label:hover,
.rating > label:hover ~ [id^="star"]:checked ~ label,
.rating > [id^="star"]:checked ~ label:hover ~ label {
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
  props: ['pid'],
  data() {
    return {
      rating: 5,
    };
  },
  components: {},
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
      reviews
    };
  },
};
</script>