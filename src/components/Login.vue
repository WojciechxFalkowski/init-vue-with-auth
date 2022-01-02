<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">
          Login
        </button>
      </div>
      <p>{{ message }}</p>
    </form>

    <router-link to="forget-password">Forget Password</router-link>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      message: '',
      email: 'wojtexfalkowski@gmail.com',
      password: 'Admin123'
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      if (this.password.length > 0) {
        this.$store.dispatch('auth/login', { email: this.email, password: this.password })
          .then((message) => {
            if (message) {
              this.message = message
            }
            if (this.checkToken) {
              this.$router.push('/dashboard')
            }
          })
      }
    }
  },
  computed: {
    checkToken () {
      return this.$store.getters['auth/checkToken']
    }
  }
}
</script>