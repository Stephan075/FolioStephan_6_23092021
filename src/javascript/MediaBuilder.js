// Program fonctionel
function Factory(content, photographer) {
  // this = {} // auto
  this.content = {}

  if (content.video) {
    return new FactoryVideo(content.video, photographer)
  } else {
    return new FactoryImage(content.image, photographer)
  }

  // return this
}

function FactoryImage(content, photographer) {
  console.log(content, photographer)
  this.el = document.createElement('img')
  this.el.classList.add('media__card--img')
  this.el.src = `./src/medias/${photographer}/${content}`

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

// const image = new Factory({
//   image:
//     'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
// })

// const image1 = new Factory({
//   image:
//     'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg',
// })
// const video = new Factory({ video: 'vid.mp4' })

// console.log(video)
// console.log(video)

// image.affich()

// hasOwnProperty > https://dyma.fr/developer/chapters/core/5e27757efaaba573a345b09a/lesson/javascript/5e2a25e935fbdc13868d25a3/20/8
