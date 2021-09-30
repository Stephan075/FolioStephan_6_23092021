// location < redirect
// alert('test')

const photographersElement = document.querySelector('.photographer__list')

// Liste des photographe
const createphotographers = (photographers) => {
  // return console.log(photographers)
  // transformé tous les éléments de notre article
  const photographersDOM = photographers.map((photographer) => {
    // On crée notre élement article
    const photographerDOM = document.createElement('article')

    // return console.log(photographer)
    // On lui ajoute une class
    photographerDOM.classList.add('photographer__item')

    photographerDOM.onclick = () => {
      localStorage.setItem('idphotograph', photographer.id)
      location.href = 'photographers.html'
    }

    // template string // textcontent pour la sécurité
    photographerDOM.innerHTML = `
  <a href="#" title="${photographer.name}">
  <img src="./src/medias/Photographers_ID_Photos/${photographer.portrait}" alt>
  <!-- name -->
  <h2 class="photographer__item--name">${photographer.name}</h2>
</a>
<!-- content location/tag/price -->
<div class="photographer__item__content">
  <p class="photographer__item__content--location">${photographer.city}</p>
  <p class="photographer__item__content--tagline">${photographer.tagline}</p>
  <p class="photographer__item__content--price">${photographer.price}/jour</p>
</div>
<!-- tags -->
  `

    let messpantags = []
    for (let cur of photographer.tags) {
      messpantags.push(document.createElement('span'))
      messpantags[messpantags.length - 1].textContent = '#' + cur

      messpantags[messpantags.length - 1].className =
        'photographer__item--tag tag'

      photographerDOM.appendChild(messpantags[messpantags.length - 1])
    }

    return photographerDOM
  })
  // On écrase le photographersElement
  photographersElement.innerHTML = ''
  photographersElement.append(...photographersDOM)
  console.log(photographersDOM)
}

// On utilise les async donc on va utiliser try catch qui nous permetra de récupérer nos erreur
const fetchPhotographer = async () => {
  try {
    // récupérer la data
    const response = await fetch('./src/javascript/data/FishEyeData.json')

    const photographers = await response.json()
    // console.log(photographers.photographers[0].name)
    // return console.log(photographers)
    // Founction qui nous créer les articles
    createphotographers(photographers.photographers)
  } catch (e) {
    console.log('e :', e)
  }
}

// Invoqué notre founction
fetchPhotographer()

// Set => élimine les doublons
// const mestages = new Set(tonobjetjson.photographers.map((el) => el.tags))
