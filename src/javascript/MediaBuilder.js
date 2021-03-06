// Program fonctionel
// Une video ou image?
// return un OBJ fact' video ou images
function Factory(content, photographer) {
  // this = {} // auto
  this.content = {}

  if (content.video) {
    return new FactoryVideo(
      content.video,
      photographer,
      content.title,
      content.altTxt
    )
  }
  return new FactoryImage(
    content.image,
    photographer,
    content.title,
    content.altTxt
  )

  // return this
}

/**
 *
 * @param {*} content
 * @param {*} photographer
 * @param {*} title
 */
// crée des élement HTML
function FactoryImage(content, photographer, title, altTxt) {
  this.el = document.createElement('img')
  this.el.classList.add('media__card--img')
  this.el.src = `./src/medias/${photographer}/${content}`
  this.el.setAttribute('alt', `image ${altTxt}`)
  this.el.setAttribute('tabindex', `0`)

  // return un elem HTML
  this.affich = function () {
    return this.el
  }
}

// crée des élement HTML
function FactoryVideo(content, photographer, title, altTxt) {
  this.el = document.createElement('video')
  // this.el.setAttribute('controls', 'controls')
  // this.el.setAttribute('preload', 'metadata')
  this.el.setAttribute('poster', 'src/images/placeholder_video.png')
  this.el.setAttribute('alt', `image ${altTxt}`)
  this.el.setAttribute('tabindex', `0`)
  this.el.src = `./src/medias/${photographer}/${content}`

  // Methode
  // une fonction qui appartien à la class
  // return un elem HTML
  this.affich = function () {
    return this.el
  }
}
