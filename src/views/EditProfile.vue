
<template>
  <div class="bbb_viewed_title_container container">
    <h3 class="bbb_viewed_title" id="texttest">Edit Profile</h3>
    <div class="bbb_viewed_nav_container">
      <div class="bbb_viewed_nav bbb_viewed_prev">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div class="bbb_viewed_nav bbb_viewed_next">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  </div>
  <div class="">
    <div class="grid place-items-center mr-48 " v-if="showdata">
      <form  @submit.prevent="EditUser()">
        <div class="mx-20 w-100 mt-4 mb-4 p-4 shadow-lg rounded-xl bg-white">
          <div class="" style="left: -40px">
            <i
              class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"
            ></i>
          </div>

          <div class="form-group mt-10 border-1">
            <div v-if="setPreview()" class="p-2 mt-3 object-center">
              <template v-if="preview">
                <div class="d-flex justify-content-center ">
                  <img :src="preview" class="border-1 border-black h-52 w-52" />
                </div>
              </template>
            </div>
            <input
              class="mt-10 ml-10 mb-4"
              type="file"
              id="image"
              name="image"
              accept="image/*,"
              @change="upfile"
            />
          </div>
          <p class="mt-10" id="texttest">Username</p>
          <div class="flex space-x-5 mt-1">
            <input
              type="text"
              name="username"
              id="texttest"
              placeholder="Insert Your Username"
              class="border p-2 w-full"
              v-model="username"
              required
              title="Username must be at least 3 or more characters"
              oninput="this.value = this.value.replace(/[^0-9(a-z)(A-Z)]/g, '').replace(/(\..*)\./g, '$1');"
              minlength="3"
              maxlength="100"
            />
          </div>
          <p class="mt-2">Tel.</p>
          <input
            name="telNumber"
            type="tel"
            id="texttest"
            cols="10"
            rows="3"
            placeholder="Insert Your Telephone Number"
            class="border p-2 mt-1 w-full"
            minlength="9"
            maxlength="10"
            pattern="\d{9,10}"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            title="Telephone number must be 9-10 characters"
            v-model="user.telNumber"
            required
          />

          <input
            id="texttest"
            type="submit"
            value="Submit"
            class="
              w-full
              mt-10
              mb-10
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-semibold
              p-3
            "
          />
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
        </div>
      </form>
    </div>
    <div class="al w-full h-screen" v-if="complete">
      <div
        class="stk h-screen d-flex align-items-center justify-content-center"
      >
        <div
          class="
            w-1/5
            bg-white
            d-flex
            flex-col
            align-items-center
            justify-content-center
            rounded
          "
        >
          <div
            class="
              bg-dark
              w-full
              h-1/6
              rounded-top
              text-start text-white
              p-1
              px-3
            "
            id="texttest"
          >
            Waiting for Process
          </div>
          <img class="w-1/12 my-4" src="../assets/hug.gif" />
          <p class="text-2xl" id="texttest">Editing Profile...</p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="
      flex
      items-center
      justify-center
      min-h-screen
      bg-indigo-500 bg-fixed bg-cover bg-bottom
      error-bg
    "
    v-if="show404"
    style="
      background-image: url(
        data:image/svg + xml,
        %3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='0 0 1600 900'%3E%3Cpolygonfill='%23f0b608'points='957 450 539 900 1396 900'/%3E%3Cpolygonfill='%23e6d710'points='957 450 872.9 900 1396 900'/%3E%3Cpolygonfill='%23e7af05'points='-60 900 398 662 816 900'/%3E%3Cpolygonfill='%23e7d808'points='337 900 398 662 816 900'/%3E%3Cpolygonfill='%23d8a408'points='1203 546 1552 900 876 900'/%3E%3Cpolygonfill='%23f1e213'points='1203 546 1552 900 1162 900'/%3E%3Cpolygonfill='%23f0b607'points='641 695 886 900 367 900'/%3E%3Cpolygonfill='%23e4d506'points='587 900 641 695 886 900'/%3E%3Cpolygonfill='%23eab822'points='1710 900 1401 632 1096 900'/%3E%3Cpolygonfill='%23e8da14'points='1710 900 1401 632 1365 900'/%3E%3Cpolygonfill='%23e8b008'points='1210 900 971 687 725 900'/%3E%3Cpolygonfill='%23edde14'points='943 900 1210 900 971 687'/%3E%3C/svg%3E
      );
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
          <div class="relative">
            <h1
              class="
                relative
                text-9xl
                tracking-tighter-less
                text-shadow
                font-sans font-bold
              "
            >
              <span>4</span><span>0</span><span>4</span>
            </h1>
            <span class="absolute top-0 -ml-12 text-gray-300 font-semibold"
              >Oops!</span
            >
          </div>
          <h5 class="text-gray-300 font-semibold -mr-10 -mt-3">
            You must Login First!
          </h5>
          <p class="text-gray-100 mt-2 mb-6">
            You must Login before you go to this Page
          </p>
          <a href="/"
            class="
              bg-green-400
              px-5
              py-3
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              text-gray-50
              rounded-full
              hover:shadow-lg
            "
          >
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
  props: ["uid"],

  name: "EditProfile",
  data() {
    return {
      preview: null,
      image: null,
      username: this.user.username,
      telNumber: "",
      email: "",
      editId: "",
      isSet: false,
      previewSet: false,
      message: null,
      errorMessage: null,
      complete: false,
    };
  },

  methods: {
    EditUser() {
      let newUser = {
        userId: 0,
        username: this.username,
        telNumber: this.user.telNumber,
        email: this.user.email,
        image: "",
      };
      const jsonProduct = JSON.stringify(newUser);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      let formdata = new FormData();
      formdata.append("newUser", blob);
      formdata.append("image", this.image);
      this.$store
        .dispatch("editUser", { data: formdata, uid: this.user.id })
        .then(
          (data) => {
            this.errorMessage = null;
            this.message = data.message;
            this.complete = true;
            setTimeout(
              () => (window.location.href = "/Profile/" + this.user.id),
              2000
            );
          },
          (error) => {
            this.message = null;
            this.errorMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.complete = false;
          }
        );
    },

    setPreview() {
      if (this.preview == null) {
        this.preview = this.$store.state.url + "image/user/" + this.user.image;
      }
      this.previewSet = true;
      return this.previewSet;
    },
    upfile(e) {
      let file = e.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name);
      this.image = data.get("file");

      var input = e.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
  computed: {
    show404: function () {
      let show = true;
      if (this.user.id !== 0) {
        show = false;
      }
      return show;
    },

    showdata: function () {
      let show = true;

      if (this.user.id == 0) {
        show = false;
      }
      return show;
    },
  },

  setup() {
    const store = useStore();

    let user = computed(function () {
      return store.state.user;
    });

    return {
      user,
    };
  },
};
</script>
<style scoped>
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

.al {
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
}
.stk {
  z-index: 6;
  top: 0;
  left: 0;
  position: sticky;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}
</style>

