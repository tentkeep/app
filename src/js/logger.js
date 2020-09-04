export default {
  error (...args) {
    console.trace()
    console.error(...args)
  }
}
