<template>
  <div>
    <p>Reset Password</p>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <div>
        <button type="submit" @click="handleSubmit">
          Save new password
        </button>
      </div>
      <p>{{ message }}</p>
    </form>
  </div>
</template>

<script>
import AuthService from './../services/auth.service'

export default {
  name: 'ResetPassword',
  data () {
    return {
      message: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  created () {
    AuthService.resetPasswordCheckEmail(this.$route.query.token).then((res) => {
      if (res.data && res.data.email) {
        this.email = res.data.email
      } else {
        this.message = res.message
      }
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      if (this.password === this.password_confirmation && this.password.length > 0) {
        AuthService.resetPassword(this.$route.query.token, this.password)
          .then((res) => {
            this.message = res.message
          })
      } else {
        this.password = ''
        this.password_confirmation = ''
        return alert('Passwords do not match')
      }
    }
  }
}
</script>
