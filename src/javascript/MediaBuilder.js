// Program fonctionel
function Factory(content, photographer) {
  // this = {} // auto
  this.content = {}

  if (content.video) {
    return new FactoryVideo(content.video, photographer, content.title)
  } else {
    return new FactoryImage(content.image, photographer, content.title)
  }

  // return this
}

function FactoryImage(content, photographer, title) {
  this.el = document.createElement('img')
  this.el.classList.add('media__card--img')
  this.el.src = `./src/medias/${photographer}/${content}`
  this.el.setAttribute('alt', `${title}`)

  // methode
  this.getEl = function () {
    return this.el
  }

  this.affich = function () {
    return this.el
  }
}

function FactoryVideo(content, photographer) {
  this.el = document.createElement('video')
  this.el.setAttribute('controls', 'controls')
  this.el.setAttribute('preload', 'metadata')
  this.el.src = `./src/medias/${photographer}/${content}`

  // methode
  this.getEl = function () {
    return this.el
  }

  this.affich = function () {
    return this.el
  }
}
