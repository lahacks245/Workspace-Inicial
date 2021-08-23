//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


});

    function verificar(){
        let user = document.getElementById("user");
        let pass = document.getElementById("pass");
        let msj = document.getElementById ("msj");
        let usuario = {};
       
        if ( user.value.trim() ==='' || pass.value.trim()==='' ){

            user.classList.add("notValid"); 
            msj.innerHTML="Dato requerido";
            msj.classList.add("notValid");            
        }
        else{
            
            location.href="index.html";

            usuario.nombre = user.value;
            usuario.estado = "Conectado";

            localStorage.setItem('usuario',JSON.stringify(usuario));
            sessionStorage.setItem('usuario',JSON.stringify(usuario));
        }
    }

   

    function onLoad(){
        gapi.load('auth2', function(){
            gapi.auth2.init();            
        });
    }

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
    }

    function onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
     

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      location.href="index.html"
    }
  
    