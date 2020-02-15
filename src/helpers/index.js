const getTimePassed = date => {
    const timePassed = Math.floor((Date.now() - new Date(date)) / 86400000);
    return timePassed > 0 ? timePassed + ' days ago' : 'today'
}

export {
  getTimePassed
}
