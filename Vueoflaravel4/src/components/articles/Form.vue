<template>
  <form @submit.prevent="validate">
    <!-- name نام دسته بندی  -->
    <div class="mb-3">
      <label class="form-label">عنوان مطلب جدید</label>
      <input type="text" class="form-control" v-model="form.name" />
      <div  v-for="article in articles" :key="article.id">
        <li style="display: none;" v-if="article.name == form.name">
          {{ duplicate() }}
        </li>
      </div>
      <div class="form-text text-danger">
        {{ form.nameErrorText }}
      </div>
      <div class="form-text text-danger">
        {{ form.nameErrorTextofunique }}
      </div>
    </div>
    <!-- slug -->
    <div class="mb-3">
      <label class="form-label">>نام مستعار - Slug</label>
      <input type="text" class="form-control" v-model.lazy.trim="form.slug" />
      <div class="form-text text-danger">
        {{ form.slugErrorText }}
      </div>
    </div>
    <!-- description محتوای مطلب editor -->
    <div class="mb-3">
      <label class="form-label">محتوای مطلب</label>
      <textarea
        class="form-control"
        rows="6"
        v-model.lazy.trim="form.description"
      ></textarea>
      <div class="form-text text-danger">
        {{ form.descriptionErrorText }}
      </div>
    </div>
    <!-- status وضعیت -->
    <div class="mb-3">
      <label class="form-label">وضعیت</label>
      <div>Selected: {{ form.selected }}</div>
      <select  v-model.lazy.trim="form.selected" id="status" name="status" class="form-control">
        <option value="0">منتشر نشده</option>
        <option value="1">منتشر شده</option>
      </select>
      <div class="form-text text-danger">
        {{ form.selectedErrorText }}
      </div>
    </div>
    <!-- categoies انتخاب دسته بندی -->
    <div class="mb-5">
      <label class="form-label">انتخاب دسته بندی</label>
      <div>Selected: {{ form.selected2 }}</div>
      <select v-model.lazy.trim="form.selected2"  id="categories" name="categories" multiple style="width:400px">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name  }}</option>
      </select>

      <div class="form-text text-danger">
        {{ form.selectedErrorText }}
      </div>
    </div>
    <!-- user_id نویسنده -->
<!--     <div class="form-group">
      <label for="user_id">
        <div  v-for="user in users" :key="user.id">
          <li v-if="article.user_id == user.id">نویسنده: {{ user.name }}</li>
        </div>
      </label>
      <input type="hidden" id="user_id" name="user_id" class="form-control" :value="user.name">
    </div>  -->   
    <!-- image2 -->
    <div class="mb-5">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary btn-primary" type="button"
        id="button-image">انتخاب</button>
      </div>
      <input type="text" id="image_label" class="form-control bg-success" name="image"
      aria-label="Image" aria-describedby="button-image" data-preview="holder">
    </div>
    <div class="bg-warning">
      <img id="holder" style="margin-top:15px;max-height:100px;">
    </div>    

    <hr>

    <button type="submit" class="btn btn-dark" :disabled="buttonLoading">
      <div
        v-if="buttonLoading"
        class="spinner-border spinner-border-sm"
        role="status"
      ></div>
      {{ buttonText }}
    </button>
  </form>

</template>

<script>
import { reactive } from "vue";
import { ref } from "vue";
import axios from "axios";

export default {
  props: {
    buttonLoading: Boolean,
    buttonText: String,
    article: Object,
  },
  setup(props, { emit }) {
    const users = ref([]);
    const articles = ref([]);
    // let article = ref([]);
    const categories = ref([]);
    console.log(props);
    // console.log(props.post);
    const form = reactive({
      name: "",
      nameErrorText: "",
      slug: "",
      slugErrorText: "",
      description: "",
      descriptionErrorText: "",
      selected: "",
      selected2: "",
      selectedErrorText: "",
      selected2ErrorText: "",
      nameErrorTextofunique :"",
    });
    /* reactive() for JS Object
const obj = reactive({
	a: "A",
	b: "B",
});
const obj = new Proxy(obj, handler) => Proxy{a: 'A', b: 'B'}   */
    function duplicate(){
      form.nameErrorTextofunique= "Name of Article is duplicated";
    }
    function setInput() {
      if (props.article !== undefined) {
        form.name = props.article.name;
        form.description = props.article.description;
      }
    }
    setInput();

    function getArticles() {
      axios
        .get("http://laravel4.cod/api/articles") 
        .then(function(response) {
          articles.value = response.data.data;
          // articles.value = response;
          // loading.value = false;
          // console.log(articles.value);
          // console.log(response.data);
          console.log(response.data.data);
          console.log(articles.value);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    getArticles();   

    function validate() {
      if (form.name === "") {
        form.nameErrorText = "Name of Article is required";
      } else {
        form.nameErrorText = "";
      }
      if (form.slug === "") {
        form.slugErrorText = "Slug of Article is required";
      } else {
        form.slugErrorText = "";
      }
      if (form.description === "") {
        form.descriptionErrorText = "description of Article is required";
      } else {
        form.descriptionErrorText = "";
      }
      if (form.selected === "") {
        form.selectedErrorText = "Please select one";
      } else {
        form.selectedErrorText = "";
      }
      if (form.selected2 === "") {
        form.selected2ErrorText = "Please select one category";
      } else {
        form.selected2ErrorText = "";
      }
/*       for(article.value in articles.value){
        if(article.value === form.name)
          form.nameErrorTextofunique= "Name of Article is duplictaed";
          console.log(articles.value);
      } */

      if (
        form.name !== "" &&
        form.description !== "" &&
        form.slug !== "" &&
        form.selected !== "" &&
        form.selected2 !== "" &&
        form.nameErrorTextofunique ===""
      ) {
        emit("formData", form);
      }
    }
    function getUsers() {
      axios
        .get("http://laravel4.cod/api/users")
        .then(function(response) {
          users.value = response.data;
          // loading.value = false;
          // console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    getUsers();

    function getCategories() {
      axios
        .get("http://laravel4.cod/api/categories")
        .then(function(response) {
          categories.value = response.data.data;
          // loading.value = false;
          // console.log(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    getCategories(); 

    return { form, validate, users, categories ,articles ,duplicate};
  },
};
</script>
<!-- <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>
<script src='http://harvesthq.github.io/chosen/chosen.jquery.js'></script> -->
<style>
</style>