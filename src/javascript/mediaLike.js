/**
 *
 * augmenter ou diminuer les likes d'un média et le total des likes
 */

function increaseDescreaseLikesAndTotalLikes() {
  // On séléctionne tout les élement like
  const likesElements = document.querySelectorAll('.media__likes')

  // On boucle pour optenir like cliké
  likesElements.forEach((like) =>
    // On crée un function pour pouvoir passer des arguments avec l'addEventListener
    like.addEventListener('click', (e) => {
      e.preventDefault()

      // on séléctionne la totalité des likes
      const totalLikes = document.querySelector('.infos__likes--total')

      // console.log(like, totalLikes)

      if (!like.classList.contains('media__likes--liked')) {
        console.log('+1 like')
        ++totalLikes.innerText
        ++like.children[0].innerText
        // Si l'utilisateur like on ajoute la class
        like.classList.add('media__likes--liked')
      } else {
        console.log('-1 like')
        --totalLikes.innerText
        --like.children[0].innerText
        // si il clike une seconde fois on retirer la class et on réduire de 1
        like.classList.remove('media__likes--liked')
      }
    })
  )
}
