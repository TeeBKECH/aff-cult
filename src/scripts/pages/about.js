import { renderPictureFromJpg } from '@/scripts/utils/picture.js'
import hero from '@/assets/images/hero.jpg'

console.log('About page init')

const mount = document.querySelector('#about-picture')
if (mount) {
  const pic = renderPictureFromJpg([], hero, 'About hero', 'about-picture')
  mount.appendChild(pic)
}
