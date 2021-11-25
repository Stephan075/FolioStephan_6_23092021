// afficher les photos du photographe
const photographerSectionMedia = document.querySelector('.media')
// Select
// let filter = dom.selectOption[0].getAttribute('data-value')

// console.log(filter)
const getPhotographerMediaById = async (jsonData, id) => {
  const data = await jsonData

  // const select = document.querySelectorAll('.btnSelect')
  // let selectPopular = select[0].getAttribute('data-value')

  const photographers = data.media

  // return console.log(photographers[0].name)
  const photographerMediaArray = []

  photographers.map((data) => {
    // Si l'id de param's est le même que l'Id du photographe dans le fichier json on  push les info dans le tab
    if (id == data.photographerId) {
      photographerMediaArray.push(data)
    }
  })

  // console.log({ photographerMediaArray })

  return photographerMediaArray
}

// On crée un media du photographe current
const createphotographerMedia = (photographers, photographerInfo) => {
  // console.log({ photographersMEdia: photographers })
  // On récupére le nom du photographe pour nous permetre de rentré dans le bon fichier img
  // On utilise une reg pour séparer le nom si ya un ' ' ou '-'
  const photographerName = photographerInfo.name.split(/[\s, -]+/)

  // return console.log(photographerName)

  // On crée notre élement article
  const photographerElemDOM = photographers.map((photographer) => {
    // console.log(photographerName[0])
    // on crer notre facoty
    // la function est dans le fichier "MediaBuilder.js"
    const mediaFactory = new Factory(photographer, photographerName[0])

    // return console.log(photographer.image)
    const photographerDOM = document.createElement('article')
    // return console.log(photographer)
    // On lui ajoute une class
    photographerDOM.classList.add('media__card')

    // On crée le dom avec inner
    photographerDOM.append(mediaFactory.affich())

    const mydiv = document.createElement('div')

    const autrediv = document.createElement('div')
    autrediv.className = 'media__likes'

    mydiv.className = 'media__content'
    mydiv.appendChild(autrediv)

    photographerDOM.innerHTML += `
  <div class="media__content" tabindex="0">
    <div class="media__content--title">${photographer.title}</div>
    <div class="media__likes">
      <p class="media__likes--number">${photographer.likes}</p>
     <i class="fas fa-heart media__likes--heart" aria-label="likes" title="icône coeur" tabindex="0"></i>
    </div>
  </div>
  `

    return photographerDOM
  })

  // On écrase l'ancien DOm
  photographerSectionMedia.innerHTML = ''

  photographerSectionMedia.append(...photographerElemDOM)

  // On initialise le lighbox
  // class crée dans la page lighbox.js ligne 6
  Lightbox.init()
}

const photographerMedia = async () => {
  try {
    // On récupérer l'id du photographe quand à récupérer dans l'url
    const params = new URL(location.href)
    const photographerId = params.searchParams.get('id')

    // On lui envoi la data et l'id du photographe pour y travailler plus tard
    // liste des media du photographe current
    const currentPhotographerMedia = await getPhotographerMediaById(
      fetchData(),
      photographerId
    )

    // information du photographe current (nom,id,city...)
    // la function 'getPhotographersById' est créer dans le fichier "photographer.js" L.15
    const photographer = await getPhotographersById(fetchData(), photographerId)

    // On crée & affiche tout le media du photographe
    createphotographerMedia(currentPhotographerMedia, photographer)
    // createphotographerMedia(currentPhotographerMedia)

    //  Cette fonction nous permet de trier les media du photographe current
    // On lui envoi en param' la liste des media du photographe current ou les information du photographe
    // Elle ce situe dans la page filter.js L.60
    sortBy(currentPhotographerMedia, photographer)

    // On récupérer les info du photograaphe (prix,like..)
    infoPhotographer(photographer, currentPhotographerMedia)

    // Augmenter ou diminuer les likes d'un média et le total des likes
    // cette function ce situe dans la page "mediaLike.js" à la ligne 26

    increaseDescreaseLikesAndTotalLikes()
  } catch (e) {
    console.log(e)
  }
}

photographerMedia()
