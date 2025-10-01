// scripts/components/hero-animation.js

export function initHeroAnimation() {
  console.log('Hero animation initialized')

  const heroSection = document.querySelector('.hero')
  if (!heroSection) return

  // Intersection Observer для анимации появления
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateHeroElements(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  observer.observe(heroSection)

  // Parallax effect
  let isParallaxEnabled = true

  window.addEventListener('scroll', () => {
    if (!isParallaxEnabled) return

    const scrolled = window.pageYOffset
    const parallaxElements = heroSection.querySelectorAll('[data-parallax]')

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Typewriter effect for title
  const title = heroSection.querySelector('h1')
  if (title && !title.hasAttribute('data-animated')) {
    typewriterEffect(title, 100)
    title.setAttribute('data-animated', 'true')
  }
}

function animateHeroElements(hero) {
  // Анимация элементов героя
  const elements = hero.querySelectorAll('h1, p, .button')

  elements.forEach((element, index) => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(30px)'

    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, index * 200)
  })
}

function typewriterEffect(element, speed = 100) {
  const text = element.textContent
  element.textContent = ''

  let i = 0
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Дополнительные функции для управления анимацией
export function pauseAnimations() {
  const hero = document.querySelector('.hero')
  if (hero) {
    hero.style.animationPlayState = 'paused'
  }
}

export function resumeAnimations() {
  const hero = document.querySelector('.hero')
  if (hero) {
    hero.style.animationPlayState = 'running'
  }
}
