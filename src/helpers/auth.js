const handleJWTToken = (token) => {
  window.localStorage.setItem('token', token)
}

const removeJWTToken = () => {
  window.localStorage.removeItem('token')
}

const getJWTToken = () => {
  return window.localStorage.getItem('token')
}


export {
  handleJWTToken,
  removeJWTToken,
  getJWTToken
}
