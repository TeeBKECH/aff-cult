export function truncateAccordionText(containerClass, maxLength, options = {}) {
  const containers = document.querySelectorAll(containerClass)

  containers.forEach((container) => {
    // Сохраняем оригинальный HTML
    const originalHTML = container.innerHTML

    // Получаем весь текст из параграфов
    const textContent = container.textContent || container.innerText || ''

    // Если текст короче максимальной длины - ничего не делаем
    if (textContent.length <= maxLength) {
      return
    }

    // Создаем обрезанную версию
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = originalHTML

    let currentLength = 0
    let shouldTruncate = false

    // Функция для обрезки текста в параграфах
    function truncateParagraphs(node) {
      if (shouldTruncate) return

      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
        const text = node.textContent

        if (currentLength + text.length > maxLength) {
          const charsLeft = maxLength - currentLength
          if (charsLeft > 3) {
            // Минимум для многоточия
            // Находим последний пробел для красивого обрыва
            const textToShow = text.substring(0, charsLeft)
            const lastSpace = textToShow.lastIndexOf(' ')
            const finalText =
              lastSpace > charsLeft - 10 ? textToShow.substring(0, lastSpace) : textToShow

            node.textContent = finalText + '...'
          }
          shouldTruncate = true
          currentLength = maxLength
        } else {
          currentLength += text.length
        }
      }

      // Рекурсивно обрабатываем дочерние элементы
      if (node.childNodes && !shouldTruncate) {
        for (let child of node.childNodes) {
          truncateParagraphs(child)
          if (shouldTruncate) break
        }
      }
    }

    // Обрезаем параграфы
    truncateParagraphs(tempDiv)

    // Заменяем содержимое контейнера на обрезанное
    container.innerHTML = tempDiv.innerHTML

    // Создаем кнопку "Показать все"
    const showMoreBtn = document.createElement('button')
    showMoreBtn.textContent = options.showText || 'Показать все'
    showMoreBtn.className = options.btnClass || 'ad_show_more_btn'

    // Добавляем кнопку после контейнера
    container.parentNode.insertBefore(showMoreBtn, container.nextSibling)

    // Обработчик клика
    showMoreBtn.addEventListener('click', function () {
      if (container.innerHTML === originalHTML) {
        // Возвращаем обрезанную версию
        container.innerHTML = tempDiv.innerHTML
        showMoreBtn.textContent = options.showText || 'Показать все...'
      } else {
        // Показываем полную версию
        container.innerHTML = originalHTML
        showMoreBtn.textContent = options.hideText || 'Скрыть'
      }
    })
  })
}
