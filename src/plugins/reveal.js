// Simple reveal-on-scroll directive using IntersectionObserver
export default {
  install(app) {
    app.directive('reveal', {
      mounted(el, binding) {
        el.classList.add('reveal')
        const threshold = (binding && binding.value && binding.value.threshold) || 0.12
        const options = { threshold }
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              el.classList.add('show')
              observer.unobserve(el)
            }
          })
        }, options)
        observer.observe(el)
      }
    })
  }
}
