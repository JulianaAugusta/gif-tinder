var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  index = 0;
  showGifs();
  $('#save-gif').on('click', saveGif);
  $('#logout').on('click', logout);
  $('#library').on('click', () => {
    window.location = "library.html?id=" + USER_ID; 
  });
});

let index = 0;

var element = document.getElementById('main');
var hammertime = Hammer(element).on('swipe', function (event) {
  var pX = window.event.clientX;
  var img = document.getElementById('my-gif');
  let posicao = pX - img.offsetHeight / 2;
  if (posicao > 10) {
    saveGif();
  } 

  showGifs();
})

function getGifsOnDb() {
  const url = 'https://api.giphy.com/v1/gifs/trending?&api_key=nkR8qO6nAiBUkRFMIwSuqBfp5sXRjl64&limit=50';

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
    <img class="img-fluid mt-5" src="${imgUrl}" id="my-gif">
  `;
}

function saveGif() {
  const saveGifUrl = $('#my-gif').attr('src');
  
  database.ref(`users/${USER_ID}`).once('value')
  .then(() => {

      database.ref(`users/${USER_ID}/library`).push({
        gif: saveGifUrl,
      });
    })
}

function logout() {
  firebase.auth().signOut()
  .then(function() {
    window.location = 'index.html';
  })
  .catch(function(error) {
  });
}

