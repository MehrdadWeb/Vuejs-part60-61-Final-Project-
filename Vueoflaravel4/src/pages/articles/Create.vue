<template>
  <div class="col-md-6">
    <h2 class="mb-5">Create Article :</h2>

    <ArticleForm @formData="createArticle" :button-loading="loading" button-text="Create Article" />
    <!--  button-loading=="loading"==false 
          @form-data is true also
    -->
  </div>
</template>

<script>
import ArticleForm from "@/components/articles/Form.vue";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    ArticleForm,
  },
  setup() {
    const loading = ref(false);       // loading => Form.vue => button

    function createArticle(formData) {
      loading.value = true;          // loading => Form.vue => button
      // این نام ها باید با نام های فیلدهای جدول دیتابیس یکی باشند
      axios
        .post("http://laravel4.cod/api/articles/store", {
          name: formData.name,
          description: formData.description,
          slug: formData.slug,
          status : formData.selected,
          user_id: 1,
          hit:1,
          image:'/photos/1/thumbs/6.jpg',
          categories :formData.selected2,
        })
        .then(function () {
          loading.value = false;    // loading => Form.vue => button

          Swal.fire({
            title: "Thanks!",
            text: `Article " ${formData.name} "  created successfully`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch(function (error) {
          // loading.value = false;
          console.log(error);
        });
    }

    return { createArticle, loading };
  },
};
</script>

<style>
</style>