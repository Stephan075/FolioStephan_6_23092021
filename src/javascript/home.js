const app = document.querySelector('#app')

// Header
const header = document.createElement('header')
const divHeaderPhotographers = document.createElement('div')
header.append(divHeaderPhotographers)

const main = document.createElement('main')
main.className = 'main'

const mainH1 = document.createElement('h1')
mainH1.classList = 'main__title'

const mainH1Text = document.createTextNode('Nos Photographes')
mainH1.append(mainH1Text)

const mainSection = document.createElement('section')
mainSection.classList = 'photographer__list'
mainSection.id = 'photographers'
mainSection.setAttribute('aria-label', 'photographers')

main.append(mainH1, mainSection)

const mainSectionArticle = document.createElement('article')
mainSectionArticle.classList = 'photographer__item'
const mainSectionA = document.createElement('a')

const mainSectionAhref = document.createAttribute('href')
const mainSectionAtitle = document.createAttribute('title')
mainSectionAtitle.value = '"Mimi Keel'
mainSectionAhref.value = '#'

mainSectionArticle.append(mainSectionA)

const mainSectionImg = document.createElement('img')
const mainSectionImgSrc = document.createAttribute('src')
mainSectionImgSrc.value = './src/medias/Photographers_ID_Photos/MimiKeel.jpg'
mainSectionImg.setAttributeNode(mainSectionImgSrc)
const mainSectionImgAlt = document.createAttribute('alt')
mainSectionImg.setAttributeNode(mainSectionImgAlt)

mainSectionA.append(mainSectionImg)

mainSectionA.setAttributeNode(mainSectionAhref)
mainSectionA.setAttributeNode(mainSectionAtitle)
mainSectionArticle.append(mainSectionA)

mainSection.append(mainSectionArticle)

app.append(header, main)

/**
 
 <!-- header -->
  <header class="header">

    <div class="header__photographers">
      <a id="header__photographers--link" href="#photographers">Passer au contenu</a>
    </div>
    <!-- Logo -->
    <div class="header__logo">
      <a class="" href="index.html" title="lien vers la Homepage"><img src="./src/images/logo_FishEye.png"
          alt="FishEye Home Page"></a>
    </div>


    <!-- nav -->
    <nav class="header__nav" aria-label="photographer categories">
      <ul class="header__tags">
        <li class="header__tags--elem tag">
          <a href="#portrait">
            <span>#portrait</span>
          </a>
        </li>
        <li class="header__tags--elem tag">
          <a href="#art">
            <span>#art</span>
          </a>
        </li>
        <li class="header__tags--elem tag">
          <a href="#fashion">
            <span>#fashion</span>
          </a>
        </li>
        <li class="header__tags--elem tag">
          <a href="#architecture">
            <span>#architecture</span>
          </a>
        </li>
        <li class="header__tags--elem tag">
          <span>#travel</span>
        </li>
        <li class="header__tags--elem tag">
          <a href="#sport">
            <span>#sport</span>
          </a>
        </li>
        <li class="header__tags--elem tag">
          <a href="#animals">
            <span>#animals</span>
          </a>
        </li>
        <li class="header__tags--elem tag">
          <a href="#events">
            <span>#events</span>
          </a>
        </li>
      </ul>
    </nav>

  </header>
  <main class="main">
    <!-- Title -->
    <h1 class="main__title">Nos Photographes</h1>
    <section id="photographers" class="photographer__list" aria-label="photographers">

      <!-- photographe 1 démo-->
      <article class="photographer__item">
        <a href="#" title="Mimi Keel">
          <img src="./src/medias/Photographers_ID_Photos/MimiKeel.jpg" alt>
          <!-- name -->
          <h2 class="photographer__item--name">Mimi Keel</h2>
        </a>
        <!-- content location/tag/price -->
        <div class="photographer__item__content">
          <p class="photographer__item__content--location">london, UK</p>
          <p class="photographer__item__content--tagline">Voir le beau dans le quotidien</p>
          <p class="photographer__item__content--price">400€/jour</p>
        </div>
        <!-- tags -->
        <div class="photographer__item--tags">
          <span class="photographer__item--tag tag">
            #portrait
          </span>
          <span class="photographer__item--tag tag">
            #events
          </span>
          <span class="photographer__item--tag tag">
            #travel
          </span>
          <span class="photographer__item--tag tag">
            #animals
          </span>
        </div>
      </article>


    </section>

  </main>


 */
// img.src
