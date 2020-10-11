const tryGet = (accessor, fallback) => {
  try {
    return accessor() || fallback
  } catch {
    return fallback
  }
}

export default {
  tryGet
}
