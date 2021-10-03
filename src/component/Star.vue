<template>
  <fieldset class="rating d-flex flex-row-reverse justify-content-center">
    <input type="radio" id="star5" v-model="rate" :value="5" @change="selectStar"/>
    <label class="full m-0 p-0" for="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4half" v-model="rate" :value="4.5" @change="selectStar"/>
    <label
      class="half m-0 p-0"
      for="star4half"
      title="Pretty good - 4.5 stars"
    ></label>
    <input type="radio" id="star4" v-model="rate" :value="4" @change="selectStar"/>
    <label
      class="full m-0 p-0"
      for="star4"
      title="Pretty good - 4 stars"
    ></label>
    <input type="radio" id="star3half" v-model="rate" :value="3.5" @change="selectStar"/>
    <label class="half m-0 p-0" for="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" v-model="rate" :value="3" @change="selectStar"/>
    <label class="full m-0 p-0" for="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" v-model="rate" :value="2.5" @change="selectStar"/>
    <label
      class="half m-0 p-0"
      for="star2half"
      title="Kinda bad - 2.5 stars"
    ></label>
    <input type="radio" id="star2" v-model="rate" :value="2" @change="selectStar"/>
    <label class="full m-0 p-0" for="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" v-model="rate" :value="1.5" @change="selectStar"/>
    <label class="half m-0 p-0" for="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" v-model="rate" :value="1" @change="selectStar"/>
    <label
      class="full m-0 p-0"
      for="star1"
      title="Sucks big time - 1 star"
    ></label>
    <input type="radio" id="starhalf" v-model="rate" :value="0.5" @change="selectStar" />
    <label
      class="half m-0 p-0"
      for="starhalf"
      title="Sucks big time - 0.5 stars"
    ></label>
    <input type="radio" class="reset-option" v-model="rate" :value="reset" />
    <span class="h-auto display-6 d-flex align-items-center mx-2">{{
      rating
    }}</span>
  </fieldset>
</template>
<script>
export default {
    name : "Star",
    props : ['rating'],
    data(){
        return{
            rate: this.rating
            }
    },
    methods : {
        selectStar(){
            this.$emit('selected', this.rate)
        }
    }
}
</script>
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