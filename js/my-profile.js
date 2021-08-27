//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function usuario(){
    let user = JSON.parse(localStorage.getItem('usuario'))
    document.getElementById('nombreusr').innerHTML +=  user.nombre 
}




document.addEventListener("DOMContentLoaded", function (e) {
    usuario()

});