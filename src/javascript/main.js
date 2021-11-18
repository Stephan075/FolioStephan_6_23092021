// location < redirect
// alert('test')

const photographersElement = document.querySelector('.photographer__list')
// eslint-disable-next-line
// let filter
let photographers
// Le filter au début est vides il sera reinsigné avec le temps
// const filters = document.querySelector('ul')

// console.log({ filters })

// filters.addEventListener('click', (e) => {
//   let classValue = e.target.value
//   console.log(classValue)
// })

// Liste des photographe
const createphotographers = (filter) => {
  const photographersDOM =
    filter !== undefined
      ? photographers.photographers.filter(
          (el) => el.tags.includes(filter),
          (document.querySelector('.photographer__list').style.justifyContent =
            ' flex-start')
        )
      : photographers.photographers

  // console.log(photographersDOM)
  const photographersList = photographersDOM.map((photographer) => {
    // console.log(photographer)
    // return console.log(photographer.tags)
    // On crée notre élement article
    const photographerDOM = document.createElement('article')

    // return console.log(photographer)
    // On lui ajoute une class
    photographerDOM.classList.add('photographer__item')

    // template string // textcontent pour la sécurité
    photographerDOM.innerHTML = `
  <a href="#" id="photographer" data-id=${photographer.id} title="${photographer.name}">
  <img data-id=${photographer.id} src="./src/medias/Photographers_ID_Photos/${photographer.portrait}" alt="${photographer.name} portrait">
  <!-- name -->
  <h2 data-id=${photographer.id} class="photographer__item--name">${photographer.name}</h2>
</a>
<!-- content location/tag/price -->
<div class="photographer__item__content">
  <p class="photographer__item__content--location">${photographer.city}</p>
  <p class="photographer__item__content--tagline">${photographer.tagline}</p>
  <p class="photographer__item__content--price">${photographer.price}/jour</p>
</div>
<!-- tags -->
  `
    const messpantags = []
    // eslint-disable-next-line
    for (const cur of photographer.tags) {
      messpantags.push(document.createElement('span'))
      messpantags[messpantags.length - 1].textContent = `#${cur}`

      messpantags[messpantags.length - 1].className =
        'photographer__item--tag tag'

      photographerDOM.appendChild(messpantags[messpantags.length - 1])
    }

    return photographerDOM
  })
  // On écrase le photographersElement
  photographersElement.innerHTML = ''
  photographersElement.append(...photographersList)

  // On récupére tout les lien des pages pour ajouter des event sur chaque button pour la redirection des page
  const pagePhotographer = photographersElement.querySelectorAll('a')

  // return console.log(pagePhotographer)

  // On parcoure la liste des lien

  pagePhotographer.forEach((link) => {
    // return console.log(link)
    link.addEventListener('click', (e) => {
      const { target } = e
      // return console.log(target)
      const photographerId = target.dataset.id

      // Rédiriger vers la pahe photographer du photographe grace à sont id
      window.location.assign(`./photographers.html?id=${photographerId}`)

      // return console.log(photographerId)
    })
  })
  // console.log(pagePhotographer)
}

// On utilise les async donc on va utiliser try catch qui nous permetra de récupérer nos erreur
const fetchPhotographer = async () => {
  try {
    // récupérer la data
    const response = await fetch('./src/javascript/data/FishEyeData.json')

    // la methode json return une promesse & on assigne le photographers
    photographers = await response.json()
    // console.log(photographers.photographers[0].name)
    // return console.log(photographers)
    // Founction qui nous créer les articles
    createphotographers()

    // eslint-disable-next-line
    displaytagsListe() // Function dans la page tags.js

    // filter multiple dimensional javascript
  } catch (e) {
    /* eslint-disable no-alert, no-console */
    console.log('e :', e)
  }
}

// Invoqué notre founction
fetchPhotographer()

// Set => élimine les doublons
// const mestages = new Set(tonobjetjson.photographers.map((el) => el.tags))
