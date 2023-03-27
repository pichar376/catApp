console.log("hola mundo")
const baseUrl = " https://api.thecatapi.com/v1/images/search";

const apiKey = "live_kHlMnewgDaKf4Qe0FgbsCMVfSgi2RdIGJsxagSuCVje7Z8PT2YkVH1912f34BKUl"

const deleteUrl = (id) => `https://api.thecatapi.com/v1/images/${id}`
const urlFavAdd = "https://api.thecatapi.com/v1/favourites"
const $uploadButton = document.getElementById("uplodadButton")
const $randomCat = document.getElementById("random-cat")

// initial state of the current payload of the element used in the getCat function
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
  const $divCardImage = document.createElement("div")
  $divCardImage.classList.add("row");

  favourites.forEach((img) => {
    const $article = document.createElement("article");
    const $button = document.createElement("button");
    $button.classList.add("btn", "btn-light")
    const $img = document.createElement("img");
    const textButton = document.createTextNode("Delete To Favourites");
    $button.appendChild(textButton);
    $img.setAttribute("src", img.image.url);
    $img.classList.add("card-img-top")
    $img.classList.add("object-fit-cover")
    $img.classList.add('imgFavourites');
    $article.appendChild($img);
    $article.appendChild($button);
    $article.classList.add("col-md-6");
    $article.classList.add("col-lg-4");
    $article.classList.add("col-xl-3");

    $button.addEventListener("click", (e) => {
      deleteFavourites(img.id)
    })
    $divCardImage.appendChild($article)
    $containerFav.appendChild($divCardImage)
    $containerFav.classList.add("container-fav")
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

//event delegation with addEvent Direct listener to document
document.addEventListener("click", (e) => {
  if (e.target.id === "uploadButton") {
    getCat(baseUrl)
  }
  if (e.target.id === "addFavorite") {
    $textAddFav.classList.add("--fade-in-add")
    addFavorite(currentId)
    setTimeout(() => {
      $textAddFav.classList.remove("--fade-in-add")
    }, 1500);
  }
  if (e.target.id === "upLoadButton") {
    getCat(baseUrl)
  }
}
)

getCat(baseUrl)

getCatFavourites()
