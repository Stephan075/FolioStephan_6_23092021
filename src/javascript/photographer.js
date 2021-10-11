const photographerProfil = document.querySelector('.photographer')
const body = document.querySelector('.infos_all')

// récupérer les données et les afficher en Json()
const fetchData = async () => {
  const url = './src/javascript/data/FishEyeData.json'
  const response = await fetch(url)

  if (response.status < 300) {
    return response.json()
  } else {
    console.log(response.status)
  }
}

const getPhotographersById = async (jsonData, id) => {
  const data = await jsonData

  const photographers = data.photographers

  // return console.log(photographers[0].name)
  let photographerArray = {}
  photographers.map((data) => {
    // Si l'id de param's est le même que l'Id du photographe dans le fichier json
    if (id == data.id) {
      photographerArray = data
    }
  })

  // console.log(photographerArray)
  return photographerArray
}

// Afficher les tags
const tagSpan = (photographers) => {
  // On sélectionne la class des tags
  const photographerContent = document.querySelector(
    '.photographer__body--tags'
  )

  // console.log(photographerContent)

  let messpantags = []
  for (let cur of photographers.tags) {
    messpantags.push(document.createElement('span'))
    // length : taille du tab -1
    // Recupérer le dernier élement du tab
    messpantags[messpantags.length - 1].textContent = '#' + cur

    messpantags[messpantags.length - 1].className =
      'photographer__body--tag tag photographer__tag--item'

    photographerContent.appendChild(messpantags[messpantags.length - 1])
  }
}

// regroupe la totalité des likes sur les photo du photographe et le prix /jour
const infoPhotographer = (photographers, photographerMedia) => {
  // 680
  // La méthode reduce() prend deux arguments : une fonction de rappel et une valeur initiale.
  const totalLike = photographerMedia.reduce(
    (acc, curr, index) => {
      // console.log(acc)
      acc += curr.likes
      // console.log(index)
      return acc
    },
    0 //val initial
  )

  const photographerInfoDOM = document.createElement('div')

  photographerInfoDOM.classList.add('infos')

  photographerInfoDOM.innerHTML = `
  <div class="infos__likes">
        <p class="infos__likes--total">${totalLike} <i class="fas fa-heart infos__likes--heart"></i></p>
      </div>
      <!-- prix /jours -->
      <p class="infos__price">${photographers.price}€ / jour</p>
  `

  body.append(photographerInfoDOM)
}

// On récupére ici les élement de l'utilisateur pour travailler dessus
const createphotographerPage = (photographers) => {
  // console.log({ photographers })
  // return console.log(photographers)

  // On crée notre élement article
  const photographerDOM = document.createElement('article')

  // return console.log(photographer)
  // On lui ajoute une class
  photographerDOM.classList.add('photographer__profil')

  // On crée le dom avec inner
  photographerDOM.innerHTML = `
  <div class="photographer__body">
  <div class="photographer__content">
    <h1 class="photographer__body--name">${photographers.name}</h1>
    <p class="photographer__body--location">${photographers.city}, ${photographers.country}</p>
    <p class="photographer__body--tagline">${photographers.tagline}</p>
    <!-- tags -->
    <div class="photographer__body--tags">

    </div>
  </div>
</div>

<button class="btn btn--primaire photographer__contactButton">Contactez-moi</button>
<!-- img -->
<div class="photographer__profil--img">
<img src="./src/medias/Photographers_ID_Photos/${photographers.portrait}" alt="">
</div>
  `

  // On écrase l'ancien DOm
  photographerProfil.innerHTML = ''

  photographerProfil.append(photographerDOM)
  // On récupére la function TAG pour les afficher au bon photographe
  return tagSpan(photographers)
}

const initPage = async () => {
  try {
    // On récupére le lien avec l'objets URL & on utilise href qui contient l'url enrtière
    const params = new URL(location.href)

    // console.log(params)

    // On récupérer l'id grace à la propriété searchParams qui ne retourne pas une chaine de c' mais un objet URLSearchParams
    const photographerId = params.searchParams.get('id') // get permet de récupérer le premier paramètre de recherche de l'URL avec le nom spécifié

    // To display photographer header
    const photographer = await getPhotographersById(fetchData(), photographerId)

    createphotographerPage(photographer)

    // return console.log(tableau2[0])
  } catch (e) {
    // Si ya err on return à la page d'acceuil
    console.log(e)
    // location.replace('index.html')
  }
}

// référence

initPage()

// select
const select = document.querySelector('#sort-select')

// console.log(select.value)

select.addEventListener('change', () => {
  // console.log(select.value)
})
