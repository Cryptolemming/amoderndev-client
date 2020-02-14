const handleJWTToken = (token) => {
  window.localStorage.setItem('token', token)
}

const removeJWTToken = () => {
  window.localStorage.removeItem('token')
}

export {
  handleJWTToken,
  removeJWTToken
}
