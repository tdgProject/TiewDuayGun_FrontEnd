<template>

  <div class="lg:flex items-center container mx-auto my-auto grid grid-cols-3">
    <div class="px-4 py-2" v-for="Product in ProductList" :key="Product.id">
      <h1 class="text-gray-900 font-bold text-3xl uppercase">
        {{ Product.productName }}
      </h1>
      <p class="text-gray-600 text-sm mt-1">{{ Product.productDescription }}</p>

      <img
        class="h-56 w-56 object-cover mt-2 rounded-2xl "
        :src="getimage(Product.image)" 
        alt="NIKE AIR" >
        
     
      <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 class="text-gray-200 font-bold text-xl">
          ${{ Product.productCost }}
        </h1>
        <p
          class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
        >
          {{ Product.brand.brandName }}
        </p>
      </div>
      <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 class="text-gray-200 font-bold text-xl">
          {{ Product.productDate }}
        </h1>

        <p
          class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
        >
          
        </p>
      </div>

      <div class="flex items-center justify-center px-4 py-2 bg-gray-900">
        <div class="flex" v-for="color in Product.productColors" :key="color.id">
          <button
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-gray-100"
            v-if="color.color.colorName == 'White'"
          ></button>
          <button
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-black"
            v-if="color.color.colorName == 'Black'"
          ></button>
          <button
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-gray-500"
            v-if="color.color.colorName == 'Gray'"
          ></button>
           <button
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-gray-500"
            v-if="color.color.colorName == 'Navy'"
          ></button>
           <button
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-gray-500"
            v-if="color.color.colorName == 'Beige'"
          ></button>
        </div>
      </div>
      <button @click="showData(Product)">
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
      <button @click="deleteProduct(Product.productId)" >
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
 <div v-if="this.isEdit">
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
        <input
          type="checkbox"
          class="ml-1 bg-white rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Black"
        />
        <input
          type="checkbox"
          class="ml-1 bg-black rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.White"
        />
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Gray"
        />
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Navy"
        />
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="productColors"
          :value="Colorlist.Beige"
        />
      </div>
      <p v-if="ErrorColor" class="text-red-500">**</p>
    </div>

    <input
      type="file"
      id="image"
      name="image"
      accept="image/*,"
      @change="upfile"
    />

    <input
      type="submit"
      value="Submit"
      class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
    />
  </form>
 </div>
</template>



<script>
export default {
  name: "ShowProduct",
  components: {},

  data() {
    return {
       isEdit: false,
      editId: "",
      url: "40.76.71.12:8081",
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
      image: "",
      Errorbrand: false,
      ErrorSize: false,
      ErrorColor: false,
      ErrorDate: false,
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
    };
  },
  methods: {
      upfile(e) {
      let file = e.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name);
      this.upfile = data.get("file");
      this.image = URL.createObjectURL(this.upfile);
    },
    getimage(image){
      return `${this.url}/image/${image}`
    },

    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      this.ErrorDescription = this.enteredDescription === "" ? true : false;
      this.Errorbrand = this.brand === null ? true : false;
      this.ErrorColor = this.productColors === null ? true : false;
      this.ErrorDate = this.productDate === null ? true : false;
      if (
        !this.ErrorName &&
        !this.ErrorPrice &&
        !this.ErrorDescription &&
        !this.Errorbrand &&
        !this.ErrorSize &&
        !this.ErrorColor &&
        !this.ErrorDate
      ) {
        {
          if (this.isEdit) {
            this.editProduct();
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
      this.preview = null;
      this.image = null;
      setTimeout(location.reload.bind(location), 3000);
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
    showData(Product) {
      this.isEdit = true;
      this.editId = Product.productId;
      this.enteredName = Product.productName;
      this.enteredPrice = Product.productCost;
      this.brand = Product.brand;
      this.productDate = Product.productDate;
      this.productColors = Product.productColors;
      this.enteredDescription = Product.productDescription;
      this.image = Product.image;

    },

    async getProductList() {
      try {
        const res = await fetch(this.url);
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
       
        this.ProductList = this.ProductList.filter(
          (Product) => Product.productId !== deleteId
        );
      } catch (error) {
        console.log(`Could not delete! ${error}`);
      }
    },
    editProduct() {
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
    
        const jsonProduct = JSON.stringify(product);
        console.log(jsonProduct);
        const blob = new Blob([jsonProduct], {
          type: "application/json",
        });
        console.log(blob)
        const formdata = new FormData();
        formdata.append("newProduct", blob);
        formdata.append("image", this.upfile);
          this.makeEditForm(formdata);
        
      }
    },
    async makeEditForm(formdata) {
      try {
        const res = await fetch(`${this.url}/edit/${this.editId}`, {
          method: "PUT",
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
  async created() {
    this.ProductList = await this.getProductList();
  },
  onFileChange(e) {
    const file = e.target.files[0];
    this.url = URL.createObjectURL(file);
  },
};
</script>
