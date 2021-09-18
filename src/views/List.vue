<template>

  <div class="grid grid-cols-3 mt-12 md:w-full">
    <div class="px-4 py-2 md:w-full" v-for="Place in PlaceList" :key="Place.id">
      <h1 class="text-gray-900 font-bold text-3xl uppercase ">
        {{ Place.PlaceName }}
      </h1>
      <p class="text-gray-600 text-sm mt-1">{{ Place.PlaceDescription }}</p>

      <img
        class=" object-cover mt-2 rounded-2xl md:w-full  "
        :src="getimage(Place.image)" 
        alt="NIKE AIR" >
        
     
      <div class="flex items-center justify-between px-4 py-2 bg-gray-900 md:w-full">
        <h1 class="text-gray-200 font-bold text-xl">
          ${{ Place.PlaceCost }}
        </h1>
        <p
          class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded md:w-1/2"
        >
          {{ Place.brand.brandName }}
        </p>
      </div>
      <div class="flex items-center justify-between px-4 py-2 bg-gray-900 md:w-full">
        <h1 class="text-gray-200 font-bold text-xl">
          {{ Place.PlaceDate }}
        </h1>

        <p
          class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
        >
          
        </p>
      </div>

      <div class="flex items-center justify-center px-4 py-2 bg-gray-900 md:w-full">
        <div class="flex" v-for="color in Place.PlaceColors" :key="color.id">
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
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-blue-900"
            v-if="color.color.colorName == 'Navy'"
          ></button>
           <button
            class="ml-1 rounded-full w-6 h-6 focus:outline-none bg-yellow-100"
            v-if="color.color.colorName == 'Beige'"
          ></button>
        </div>
      </div>
      <button @click="showData(Place)">
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
      <button @click="deletePlace(Place.PlaceId)" >
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
        id="PlaceName"
        name="PlaceName"
        type="text"
        v-model.trim="enteredName"
        @blur="validateName"
        placeholder="Your PlaceName"
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
      id="PlaceDescription"
      cols="10"
      rows="3"
      class="border p-2 mt-3 w-full"
      :class="{ 'bg-red-50': ErrorDescription }"
      v-model.trim="enteredDescription"
      @blur="validateDescription"
      placeholder="Your PlaceDescription"
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
          id="PlaceCost"
          type="number"
          step="0.01"
          min="0"
          max="99999"
          v-model.trim="enteredPrice"
          @blur="validatePrice"
          placeholder="10000.00"
        />

        <p v-if="ErrorPrice" class="text-red-500">Enter Your PlaceCost</p>
      </div>
      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-state"
        >
          Date
        </label>
        <div class="relative">
          <input type="date" v-model="PlaceDate" @blur="validateDate" />

          <p v-if="ErrorDate" class="text-red-500">Enter Your Date</p>
        </div>
      </div>

      <div class="md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="grid-zip"
        >
          Place Color
        </label>
        <div class="grid grid-cols-5">
        <div class="bg-black w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-white rounded-full w-6 h-6 focus-outline-black"
          v-model="PlaceColors"
          :value="Colorlist.Black"
          @blur="validateColor"
        />
        </div>
        <div class="bg-gray-100 w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-black rounded-full w-6 h-6 focus-outline-black"
          v-model="PlaceColors"
          :value="Colorlist.White"
        />
        </div>
        <div class="bg-gray-500 w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="PlaceColors"
          :value="Colorlist.Gray"
        />
        </div>
        <div class="bg-blue-900 w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="PlaceColors"
          :value="Colorlist.Navy"
        />
        </div>
        <div class="bg-yellow-100 w-12  pt-3 pb-2 pr-1">
        <input
          type="checkbox"
          class="ml-1 bg-gray-500 rounded-full w-6 h-6 focus-outline-black"
          v-model="PlaceColors"
          :value="Colorlist.Beige"
        />
        </div>
      </div>
      </div>
      <p v-if="ErrorColor" class="text-red-500">**</p>
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
              
            </template>
           
          </div>
         
 </div>

    <input
      type="submit"
      value="Submit"
      class="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
    />
  </form>
 </div>

 <button @click="reset">Clear All</button>
</template>



<script>
export default {
  name: "ShowPlace",
  components: {},
  data() {
    return {
      preview: null,
      pic : null,
       isEdit: false,
      editId: "",
      url:"http://40.76.71.12:8081",    
      enteredName: "",
      ErrorName: false,
      enteredPrice: "",
      ErrorPrice: false,
      PlaceList: [],
      brand: null,
      PlaceDate: null,
      PlaceColors: [],
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
    
    reset: function() {
      this.preview = null;
      this.pic = null;
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
    getimage(image){
      return `${this.url}/image/${image}`
    },
    submitForm() {
      this.ErrorName = this.enteredName === "" ? true : false;
      this.ErrorPrice = this.enteredPrice === "" ? true : false;
      this.ErrorDescription = this.enteredDescription === "" ? true : false;
      this.Errorbrand = this.brand === null ? true : false;
      this.ErrorColor = this.PlaceColors === null ? true : false;
      this.ErrorDate = this.PlaceDate === null ? true : false;
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
            this.editPlace();
          } else {
            this.newPlace();
          }
        }
      }
      this.isEdit = false;
      this.enteredName = "";
      this.enteredPrice = "";
      this.brand = null;
      this.PlaceDate = null;
      this.PlaceColors = null;
      this.enteredDescription = "";
      this.preview = null;
      this.image = null;
      setTimeout(location.href="http://40.76.71.12:8080", 3000);
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
      this.ErrorDate = this.PlaceDate === null ? true : false;
      console.log(`name: ${this.ErrorDate}`);
    },
    validateColor(){
      this.ErrorColor = this.PlaceColors === null ? true : false;
      console.log(`name: ${this.ErrorColor}`)
    },
    showData(Place) {
      this.isEdit = true;
      this.editId = Place.PlaceId;
      this.enteredName = Place.PlaceName;
      this.enteredPrice = Place.PlaceCost;
      this.brand = Place.brand;
      this.PlaceDate = Place.PlaceDate;
      this.PlaceColors = Place.PlaceColors;
      this.enteredDescription = Place.PlaceDescription;
      this.image = Place.image;
    },
    async getPlaceList() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
    async deletePlace(deleteId) {
      try {
        await fetch(`${this.url}/${deleteId}`, {
          method: "DELETE",
        });
       
        this.PlaceList = this.PlaceList.filter(
          (Place) => Place.PlaceId !== deleteId
        );
      } catch (error) {
        console.log(`Could not delete! ${error}`);
      }
    },
    editPlace() {
      {
        let Place = {
          PlaceId: 0,
          PlaceName: this.enteredName,
          PlaceCost: this.enteredPrice,
          PlaceDescription: this.enteredDescription,
          PlaceDate: this.PlaceDate,
          image: this.image,
          brand: this.brand,
          PlaceColors: [],
        };
        for (const color of this.PlaceColors) {
          Place.PlaceColors.push(color);
        }
    
        const jsonPlace = JSON.stringify(Place);
        console.log(jsonPlace);
        const blob = new Blob([jsonPlace], {
          type: "application/json",
        });
        console.log(blob)
        const formdata = new FormData();
        formdata.append("newPlace", blob);
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
    this.PlaceList = await this.getPlaceList();
  },
  
};
</script>