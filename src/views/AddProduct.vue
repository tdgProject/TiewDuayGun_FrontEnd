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
  name: 'AddProduct',
  components: {
 
      },
      el: "#app",
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
      ErrorDescription: false,
      enteredDescription: "",
      preview: null,
      image: null,
      ErrorBrand: false,
      ErrorSize: false,
      ErrorColor: false,
      Imgfile: '',

      
    };
  },
  
  methods: {

  previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
        reset: function() {
      this.image = null;
      this.preview = null;
    },
    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      this.ErrorDescription = this.enteredDescription === "" ? true : false;
      this.ErrorBrand = this.Brand === null ? true : false;
      this.ErrorSize =this.Brand === null ? true : false ;
      this.ErrorColor = this.colors === null ? true : false;
        if ((!this.ErrorName&&!this.ErrorPrice&&!this.ErrorDescription&&!this.ErrorBrand&&!this.ErrorSize&&!this.ErrorColor)) {
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
            ProductDescription: this.enteredDescription,
            preview: this.preview,
            image: this.image
            
            
          });
        } else {
          this.addNewTravel({
            ProductName: this.enteredName,
            ProductPrice: this.enteredPrice,
            Brand: this.Brand,
            Size: this.Size,
            theDate: this.theDate,
            colors: this.colors,
            ProductDescription: this.enteredDescription,
            preview: this.preview,
            Imgfile: this.Imgfile,
            image: this.preview
           

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
      this.enteredDescription = "";
      this.preview = null;
      this.image = null;

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
     validateDescription() {
      this.ErrorDescription = this.enteredDescription === '' ? true : false
      console.log(`name: ${this.ErrorDescription}`)
    },
       validateSize() {
      this.ErrorSize = this.Size === null ? true : false
      console.log(`name: ${this.ErrorSize}`)
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
      this.enteredDescription = oldTravel.enteredDescription
      this.preview = oldTravel.preview
      this.Imgfile = oldTravel.Imgfile
      this.image = oldTravel.image
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
            ProductDescription : editingTravel.ProductDescription,
            preview : editingTravel.preview,
            Imgfile : editingTravel.Imgfile,
            image : editingTravel.image

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
              ProductDescription: data.ProductDescription ,
              preview: data.preview,
              Imgfile: data.Imgfile,
              image: data.image,      
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
        this.enteredDescription = ''
        this.preview = ''
        this.Imgfile = ''
        this.image = null

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
            ProductDescription: newTravel.ProductDescription,
            preview: newTravel.preview,
            Imgfile: newTravel.Imgfile,
            image: newTravel.image
            
            
 
            
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
};



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