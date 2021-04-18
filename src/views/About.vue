<template>

     <nav-bar>
     </nav-bar>
<StyleBg>
  
<h1
        class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 "
      >
        Travel List
      </h1>
           <form @submit.prevent="submitForm">
              <card>
                <label class="label" for="name">Enter your  NAME:</label>
                <input
                  class="input"
                  :class="{ 'bg-red-50': invalidNameInput }"
                  id="name"
                  type="text"
                  v-model.trim="enteredName"
                  @blur="validateName"
                  placeholder="    STRICT NAME YOU USE TO INSERT IT "
                />

                <p
                  v-if="invalidNameInput"
                  class="text-red-500"
                >Enter Your name</p>
              </card>

              

      <div class="grid grid-flow-col grid-cols-3 gap-4">   
              <card >
                
                <h2 class="heading">Country: Japan</h2>
                <img class="w-4/5 m-auto " src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                
                <div>
                  <input type="radio" name="answer1" id="answer-japan1" value="BangKok-Tokyo 13499 Baht" v-model="answer1" />
                  <label class="label" for="answer-japan1">BangKok-Tokyo 13499 Baht</label>
                </div>

                <div>
                  <input type="radio" name="answer2" id="answer-japan2" value="BangKok-Sasuno 24599 Baht" v-model="answer2" />
                  <label class="label" for="answer-japan2">BangKok-Sasuno 24599 Baht</label>
                </div>


              </card>

              <card>
                <h2 class="heading">Country: Korea</h2>
                <img class="w-4/5 m-auto " src="https://japanbeautiful.files.wordpress.com/2019/02/beautiful-view-japan.png?w=1000" alt="Sunset in the mountains">
                <div>
                  <input type="radio" name="answer3" id="answer-Korea1" value="BangKok-Seoul 15000Baht" v-model="answer3" />
                  <label class="label" for="answer-Korea1">BangKok-Seoul 15000Baht</label>
                </div>

                <div>
                  <input type="radio" name="answer4" id="answer-Korea2" value="BangKok-Pusan 19000Baht" v-model="answer4" />
                  <label class="label" for="answer-Korea2">BangKok-Pusan 19000Baht</label>
                </div>


              </card>

              <card>
                <h2 class="heading">Country: Taiwan</h2>
               <img class="w-4/5 m-auto " src="https://previews.123rf.com/images/nicholashan/nicholashan1709/nicholashan170900111/85342450-the-beautiful-view-of-taipei-city-druning-nice-time-taiwan.jpg" alt="Sunset in the mountains">
                <div>
                  <input type="radio" name="answer5" id="answer-Taiwan1" value="BangKok-SilihoLa 12000Baht" v-model="answer5" />
                  <label class="label" for="answer-Taiwan1">BangKok-SilihoLa 12000Baht</label>
                </div>

                <div>
                  <input type="radio" name="answer6" id="answer-Taiwan2" value="BangKok-SilMaya 34000Baht" v-model="answer6" />
                  <label class="label" for="answer-Taiwan2">BangKok-SilMaya 34000Baht</label>
                </div>


              </card>

             </div>


              <button class="btn">Submit</button>
            </form>
            <div class="pl-10 pt-6">
              <ul v-for="Travel in TravelList" :key="Travel.id">
                <li>
                  <p>
                    Your  Name is
                    <span>{{ Travel.name }}</span>
                  </p>



                  <p>
                    Your TravelList in Japan is :

                    <span>{{ Travel.answer1 }}</span>,
                    <span>{{ Travel.answer2 }}</span>,
                    </p>
                    <p>
                    Your TravelList in Korea is :
                    <span>{{ Travel.answer3 }}</span>,
                    <span>{{ Travel.answer4 }}</span>,
                    </p>
                    <p>
                    Your TravelList in Taiwan is :
                    <span>{{ Travel.answer5 }}</span>,
                    <span>{{ Travel.answer6 }}</span>
                  </p>

                  <button @click="showData(Travel)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewcard="0 0 24 24"
                    >
                      <path
                        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
                      />
                    </svg>
                  </button>
                  <button @click="deleteTravel(Travel.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewcard="0 0 24 24"
                    >
                      <path
                        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
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
      isEdit: false,
      editId: "",
      url: "http://localhost:5000/TravelList",
      enteredName: "",
      invalidNameInput: false,
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
    submitForm() {
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
            answer4: this.answer4,
            answer5: this.answer5,
            answer6: this.answer6,
          });
        } else {
          this.addNewTravel({
            name: this.enteredName,
            answer1: this.answer1,
            answer2: this.answer2,
            answer3: this.answer3,
            answer4: this.answer4,
            answer5: this.answer5,
            answer6: this.answer6,
          });
        }
      }
    }
      this.enteredName = "";
      this.answer1 = null;
      this.answer2 = null;
      this.answer3 = null;
      this.answer4 = null;
      this.answer5 = null;
      this.answer6 = null;
    },
    validateName() {
      this.invalidNameInput = this.enteredName === '' ? true : false
      console.log(`name: ${this.invalidNameInput}`)
    },
    showData(oldTravel) {
      this.isEdit = true
      this.editId = oldTravel.id
      this.enteredName = oldTravel.name
      this.answer1 = oldTravel.answer1,
        this.answer2 = oldTravel.answer2,
        this.answer3 = oldTravel.answer3,
        this.answer4 = oldTravel.answer4,
        this.answer5 = oldTravel.answer5,
        this.answer6 = oldTravel.answer6
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
            answer4: editingTravel.answer4,
            answer5: editingTravel.answer5,
            answer6: editingTravel.answer6,
          })
        })
        const data = await res.json()
        this.TravelList = this.TravelList.map((Travel) =>
          Travel.id === editingTravel.id
            ? {
              ...Travel, name: data.name,  answer1: data.answer1,
              answer2: data.answer2,
              answer3: data.answer3,
              answer4: data.answer4,
              answer5: data.answer5,
              answer6: data.answer6,            
}
            : Travel
        )
        this.isEdit = false
        this.editId = ''
        this.enteredName = ''
        this.answer1 = null;
        this.answer2 = null;
        this.answer3 = null;
        this.answer4 = null;
        this.answer5 = null;
        this.answer6 = null;
      } catch (error) {
        console.log(`Could not edit! ${error}`)
      }
    },
    async getTravelList() {
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
            answer4: newTravel.answer4,
            answer5: newTravel.answer5,
            answer6: newTravel.answer6,
            
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
    this.TravelList = await this.getTravelList()
  }
}
</script>