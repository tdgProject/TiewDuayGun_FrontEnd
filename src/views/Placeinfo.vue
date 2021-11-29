<template>
  <div class="bg-gray-400">
    <div class="container py-4" v-if="place">
      <div class="pt-4 mt-4 text-muted border-top"></div>
      <header class="pb-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center text-dark text-decoration-none"
        >
          <i class="bx bxs-been-here display-6 mr-2"></i>
          <span class="fs-4" id="texttest">{{ place.placeName }}</span>
        </a>
      </header>
      <div
        class="p-5 pb-1 mb-4 rounded-3"
        v-bind:style="{
          backgroundImage: 'url(\'' + placeImage.replace('\'', '\\\'') + '\')',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }"
      >
        <div class="container-fluid py-5">
          <h1 class="display-1 fw-bold text-end" id="texttest">
            {{ place.placeName }}
          </h1>
          <div
            class="col-md-8 bg-black bg-opacity-50 p-4 rounded-lg text-white"
          >
            <p class="fs-4" id="texttest">{{ place.placeDescription }}</p>
          </div>
          <div class="d-flex flex-row flex-wrap mt-2">
            <button
              id="texttest"
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
            <h2 class="mb-3">
              <i class="bx bxs-star text-3xl" id="texttest">Rating </i>
              <div id="texttest">{{ place.placeRating }}</div>
            </h2>
            <div class="vid-container">
              <iframe
                class="responsive-iframe"
                :src="
                  place.video
                    .replace(/youtu\.be\//, 'www.youtube.com/embed/')
                    .replace(/watch\?v=/, 'embed/')
                    .replace(/\?t=.*/i, '')
                    .replace(/&list=.*/i, '') + '?autoplay=1'
                "
                title="YouTube video player"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div v-if="isLoggedIn()" class="h-100 p-5 bg-light border rounded-3">
            <div class="d-flex row h-full align-items-center">
              <div v-if="isReviewed()">
                <i class="bx bx-list-check display-1"></i>
                <h1 id="texttest">You have already Reviewed!</h1>
                <a :href="getId()" class="text-decoration-none link-info">
                  <h4 id="texttest">See Your Review</h4>
                </a>
              </div>
              <div v-else>
                <form @submit.prevent="addReview()">
                  <h3 id="texttest">Your Review and Rating</h3>
                  <div>
                    <Star :rating="rating" @selected="updateStar" />
                  </div>
                  <div v-if="ratingValidate">
                    <p class="text-red-400" id="texttest">
                      Please select rating before submit!
                    </p>
                  </div>
                  <div class="form-group">
                    <textarea
                      id="texttest"
                      name="review"
                      class="form-control"
                      placeholder="Your Review*"
                      v-model="review"
                      style="width: 100%; height: 150px"
                    ></textarea>
                  </div>
                  <div class="form-group mt-3 d-flex justify-content-end">
                    <input
                      id="texttest"
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
          <div v-else class="h-100 p-5 bg-dark text-white rounded-3">
            <div class="d-flex row h-full align-items-center">
              <span>
                <h1 id="texttest">You have not logged in yet!</h1>
                <h4 id="texttest">
                  Please<a
                    :href="$router.resolve({ name: 'Signin' }).href"
                    id="texttest"
                    class="text-decoration-none link-info"
                  >
                    login</a
                  >
                  before reviewing.
                </h4>
              </span>
            </div>
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
          <span class="fs-4 p-2" id="texttest">Reviews</span>
        </a>
      </header>
      
      <!-- list review -->
      <div class="card bg">
              <div v-if="reviews.length == 0" class="h-36 d-flex align-items-center justify-content-center border-2 rounded-lg mb-4">
                <h4 class="text-gray-400" id="texttest">You haven't reviewed any place yet.</h4>
            </div>
        <div class="comment-widgets text-left">
          <!-- Comment Row -->
          <div class="flex-row comment-row m-t-0">
            <div v-if="p1==true">
              <div
                class="comment-text w-200 border-8 bg-white shadow-2xl"
                v-for="review in reviews.slice(0,3)"
                :key="review.user.userId"
                :id="setId(review.user.userId)"
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

                      <h6 class="font-medium font-bold mt-4 ml-4" id="texttest">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div class="w-1/6">
                      <label
                        for="StarRange"
                        class="container text-center font-bold"
                        >Your Rating : {{ uRating }}</label
                      >
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="uRating"
                        id="StarRange"
                      />
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
                        class="w-14 h-14 rounded-circle border-1"
                      />
                      <h6 class="font-medium font-bold mt-4 ml-4">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div>
                      <ul class="d-flex justify-content-start">
                        <li v-for="x in calStar(review.rating)[0]" :key="x">
                          <i class="bx bxs-star text-3xl"></i>
                        </li>
                        <li v-for="y in calStar(review.rating)[1]" :key="y">
                          <i class="bx bxs-star-half text-3xl"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span class="m-auto w-5/6 d-block text-left text-lg">{{
                    review.review
                  }}</span>
                  <div
                    v-if="review.user.userId == me.id"
                    class="comment-footer text-right mr-6"
                  >
                    <button
                      type="button"
                      class="mr-2"
                      @click="editSwitch(review.rating, review.user.userId)"
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
                  <div v-else class="py-3 m-0"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Card -->
        </div>
      </div>
      <div class="card bg">
        <div class="comment-widgets text-left">
          <!-- Comment Row -->
          <div class="flex-row comment-row m-t-0">
            <div v-if="p2==true">
              <div
                class="comment-text w-200 border-8 bg-white shadow-2xl"
                v-for="review in reviews.slice(3,6)"
                :key="review.user.userId"
                :id="setId(review.user.userId)"
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

                      <h6 class="font-medium font-bold mt-4 ml-4" id="texttest">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div class="w-1/6">
                      <label
                        for="StarRange"
                        class="container text-center font-bold"
                        >Your Rating : {{ uRating }}</label
                      >
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="uRating"
                        id="StarRange"
                      />
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
                        class="w-14 h-14 rounded-circle border-1"
                      />
                      <h6 class="font-medium font-bold mt-4 ml-4">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div>
                      <ul class="d-flex justify-content-start">
                        <li v-for="x in calStar(review.rating)[0]" :key="x">
                          <i class="bx bxs-star text-3xl"></i>
                        </li>
                        <li v-for="y in calStar(review.rating)[1]" :key="y">
                          <i class="bx bxs-star-half text-3xl"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span class="m-auto w-5/6 d-block text-left text-lg">{{
                    review.review
                  }}</span>
                  <div
                    v-if="review.user.userId == me.id"
                    class="comment-footer text-right mr-6"
                  >
                    <button
                      type="button"
                      class="mr-2"
                      @click="editSwitch(review.rating, review.user.userId)"
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
                  <div v-else class="py-3 m-0"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Card -->
        </div>
      </div>
      <div class="card bg">
        <div class="comment-widgets text-left">
          <!-- Comment Row -->
          <div class="flex-row comment-row m-t-0">
            <div v-if="p3==true">
              <div
                class="comment-text w-200 border-8 bg-white shadow-2xl"
                v-for="review in reviews.slice(6,9)"
                :key="review.user.userId"
                :id="setId(review.user.userId)"
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

                      <h6 class="font-medium font-bold mt-4 ml-4" id="texttest">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div class="w-1/6">
                      <label
                        for="StarRange"
                        class="container text-center font-bold"
                        >Your Rating : {{ uRating }}</label
                      >
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="uRating"
                        id="StarRange"
                      />
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
                        class="w-14 h-14 rounded-circle border-1"
                      />
                      <h6 class="font-medium font-bold mt-4 ml-4">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div>
                      <ul class="d-flex justify-content-start">
                        <li v-for="x in calStar(review.rating)[0]" :key="x">
                          <i class="bx bxs-star text-3xl"></i>
                        </li>
                        <li v-for="y in calStar(review.rating)[1]" :key="y">
                          <i class="bx bxs-star-half text-3xl"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span class="m-auto w-5/6 d-block text-left text-lg">{{
                    review.review
                  }}</span>
                  <div
                    v-if="review.user.userId == me.id"
                    class="comment-footer text-right mr-6"
                  >
                    <button
                      type="button"
                      class="mr-2"
                      @click="editSwitch(review.rating, review.user.userId)"
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
                  <div v-else class="py-3 m-0"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Card -->
        </div>
      </div>
      <div class="card bg">
        <div class="comment-widgets text-left">
          <!-- Comment Row -->
          <div class="flex-row comment-row m-t-0">
            <div v-if="p4==true">
              <div
                class="comment-text w-200 border-8 bg-white shadow-2xl"
                v-for="review in reviews"
                :key="review.user.userId"
                :id="setId(review.user.userId)"
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

                      <h6 class="font-medium font-bold mt-4 ml-4" id="texttest">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div class="w-1/6">
                      <label
                        for="StarRange"
                        class="container text-center font-bold"
                        >Your Rating : {{ uRating }}</label
                      >
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="uRating"
                        id="StarRange"
                      />
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
                        class="w-14 h-14 rounded-circle border-1"
                      />
                      <h6 class="font-medium font-bold mt-4 ml-4">
                        {{ review.user.username }}
                      </h6>
                    </div>
                    <div>
                      <ul class="d-flex justify-content-start">
                        <li v-for="x in calStar(review.rating)[0]" :key="x">
                          <i class="bx bxs-star text-3xl"></i>
                        </li>
                        <li v-for="y in calStar(review.rating)[1]" :key="y">
                          <i class="bx bxs-star-half text-3xl"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span class="m-auto w-5/6 d-block text-left text-lg">{{
                    review.review
                  }}</span>
                  <div
                    v-if="review.user.userId == me.id"
                    class="comment-footer text-right mr-6"
                  >
                    <button
                      type="button"
                      class="mr-2"
                      @click="editSwitch(review.rating, review.user.userId)"
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
                  <div v-else class="py-3 m-0"></div>
                </div>
              </div>
            </div>
          </div>
    
          <!-- Card -->
        </div>
      </div>
      <div class="text-xl" id="texttest">Page of
             <button 
                      type="button"
                      class="mr-2 mt-8 text-xl underline hover:opacity-30"
                      @click="page1(p1)"
                    >
                      1
                    </button>
                    <button 
                    v-if="reviews.length > 3"
                      type="button"
                      class="mr-2 mt-8 text-xl underline hover:opacity-30"
                      @click="page2(p2)"
                    >
                      2
                    </button>
                    <button 
                    v-if="reviews.length > 6"
                      type="button"
                      class="mr-2 mt-8 text-xl underline hover:opacity-30"
                      @click="page3(p2)"
                    >
                      3
                    </button>
                    <button 
                    id="texttest"
                      type="button"
                      class="mr-2 mt-8 text-xl hover:opacity-30"
                      @click="page4(p2)"
                    >
                      All
                    </button>
      </div>
      <!-- list review -->

      <!-- hotel -->
      <div class="pt-4 mt-4 text-muted border-top"></div>
      <header class="pb-3 mb-4 border-bottom">
        <a
          class="
            d-flex
            align-items-center
            text-dark text-decoration-none
            justify-content-between
          "
        >
          <div class="d-flex align-items-center">
            <i class="bx bxs-hotel display-6 mr-2"></i>
            <span class="fs-4" id="texttest">Nearby Hotels</span>
          </div>
          <div>
            <button
              class="d-flex align-items-center"
              v-if="showAddHotel"
              @click="addMyHotel"
            >
              <i class="bx bxs-add-to-queue text-4xl"></i
              ><span class="text-lg" id="texttest">Add Your Hotel</span>
            </button>
            <button
              class="d-flex align-items-center"
              v-else-if="myHotel !== null"
              @click="deleteMyHotel(myHotel.hotelId)"
            >
              <i class='bx bx-checkbox-minus text-4xl'></i>
              <span class="text-lg" id="texttest">Remove Your Hotel</span>
            </button>
          </div>
        </a>
      </header>
      <div v-if="hotels.length <= 3">
        <div class="container mt-10 d-flex flex-wrap justify-content-start">
        <div
          class="col-lg-4 d-flex flex-wrap p-1"
          v-for="hotel in hotels"
          :key="hotel.hotel.hotelId"
        >
          <div class="card">
            <img
              :src="getHotelImage(hotel.hotel.image)"
              alt=""
              class="card-img-top h-1/2"
            />
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
      <div v-else>
        <div v-if="slice()" class="container text-center my-3">
          <div class="row mx-auto my-auto justify-content-center ">
            <div
              id="recipeCarousel"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner " role="listbox">
                <div class="carousel-item active">
                  <div class="col-lg-4 p-1">
                    <div class="card ">
                      <div class="overflow-hidden w-full h-56"><img
                        :src="getHotelImage(hotels[0].hotel.image)"
                        alt=""
                        class="card-img-top w-full"
                      /></div>
                      <div class="card-body h-72">
                        <p class="" id="texttest">
                          Name: {{ hotels[0].hotel.hotelName }}
                        </p>
                        <p class="" id="texttest">
                          Address: {{ hotels[0].hotel.address }}
                        </p>
                        <p class="" id="texttest">
                          Email: {{ hotels[0].hotel.email }}
                        </p>
                        <p class="" id="texttest">
                          Tel: {{ hotels[0].hotel.telNumber }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="carousel-item"
                  v-for="hotel in newHotels"
                  :key="hotel.hotel.hotelId"
                >
                  <div class="col-lg-4 p-1">
                    <div class="card">
                      <div class="overflow-hidden w-full h-56"><img
                        :src="getHotelImage(hotel.hotel.image)"
                        alt=""
                        class="card-img-top w-full"
                      /></div>
                      
                      <div class="card-body h-72">
                        <p class="" id="texttest">
                          Name: {{ hotel.hotel.hotelName }}
                        </p>
                        <p class="" id="texttest">
                          Address: {{ hotel.hotel.address }}
                        </p>
                        <p class="" id="texttest">
                          Email: {{ hotel.hotel.email }}
                        </p>
                        <p class="" id="texttest">
                          Tel: {{ hotel.hotel.telNumber }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="carousel-control-prev bg-transparent w-aut"
                href="#recipeCarousel"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </a>
              <a
                class="carousel-control-next bg-transparent w-aut"
                href="#recipeCarousel"
                role="button"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="pt-4 mt-4 text-muted border-top"></footer>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Star from "../component/Star.vue";
export default {
  name: "Tag",
  props: ["pid"],
  components: {
    Star,
  },
  updated() {
    let items = document.querySelectorAll(".carousel .carousel-item");
    items.forEach((el) => {
      const minPerSlide = 3;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
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
      ratingValidate: false,
      newHotels: [],
      p1: true,
      p2: false,
      p3: false,
      p4: false,
    };
  },
  methods: {
    page1() {
      
      this.p1 = true
      this.p2 = false
      this.p3 = false
      this.p4 = false
    },
        page2() {
      this.p1 = false
      this.p2 = true
      this.p3 = false
      this.p4 = false
    },
        page3() {
      this.p1 = false
      this.p2 = false
      this.p3 = true
      this.p4 = false
    },
        page4() {
      
      this.p1 = false
      this.p2 = false
      this.p3 = false
      this.p4 = true
    },
    setActive(index) {
      let active = index;
      if (index === this.pictures.length) active = 0;
      else if (index === -1) active = this.pictures.length - 1;
      this.active = active;
    },
    slice() {
      if (this.hotels) {
        let arr = this.hotels;
        this.newHotels = arr.slice(1);
      }
      return true;
    },
    addMyHotel() {
      let nearBy = {
        hotel: { hotelId: this.myHotel.hotelId },
      };
      const jsonProduct = JSON.stringify(nearBy);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      const formdata = new FormData();
      formdata.append("newNearBy", blob);
      this.$store.dispatch("addNearBy", { data: formdata, pid: this.pid });
      window.location.reload();
    },
    deleteMyHotel(hid) {
      this.$store.dispatch("deleteNearby", { pid: this.pid, hid: hid });
      window.location.reload();
    },
    addReview() {
      if (this.rating == 0) {
        this.ratingValidate = true;
      } else {
        if (this.me) {
          let newReview = {
            user: { userId: this.me.id },
            review: this.review,
            rating: this.rating,
          };
          const jsonProduct = JSON.stringify(newReview);
          const blob = new Blob([jsonProduct], {
            type: "application/json",
          });
          const formdata = new FormData();
          formdata.append("newReview", blob, {});
          this.$store.dispatch("addReview", { data: formdata, pid: this.pid });
          this.ratingValidate = false;
          window.location.reload();
        }
      }
    },
    setId(id) {
      return "review" + id;
    },
    getId() {
      return "#review" + this.me.id;
    },
    deleteReview(uid) {
      if (confirm("Do you really want to remove your review?")) {
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
      console.log(jsonProduct);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      const formdata = new FormData();
      formdata.append("newReview", blob);
      this.$store.dispatch("editReview", { data: formdata, pid: this.pid });
      window.location.reload();
    },
    editSwitch(rating, uid) {
      this.uRating = rating;
      this.editId = uid;
      this.edit = !this.edit;
    },
    calStar(rating) {
      let floor = Math.floor(rating);
      let half = rating - floor;
      return [floor, Math.ceil(half)];
    },
    updateStar(value) {
      this.rating = value;
    },
    getUserImage(image) {
      return `${this.$store.state.url}image/user/${image}`;
    },
    getHotelImage(image) {
      return `${this.$store.state.url}image/hotel/${image}`;
    },
    isReviewed() {
      if (this.me) {
        for (let rv of this.reviews) {
          if (rv.user.userId == this.me.id) {
            return true;
          }
        }
      }
      return false;
    },
    isLoggedIn() {
      if (this.me.id != 0) {
        return true;
      }
      return false;
    },
  },
  computed: {
    showAddHotel: function() {
      let show = true;
      if (this.hotels && this.myHotel) {
        for (const h of this.hotels) {
          if (this.myHotel.hotelId == h.hotel.hotelId) {
            show = false;
          }
        }
      }
      if (this.me.id == 0) {
        show = false;
      }
      if (this.me.roles) {
        if (this.me.roles[0] == "member") {
          show = false;
        }
      }
      return show;
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch("getPlaceById", props.pid),
      store.dispatch("getHotelById", props.pid),
      store.dispatch("listReview", props.pid);
    if (store.state.user.roles && store.state.user.roles[0] !== "member") {
      store.dispatch("getMyHotel", store.state.user.id);
    }
    let place = computed(function() {
      return store.state.place;
    });
    let hotels = computed(function() {
      return store.state.hotels;
    });
    let reviews = computed(function() {
      return store.state.reviews;
    });
    let myHotel = computed(function() {
      return store.state.myHotel != null ? store.state.myHotel : null;
    });
    let me = computed(function() {
      return store.state.user;
    });
    let placeImage = computed(function() {
      return store.state.url + "image/place/" + store.state.place.image;
    });
    return {
      place,
      hotels,
      reviews,
      myHotel,
      me,
      placeImage,
    };
  },
};
</script>

<style scoped>
.vid-container {
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
@media (max-width: 767px) {
  .carousel-inner .carousel-item > div {
    display: none;
  }
  .carousel-inner .carousel-item > div:first-child {
    display: block;
  }
}
.carousel-inner .carousel-item.active,
.carousel-inner .carousel-item-next,
.carousel-inner .carousel-item-prev {
  display: flex;
}
/* medium and up screens */
@media (min-width: 768px) {
  .carousel-inner .carousel-item-end.active,
  .carousel-inner .carousel-item-next {
    transform: translateX(33.34%);
  }
  .carousel-inner .carousel-item-start.active,
  .carousel-inner .carousel-item-prev {
    transform: translateX(-33.34%);
  }
}
.carousel-inner .carousel-item-end,
.carousel-inner .carousel-item-start {
  transform: translateX(0);
}
.pagination_rounded,
.pagination_square {
    display: inline-block;
    margin-left: 400px;
    margin-top: 300px
}

.pagination_rounded ul {
    margin: 0;
    padding: 0;
    list-style: none
}

.pagination_rounded li:first-child {
    margin-left: 0px
}

.pagination_rounded ul li {
    float: left;
    margin-left: 20px
}

.pagination_rounded ul li a:hover {
    background: #4285f4;
    color: #fff;
    border: 1px solid #4285f4
}

a:link {
    text-decoration: none
}

.pagination_rounded .prev {
    margin-left: 0px;
    border-radius: 35px;
    width: 90px;
    height: 34px;
    line-height: 34px
}

.pagination_rounded ul li a {
    float: left;
    color: #4285f4;
    border-radius: 50%;
    line-height: 30px;
    height: 30px;
    width: 30px;
    text-align: center;
    margin-bottom: 40px;
    border: 1px solid #e0e0e0
}

.pagination_rounded .prev i {
    margin-right: 10px
}

.pagination_rounded .next {
    border-radius: 35px;
    width: 90px;
    height: 34px;
    line-height: 34px
}

.visible-xs {
    display: none !important
}
</style>