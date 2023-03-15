window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)


function navigator() {

  if (location.hash.startsWith("#favourites")) {
    pageFav();
  } else if (location.hash.startsWith("#home")) {

    homePage();
  }
  else {
    homePage()
  }
}

const pageFav = () => {
  $containerFavImages.classList.remove('inactive');
  $containerImagesRandom.classList.add("inactive");
  $buttonUpload.classList.add("inactive");
  $buttonAddFav.classList.add("inactive");
  $container.classList.remove("--containerHome")
};

const homePage = () => {
  $containerFavImages.classList.add('inactive');
  $buttonUpload.classList.remove("inactive");
  $buttonAddFav.classList.remove("inactive");
  $containerImagesRandom.classList.remove("inactive");
  $titleFav.classList.add('inactive');
  $container.classList.add("--containerHome")
};



