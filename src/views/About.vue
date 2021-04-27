<template>

     <nav-bar>
     </nav-bar>

  <foot>
  </foot>

</template>

<script>
import NavBar from '@/components/NavBar.vue'






export default {
  name: 'Product',
  components: {
    NavBar,


    


      },
       data() {
    return {
      isEdit: false,
      editId: "",
      url: "http://localhost:5000/TravelList",
      enteredName: "",
      ErrorName: false,
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
      this.ErrorName = this.enteredName === "" ? true : false;
        if ((!this.ErrorName)) {
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
      this.ErrorName = this.enteredName === '' ? true : false
      console.log(`name: ${this.ErrorName}`)
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