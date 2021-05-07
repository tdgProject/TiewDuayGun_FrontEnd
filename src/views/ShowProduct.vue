<template>
  <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10">
    <div class="px-4 py-2" v-for="Product in ProductList" :key="Product.id">
      <h1 class="text-gray-900 font-bold text-3xl uppercase">
        {{ Product.productName }}
      </h1>
      <p class="text-gray-600 text-sm mt-1">{{ Product.productDescription }}</p>

      <img
        class="h-56 w-full object-cover mt-2"
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        alt="NIKE AIR"
      />
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
        </div>
      </div>
      <button @click="showData(Product)">
        <svg
          href="/AddProduct"
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
      <button @click="deleteProduct(Product.productId)">
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
</template>



<script>
export default {
  name: "ShowProduct",
  components: {},

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
      Brand: null,
      Size: null,
      productDate: null,
      productColors: [],
      enteredDes: "",
      Backend: [],
    };
  },
  methods: {
    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      if (!this.ErrorName && !this.ErrorPrice) {
        {
          if (this.isEdit) {
            this.editProduct({
              id: this.editId,
              ProductName: this.enteredName,
              ProductPrice: this.enteredPrice,
              Brand: this.Brand,
              Size: this.Size,
              productDate: this.productDate,
              productColors: this.productColors,
              ProductDes: this.ProductDes,
            });
          } else {
            this.addNewProduct({
              ProductName: this.enteredName,
              ProductPrice: this.enteredPrice,
              Brand: this.Brand,
              Size: this.Size,
              productDate: this.productDate,
              productColors: this.productColors,
              ProductDes: this.ProductDes,
            });
          }
        }
      }
      this.enteredName = "";
      this.enteredPrice = "";
      this.Brand = null;
      this.Size = null;
      this.productDate = null;
      this.productColors = null;
      this.enteredDes = "";
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
    showData(oldProduct) {
      this.isEdit = true;
      this.editId = oldProduct.id;
      this.enteredName = oldProduct.ProductName;
      this.enteredPrice = oldProduct.ProductPrice;
      this.Brand = oldProduct.Brand;
      this.Size = oldProduct.Size;
      this.productDate = oldProduct.productDate;
      this.productColors = oldProduct.productColors;
      this.enteredDes = oldProduct.enteredDes;
    },
    async editProduct(editingProduct) {
      try {
        const res = await fetch(`${this.url}/${editingProduct.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ProductName: editingProduct.ProductName,
            ProductPrice: editingProduct.ProductPrice,
            Brand: editingProduct.Brand,
            Size: editingProduct.Size,
            productDate: editingProduct.productDate,
            productColors: editingProduct.productColors,
            ProductDes: editingProduct.ProductDes,
          }),
        });
        const data = await res.json();
        this.ProductList = this.ProductList.map((Product) =>
          Product.id === editingProduct.id
            ? {
                ...Product,
                name: data.name,
                ProductName: data.ProductName,
                ProductPrice: data.ProductPrice,
                Brand: data.Brand,
                Size: data.Size,
                productDate: data.productDate,
                productColors: data.productColors,
                ProductDes: data.ProductDes,
              }
            : Product
        );
        this.isEdit = false;
        this.editId = "";
        this.enteredName = "";
        this.enteredPrice = "";
        this.Brand = null;
        this.Size = null;
        this.productDate = null;
        this.productColors = null;
        this.enteredDes = "";
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
          (Product) => Product.productId !== deleteId
        );
      } catch (error) {
        console.log(`Could not delete! ${error}`);
      }
    },
    async addNewProduct(newProduct) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ProductName: newProduct.ProductName,
            ProductPrice: newProduct.ProductPrice,
            Brand: newProduct.Brand,
            Size: newProduct.Size,
            productDate: newProduct.productDate,
            productColors: newProduct.productColors,
            ProductDes: newProduct.ProductDes,
          }),
        });

        const data = await res.json();
        this.ProductList = [...this.ProductList, data];
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
