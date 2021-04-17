<template>
<StyleBg>
     <nav-bar>
     </nav-bar>

<h1
        class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 "
      >
        Travel List
      </h1>

          <div>
            <form @submit.prevent="submitForm" class="">
             <card>
               <label class="label" for="name">Enter your NAME:</label>
                <input
                  class="input"
                  id="name"
                  type="text"
                  v-model.trim="enteredName"
                  placeholder="  .............................   "
                />


             </card>

              <div class="grid grid-cols-3 gap-2">
          <card>
               <h2 class="heading">Japan</h2>
              <img class="max-w-screen-sm object-fill p-5 mr-12" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                <div>
                  <input type="checkbox" name="answer1" id="Japan1" value="BangKok-Tokyo 13499 Baht" v-model="answer1" />
                  <label class="label" for="answer-yes1">Promotion 3DAY2NIGHT!!</label>
                </div>

                <div>
                  <input type="checkbox" name="answer1" id="Japan2" value="BangKok-Tokyo 13499 Baht" v-model="answer2" />
                  <label class="label" for="answer-yes1">Promotion 3DAY2NIGHT!!</label>
                </div>



          </card>
                    
              </div>
  <button class="btn">Submit</button>
            </form>
            <div>
              <ul v-for="Travel in TravelList" :key="Travel.id">
                <li>
                  <p>
                    Your Name is
                    <span>{{Travel.name}}</span>
                    <span>{{Travel.answer1}}</span>
                  </p>
                </li>
                
              </ul>
            
            </div>
            <button @click="showData(survey)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
                      />
                    </svg>
                  </button>
          </div>
           <div>

          </div>


    <div>
    </div>
    

  </StyleBg>
<Footer>
</Footer>
</template>

<script>
import StyleBg from '@/components/StyleBg.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/Card.vue'





export default {
  name: 'About',
  components: {
    StyleBg,
    NavBar,
    Footer,
    Card
    


      },
        data() {
    return {
      url: "http://localhost:5000/TravelList",
      enteredName: "",
      Travel: [],
      answer1: null,
      answer2: null,
     
    };
  },
   methods: {
     submitForm() { 
       console.log(this.Travel.name)
       console.log(this.Travel.answer1)
       if(this.enteredName!=null){
         this.addNewTravel()
       }
       this.enteredName ="";
       this.answer1 = null;
       this.answer2 = null;
        
     },
     
      async fetchTravel() {
      const res = await fetch(this.url);
      const data = await res.json();
     console.log(res)
     console.log(data)
      return data;
},
    addNewTravel(enteredName,answer1,answer2,answer3){
             this.Travel.name = enteredName,
             this.Travel.answer1 = answer1,
             this.Travel.answer2 = answer2,
             this.Travel.answer3 =answer3
    },
    
    showData(Travelold) {
        
        this.enteredName = Travelold.name
        this.answer1 = Travelold.answer1,
        this.answer2 = Travelold.answer2

    },
      async created() {
    this.Travel = await this.fetchTravel();
  },
   }
}
</script>
