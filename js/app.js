$(document).ready(function() {
  index = 0;
  showGifs();
  $('#save-gif').on('click', saveGif);
});

let index = 0;

var element = document.getElementById('main');
var hammertime = Hammer(element).on('swipe', function (event) {
 showGifs();
})

function getGifsOnDb() {
  const url = 'https://api.giphy.com/v1/gifs/trending?&api_key=JyoICdd17KrRiQnSkR7W8FjphIOQtEDY&limit=50';

  return fetch(url)
  .then(response => response.json())
  .then(json => json.data)
  .catch(error => console.log(error));
}

async function showGifs() {
  const data = await getGifsOnDb();
  const imgUrl = data[index].images.fixed_height.url
  index++;

  return document.getElementById('main').innerHTML = template(imgUrl);
}

function template(imgUrl) {    
  return `
    <img src="${imgUrl}" id="my-gif">
  `;
}

function saveGif() {
  showGifs();
}
