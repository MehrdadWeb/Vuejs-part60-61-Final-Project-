<template>
  <div class="col-md-6">
    <h2 class="mb-5">Create Post :</h2>

    <PostForm @formData="createPost" :button-loading="loading" button-text="Create Post" />
    <!--  button-loading=="loading"==false 
          @form-data is true also
    -->
  </div>
</template>

<script>
import PostForm from "@/components/posts/Form.vue";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    PostForm,
  },
  setup() {
    const loading = ref(false);       // loading => Form.vue => button

    function createPost(formData) {
      loading.value = true;          // loading => Form.vue => button
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
        /*title: form.title,
          body: form.body, */
          title: formData.title,
          body: formData.body,
          userId: 1,
        })
        .then(function () {
          loading.value = false;    // loading => Form.vue => button

          Swal.fire({
            title: "Thanks!",
            text: `Post " ${formData.title} "  created successfully`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return { createPost, loading };
  },
};
</script>

<style>
</style>