const tryGet = (accessor, fallback) => {
  try {
    return accessor()
  } catch {
    return fallback
  }
}

export default {
  tryGet
}
