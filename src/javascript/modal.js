const body = document.querySelector('body')
const form = document.createElement('form')
const closeModal = document.createElement('button')

let calc
let modal
let displayForm = false

const createCalc = () => {
  calc = document.createElement('div')
  calc.classList.add('calc')

  // On écoute le click sur le calc et on le suprime
  calc.addEventListener('click', () => {
    calc.remove()
  })
}

// les champs des formulaire
const createForm = () => {
  form.className = 'form'
  form.setAttribute('method', 'POST')

  // form--fiels firstName
  const divFirstName = document.createElement('div')
  divFirstName.className = 'form--field'

  const labelFiestName = document.createElement('label')
  labelFiestName.classList.add('form-label')
  labelFiestName.setAttribute('for', 'firstname')
  labelFiestName.textContent = 'Prénom'

  const firstName = document.createElement('input')
  firstName.classList.add('form--input')
  firstName.setAttribute('type', 'text')
  firstName.setAttribute('name', 'firstname')
  firstName.setAttribute('id', 'firstname')
  firstName.setAttribute('required', 'required')

  // form--fiels lastName
  const divlastName = document.createElement('div')
  divlastName.className = 'form--field'

  const labelLastName = document.createElement('label')
  labelLastName.classList.add('form-label')
  labelLastName.setAttribute('for', 'lastname')
  labelLastName.textContent = 'Nom'

  const lastName = document.createElement('input')
  lastName.classList.add('form--input')
  lastName.setAttribute('type', 'text')
  lastName.setAttribute('name', 'lastname')
  lastName.setAttribute('id', 'lastname')
  lastName.setAttribute('required', 'required')

  // form--fiels email
  const divEmail = document.createElement('div')
  divEmail.className = 'form--field'

  const labelEmail = document.createElement('label')
  labelEmail.classList.add('form-label')
  labelEmail.setAttribute('for', 'email')
  labelEmail.textContent = 'Email'

  const email = document.createElement('input')
  email.classList.add('form--input')
  email.setAttribute('type', 'email')
  email.setAttribute('name', 'email')
  email.setAttribute('id', 'email')
  email.setAttribute('required', 'required')

  // form--fiels textarea
  const divMessage = document.createElement('div')
  divMessage.className = 'form--field'

  const labelMessage = document.createElement('label')
  labelMessage.classList.add('form-label')
  labelMessage.setAttribute('for', 'message')
  labelMessage.textContent = 'Votre message'

  const textarea = document.createElement('textarea')
  textarea.classList.add('form--text-area')
  textarea.setAttribute('id', 'message')
  textarea.setAttribute('required', 'required')

  const sendMessage = document.createElement('input')
  sendMessage.setAttribute('type', 'button')
  sendMessage.setAttribute('type', 'submit')
  sendMessage.innerText = 'Envoyer'
  sendMessage.classList.add('btn', 'btn--danger')

  closeModal.innerText = 'x'
  closeModal.classList.add('modal__header--close')

  form.append(divFirstName, divlastName, divEmail, divMessage, sendMessage)

  divFirstName.append(labelFiestName, firstName)
  divlastName.append(labelLastName, lastName)
  divEmail.append(labelEmail, email)
  divMessage.append(labelMessage, textarea)

  displayForm = true
}

const createModal = (photographer) => {
  console.log(photographer)
  modal = document.createElement('div')

  modal.setAttribute('role', 'dialog')
  modal.classList.add('modal')

  const modalContent = document.createElement('div')
  modalContent.classList.add('modal-content')
  modalContent.innerHTML = `
  <header class="modal__header">
    <h1 class="modal__header--title">
    <span>Contactez-moi</span>
    <span class="modal__header--userName">${photographer.name}</span>
    </h1>
  </header>
  `
  if (!displayForm) {
    createForm()
  }

  // fermer le modal
  closeModal.addEventListener('click', () => {
    calc.remove()
  })

  modal.addEventListener('click', (e) => {
    e.stopImmediatePropagation()
  })
  modal.append(modalContent, closeModal)

  modalContent.append(form)
}

const formData = document.querySelectorAll('.form--field')

// Toutes les vérifications à faire
function valueField() {
  const firstNameInput = document.querySelector('#firstname').value
  const emailInput = document.querySelector('#email').value
  const lastNameInput = document.querySelector('#lastname').value
  const messageInput = document.querySelector('#message').value

  console.log(firstNameInput, lastNameInput, emailInput, messageInput)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  valueField()
})

const openModal = (photographer) => {
  const c = document.createComment('Formulaire de contact')

  createCalc()
  createModal(photographer)
  calc.append(c, modal)
  body.append(calc)
}
