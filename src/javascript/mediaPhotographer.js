// afficher les photos du photographe
const photographerSectionMedia = document.querySelector('.media')
/**
 * @param  {} jsonData
 * @param  {} id
 */
const getPhotographerMediaById = async (jsonData, id) => {
  const data = await jsonData

  const photographers = data.media

  // return console.log(photographers[0].name)
  let photographerMediaArray = []
  photographers.map((data) => {
    // Si l'id de param's est le même que l'Id du photographe dans le fichier json on  push les info dans le tab
    if (id == data.photographerId) {
      photographerMediaArray.push(data)
    }
  })

  // console.log({ photographerMediaArray })
  return photographerMediaArray
}

// On crée un media du photographe
const createphotographerMedia = (photographers, photographerInfo) => {
  // console.log({ photographersMEdia: photographers })
  // On récupére le nom du photographe pour nous permetre de rentré dans le bon fichier img
  // On utilise une reg pour séparer le nom si ya un ' ' ou '-'
  const photographerName = photographerInfo.name.split(/[\s, -]+/)

  // return console.log(photographerName)

  // On crée notre élement article
  const photographerDOM = photographers.map((photographer) => {
    // const image = new Factory({
    //   image: `./src/medias/${photographerName[0]}/${photographer.image}`,
    // })
    // console.log(photographerName[0])
    const mediaFactory = new Factory(photographer, photographerName[0])

    // return console.log(photographer.image)
    const photographerDOM = document.createElement('article')
    // return console.log(photographer)
    // On lui ajoute une class
    photographerDOM.classList.add('media__card')

    // On crée le dom avec inner
    photographerDOM.appendChild(mediaFactory.affich())

    photographerDOM.innerHTML += `
  <div class="media__content">
    <div class="media__content--title">${photographer.title}</div>
    <div class="media__likes">
      <p class="media__likes--number">${photographer.likes} <i class="fas fa-heart media__likes--heart" aria-label="likes"></i></p>
    </div>
  </div>
  `

    return photographerDOM
  })
  // On écrase l'ancien DOm
  photographerSectionMedia.innerHTML = ''

  photographerSectionMedia.append(...photographerDOM)
}

const photographerMedia = async () => {
  try {
    const params = new URL(location.href)
    const photographerId = params.searchParams.get('id')

    const photographerMedia = await getPhotographerMediaById(
      fetchData(),
      photographerId
    )
    const photographer = await getPhotographersById(fetchData(), photographerId)

    createphotographerMedia(photographerMedia, photographer)

    infoPhotographer(photographer, photographerMedia)

    // console.log(photographerMedia)
  } catch (e) {
    // Si ya err on return à la page d'acceuil
    console.log(e)
    // location.replace('index.html')
  }
}

// référence

photographerMedia()
