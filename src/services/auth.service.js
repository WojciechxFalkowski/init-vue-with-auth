class AuthService {
  async currentUser () {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/current-user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    const res = await response.json()
    return res.data
  }

  async login (user) {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  }

  setToken (token) {
    const now = new Date()
    const item = {
      token: token,
      expiry: now.getTime() + 1000 * 10
    }
    localStorage.setItem('jwt', JSON.stringify(item))
  }

  getToken () {
    const res = localStorage.getItem('jwt')
    const jwt = JSON.parse(res)
    const now = (new Date()).getTime()
    if (jwt && jwt !== 'undefined' && jwt.token) {
      if (jwt.expiry > now) {
        return jwt.token
      } else {
        this.removeToken()
        return null
      }
    } else {
      return null
    }
  }

  removeToken () {
    localStorage.removeItem('jwt');
  }

  logout () {
    this.removeToken()
  }

  checkToken () {
    const token = this.getToken()
    return token && token.length > 0
  }

  async register (user) {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return response.json()
  }

  async verifyUser (id) {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/verify/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  }

  async forgetPassword (email) {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    return response.json()
  }

  async resetPasswordCheckEmail (token) {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/reset-password-check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    return response.json()
  }

  async resetPassword (token, password) {
    const response = await fetch(`${process.env.VUE_APP_BACKEND_API}auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, password })
    })
    return response.json()
  }
}

export default new AuthService();