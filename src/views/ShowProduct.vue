<template>


    <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10 ">
      
  <div class="px-4 py-2 "  v-for="Travel in TravelList" :key="Travel.id">
    <h1 class="text-gray-900 font-bold text-3xl uppercase">{{ Travel.ProductName }}</h1>
    <p class="text-gray-600 text-sm mt-1">{{Travel.ProductDescription}}</p>
  
  <img class="h-56 w-full object-cover mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="NIKE AIR">
  <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
    <h1 class="text-gray-200 font-bold text-xl">${{Travel.ProductPrice}}</h1>
    <p class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">{{Travel.Brand}}</p>
  </div>
  <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
    <h1 class="text-gray-200 font-bold text-xl">{{Travel.theDate}}</h1>
    
    <p class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">{{Travel.Size}}</p>

  </div>
  
<div class="flex items-center justify-center px-4 py-2 bg-gray-900">
               <div class="flex" v-for="color in Travel.colors" :key="color.id">
      <button class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-gray-100" v-if='color == "White"'></button>
      <button class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-black" v-if='color == "black"'></button>
      <button class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-gray-500" v-if='color == "gray"'></button>
    </div>
</div>
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
                  </div>
                  </div>
             <form @submit.prevent="submitForm">
                <div class="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5" style="left:-40px"><i class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i></div>
                <h3 class="text-2xl text-gray-900 font-semibold">StyleByMe</h3>
                <p class="text-gray-600"> Insert Your Details</p>
                <div class="flex space-x-5 mt-3">
                             <input
                  class="input border p-2  w-1/2"
                  :class="{ 'bg-red-50': ErrorName }"
                  id="ProductName"
                  name="ProductName"
                  type="text"
                  v-model.trim="enteredName"
                  @blur="validateName"
                  placeholder="Your ProDuctName"
                />
                

                <p
                  v-if="ErrorName"
                  class="text-red-500"
                >**</p>


   
<select class="block appearance-none border p-2  w-1/2 bg-grey-lighter border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" v-model="Brand" 
:class="{ 'bg-red-50': ErrorBrand }"
>
          <option id="b-1">Uniqlo</option>
          <option id="b-2">H&M</option>
        </select>

<p
                  v-if="ErrorBrand"
                  class="text-red-500"
                >**</p>

    
                </div>

                
<textarea  id="ProductDescription" cols="10" rows="3"  class="border p-2 mt-3 w-full" :class="{ 'bg-red-50': ErrorDescription }"  v-model.trim="enteredDescription"
                  @blur="validateDescription"
                  placeholder="Your ProDuctDescription"
></textarea>
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


          <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" v-model="Size" 
          :class="{ 'bg-red-50': ErrorSize }"
          @blur="validateSize">
          <option>Size S</option>
          <option>Size M</option>
          <option>Size L</option>
          <option>Size XL</option>
        </select>
        <p
                  v-if="ErrorSize"
                  class="text-red-500"
                >**</p>
        
      </div>
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
        Product Color
      </label>
      <input
      type="checkbox"
      class="ml-1 bg-white rounded-full w-6 h-6 focus-outline-black"
      v-model="colors"
      id="White"
      value="White"/>
            <input
      type="checkbox"
      class="ml-1 bg-black rounded-full w-6 h-6 focus-outline-black"
      v-model="colors"
      value="black"/>
            <input
      type="checkbox"
      class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
      v-model="colors"
      value="gray"/>
    </div>
    <p
                  v-if="ErrorColor"
                  class="text-red-500"
                >**</p>
  </div>
      <input type="date" v-model="theDate" />
      

<div class="form-group">
          <label for="Imgfile">Select Image</label>
          <input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="Imgfile">
    
          <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid" />
              <p class="mb-0">file name: {{ image.name }}</p>
              <p class="mb-0">size: {{ image.size/1024 }}KB</p>
            </template>
          </div>
        </div>
        Reset input file <button @click="reset">Clear All</button>
    

      
                <input type="submit" value="Submit" class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3">
                
                

                
            </form>
      
    


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
