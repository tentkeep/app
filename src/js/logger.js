export default {
  log (...args) {
    console.log(...args)
  },
  error (...args) {
    console.trace()
    console.error(...args)
  }
}
