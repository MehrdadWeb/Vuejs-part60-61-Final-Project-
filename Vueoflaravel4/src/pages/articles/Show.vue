<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="col-md-4">
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

        <div class="card-footer">
        <button @click="deletePost" type="submit" class="btn btn-sm btn-danger me-4" :disabled="deleteloading">
        <div
        v-if="deleteloading"
        class="spinner-border spinner-border-sm"
        role="status"
        ></div>
        Delete
        </button>
        <router-link class="btn btn-sm btn-dark" :to="{name:'editArticle' , params:{id:article.id}}">Edit</router-link>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
//useRoute()=>info of current route اطلاعات مسیر جاری
//useRoute().params & useRoute().query & useRoute().hash
//useRouter()=>is a jsObject,switch between routes جابجایی بین مسیرها &
//useRouter().push('')
export default {
  components: {},
  setup() {
    const article = ref({});
    const users = ref([]);
    const loading = ref(true);
    const route = useRoute();

    function getArticle() {
      axios
        .get(`http://laravel4.cod/api/articles/${route.params.id}`) //URL کد جاوا اسکریپت وسط  , ${route.params.id} is a param => /users/1
        .then(function(response) {
          article.value = response.data;
          loading.value = false;
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
          console.log(route.params.id);
          console.log(route.params);
        });
    }

    getArticle();

    function getUsers() {
      axios
        .get("http://laravel4.cod/api/users")
        .then(function(response) {
          users.value = response.data;
          loading.value = false;
          // console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    getUsers();

    return { article, loading, users };
  },
};
</script>

<style>
</style>