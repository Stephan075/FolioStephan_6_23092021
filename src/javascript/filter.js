const dom = {
  inputSelect: document.querySelector('.filter__select'),
  selectMenu: document.querySelector('.filter__custom-menu'),
  listSelectOption: document.querySelectorAll('.filter__custom-option'),
  select: document.querySelector('.filter__custom-select'),
  arrow: document.querySelector('.filter__custom-arrow', 'before'),
  ulOption: document.querySelector('.filter__custom-menu'),
}

let filtre = dom.listSelectOption[0].getAttribute('data-value')
console.log({ filtre })
let displaySelectOptions = () => {
  dom.select.addEventListener('click', () => {
    // Si ya pas la class dans le HTML on l'ajoute
    if (!dom.ulOption.classList.contains('filter__show')) {
      dom.ulOption.classList.add('filter__show')
      dom.arrow.style.transform = 'rotate(180deg)'
      dom.inputSelect.setAttribute('aria-expanded', true)
    }
    // sinon, on le supprime
    else {
      dom.arrow.style.transform = 'rotate(0deg)'
      dom.ulOption.classList.remove('filter__show')
      dom.inputSelect.setAttribute('aria-expanded', false)
    }
  })
}
displaySelectOptions()

let removeClassToHideDuplicateOptionInSelect = (filtre, dom) => {
  dom.forEach((option) => {
    if (option.getAttribute('data-value') != filtre) {
      option.classList.remove('filter__selected')
      option.setAttribute('aria-selected', false)
    }
  })
}

let hideSelectedOptionInSelect = (filtre, dom) => {
  dom.forEach((option) => {
    if (option.getAttribute('data-value') == filtre) {
      option.classList.add('filter__selected')
      option.setAttribute('aria-selected', true)
    }
  })
}

dom.listSelectOption.forEach((option) =>
  option.addEventListener('click', () => {
    filtre = option.getAttribute('data-value')
    console.log({ option })
    removeClassToHideDuplicateOptionInSelect(filtre, dom.listSelectOption)
    dom.inputSelect.setAttribute('value', option.innerText)
    hideSelectedOptionInSelect(filtre, dom.listSelectOption)
  })
)

hideSelectedOptionInSelect(filtre, dom.listSelectOption)
