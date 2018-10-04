var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  loadSavedItems();
  $('#logout').on('click', logout);
  $('#back').on('click', () => {
    window.location = "tinder.html?id=" + USER_ID; 
  });
});

function loadSavedItems() {

  database.ref(`users/${USER_ID}/library`).once('value')
    .then(function(snapshot) {
      console.log(snapshot.val());

      snapshot.forEach(function(childSnapshot) {
        let libGifUrl = childSnapshot.val().gif;
        showGifTemplate(libGifUrl);
      })
    });
}

function showGifTemplate(libGifUrl) {
  let template = `
    <div class='d-flex justify-content-center align-items-center'>
      <img class="mt-3 img-fluid justify-content-center" src="${libGifUrl}">
    </div>
  `
  return $('main').prepend(template);
}

function logout() {
  firebase.auth().signOut()
  .then(function() {
    window.location = 'index.html';
  })
  .catch(function(error) {
  });
}
