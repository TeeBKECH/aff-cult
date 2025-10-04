// core version + navigation, pagination modules:
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'

export function initSwipers() {
  const mainSwipers = document.querySelectorAll('.sWiper_wrapper_main')
  if (mainSwipers?.length > 0) {
    mainSwipers.forEach((swpr) => {
      const currentSwiper = swpr.querySelector('.sWiper')
      const prevArrow = swpr.querySelector('.sWiper_nav-prev')
      const nextArrow = swpr.querySelector('.sWiper_nav-next')
      const mainSwiper = new Swiper(currentSwiper, {
        modules: [Navigation],
        slidesPerView: 2,
        spaceBetween: 16,
        centeredSlides: false,
        loop: false,
        lazy: true,
        ResizeObserver: false,
        // autoplay: {
        //   delay: 5500,
        //   disableOnInteraction: false,
        // },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 24,
          },
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 1.3,
            spaceBetween: 16,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
        },
      })
    })
  }

  const postSwipers = document.querySelectorAll('#swiper-post-id')
  if (postSwipers?.length > 0) {
    postSwipers.forEach((swpr) => {
      const currentSwiper = swpr.querySelector('.sWiper')
      const prevArrow = swpr.querySelector('.sWiper_nav-prev')
      const nextArrow = swpr.querySelector('.sWiper_nav-next')
      const postSwiper = new Swiper(currentSwiper, {
        modules: [Navigation],
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: false,
        loop: false,
        lazy: true,
        ResizeObserver: false,
        // autoplay: {
        //   delay: 5500,
        //   disableOnInteraction: false,
        // },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1.1,
            spaceBetween: 16,
          },
          992: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
        },
      })
    })
  }

  const mediaConfSwipers = document.querySelectorAll('#sWiper-media-conf')
  if (mediaConfSwipers?.length > 0) {
    mediaConfSwipers.forEach((swpr) => {
      const currentSwiper = swpr.querySelector('.sWiper')
      const prevArrow = swpr.querySelector('.sWiper_nav-prev')
      const nextArrow = swpr.querySelector('.sWiper_nav-next')
      const postSwiper = new Swiper(currentSwiper, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        loop: false,
        lazy: true,
        ResizeObserver: false,
        // autoplay: {
        //   delay: 5500,
        //   disableOnInteraction: false,
        // },
        // Navigation arrows
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
        },
      })
    })
  }

  const conferenciesSwipers = document.querySelectorAll('.sWiper_wrapper-conferencies')
  if (conferenciesSwipers?.length > 0) {
    conferenciesSwipers.forEach((swpr) => {
      const currentSwiper = swpr.querySelector('.sWiper')
      const prevArrow = swpr.querySelector('.sWiper_nav-prev')
      const nextArrow = swpr.querySelector('.sWiper_nav-next')
      const confSwiper = new Swiper(currentSwiper, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: false,
        loop: false,
        lazy: true,
        ResizeObserver: false,
        // autoplay: {
        //   delay: 5500,
        //   disableOnInteraction: false,
        // },
        // Navigation arrows
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
        },
      })
    })
  }
}
