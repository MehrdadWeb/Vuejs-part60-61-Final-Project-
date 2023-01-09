<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="col-md-4">
    <UserCardView :user="user" />
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import UserCardView from "@/components/users/CardView.vue";
import { useRoute } from "vue-router";
			//useRoute()=>info of current route اطلاعات مسیر جاری
			//useRoute().params & useRoute().query & useRoute().hash
			//useRouter()=>is a jsObject,switch between routes جابجایی بین مسیرها & 
			//useRouter().push('') 
export default {
  components: {
    UserCardView,
  },
  setup() {
    const user = ref({});
    const loading = ref(true);
    const route = useRoute();

    function getUser() {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${route.params.id}`)    //URL کد جاوا اسکریپت وسط  , ${route.params.id} is a param => /users/1
        .then(function (response) {
          user.value = response.data;
          loading.value = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getUser();

    return { user, loading };
  },
};
</script>

<style>
</style>