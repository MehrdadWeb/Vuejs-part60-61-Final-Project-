<template>
    <div>
    <router-link class="btn btn-dark" :to="{ name: 'createArticle' }">
      Create Article
    </router-link>
  </div>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="col-md-4" v-for="article in articles" :key="article.id">
    <div class="card">
        <!-- src="<?php/* echo '/photos/1/thumbs/' . basename($article->image); */?>" -->
        <!-- <img src="<?php echo '@/photos/1/thumbs/' . basename($article->image); ?>" alt="myImage" class="" style="margin-top:15px;max-height:100px;"> -->
        <img :src="article.image" class="" style="margin-top:150px;max-height:100px;">
        <!-- {{ article.image }} '{{ article.image }}' -->
        <h3><router-link :to="{ name : 'articleId' , params: { id: article.id } }">{{ article.name }}</router-link></h3>
                          
        <div>
          <ul>
            <!-- تیتر مطلب -->
            <li>
              <div  v-for="user in users" :key="user.id">
                <li v-if="article.user_id == user.id">نویسنده: {{ user.name }}</li>
              </div>
            </li>
            <li>slug:{{ article.slug }}</li>
            <li>تاریخ:{{ article.created_at }}</li>
            <li :style="newStyle">بازید:{{ article.hit }}</li>
          </ul>
        </div>
        <!-- خلاصه ای از این مطب Str::substr -->

        
    </div>
  </div>
  <!-- <img alt="Vue logo" src="@/assets/logo.png"/> -->
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { reactive } from "vue";

/**
ref() for JS Array & JS Variable
x=ref("y") => x : RefImpl {"_rawValue": "y","_shallow": false,"__v_isRef": true,"_value": "y"} JS Object or Ref Object */
//import UserCardView from "@/components/users/CardView.vue";
// http://laravel4.cod/articles

export default {
  components: {
    //UserCardView, //local register
  },
  setup() {
    const articles = ref([]);
    const loading = ref(true);
    const users = ref([]);
    const newStyle = reactive({
            fontSize: '20px', //camelCase
            border: '5px solid green'
    });

    function getArticles() {
      axios
        .get("http://laravel4.cod/api/articles") 
        .then(function(response) {
          articles.value = response.data.data;
          // articles.value = response;
          loading.value = false;
          // console.log(articles.value);
          // console.log(response.data);
          console.log(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    getArticles();

    function getUsers() {
      axios
        .get("http://laravel4.cod/api/users")
        .then(function (response) {
          users.value = response.data;
          loading.value = false;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getUsers();

    return { articles, loading,users,newStyle };
  },
};
</script>

<style>
</style>