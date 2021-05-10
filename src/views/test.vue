    <button v-for="tab in tabs" :key="tab" @click="selected = tab">
      {{ tab }}
    </button>
