<template>
  

  <form @submit.prevent="submitForm">
    
    <div
      class="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5"
      style="left: -40px"
    >
      <i class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i>
    </div>
    <h3 class="text-2xl text-gray-900 font-semibold">StyleByMe</h3>
    <p class="text-gray-600">Insert Your Details</p>
    <div class="flex space-x-5 mt-3">
      <input
        class="input border p-2 w-1/2"
        :class="{ 'bg-red-50': ErrorName }"
        id="productName"
        name="productName"
        type="text"
        v-model.trim="enteredName"
        @blur="validateName"
        placeholder="Your productName"
      />
      <p v-if="ErrorName" class="text-red-500">**</p>

      <select
        class="block appearance-none border p-2 w-1/2 bg-grey-lighter border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
        v-model="brand"
        :class="{ 'bg-red-50': Errorbrand }"
      >
        <option id="b-1" name="Uniqlo" :value="BrandList.UNIQLO">Uniqlo</option>
        <option id="b-2" name="H&M" :value="BrandList.HM">H&M</option>
      </select>

      <p v-if="Errorbrand" class="text-red-500">**</p>
    </div>

    <textarea
      id="productDescription"
      cols="10"
      rows="3"
      class="border p-2 mt-3 w-full"
      :class="{ 'bg-red-50': ErrorDescription }"
      v-model.trim="enteredDescription"
      @blur="validateDescription"
      placeholder="Your productDescription"
    ></textarea>
    <p v-if="ErrorDescription" class="text-red-500">**</p>

    <p class="font-bold text-sm mt-3">Details</p>
    <div class="-mx-3 md:flex mb-2">
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-city"
        >
          Price
        </label>
        <input
          class="input border p-2 w-1/2"
          :class="{ 'bg-red-50': ErrorPrice }"
          id="productCost"
          type="number"
          step="0.01"
          min="0"
          max="99999"
          v-model.trim="enteredPrice"
          @blur="validatePrice"
          placeholder="10000.00"
        />

        <p v-if="ErrorPrice" class="text-red-500">Enter Your productCost</p>
      </div>
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-state"
        >
          Date
        </label>
        <div class="relative">
          <input type="date" v-model="productDate" @blur="validateDate" />

          <p v-if="ErrorDate" class="text-red-500">Enter Your Date</p>
        </div>
      </div>

      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-zip"
        >
          Product Color
        </label>
        <div class="grid grid-cols-5">
        <div class="bg-black w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-white rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Black"
          @blur="validateColor"
        />
         </div>
         <div class="bg-gray-100 w-12  pt-3 pb-2 pr-1">
           
        <input
          type="checkbox"
          class="ml-1 bg-black rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.White"
        />
        </div>
        <div class="bg-gray-600 w-12  pt-3 pb-2 pr-1 ">
        <input
        
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Gray"
        />
        </div>
        <div class="bg-blue-600 w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-gray-900 rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Navy"
        />
        </div>
        <div class="bg-yellow-200 w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Beige"
        />
        </div>
        </div>
        <p v-if="ErrorColor" class="text-red-500">**</p>
      </div>
    </div>

 <div class="form-group">
    <input
      type="file"
      id="image"
      name="image"
      accept="image/*,"
      @blur="validatePreview"
      @change="upfile"
    />
   <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview">
              <div class="h-56 w-56 object-cover mt-2 rounded-2xl6">
              <img :src="preview" class="img-fluid" />
              </div>
              <p v-if="ErrorPreview" class="text-red-500">Enter Your pic</p>
            </template>
           
          </div>
         
 </div>


    <input
      type="submit"
      value="Submit"
      class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
    />

  </form>

  
   <button @click="reset">Clear All</button>
 
</template>


<script>
export default {
  name: "AddProduct",
  components: {},
  el: "#app",

  
  data() {
    return {
      preview: null,
      isEdit: false,
      editId: "",
      url:"http://40.76.71.12:8081",
      enteredName: "",
      ErrorName: false,
      enteredPrice: "",
      ErrorPrice: false,
      ProductList: [],
      brand: null,
      productDate: null,
      productColors: [],
      ErrorDescription: false,
      enteredDescription: "",
      image: null,
      Errorbrand: false,
      ErrorSize: false,
      ErrorDate: false,
      ErrorPreview: false,
      pic: null,
      ErrorColor: false,
      Colorlist: {
        Black: {
          color: {
            colorId: 1,
            colorName: "Black",
          },
        },
        White: {
          color: {
            colorId: 2,
            colorName: "White",
          },
        },
        Gray: {
          color: {
            colorId: 3,
            colorName: "Gray",
          },
          
        },
        Navy: {
          color: {
            colorId: 4,
            colorName: "Navy",
          },
        },
           Beige: {
          color: {
            colorId: 5,
            colorName: "Beige",
          },
        },
      },
      BrandList: {
        UNIQLO: {
          brandId: "B01",
          brandName: "UNIQLO",
        },
        HM: {
          brandId: "B02",
          brandName: "H&M",
        },
      },
      prop: {
        Product: Object,
        edit: Boolean,
      },
    };
  },

  methods: {
    reset: function() {
      this.preview = null;
      this.pic = null;

    },

    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      this.ErrorDescription = this.enteredDescription === "" ? true : false;
      this.Errorbrand = this.brand === null ? true : false;
      this.ErrorDate = this.productDate === null ? true : false;
      this.ErrorPreview = this.preview === null ? true : false;
      this.ErrorColor = this.productColors === "" ? true :false;
      if (
        !this.ErrorName &&
        !this.ErrorPrice &&
        !this.ErrorDescription &&
        !this.Errorbrand &&
        !this.ErrorSize &&
        !this.ErrorDate &&
        !this.Errorimage&&
        !this.ErrorPreview&&
        !this.ErrorColor
      ) {
        {
          if (this.isEdit) {
            this.showData();
          } else {
            this.newProduct();
          }
        }
      }
      this.isEdit = false;
      this.enteredName = "";
      this.enteredPrice = "";
      this.brand = null;
      this.productDate = null;
      this.productColors = null;
      this.enteredDescription = "";
      this.image = null;
      this.preview = null;
      this.pic = null;
      //setTimeout(location.reload.bind(location), 2000);
    },
    upfile(e) {
      let file = e.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name);
      this.upfile = data.get("file");
      this.image = URL.createObjectURL(this.upfile);
      
      var input = e.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.pic=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    validateName() {
      this.ErrorName = this.enteredName === "" ? true : false;
      console.log(`name: ${this.ErrorName}`);
    },
    validateType() {
      this.ErrorType = this.enteredType === "" ? true : false;
      console.log(`name: ${this.ErrorType}`);
    },
    validatePrice() {
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      console.log(`name: ${this.ErrorPrice}`);
    },
    validateDescription() {
      this.ErrorDescription = this.enteredDescription === "" ? true : false;
      console.log(`name: ${this.ErrorDescription}`);
    },
    validateDate() {
      this.ErrorDate = this.productDate === null ? true : false;
      console.log(`name: ${this.ErrorDate}`);
    },
    validatePreview() {
      this.ErrorPreview = this.preview === null ? true : false;
      console.log(`name: ${this.ErrorPreview}`);
    },
    validateColor(){
      this.ErrorColor = this.productColors === "" ? true : false;
      console.log(`name: ${this.ErrorColor}`)
    },



    
    
      
    
    async getProduct(id) {
      try {
        const res = await fetch(`${this.url}/${id}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
    async deleteProduct(deleteId) {
      try {
        await fetch(`${this.url}/${deleteId}`, {
          method: "DELETE",
        });
        //filter - higher order function
        this.ProductList = this.ProductList.filter(
          (Product) => Product.id !== deleteId
        );
      } catch (error) {
        console.log(`Could not delete! ${error}`);
      }
    },
    newProduct() {
      {
        let product = {
          productId: 0,
          productName: this.enteredName,
          productCost: this.enteredPrice,
          productDescription: this.enteredDescription,
          productDate: this.productDate,
          image: this.image,
          brand: this.brand,
          productColors: [],
        };
        for (const color of this.productColors) {
          product.productColors.push(color);
        }
        console.log(product.productid);
        console.log(this.id);

        const jsonProduct = JSON.stringify(product);
        console.log(jsonProduct);
        const blob = new Blob([jsonProduct], {
          type: "application/json",
        });
        const formdata = new FormData();
        formdata.append("newProduct", blob);
        formdata.append("image", this.upfile);


          this.makeDataForm(formdata);
        
      }
    },
  
    async makeDataForm(formdata) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          body: formdata,
        });
        if (res.status != 200) {
          alert("An Unexpected Error Occured. Response Status: " + res.status);
        }
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },
 
  
};
</script>
  
  
  <style>
.icon::after {
  content: "";
  display: block;
  position: absolute;
  border-top: 23px solid transparent;
  border-bottom: 17px solid transparent;
  border-left: 12px solid #3182ce;
  left: 100%;
  top: 0;
}
</style>