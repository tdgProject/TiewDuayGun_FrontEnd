<template>

<!-- This is an example component -->

               <form @submit.prevent="submitForm">
                <div class="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5" style="left:-40px"><i class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i></div>
                <h3 class="text-2xl text-gray-900 font-semibold">StyleByMe</h3>
                <p class="text-gray-600"> Insert Your Details</p>
                <div class="flex space-x-5 mt-3">
                             <input
                  class="input border p-2  w-1/2"
                  :class="{ 'bg-red-50': ErrorName }"
                  id="ProductName"
                  type="text"
                  v-model.trim="enteredName"
                  @blur="validateName"
                  placeholder="Your ProDuctName"
                />

                <p
                  v-if="ErrorName"
                  class="text-red-500"
                >**</p>


   
<select class="block appearance-none border p-2  w-1/2 bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" v-model="Brand" >
          <option>Uniqlo</option>
          <option>H&M</option>
        </select>


    
                </div>
                
                <textarea name="description" id="ProductDescription" cols="10" rows="3" v-model.trim="enteredDescription"  @blur="validateDescription"  placeholder="Tell us about desired property" class="border p-2 mt-3 w-full"></textarea>
               
                <p
                  v-if="ErrorDescription"
                  class="text-red-500"
                >**</p>
                <p class="font-bold text-sm mt-3">Details</p>
            <div class="-mx-3 md:flex mb-2">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
        Price
      </label>
      <input
                  class="input border p-2  w-1/2"
                  :class="{ 'bg-red-50': ErrorPrice }"
                  id="ProductPrice"
                  type="text"
                  v-model.trim="enteredPrice"
                  @blur="validatePrice"
                  placeholder="10000.00"
                />

                <p
                  v-if="ErrorPrice"
                  class="text-red-500"
                >Enter Your ProductPrice</p>
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
        Size
      </label>
      <div class="relative">


          <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" v-model="Size" >
          <option>Size S</option>
          <option>Size M</option>
          <option>Size L</option>
          <option>Size XL</option>
        </select>
       
        
      </div>
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
        Product Color
      </label>
    <input type="checkbox" name="options[]" value="White"/> White<br/>
    <input type="checkbox" name="options[]" value="Black"/> Black<br/>
    <input type="checkbox" name="options[]" value="Gray "/> Gray<br/>
      
    </div>
  </div>
      <input type="date" v-model="theDate" />
      
                <input type="submit" value="Submit" class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3">
                
            </form>

</template>

<script>
export default {
  name: 'AddProduct',
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
      ErrorId: false,
      enteredId: "",
      Brand: null,
      Size: null,
      theDate: null,
    };
  },
  methods: {
    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      this.ErrorId = this.enteredId === "" ? true : false;
        if ((!this.ErrorName&&!this.ErrorPrice&&!this.ErrorId)) {
      {
        if (this.isEdit) {
          this.editTravel({
            id: this.editId,
            ProductName: this.enteredName,
            ProductPrice: this.enteredPrice,
            ProductId: this.enteredId,
            Brand: this.Brand,
            Size:  this.Size,
            theDate: this.theDate
            
          });
        } else {
          this.addNewTravel({
            ProductName: this.enteredName,
            ProductPrice: this.enteredPrice,
            ProductId: this.enteredId,
            Brand: this.Brand,
            Size: this.Size,
            theDate: this.theDate

          });
        }
      }
    }
      this.enteredName = "";
      this.enteredPrice = "";
      this.enteredId ="";
      this.Brand = null;
      this.Size = null;
      this.theDate = null;

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
    validateId() {
      this.ErrorId = this.enteredId === '' ? true : false
      console.log(`name: ${this.ErrorId}`)
    },
    showData(oldTravel) {
      this.isEdit = true
      this.editId = oldTravel.id
      this.enteredName = oldTravel.ProductName
      this.enteredPrice = oldTravel.ProductPrice
      this.enteredId = oldTravel.ProductId
      this.Brand = oldTravel.Brand
      this.Size = oldTravel.Size
      this.theDate = oldTravel.theDate
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
            ProductId: editingTravel.ProductId,
            Brand: editingTravel.Brand,
            Size: editingTravel.Size,
            theDate: editingTravel.theDate
          })
        })
        const data = await res.json()
        this.TravelList = this.TravelList.map((Travel) =>
          Travel.id === editingTravel.id
            ? {
              ...Travel, name: data.name,  ProductName: data.ProductName,
              ProductPrice: data.ProductPrice,
              ProductId: data.ProductId,
              Brand: data.Brand,
              Size: data.Size,
              theDate: data.theDate        
}
            : Travel
        )
        this.isEdit = false
        this.editId = ''
        this.enteredName = ''
        this.enteredPrice = ''
        this.enteredId =''
        this.Brand = null
        this.Size = null
        this.theDate = null

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
            ProductId: newTravel.ProductId,
            Brand: newTravel.Brand,
            Size: newTravel.Size,
            theDate: newTravel.theDate
 
            
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <style>
  .icon::after{
  content: '';
  display: block;
  position: absolute;
  border-top: 23px solid transparent;
  border-bottom: 17px solid transparent;
  border-left: 12px solid #3182ce;
  left: 100%;
  top: 0;
}
  </style>