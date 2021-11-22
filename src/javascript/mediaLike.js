/* eslint-disable */
/**
 *
 * augmenter ou diminuer les likes d'un média et le total des likes
 */

const increaseLike = (like, totalLikes) => {
  console.log('+1 like')
  ++totalLikes.innerText
  ++like.children[0].innerText
  // Si l'utilisateur like on ajoute la class
  like.classList.add('media__likes--liked')
}

const DescreaseLikes = (like, totalLikes) => {
  console.log('-1 like')
  // eslint-disable-next-line
  --totalLikes.innerText
  // eslint-disable-next-line
  --like.children[0].innerText
  // si il clike une seconde fois on retirer la class et on réduire de 1
  like.classList.remove('media__likes--liked')
}

// function utiliser dans le fichier mediaPhotographer.js
const increaseDescreaseLikesAndTotalLikes = () => {
  // On séléctionne tout les élement like
  const likesElements = document.querySelectorAll('.media__likes')
  const totalLikes = document.querySelector('.infos__likes--total')

  // On boucle pour optenir like cliké
  likesElements.forEach((like) =>
    like.addEventListener(
      'click',
      (e) => {
        e.preventDefault()

        // on séléctionne la totalité des likes

        // console.log(like, totalLikes)

        if (!like.classList.contains('media__likes--liked')) {
          increaseLike(like, totalLikes)
        } else {
          DescreaseLikes(like, totalLikes)
        }
      },

      // evenement entrer
      like.addEventListener('keyup', (e) => {
        // return console.log(e.key)
        if (e.key === 'Enter') {
          if (!like.classList.contains('media__likes--liked')) {
            increaseLike(like, totalLikes)
          } else {
            DescreaseLikes(like, totalLikes)
          }
        }
      })
    )
  )
}
