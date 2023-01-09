<template>
  <div class="card">
    <div class="card-header">
        <router-link :to="{ name : 'userId' , params: { id: user.id } }">{{ user.name }}</router-link>
        <!-- 
          <router-link to="/users">User</router-link> => router-link = a(HTML Element Tag,anchor) & to = href(HTML Element Attribute)
          <a href="/users">User</a>
         -->
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Username : {{ user.username }}</li>
      <li class="list-group-item">Email : {{ user.email }}</li>
      <li class="list-group-item">Phone : {{ user.phone }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        user:Object //user is transferred from Index.vue(Parent) to CardView.vue(Child)
    }
};
</script>

<style>
</style>