//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function prueba(){
    Swal.fire({
        title: 'Error',
        text: 'Los campos "Usuario" y "Contraseña" no pueden estár vacíos',
        icon: 'error',
        confirmButtonText: 'Entendido!'
      })
}

document.addEventListener("DOMContentLoaded", function(e){
    let usuario = JSON.parse( localStorage.getItem("usuario"));
    if(usuario !== null){
        location.href = "index.html";
      }

});

    function verificar(){
        let user = document.getElementById("user");
        let pass = document.getElementById("pass");
        let msj = document.getElementById ("msj");
        let usuario = {};
        let img = {} ;
        if ( user.value.trim() ==='' || pass.value.trim()==='' ){
            prueba()
            user.classList.add("notValid"); 
            pass.classList.add("notValid")
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

   document.addEventListener("keypress",(event)=>{
       if(event.code=="Enter"){
           verificar();
       }
   })


    function onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      let usuario = {};
      usuario.nombre = profile.getName();
      usuario.estado = "Conectado";
      usuario.img = profile.getImageUrl();
      
     usuario.email =profile.getEmail()
     
  
     
      localStorage.setItem('usuario',JSON.stringify(usuario));
      sessionStorage.setItem('usuario',JSON.stringify(usuario));
      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      location.href="index.html"
    }
  
   