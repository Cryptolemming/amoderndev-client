const handleJWTToken = (token) => {
  window.localStorage.setItem('token', token)
}

export {
  handleJWTToken
}
