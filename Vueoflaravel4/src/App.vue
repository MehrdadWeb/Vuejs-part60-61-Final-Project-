<template>
  <Header />

  <router-view></router-view>
  <!-- 
    <router-view>component(Home)=><template></template></router-view>
    <router-view>Template.vue</router-view> ==>
    <router-view>
      <div class="container mt-5">
        <div class="row g-3">
          <router-view>Index.vue,Show.vue,Edit.vue</router-view>
        </div>
      </div>
    </router-view>
  -->
</template>

<script>
import Header from './components/sections/Header.vue'
export default {
  name: "App",
  components : {
    Header // local Register , Header:Header
  }
};
</script>

<style>
</style>
