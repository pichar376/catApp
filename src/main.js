console.log("hola mundo")
const baseUrl = " https://api.thecatapi.com/v1/images/search";

const apiKey = "live_kHlMnewgDaKf4Qe0FgbsCMVfSgi2RdIGJsxagSuCVje7Z8PT2YkVH1912f34BKUl"

const deleteUrl = (id) => `https://api.thecatapi.com/v1/images/${id}`



const urlFavAdd = "https://api.thecatapi.com/v1/favourites"
const $uploadButton = document.getElementById("uplodadButton")
const $randomCat = document.getElementById("random-cat")
let currentId = ""

async function getCat() {
  const response = await fetch(baseUrl)
  const data = await response.json()
  $randomCat.src = data[0].url
  currentId = data[0].id;
  console.log(data[0].url)

}

async function addFavorite(id) {
  const body = JSON.stringify({
    "image_id": id,
  });
  const response = await fetch(urlFavAdd, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: body
  })
  getCatFavourites()
}

async function getCatFavourites() {

  const response = await fetch(
    'https://api.thecatapi.com/v1/favourites', {
    headers: {
      "content-type": "application/json",
      'x-api-key': apiKey
    }
  });
  const favourites = await response.json();

  const $containerFav = document.querySelector(".containerFavourites");
  $containerFav.innerHTML = "";
  const $h2Text = document.createTextNode("Fav Cat");

  favourites.forEach((img) => {
    const $article = document.createElement("article")
    const $button = document.createElement("button")
    const $img = document.createElement("img");
    const textButton = document.createTextNode("Delete Favourites");
    $button.appendChild(textButton)
    $img.setAttribute("src", img.image.url)
    $img.classList.add('imgFavourites')
    $article.appendChild($img)
    $article.appendChild($button)
    $article.classList.add("dFlex")

    $button.addEventListener("click", (e) => {
      console.log(img)
      deleteFavourites(img.id)
    })


    $containerFav.appendChild($article)
  })
}

async function deleteFavourites(id) {
  const response = await fetch(`https://api.thecatapi.com/v1/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    },
  })
  getCatFavourites()
  console.log("michi borrado")

}







document.addEventListener("click", (e) => {
  if (e.target.id === "uploadButton") {
    getCat(baseUrl)
  }

  if (e.target.id === "addFavorite") {
    addFavorite(currentId)
  }
}


)
getCat(baseUrl)

getCatFavourites()








