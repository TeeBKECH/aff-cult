export function renderPictureFromJpg(jpgUrl, alt = '', className = '') {
  const webpUrl = jpgUrl.replace(/\.jpe?g$/i, '.webp')

  const pictureEl = document.createElement('picture')
  if (className) pictureEl.className = className

  const source = document.createElement('source')
  source.type = 'image/webp'
  source.srcset = webpUrl
  pictureEl.appendChild(source)

  const img = document.createElement('img')
  img.src = jpgUrl // fallback для браузеров без WebP
  img.alt = alt
  img.loading = 'lazy'
  pictureEl.appendChild(img)

  return pictureEl
}
