<template>

  <div class="pl-10 pt-6">
    
              <ul v-for="Travel in TravelList" :key="Travel.id">
                <li>
                  <p>
                    
                    <span>{{ Travel.ProductName }}</span>
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
                    <svg  href="/AddProduct"
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

</template>



<script>
export default {
  name: 'ShowProduct',
  components: {
 
      },
      
       data() {
    return {
      isEdit: false,
      editId: "",
      url: "http://localhost:3000/TravelList",
      enteredName: "",
      ErrorName: false,
      enteredPrice: "",
      ErrorPrice: false,
      TravelList: [],
      Brand: null,
      Size: null,
      theDate: null,
      colors: [],
      enteredDes: ""
      
    };
  },
  methods: {
    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
        if ((!this.ErrorName&&!this.ErrorPrice)) {
      {
        if (this.isEdit) {
          this.editTravel({
            id: this.editId,
            ProductName: this.enteredName,
            ProductPrice: this.enteredPrice,
            Brand: this.Brand,
            Size:  this.Size,
            theDate: this.theDate,
            colors: this.colors,
            ProductDes: this.ProductDes
            
          });
        } else {
          this.addNewTravel({
            ProductName: this.enteredName,
            ProductPrice: this.enteredPrice,
            Brand: this.Brand,
            Size: this.Size,
            theDate: this.theDate,
            colors: this.colors,
            ProductDes: this.ProductDes

          });
        }
      }
    }
      this.enteredName = "";
      this.enteredPrice = "";
      this.Brand = null;
      this.Size = null;
      this.theDate = null;
      this.colors = null;
      this.enteredDes = "";

    },
    validateName() {
      this.ErrorName = this.enteredName === '' ? true : false
      console.log(`name: ${this.ErrorName}`)
    },
    validateType() {
      this.ErrorType = this.enteredType === '' ? true : false
      console.log(`name: ${this.ErrorType}`)
    },
    validatePrice() {
      this.ErrorPrice = this.enteredPrice === '' ? true : false
      console.log(`name: ${this.ErrorPrice}`)
    },
    showData(oldTravel) {
      this.isEdit = true
      this.editId = oldTravel.id
      this.enteredName = oldTravel.ProductName
      this.enteredPrice = oldTravel.ProductPrice
      this.Brand = oldTravel.Brand
      this.Size = oldTravel.Size
      this.theDate = oldTravel.theDate
      this.colors = oldTravel.colors
      this.enteredDes = oldTravel.enteredDes
    },
    async editTravel(editingTravel) {
      try {
        const res = await fetch(`${this.url}/${editingTravel.id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            ProductName: editingTravel.ProductName,
            ProductPrice: editingTravel.ProductPrice,
            Brand: editingTravel.Brand,
            Size: editingTravel.Size,
            theDate: editingTravel.theDate,
            colors : editingTravel.colors,
            ProductDes : editingTravel.ProductDes
          })
        })
        const data = await res.json()
        this.TravelList = this.TravelList.map((Travel) =>
          Travel.id === editingTravel.id
            ? {
              ...Travel, name: data.name,  ProductName: data.ProductName,
              ProductPrice: data.ProductPrice,
              Brand: data.Brand,
              Size: data.Size,
              theDate: data.theDate,
              colors: data.colors,
              ProductDes: data.ProductDes        
}
            : Travel
        )
        this.isEdit = false
        this.editId = ''
        this.enteredName = ''
        this.enteredPrice = ''
        this.Brand = null
        this.Size = null
        this.theDate = null
        this.colors = null
        this.enteredDes = ''

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
            ProductName: newTravel.ProductName,
            ProductPrice: newTravel.ProductPrice,
            Brand: newTravel.Brand,
            Size: newTravel.Size,
            theDate: newTravel.theDate,
            colors: newTravel.colors,
            ProductDes: newTravel.ProductDes
 
            
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
  },
      onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    }
}



</script>
