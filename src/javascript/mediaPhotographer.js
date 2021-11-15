// afficher les photos du photographe
const photographerSectionMedia = document.querySelector('.media')
// Select
// let filter = dom.selectOption[0].getAttribute('data-value')

// console.log(filter)

/**
 * @param  {} jsonData
 * @param  {} id
 */
const getPhotographerMediaById = async (jsonData, id) => {
  const data = await jsonData

  // const select = document.querySelectorAll('.btnSelect')
  // let selectPopular = select[0].getAttribute('data-value')

  const photographers = data.media

  // return console.log(photographers[0].name)
  let photographerMediaArray = []
  photographers.map((data) => {
    // Si l'id de param's est le même que l'Id du photographe dans le fichier json on  push les info dans le tab
    if (id == data.photographerId) {
      photographerMediaArray.push(data)
    }
  })

  console.log({ photographerMediaArray })

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
  const photographerElemDOM = photographers.map((photographer) => {
    // console.log(photographerName[0])
    const mediaFactory = new Factory(photographer, photographerName[0])

    // return console.log(photographer.image)
    const photographerDOM = document.createElement('article')
    // return console.log(photographer)
    // On lui ajoute une class
    photographerDOM.classList.add('media__card')

    // On crée le dom avec inner
    photographerDOM.appendChild(mediaFactory.affich())

    let mydiv = document.createElement('div')

    let autrediv = document.createElement('div')
    autrediv.className = 'media__likes'

    mydiv.className = 'media__content'
    mydiv.appendChild(autrediv)

    photographerDOM.innerHTML += `
  <div class="media__content">
    <div class="media__content--title">${photographer.title}</div>
    <div class="media__likes">
      <p class="media__likes--number">${photographer.likes}</p>
     <i class="fas fa-heart media__likes--heart" aria-label="likes"></i>
    </div>
  </div>
  `

    return photographerDOM
  })

  // On écrase l'ancien DOm
  photographerSectionMedia.innerHTML = ''

  photographerSectionMedia.append(...photographerElemDOM)

  // On initialise le lighbox
  Lightbox.init()
}

const photographerMedia = async () => {
  try {
    // On récupérer l'id du photographe quand à récupérer dans l'url
    const params = new URL(location.href)
    const photographerId = params.searchParams.get('id')

    // On lui envoi la data et l'id du photographe pour y travailler plus tard
    const photographerMedia = await getPhotographerMediaById(
      fetchData(),
      photographerId
    )
    const photographer = await getPhotographersById(fetchData(), photographerId)

    // On crée & affiche tout le media du photographe
    createphotographerMedia(photographerMedia, photographer)

    // /////////////////////////////////////////////
    const select = document.querySelectorAll('.filter__custom-option')

    // console.log(photographers)

    const filterPopular = () => {
      return photographerMedia.sort((a, b) => b.likes - a.likes)
    }

    const filtreDate = () => {
      return photographerMedia.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }

    const filterTitle = () => {
      return photographerMedia.sort((a, b) => a.title.localeCompare(b.title))
    }

    select.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        console.log(filtre)

        // console.log(e.target.dataset.value)
        if (filtre === 'popular') {
          filterPopular()
          console.log(filterPopular())
        } else if (filtre === 'date') {
          console.log(filtreDate())
        } else if (filtre === 'title') {
          filterTitle()
          console.log(filterTitle())
        }

        createphotographerMedia(photographerMedia, photographer)
      })
    })

    // On récupérer les info du photograaphe (prix,like..)
    infoPhotographer(photographer, photographerMedia)

    //Augmenter ou diminuer les likes d'un média et le total des likes
    increaseDescreaseLikesAndTotalLikes()
  } catch (e) {
    // Si ya err on return à la page d'acceuil
    console.log(e)
    // location.replace('index.html')
  }
}

photographerMedia()
