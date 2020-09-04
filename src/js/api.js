import logger from './logger'

const host = process.env.VUE_APP_API_URL

export default {
  exchangeAccessCode: code => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        grant_type: 'authorization_code',
        code
      }
    }
    return appApi(`${host}/auth/token`, options)
  },
  getGalleries: () => appApi(`${host}/galleries`),
  getGalleryImageUrl: galleryId => `${host}/galleries/${galleryId}/image`,
  saveGallery: (token, properties) => appApi(`${host}/galleries`, {
    method: 'post',
    headers: headersForPost(token),
    body: properties
  }),
  saveGalleryImage: async (token, galleryId, image) => {
    const body = {
      galleryId: galleryId,
      name: 'gallery-image',
      contentType: 'image/*'
    }
    const mediaPrepare = await appApi(`${host}/content/prepare`, {
      method: 'post',
      headers: headersForPost(token),
      body
    })
    const signedPutRequest = JSON.parse(Buffer.from(mediaPrepare.id, 'hex').toString('utf-8'))

    return fetch(signedPutRequest.url, {
      ...signedPutRequest.options,
      body: image
    })
      .then(nonOkStatusHandler)
  }
}

const appApi = (url, options) => {
  normalizeRequest(options)
  return fetch(url, options)
    .then(nonOkStatusHandler)
    .then(r => r.json())
}

const normalizeRequest = options => {
  if (!options) { return }
  if (typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }
}

const nonOkStatusHandler = result => {
  if (result.status >= 400) {
    logger.error(`Received status: ${result.status}`)
    throw new Error('Failed request: ' + result.status)
  }
  return result
}

const headersForPost = token => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
})
