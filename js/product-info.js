let product = {};
let usuario = JSON.parse(localStorage.getItem("usuario"));
const showImagesGallery = (array) => {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
    <div  class="col-lg-3 col-md-4 ">
      <div class="d-block mb-4 h-100">
        <img  class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
      </div>
    </div>
    `;
  }
  document.getElementById("productsImagesWrapper").innerHTML =
    htmlContentToAppend;
};


function publicada(){
  Swal.fire({
      title: 'Enviada!',
      text: 'Tu opinión fue enviada con éxito!',
      icon: 'success',
      confirmButtonText: 'Entendido!'
    })
}


function showStars(param) {
  let estrellita = "";
  for (i = 1; i <= 5; i++) {
    if (i <= param) {
      estrellita += `<span class="fa fa-star checked"></span>`;
    } else {
      estrellita += `<span class="fa fa-star"></span>`;
    }
  }
  return estrellita;
}

function agregarComentario() {
  var comentario = document.getElementById("comentario").value;
  let estrellitas = 0;
  document.getElementsByName("estrellas").forEach((check) => {
    if (check.checked == true) {
      estrellitas = check.value;
    }
  });
  let date = new Date();
  let dia =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  let comentarioHtmlContentToAppend = "";

  comentarioHtmlContentToAppend +=
    `
    <div class="p- my-2">
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${usuario.nombre}</h5>
        <div class="starsContainer">` +
    showStars(estrellitas) +
    `
        </div>
      </div>
           
      <p class="pt-2">${comentario}</p>
            <p class="text-right">${dia}</p>
            <hr>
    </div>
    `;

  document
    .getElementById("cajaComentarios")
    .insertAdjacentHTML("beforeend", comentarioHtmlContentToAppend);
  document.getElementsByName("estrellas").forEach((check) => {
    if (check.checked == true) {
      check.checked = false;
    }
  });

  document.getElementById("comentario").value = "";
  publicada()
}

function cancelarComen() {
  document.getElementById("comentario").value = "";
  document.getElementsByName("estrellas").forEach((check) => {
    if (check.checked == true) {
      check.checked = false;
    }
  });
}

const showReviews = (productInfo) => {
  let reviewsHtmlContentToAppend = [];
  for (let i = 0; i < productInfo.length; i++) {
    let product = productInfo[i];
    reviewsHtmlContentToAppend +=
      `
    <div class="p- my-2">
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${product.user}</h5>
        <div class="starsContainer">` +
      showStars(product.score) +
      `
        </div>
      </div>
            <p class="pt-2">${product.description}</p>
            <p class="text-right">${product.dateTime}</p>
            <hr>
    </div>
    `;
  }
  document.getElementById("cajaComentarios").innerHTML =
    reviewsHtmlContentToAppend;
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

  

 
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then((resObj) => {
      if (resObj.status === "ok") {
        let product = resObj.data;
        //console.log(product);
  
        let productNameHTML = document.getElementById("productName");
        let productDescriptionHTML =
          document.getElementById("productDescription");
        let productCostHTML = document.getElementById("productCost");
        let productCurrencyHTML = document.getElementById("productCurrency");
        let productSoldCountHTML = document.getElementById("productSoldCount");
        let productCategoryHTML = document.getElementById("productCategory");
  
        productNameHTML.innerHTML = product.name;
        productDescriptionHTML.innerHTML = product.description;
        productCostHTML.innerHTML = product.cost;
        productCurrencyHTML.innerHTML = product.currency;
        productSoldCountHTML.innerHTML = product.soldCount;
        productCategoryHTML.innerHTML = product.category;
  
        showImagesGallery(product.images);
      }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then((resultObj) => {
      let productComments = resultObj.data;
      console.log(productComments);
      showReviews(productComments);
    });
  });