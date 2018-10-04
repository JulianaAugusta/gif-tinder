var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  loadSavedItems();
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
    <div>
      <img src="${libGifUrl}">
    </div>
  `
  return $('main').prepend(template);
}