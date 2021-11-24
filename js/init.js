const CATEGORIES_URL = "http://localhost:3000/categorias";

const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";

const CATEGORY_INFO_URL = "http://localhost:3000/descripcion_categorias";
const PRODUCTS_URL = "http://localhost:3000/productos";
const PRODUCT_INFO_URL = "http://localhost:3000/descripcion_productos";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/comentarios";
const CART_INFO_URL = "http://localhost:3000/cart";

const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function desconectar(){
  localStorage.clear(); // limpieza
  signOut();
  location.href = "login.html";
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
}

function onLoad(){
  gapi.load('auth2', function(){
      gapi.auth2.init();            
  });
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
let usuario = JSON.parse(localStorage.getItem("usuario"))
if(localStorage.getItem("usuario") == null ){
  location.href="login.html"
}
let user = JSON.parse(localStorage.getItem('usuario'))
document.getElementById('nombreusr').innerHTML +=  user.nombre 

if (usuario.img != undefined) {
  document.getElementById("nombreusr").innerHTML =
    `<img src="${usuario.img}" referrerpolicy="no-referrer" style="width: 25px;"> `+ ` ` + usuario.nombre;
} else {
  document.getElementById("nombreusr").innerHTML =
    `<i class="fas fa-user">  </i>` + ` ` + usuario.nombre;
}







});































