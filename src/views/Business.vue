<template>

    <div class="d-flex w-screen h-screen bg-secondary" v-if="showdata"> 
    <div class="container contact-form align-self-center rounded-pill">
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

    <div class="flex items-center justify-center min-h-screen bg-indigo-500  bg-fixed bg-cover bg-bottom error-bg" v-if="show404"
	style="background-image: url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E);">

	<div class="container">
		<div class="row">
			<div class="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
				<div class="relative ">
				<h1 class="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
					<span>4</span><span>0</span><span>4</span></h1>
					<span class="absolute  top-0   -ml-12  text-gray-300 font-semibold">Oops!</span>
					</div>
				<h5 class="text-gray-300 font-semibold -mr-10 -mt-3">You Didnt logIn or Your Already have permission</h5>
				<p class="text-gray-100 mt-2 mb-6">You must Login before you go to this Page</p>
				<a
					class="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
					Got to Login
				</a>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  
  name: "Business",
  data(){
    
    return{

    }
  },
  
   
 computed: {
      show404: function () {
      let show = true;
        if(this.me.id !== 0){
        show = false;
      }
       if(this.me.roles){
        if(this.me.roles[0] =='business'){
        show = true;
      }
       if(this.me.roles[0] !=='business'){
        show = false;
      }
       }
      return show;
    },

    showdata: function () {
      let show = true;

      if(this.me.id == 0){
        show = false;
      }
      if(this.me.roles){
        if(this.me.roles[0] =='business'){
        show = false;
        }

      }
      return show;
    },
  },
  setup() {
    const store = useStore();
        let me = computed(function () {
      return store.state.user;
    });
    

    return {
      
      me
    };
  },
}

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