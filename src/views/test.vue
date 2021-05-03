<template>
    <div class="overflow-hidden relative w-64 mt-4 mb-4">
	<button class="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center">
     	<svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        	<path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
        </svg>
        <span class="ml-2">Upload Document</span>
    </button>
    <input
        class="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
        type="file"
        name="documents[]"
        accept="image/*"
    >
</div>
</template>