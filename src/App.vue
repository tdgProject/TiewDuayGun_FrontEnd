<template>
  <div id="nav" class="text-center bg-gray-500 h-12">
    <router-link to="/" id="home">Home</router-link>
    <router-link to="/all" id="all">All</router-link>
    <router-link to="/tag" id="tag">Tag</router-link>
    <router-link to="/Profile" id="profile">Abour us</router-link>
    <router-link to="/Signup" id="login">Login</router-link> 
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#home{
  padding: 50px;
}
#all{
  padding: 50px;
}
#tag{
  padding: 50px;
}
#profile{
  padding: 50px;
}
#login{
  padding: 50px;
}
</style>
