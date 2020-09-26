let _music

const music = () => {
  return new Promise((resolve, reject) => {
    if (!window.MusicKit) {
      const script = document.createElement('script')
      script.src = 'https://js-cdn.music.apple.com/musickit/v1/musickit.js'
      document.head.appendChild(script)

      document.addEventListener('musickitloaded', function () {
        console.log('loaded MusicKit')
        window.MusicKit.configure({
          developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpHNjM5SjNKMjYifQ.eyJpYXQiOjE2MDA3NTA3NzYsImV4cCI6MTYxNjMwMjc3NiwiaXNzIjoiTDIyM0ZNOVRMQSJ9.nRUGN7B5wllQvMCGrO1KuIYTWOJVepQr8UU0hlhcIJFPjm0oRyeBRJ0b99fgSqcK79nZfvpNlcMLmcRec07T6w',
          app: {
            name: 'Tentkeep',
            build: '1.0.0'
          }
        })
        _music = window.MusicKit.getInstance()
        resolve(_music)
      })
    } else {
      _music = window.MusicKit.getInstance()
      resolve(_music)
    }
  })
}

const buildMediaItem = item => {
  return new window.MusicKit.MediaItem({
    id: item.id,
    kind: item.services.apple.kind,
    attributes: {
      previews: [{ url: item.preview }],
      url: item.services.apple.url
    },
    container: {
      id: item.id
    }
  })
}

export default {
  playNow (item) {
    return music()
      .then(m => {
        const mediaItem = buildMediaItem(item)
        m.player.queue.append({ items: [mediaItem] })
        m.player.play()
      })
  },
  addEventListener (event, callback) {
    console.log('add listener', event)
    music().then(m => {
      m.addEventListener(event, callback)
    })
  }
}
