// import heroJpg from '@/assets/images/hero.jpg'
// import { renderPictureFromJpg } from '@/scripts/utils/picture.js'

// const heroMount = document.querySelector('#hero-picture')
// if (heroMount) {
//   heroMount.appendChild(renderPictureFromJpg(heroJpg, 'Hero', 'hero-picture'))
// }

// // Если хотите просто <img> с webp в проде — можно так:
// const smallImg = document.querySelector('#small')
// if (smallImg) {
//   const webp = heroJpg.replace(/\.jpe?g$/i, '.webp')
//   smallImg.src = webp
//   // на всякий случай fallback, если вдруг нет поддержки/файла
//   smallImg.addEventListener(
//     'error',
//     () => {
//       smallImg.src = heroJpg
//     },
//     { once: true },
//   )
// }
