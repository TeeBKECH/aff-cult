export function filtersHandler() {
  const filterItems = document.querySelectorAll('.filters_checkbox')
  if (filterItems?.length > 0) {
    const onChange = (e) =>
      filterItems.forEach((n) => {
        n.checked &&= n === e.target
        const content = document.querySelector(`[data-filters-id=${n.getAttribute('id')}]`)
        if (n.checked) {
          content.classList.add('show')
        } else {
          content.classList.remove('show')
        }
      })
    filterItems.forEach((n) => n.addEventListener('change', onChange))
  }
}
