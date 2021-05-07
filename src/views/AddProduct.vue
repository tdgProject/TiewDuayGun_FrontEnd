<template>
  <!-- This is an example component -->

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
      </div>
      <p v-if="ErrorColor" class="text-red-500">**</p>
    </div>

    <input type="file" id="image" name="image" accept="image/*," />

    <input
      type="submit"
      value="Submit"
      class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
    />
  </form>
</template>


<script>
export default {
  name: "AddProduct",
  components: {},
  el: "#app",
  data() {
    return {
      isEdit: false,
      editId: "",
      url: "http://localhost:8081",
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
      preview: null,
      image: null,
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
            this.editProduct({
              id: this.editId,
              productName: this.enteredName,
              productCost: this.enteredPrice,
              brand: this.brand,
              productDate: this.productDate,
              productColors: this.productColors,
              productDescription: this.enteredDescription,
              preview: this.preview,
              image: this.image,
            });
          } else {
            this.newProduct();
            
          }
        }
      }
      this.enteredName = "";
      this.enteredPrice = "";
      this.brand = null;
      this.productDate = null;
      this.productColors = null;
      this.enteredDescription = "";
      this.preview = null;
      this.image = null;
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

    showData(oldProduct) {
      this.isEdit = true;
      this.editId = oldProduct.id;
      this.enteredName = oldProduct.productName;
      this.enteredPrice = oldProduct.productCost;
      this.brand = oldProduct.brand;
      this.productDate = oldProduct.productDate;
      this.productColors = oldProduct.productColors;
      this.enteredDescription = oldProduct.enteredDescription;
      this.preview = oldProduct.preview;
    },
    async editProduct(editingProduct) {
      try {
        const res = await fetch(`${this.url}/${editingProduct.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            productName: editingProduct.productName,
            productCost: editingProduct.productCost,
            brand: editingProduct.brand,
            productDate: editingProduct.productDate,
            productColors: editingProduct.productColors,
            productDescription: editingProduct.productDescription,
            preview: editingProduct.preview,
          }),
        });
        const data = await res.json();
        this.ProductList = this.ProductList.map((Product) =>
          Product.id === editingProduct.id
            ? {
                ...Product,
                name: data.name,
                productName: data.productName,
                productCost: data.productCost,
                brand: data.brand,
                productDate: data.productDate,
                productColors: data.productColors,
                productDescription: data.productDescription,
                preview: data.preview,
              }
            : Product
        );
        this.isEdit = false;
        this.editId = "";
        this.enteredName = "";
        this.enteredPrice = "";
        this.brand = null;
        this.productDate = null;
        this.productColors = null;
        this.enteredDescription = "";
        this.preview = "";
      } catch (error) {
        console.log(`Could not edit! ${error}`);
      }
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
        // this.productColors.forEach((c) => {
        //   let color = { colorid: c.id,
        //   colorName:c.name } ;
        //   product.productColors.push(color);
        // });
        console.log(product.productid);
        console.log(this.id);

        const jsonProduct = JSON.stringify(product);
        console.log(jsonProduct);
        const blob = new Blob([jsonProduct], {
          type: "application/json",
        });
        const formdata = new FormData();
        formdata.append("newProduct", blob);
        //formdata.append("image", image);
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
  async created() {
    this.ProductList = await this.getProductList();
  },
  onFileChange(e) {
    const file = e.target.files[0];
    this.url = URL.createObjectURL(file);
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