<template>
  <div class="about">
    <h1>Dashboard</h1>
    <div v-if="checkToken">
      <button @click="logout">Logout</button>
      <p>{{ checkToken }}</p>
      <p>{{ getUser.firstName }}</p>
      <p>{{ getUser.lastName }}</p>
      <p>{{ getUser.email }}</p>
      <p>{{ getUser.createdAt }}</p>
      <p>{{ getUser.updatedAt }}</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Dashboard',
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  },
  computed: {
    getUser () {
      return this.$store.state.auth.user
    },
    checkToken () {
      return this.$store.getters['auth/checkToken']
    }
  }
}
</script>