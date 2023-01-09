<template>
  <div v-if="pageLoading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="col-md-6">
    <h2 class="mb-5">Edit Post :</h2>

    <PostForm @formData="updatePost" :button-loading="loading" button-text="Edit Post" :post="post" />
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
import PostForm from "@/components/posts/Form.vue";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

export default {
  components: {
    PostForm,
  },
  setup() {
    const loading = ref(false);     // loading => Form.vue => button
    const pageLoading = ref(true);  // loading => Edit.vue
    const post = ref({});
    const route = useRoute();

    function getPost() {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
        .then(function (response) {
          /**
          form.title = response.data.title
          form.body = response.data.body
          */
          post.value = response.data;
          pageLoading.value = false
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getPost();
    
    function updatePost(formData) {
      loading.value = true;         // loading => Form.vue => button
      console.log();
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`, {
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
            text: `Post "${route.params.id}" update successfully`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return { updatePost, loading, post,pageLoading };
  },
};
</script>

<style>
</style>