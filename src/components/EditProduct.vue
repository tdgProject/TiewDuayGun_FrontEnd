<template>
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
  name: 'EditProduct',
  props: {
    
  }
}
</script>