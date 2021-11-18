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

    const tagLiSpan = document.createElement('span')
    li.append(tagLiSpan)
    const tagLiSpanText = document.createTextNode(`#${tag}`)
    tagLiSpan.appendChild(tagLiSpanText)

    li.addEventListener('click', (e) => {
      createphotographers(e.target.textContent.slice(1))
    })

    return li
  })

  tagUl.innerHTML = ''

  tagUl.append(...liElements)
}
/*
<li class="header__tags--elem tag">
          <a href="#portrait">
            <span>#portrait</span>
          </a>
        </li>
*/
