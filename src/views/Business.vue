<template>
    <div class="d-flex w-screen h-screen bg-warning">
    <div class="container contact-form align-self-center">
        <div class="contact-image d-flex justify-content-center">
            <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
        </div>
        <form method="post">
            <h3 class="font-bold text-3xl">Business Request to Admin</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group pb-2">
                    <input type="text" name="bsName" class="form-control" placeholder="Legal Name of Business *" value="" />
                </div>
                <div class="form-group py-2">
                    <input type="email" name="bsEmail" class="form-control" placeholder="Business Email *" value="" />
                </div>
                <div class="form-group py-2">
                    <input type="text" name="bsPhone" class="form-control" placeholder="Business Phone Number *" value="" />
                </div>
                <div class="form-group mt-3">
                    <input type="submit" name="btnSubmit" class="btnContact" value="Send Request" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <textarea name="txtMsg" class="form-control" placeholder="Business Address *" style="width: 100%; height: 150px;"></textarea>  
                </div>
                <div class="input-group mt-1 w-100 d-flex justify-between form-control">
                    <div class="custom-file d-flex align-items-center">
                        <input type="file" multiple>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" id="">Upload</span>
                    </div>
                </div>
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

<style scoped>
.contact-form{
    background: #fff;
    margin-bottom: 5%;
    width: 70%;
}
.contact-form .form-control{
    border-radius:1rem;
}
.contact-image{
    text-align: center;
}
.contact-image img{
    border-radius: 6rem;
    width: 11%;
    margin-top: -3%;
    transform: rotate(29deg);
}
.contact-form form{
    padding: 14%;
}
.contact-form form .row{
    margin-bottom: -7%;
}
.contact-form h3{
    margin-bottom: 8%;
    margin-top: -10%;
    text-align: center;
    color: #0062cc;
}
.contact-form .btnContact {
    width: 50%;
    border: none;
    border-radius: 1rem;
    padding: 1.5%;
    background: #dc3545;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
}
.btnContactSubmit
{
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    color: #fff;
    background-color: #0062cc;
    border: none;
    cursor: pointer;
}
</style>