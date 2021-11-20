<template>
    <div class="container" v-if="!show404">
    <div class="row d-flex justify-content-center">
        <div class="col-md">
            <h2 class="text-start mx-4 mb-4 text-gray-600">My Reviews</h2>
            <div class="card mb-4 " v-for="review in myReviews" :key="review.userId">
                <div class="d-flex">
                <div class="col-2"><div class="mr-3 h-full w-full" v-bind:style="{ backgroundImage: 'url(\'' + getPlaceImage(review.place.image).replace('\'','\\\'') + '\')',backgroundPosition: 'center center',backgroundSize: 'cover' }"></div></div>
                    <div class="row d-flex justify-content-center col-10 mt-3 mx-3 w-full">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="user d-flex flex-row align-items-center">
                                
                                <div class="text-start">
                                    <router-link
                                        class="text-decoration-none link-info" 
                                        :to="{
                                            name: 'Placeinfo',
                                            params: { pid: review.place.placeId },
                                        }"
                                        ><h3 class="font-weight-bold m-0 p-0">{{review.place.placeName}}</h3></router-link >
                                    
                                    <small>Time</small>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-3 align-items-center">
                            <div class="text-wrap text-start w-full pr-8">
                                <div class="text-lg">{{review.review}}</div>
                            </div>
                        </div>
                        <div class="text-end">
                            <button @click="deleteReview(review.place.placeId)" class="">
                            <i class='bx bxs-trash text-3xl pr-4' ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="myReviews.length == 0" class="h-36 d-flex align-items-center justify-content-center border-2 rounded-lg mb-4">
                <h4 class="text-gray-400">You haven't reviewed any place yet.</h4>
            </div>
        </div>
    </div>
</div>
    

    <div class="flex items-center justify-center min-h-screen bg-indigo-500  bg-fixed bg-cover bg-bottom error-bg" v-if="show404"
	style="background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E);">
	<div class="container">
		<div class="row">
			<div class="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
				<div class="relative ">
				<h1 class="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
					<span>4</span><span>0</span><span>4</span></h1>
					<span class="absolute  top-0   -ml-12  text-gray-300 font-semibold">Oops!</span>
					</div>
				<h5 class="text-gray-300 font-semibold -mr-10 -mt-3">Page not found</h5>
				<p class="text-gray-100 mt-2 mb-6">we are sorry, but the page you requested was not found</p>
				<a
					class="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
					Got to Home
				</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Myreview",
  components: {},
  data() {
    return {
    };
  },
  methods: {
    getPlaceImage(image) {
      return `${this.$store.state.url}image/place/${image}`;
    },
    deleteReview(pid) {
      if (confirm("Do you really want to remove your review?")) {
        this.$store.dispatch("removeReview", { uid: this.me.id, pid: pid });
        location.reload();
      }
    },
  },
 computed: {
      show404: function () {
      let show = true;
        if(this.me.roles){
            show = false;
        }
      return show;
    },

    // showdata: function () {
    //   let show = true;
    //       if(this.me.roles){
    //     if(this.me.roles[0] == 'member'){
    //     show = false;
    //   }
      
    //   }
    //   if(this.me.id == 0){
    //     show = false;
    //   }
    //   return show;
    // },
  },
  setup() {
    const store = useStore();
    store.dispatch("getMyReviews", store.state.user.id); 

    let myReviews = computed(function () {
      return store.state.myReviews;
    });
    let me = computed(function () {
      return store.state.user;
    });
    return {
      myReviews,
      me
    };
  },
};
</script>
