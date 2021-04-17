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

                <p
                  v-if="invalidNameInput"
                  class="text-red-500"
                > Please, Enter your Name First</p>
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
                    <card>
               <h2 class="heading">Japan</h2>
              <img class="max-w-screen-sm object-fill p-5 mr-12 " src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                <div>
                  <input type="checkbox" name="answer1" id="answer-yes1" value="BangKok-Tokyo 13499 Baht" v-model="answer3" />
                  <label class="label" for="answer-yes1">Promotion 3DAY2NIGHT!!</label>
                </div>

                <div>
                  <input type="checkbox" name="answer1" id="answer-yes1" value="BangKok-Tokyo 13499 Baht" v-model="answer4" />
                  <label class="label" for="answer-yes1">Promotion 3DAY2NIGHT!!</label>
                </div>



          </card>
                    <card>
               <h2 class="heading">Japan</h2>
              <img class="max-w-screen-sm object-fill p-5 mr-12" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                <div>
                  <input type="checkbox" name="answer1" id="answer-yes1" value="BangKok-Tokyo 13499 Baht" v-model="answer5" />
                  <label class="label" for="answer-yes1">Promotion 3DAY2NIGHT!!</label>
                </div>

                <div>
                  <input type="checkbox" name="answer1" id="answer-yes1" value="BangKok-Tokyo 13499 Baht" v-model="answer6" />
                  <label class="label" for="answer-yes1">Promotion 3DAY2NIGHT!!</label>
                </div>



          </card>
              </div>
<button class="btn">Submit</button>
            </form>
            
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
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      answer5: null,
      answer6: null,
      TravelList: [],
    };
  },
   methods: {
     submitfrom() { 
       console.log(this.Travel.name)
       this.invalidNameInput = this.enteredName === "" ? true : false;
       if ((!this.invalidNameInput)) {
      {
        if (this.isEdit) {
          this.editTravel({
            id: this.editId,
            name: this.enteredName,
            answer1: this.answer1,
            answer2: this.answer2,
            answer3: this.answer3,
          });
        } else {
          this.addNewTravel({
            name: this.enteredName,
            answer1: this.answer1,
            answer2: this.answer2,
            answer3: this.answer3,
          });
        }
      }
    }
      this.enteredName = "";
      this.answer1 = null;
      this.answer2 = null;
      this.answer3 = null;
    },

    showData(HistoryTravel) {
      this.isEdit = true
      this.editId = HistoryTravel.id
      this.enteredName = HistoryTravel.name
      this.answer1 = HistoryTravel.answer1,
        this.answer2 = HistoryTravel.answer2,
        this.answer3 = HistoryTravel.answer3
    },
    async editTravel(editingTravel) {
      try {
        const res = await fetch(`${this.url}/${editingTravel.id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: editingTravel.name,
            answer1: editingTravel.answer1,
            answer2: editingTravel.answer2,
            answer3: editingTravel.answer3,
          })
        })
        const data = await res.json()
        this.TravelList = this.TravelList.map((Travel) =>
          Travel.id === editingTravel.id
            ? {
              ...Travel, name: data.name,  answer1: data.answer1,
              answer2: data.answer2,
              answer3: data.answer3,            
}
            : Travel
        )
        this.isEdit = false
        this.editId = ''
        this.enteredName = ''
        this.answer1 = null;
        this.answer2 = null;
        this.answer3 = null;
      } catch (error) {
        console.log(`Could not edit! ${error}`)
      }
    },
    async getTravelResult() {
      try {
        const res = await fetch(this.url)
        const data = await res.json()
        return data
      } catch (error) {
        console.log(`Could not get! ${error}`)
      }
    },
    async deleteTravel(deleteId) {
      try {
        await fetch(`${this.url}/${deleteId}`, {
          method: 'DELETE'
        })
        //filter - higher order function
        this.TravelList = this.TravelList.filter(
          (Travel) => Travel.id !== deleteId
        )
      } catch (error) {
        console.log(`Could not delete! ${error}`)
      }
    },
    async addNewTravel(newTravel) {
      try {
        const res = await fetch(this.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: newTravel.name,
            answer1: newTravel.answer1,
            answer2: newTravel.answer2,
            answer3: newTravel.answer3,
          })
        })
        const data = await res.json()
        this.TravelList = [...this.TravelList, data]
      } catch (error) {
        console.log(`Could not save! ${error}`)
      }
    }
  },
  async created() {
    this.TravelList = await this.getTravelResult()
  }
}
   


     
   

</script>
