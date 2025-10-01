// scripts/components/button.js

export function initButtons() {
  console.log('Buttons component initialized')

  const buttons = document.querySelectorAll('.button')
  if (!buttons.length) return

  buttons.forEach((button) => {
    // Ripple effect
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span')
      circle.className = 'button-ripple'

      const diameter = Math.max(this.clientWidth, this.clientHeight)
      const radius = diameter / 2

      circle.style.width = circle.style.height = `${diameter}px`
      circle.style.left = `${e.clientX - this.offsetLeft - radius}px`
      circle.style.top = `${e.clientY - this.offsetTop - radius}px`

      this.appendChild(circle)

      // Remove ripple after animation
      setTimeout(() => {
        if (circle.parentNode === this) {
          this.removeChild(circle)
        }
      }, 600)
    })

    // Loading state
    button.addEventListener('click', async function () {
      if (this.hasAttribute('data-loading')) return

      const originalText = this.textContent
      this.setAttribute('data-loading', 'true')
      this.innerHTML = '<span class="button-spinner"></span> Loading...'
      this.disabled = true

      // Simulate async operation
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } finally {
        this.removeAttribute('data-loading')
        this.textContent = originalText
        this.disabled = false
      }
    })
  })
}

export function createButton(text, type = 'primary') {
  const button = document.createElement('button')
  button.className = `button button--${type}`
  button.textContent = text
  button.type = 'button'

  return button
}

// Auto-init if script is loaded directly
if (import.meta.env?.DEV) {
  document.addEventListener('DOMContentLoaded', initButtons)
}
