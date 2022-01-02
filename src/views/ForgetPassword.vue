<template>
  <div>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>

      <div>
        <button type="submit" @click="handleSubmit">
          Forget Password
        </button>
      </div>
      <p>{{ message }}</p>
    </form>
  </div>
</template>

<script>
import AuthService from './../services/auth.service'

export default {
  name: 'ForgetPassword',
  data () {
    return {
      message: '',
      email: 'wojtexfalkowski@gmail.com'
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      if (this.email) {
        AuthService.forgetPassword(this.email).then((res) => {
          this.message = res.message
        })
      }
    }
  }
}
</script>
