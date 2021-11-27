<template>
  <div id="app">
    <div class="columns is-multiline is-mobile">
      <div class="column is-half" v-for="(p, index) in pageArr" :key="index">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="p.image" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">{{ p.description }}</div>
        </div>
      </div>
    </div>
    <v-page
      :total-row="arr.length"
      align="left"
      v-model="current"
      @page-change="pagePhotoChange"
      :page-size-menu="[2, 10]"
    ></v-page>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      pageArr: [],
      current: 0,
      arr: [
        {
          description: "Lady with a red umbrella",
          image: "https://i.imgur.com/pwpWaWu.jpg",
        },
        {
          description: "Flowers and some fruits",
          image: "https://i.imgur.com/KIPtISY.jpg",
        },
        {
          description: "Beautiful scenery",
          image: "https://i.imgur.com/2jMCqQ2.jpg",
        },
        {
          description: "Some kind of bird",
          image: "https://i.imgur.com/QFDRuAh.jpg",
        },
        {
          description: "The attack of dragons",
          image: "https://i.imgur.com/8yIIokW.jpg",
        },

        //2nd page

        {
          description: "Lady with a red umbrella",
          image: "https://i.imgur.com/pwpWaWu.jpg",
        },
        {
          description: "Flowers and some fruits",
          image: "https://i.imgur.com/KIPtISY.jpg",
        },
        {
          description: "Beautiful scenery",
          image: "https://i.imgur.com/2jMCqQ2.jpg",
        },
        {
          description: "Some kind of bird",
          image: "https://i.imgur.com/QFDRuAh.jpg",
        },
        {
          description: "The attack of dragons",
          image: "https://i.imgur.com/8yIIokW.jpg",
        },

        // 3rd page

        {
          description: "Lady with a red umbrella",
          image: "https://i.imgur.com/pwpWaWu.jpg",
        },
        {
          description: "Flowers and some fruits",
          image: "https://i.imgur.com/KIPtISY.jpg",
        },
        {
          description: "Beautiful scenery",
          image: "https://i.imgur.com/2jMCqQ2.jpg",
        },
        {
          description: "Some kind of bird",
          image: "https://i.imgur.com/QFDRuAh.jpg",
        },
        {
          description: "The attack of dragons",
          image: "https://i.imgur.com/8yIIokW.jpg",
        },
      ],
    };
  },
  methods: {
    pagePhotoChange(pInfo) {
      this.pageArr.splice(0, this.pageArr.length);
      let start = 0,
        end = 0;
      start = pInfo.pageSize * (pInfo.pageNumber - 1);
      end = start + pInfo.pageSize;
      if (end > this.arr.length) end = this.arr.length;
      for (let i = start; i < end; i++) {
        this.pageArr.push(this.arr[i]);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
