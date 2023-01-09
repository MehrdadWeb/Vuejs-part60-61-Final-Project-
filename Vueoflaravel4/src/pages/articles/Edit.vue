<template>
  <div v-if="pageLoading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="col-md-6">
    <h2 class="mb-5">Edit Article :</h2>

    <ArticleForm @formData="updateArticle" :button-loading="loading" button-text="Edit Article" :article="article" />
    <!--  button-loading=="loading"==false 
          @form-data is true also
      @formData="updatePost"    is emit ,receive from child
      :button-loading="loading" is props ,send to child 
      button-text="Edit Post"   is props ,send to child 
      :post="post"              is props ,send to child 
    -->
  </div>
</template>

<script>
import ArticleForm from "@/components/articles/Form.vue";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

export default {
  components: {
    ArticleForm,
  },
  setup() {
    const loading = ref(false);     // loading => Form.vue => button
    const pageLoading = ref(true);  // loading => Edit.vue
    const article = ref({});
    const route = useRoute();

    function getArticle() {
      axios
        .get(`http://laravel4.cod/api/articles/${route.params.id}`)
        .then(function (response) {
          /**
          form.title = response.data.title
          form.body = response.data.body
          */
          article.value = response.data;
          pageLoading.value = false
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getArticle();
    
    function updateArticle(formData) {
      loading.value = true;         // loading => Form.vue => button
      console.log();
      axios
        .put(`http://laravel4.cod/api/articles/${route.params.id}`, {
          id: route.params.id,
/*        title: form.title,
          body: form.body,  */ 
          title: formData.title,
          body: formData.body,
          userId: 1,
        })
        .then(function () {
          loading.value = false;    // loading => Form.vue => button

          Swal.fire({
            title: "Thanks!",
            text: `Article "${route.params.id}" update successfully`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return { updateArticle, loading, article,pageLoading };
  },
};
</script>

<style>
</style>