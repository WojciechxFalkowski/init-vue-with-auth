<template>
  <div>
    <p>Verify User</p>
    <p v-if="message.length>0">{{ message }}</p>
  </div>
</template>

<script>
import AuthService from './../services/auth.service'

export default {
  name: 'VerifyUser',
  data () {
    return {
      message: ''
    }
  },
  created () {
    AuthService.verifyUser(this.$route.params.id).then((res) => {
      if (res.token) {
        AuthService.setToken(res.token)
        AuthService.currentUser().then((user) => {
          this.$store.commit('auth/loginSuccess', res.token)
          this.$store.commit('auth/currentUser', user)
        })
      }
      this.message = res.message
    })
  }
}
</script>
