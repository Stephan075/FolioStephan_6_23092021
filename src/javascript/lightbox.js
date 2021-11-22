/**
 * @property {HTMLElement} element
 * @property {String[]} images  Chemin des images de la lightBox // (Tableau de chaine de charactére images)
 * @property {string} url Image actuellement affichée
 */
class Lightbox {
  static init() {
    // 1 On séléctionne tout les liens qui on un atribu src et qui fini par 'mp4,jpg,jpeg' quand met dans un tableau
    const links = Array.from(
      document.querySelectorAll(
        'article.media__card video[src$=".mp4"],article.media__card img[src$=".jpg"],article.media__card img[src$=".jpeg"]'
      )
    )

    // [...Convert array]
    const allMedia = [...document.querySelector('.media').children].map(
      (el) => el.children[1].children[0].textContent
    )

    // console.log(allMedia)

    // La liste des images
    // Pour chaque lien on fait un 'map" et on récupére directement l'abribut 'SRC'
    const gallery = links.map((link) => link.getAttribute('src'))

    // 2 On parcour l'ensemble des lienavec un forEach  et on lui ajoute un evenement au clik
    links.forEach((link) =>
      link.addEventListener(
        'click',
        (e) => {
          e.preventDefault()

          // 3 on initial une nouvelle lightbox et on récupére l'url actuelle avec 'currentTarget' et on récupérer l'atribut 'src'
          // eslint-disable-next-line  no-new
          new Lightbox(
            e.currentTarget.getAttribute('src'),
            gallery,
            // e.currentTarget.getAttribute('alt'),
            e.currentTarget.parentNode.children[1].children[0].textContent,

            allMedia
          )
        },

        link.addEventListener('keyup', (e) => {
          // return console.log(e.key)
          if (e.key === 'Enter') {
            new Lightbox(
              e.currentTarget.getAttribute('src'),
              gallery,
              // e.currentTarget.getAttribute('alt'),
              e.currentTarget.parentNode.children[1].children[0].textContent,

              allMedia
            )
          }
        })
      )
    )
    // console.log({ links })
  }

  /**
   *
   * @param {string} url URL de l'image
   * @param {string[]} images Chemin des images de la lightBox
   */
  constructor(url, images, title, allMedia) {
    // console.log(`url : ${url}`, `title  :${title}`, `img : ${images}`)
    // On construt le Dom à partir de l'url

    // On ajoute la propriéte this.element sur notre obj qui nous permetra d'y acceder partout ou je le souhaite
    this.element = this.buildDom(url, images, title)

    // On définit dans la propriété images le param quand viens de recevoir
    this.images = images

    this.onKeyUp = this.onKeyUp.bind(this)

    // On charge notre image
    this.loadImage(url, title)

    // all media
    this.allMedia = allMedia

    // On ajoute l'élément au body (Lightbox)
    document.body.appendChild(this.element)
    // Un fois quand charge le systeme on Ajoute keyup
    document.addEventListener('keyup', this.onKeyUp)
  }

  /**
   *
   * @param {String} url
   * @returns
   */
  isVideo(url) {
    return url.includes('.mp4')
  }

  /**
   *Nous permet de charger une image
   * @param {string} url URL de l'image
   */

  loadImage(url, title) {
    console.log(title)
    // console.log({ loadImageAlt: title })
    this.url = null
    // On créer une nouvelle images
    const media = new Factory(
      this.isVideo(url)
        ? { video: url, title: `image : ${title}` }
        : { image: url, title: `image : ${title}` },
      {}
    ).affich()

    // on récupére le container
    const container = this.element.querySelector('.lightbox__container')

    // On ajoute un loader dans ce container
    const loader = document.createElement('div')
    loader.classList.add('lightbox__loader')

    // Supprimer l'image déja charger
    container.innerHTML = ''

    // <h2 class="lightbox__title">Wednesday Potrait</h2>

    const titleh2 = document.createElement('h2')
    titleh2.classList.add('lightbox__title')
    titleh2.textContent = title

    // On rajoute l'enfant à notre container
    container.appendChild(loader)

    if (!this.isVideo(url)) {
      // Quand l'image sera bien charger on lance une function
      media.onload = () => {
        // console.log('charger')
        console.log({ url })
        console.log({ title })
        // On supprime l'enfant loader car on à plus besoins
        container.removeChild(loader)
        // Et on ajoute l'image on container
        container.append(media, titleh2)
        this.url = url
      }
    } else {
      // video
      media.onloadstart = () => {
        console.log('charger')
        console.log({ title })

        // On supprime l'enfant loader car on à plus besoins
        container.removeChild(loader)
        // Et on ajoute l'image on container
        container.append(media, titleh2)
        media.play()
        media.classList.add('media__card--video')
        this.url = url
      }
    }

    // On ajoute un url à image
    media.src = url
  }

  // methode
  /**
   *
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e)
    } else if (e.key === 'ArrowLeft') {
      this.prev(e)
    } else if (e.key === 'ArrowRight') {
      this.next(e)
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent | KeyboardEvent} e
   */
  close(e) {
    e.preventDefault()
    this.element.classList.add('fadeOut')

    // Au bout de 500milis tu supprime cette Lightbox
    window.setTimeout(() => {
      this.element.remove()
    }, 500)

    // Supprimer l'event pour pas qu'il reste en mémoire
    document.removeEventListener('keyup', this.onKeyUp)
  }

  /**
   * @param {MouseEvent | KeyboardEvent} e
   */
  next(e) {
    e.preventDefault()

    // findIndex :  envoie l'indice du premier élément du tableau qui satisfait une condition donnée par une fonction. Si la fonction renvoie faux pour tous les éléments du tableau, le résultat vaut -1.

    // On récupére la position quand poura incrementé
    let i = this.images.findIndex((image) => image === this.url)

    // Si l'index est = au nombre d'image quand à -1 veut dire qu'ant arrive à la fin du coup on retourne au début
    if (i === this.images.length - 1) {
      i = -1 // on return à la valeur zéro et on recharge la prémiere image
    }

    // On charge l'image qui ce situe à lindex +1 et on supprime l'image déja charge dans la methode :loadImage avec le innerHTML
    this.loadImage(this.images[i + 1], this.allMedia[i + 1])
  }

  /**
   * @param {MouseEvent | KeyboardEvent} e
   */
  prev(e) {
    e.preventDefault()
    let i = this.images.findIndex((image) => image === this.url)

    if (i === 0) {
      // i sera égale à la dernier image
      i = this.images.length
    }

    // on décrémente
    this.loadImage(this.images[i - 1], this.allMedia[i - 1])
  }

  /**
   * <img src="${url}" alt="">
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDom(url, images, title) {
    console.log('titleBuild', title)
    const dom = document.createElement('div')
    dom.classList.add('lightbox')

    dom.innerHTML = `
    <button class="lightbox__next">Suivant</button>
    <button class="lightbox__prev">Précédent</button>
    <div class="lightbox__block">
    <button class="lightbox__close">Fermer</button>
   

    <div class="lightbox__container">
    </div>
    </div>
   `
    //  On sélection l'element close et on ajoute un event, on lui donne une fonction close quannd bind() pour que le this dans le close fase bien référance à notre instance de  lightbox et pas à l"élément l'élément quand vien de cliké
    dom
      .querySelector('.lightbox__close')
      .addEventListener('click', this.close.bind(this))

    dom
      .querySelector('.lightbox__next')
      .addEventListener('click', this.next.bind(this))

    dom
      .querySelector('.lightbox__prev')
      .addEventListener('click', this.prev.bind(this))
    return dom
  }
}

/**
     <div class="lightbox">
      <button class="lightbox__close">Fermer</button>
      <button class="lightbox__next">Suivant</button>
      <button class="lightbox__prev">Précédent</button>

      <div class="lightbox__container">
        <img src="https://picsum.photos/1050/900" alt="">
      </div>

    </div>
 */

// https://www.youtube.com/watch?v=jk2rFuWImcI
