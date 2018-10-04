
var database = firebase.database();

$(document).ready(function(){
  $('#sing-up-btn').click(function(event){
    event.preventDefault();
    var email = $('#email-input').val();
    var password = $('#password-input').val(); 
    var name = $('#name-input').val();    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){ 
        var userId = response.uid ;
        
        database.ref("users/" + userId).set({
          name: name,
          email: email,
          usuario: userName  
        });
        window.location = "perfil.html?id=" + userId;
      })

      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      }); 
    });

    $('#sign-in-btn').click(function(event){
      event.preventDefault();
      var email = $('#sign-in-email').val();
      var password = $('#sign-in-password').val();
      var name = $('#name-input').val();   

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(response){ 
          window.location = "perfil.html?id=" + response.uid;
        })
        
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
		});
});