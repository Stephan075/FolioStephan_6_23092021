/* eslint-disable */

// fonction utiliser dans le fichier main.js L.110
const displaytagsListe = () => {
  const tagUl = document.querySelector('.header__tags')
  const tags = []
  // console.log(Array.isArray(photographersTagsArr[0].tags))
  // console.log(photographersTagsArr[0].tags)

  // eslint-disable-next-line
  for (const photographer of photographers.photographers) {
    // eslint-disable-next-line
    for (const tag of photographer.tags) {
      tags.push(tag)
    }
  }

  const filteredArray = tags.filter((ele, pos) => tags.indexOf(ele) == pos)
  // console.log(filteredArray)

  const liElements = filteredArray.map((tag) => {
    // console.log(tag)
    const li = document.createElement('li')
    li.className = 'header__tags--elem tag'
    li.setAttribute('tabindex', `0`)

    const tagLiSpan = document.createElement('span')
    li.append(tagLiSpan)
    const tagLiSpanText = document.createTextNode(`#${tag}`)
    tagLiSpan.appendChild(tagLiSpanText)

    li.addEventListener('click', (e) => {
      // fonction utiliser dans le fichier main.js L.19
      createphotographers(e.target.textContent.slice(1))
    })

    li.addEventListener('keyup', (e) => {
      // return console.log(e.key)
      if (e.key === 'Enter') {
        // fonction utiliser dans le fichier main.js L.19
        createphotographers(e.target.textContent.slice(1))
      }
    })

    return li
  })

  tagUl.innerHTML = ''

  // on utilise l'opérateur spread pour convertir notre tableau en liste de noeuds HTML séparés par des virgules
  tagUl.append(...liElements)
}
/*
<li class="header__tags--elem tag">
          <a href="#portrait">
            <span>#portrait</span>
          </a>
        </li>
*/
