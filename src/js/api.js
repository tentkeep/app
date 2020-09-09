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
  getPodcastSummary: feedUrl => appApi(`${host}/proxy/rss/podcast-summary?feed=${feedUrl}`),
  // Galleries
  getGalleries: () => appApi(`${host}/galleries`),
  getGalleriesForUser: token => appApi(`${host}/galleries/me`, { headers: authHeaders(token) }),
  getGalleryImageUrl: galleryId => `${host}/galleries/${galleryId}/image`,
  getGalleryItems: galleryId => appApi(`${host}/galleries/${galleryId}/items`),
  getGalleryUserRole: (token, galleryId) => appApi(`${host}/galleries/${galleryId}/users/me`, {
    headers: authHeaders(token)
  }),
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
  },
  saveGalleryItem: (token, { galleryId, ...body }) => appApi(`${host}/galleries/${galleryId}/items`, {
    method: 'post',
    headers: headersForPost(token),
    body
  }),
  // non-Tentkeep
  searchPodcasts: (query) => appApi(`https://itunes.apple.com/search?entity=podcast&limit=20&term=${query}`)
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

const authHeaders = token => ({
  Authorization: `Bearer ${token}`
})

const headersForPost = token => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
})
