<template>
    <div class="container-fluid pt-12">
        <div class="w-3/4 m-auto p-10 justify-content-md-center rounded-3xl">
            <form>
                <div class="form-group py-3">
                    <label for="businessName">Legal Name of Business</label>
                    <input type="text" class="form-control" id="businessName" placeholder="Enter Business name as shown of official documents">
                </div>
                <div class="form-group py-3">
                    <label for="businessAddress">Business Address</label>
                    <textarea class="form-control" id="businessAddress" rows="4"></textarea>
                </div>
                <div class="form-group py-3">
                    <label for="businessEmail">Business Email</label>
                    <input type="email" class="form-control" id="businessEmail">
                </div>
                <div class="form-group py-3">
                    <label for="businessPhoneNumber">Business Phone Number</label>
                    <input type="text" class="form-control" id="businessPhoneNumber">
                </div>
                <div class="form-group py-3">
                    <label for="businessWebsite">Business Website</label>
                    <input type="text" class="form-control" id="businessWebsite">
                </div>
                    
                <div class="form-group py-3 d-flex">
                    <div class="w-1/2 border-3 p-2">
                        <label>Business Documents</label>
                        <div class="input-group py-3 d-flex justify-content-between">
                            <div class="custom-file">
                                <input type="file" class="w-3/4 m-1">
                            </div>
                            <div class="input-group-append mr-6">
                                <button class="input-group-text">Upload</button>
                            </div>
                        </div>
                    </div>
                <div class="w-1/2 p-6 d-flex flex-row-reverse item-align-center"> 
                    <button type="submit" class="btn btn-primary w-36">Submit</button>
                </div>
                </div>
                
               
            </form>
        </div>
    </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//     setup() {
        
//     },
// })
</script>