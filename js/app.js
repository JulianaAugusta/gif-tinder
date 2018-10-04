var database = firebase.database();

$(document).ready(function(){

	$("#sign-up-btn").click(function(event) {
		event.preventDefault();
		var name = $("#name-input").val()
		var email = $("#email-input").val();
		var password = $("#password-input").val();
		var USER_ID = '';

		console.log(email, password);

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(response) {
			console.log(response);
			USER_ID = response.user.uid;
			window.location = "tinder.html?id=" + USER_ID;

			//adiciona no banco de dados
			database.ref('users/' + USER_ID).set({
  			email: email,
  			password: password
 			});

		})
		.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode, errorMessage);
		});	

	})

    $("#sign-in-btn").click(function(event) {
		event.preventDefault();
		var email = $("#sign-in-email").val();
		var password = $("#sign-in-password").val();

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(response) {
			window.location = "tinder.html?id=" + response.user.uid;
		})
		.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode, errorMessage);
		});
	})

	// $(".btn-register-page").click(function() {
	// 	event.preventDefault();
	// 	window.location = "register.html"

	// })




























})























// var database = firebase.database();

// $(document).ready(function(){
//   $('#sign-up-btn').click(function(event){
//     event.preventDefault();

//     var email = $('#email-input').val();
//     var password = $('#password-input').val(); 
//     var name = $('#name-input').val(); 

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then(function(response){ 
//           console.log(response);
//         var userId = response.user.uid;
//         window.location = "tinder.html?id=" + response.user.uid;
//         console.log(userId);
        
//         database.ref("/users/" + userId).set({
//           name: name,
//           email: email,
//           usuario: userName  
//         });
       
//       })

//       .catch(function(error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//       }); 
//     });

//     $('#sign-in-btn').click(function(event){
//       event.preventDefault();
//       var email = $('#sign-in-email').val();
//       var password = $('#sign-in-password').val();
     

//       firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(function(response){ 
//           window.location = "tinder.html?id=" + response.user.uid;
//         })
        
//         .catch(function(error) {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//         });
// 		});
// });

