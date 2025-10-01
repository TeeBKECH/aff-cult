import { hexToRgba } from '@/scripts/utils/hexToRGBA.js'

export function topicIconColor() {
  const icons = document.querySelectorAll('.topic_item_icon, .box_topic')
  if (icons?.length > 0) {
    icons.forEach((icon) => {
      const color = icon.getAttribute('data-color')
      const rgbaColor = hexToRgba(color, 1)
      icon.style.backgroundColor = rgbaColor
    })
  }
}
