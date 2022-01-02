<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="first-name">First name</label>
      <div>
        <input id="first-name" type="text" v-model="firstName" required autofocus />
      </div>

      <label for="last-name">Last name</label>
      <div>
        <input id="last-name" type="text" v-model="lastName" required />
      </div>

      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <!--      <label for="password-confirm">Is this an administrator account?</label>-->
      <!--      <div>-->
      <!--        <select v-model="is_admin">-->
      <!--          <option value=1>Yes</option>-->
      <!--          <option value=0>No</option>-->
      <!--        </select>-->
      <!--      </div>-->

      <div>
        <button type="submit" @click="handleSubmit">
          Register
        </button>
      </div>

      <p>{{ message }}</p>
    </form>
  </div>
</template>
<script>
import AuthService from './../services/auth.service'

export default {
  name: 'Register',
  props: ['nextUrl'],
  data () {
    return {
      message: '',
      firstName: 'Wojciech',
      lastName: 'Falkowski',
      email: 'wojtexfalkowski@gmail.com',
      password: 'Admin123',
      password_confirmation: 'Admin123'
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      if (this.password === this.password_confirmation && this.password.length > 0) {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }
        AuthService.register(user).then(res => {
          this.message = res.message
        })
      } else {
        this.password = ''
        this.passwordConfirm = ''

        return alert('Passwords do not match')
      }
    }
  }
}
</script>