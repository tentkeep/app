import logger from '@/js/logger'

function loadYouTube () {
  return new Promise((resolve, reject) => {
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
      window.onYouTubeIframeAPIReady = () => {
        logger.log('loaded YouTube API')
        resolve()
      }
    } else {
      resolve()
    }
  })
}

function onPlayerReady (event) {
  event.target.playVideo()
}

// function onPlayerStateChange

const getYouTubePlayer = async (domId, videoId, events) => {
  await loadYouTube()
  const YT = window.YT
  const player = new YT.Player(domId, {
    height: `${window.innerHeight / 4}px`,
    width: '100%',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: (event) => {
        if (events.onPause && [YT.PlayerState.PAUSED, YT.PlayerState.ENDED].includes(event.data)) {
          events.onPause(player)
        }
      }
    }
  })
  return player
}

export default {
  getYouTubePlayer
}
