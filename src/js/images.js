function resizeImage (file, { maxSize, outputType = 'blob', outputMime = 'image/jpeg' }) {
  return new Promise((resolve) => {
    if (!file) { throw new Error('no input file provided') }
    if (!maxSize) { throw new Error('no maxSize provided') }
    if (!window.FileReader) { throw new Error('The File APIs are not fully supported in this browser.') }

    var reader = new FileReader()
    reader.onload = e => {
      var img = document.createElement('img')
      img.onload = imageEvent => {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        var width = img.width
        var height = img.height
        console.log('WH1', width, height)

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }
        canvas.width = width
        canvas.height = height
        var outputCtx = canvas.getContext('2d')
        outputCtx.drawImage(img, 0, 0, width, height)

        if (outputType === 'blob') {
          canvas.toBlob(blob => {
            resolve(blob)
          }, outputMime)
        } else {
          resolve(canvas.toDataURL(outputMime))
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default {
  resizeImage
}
