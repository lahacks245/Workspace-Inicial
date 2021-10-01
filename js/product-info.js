let product = {};
let productInfo = [];
let productsArray = [];
let usuario = JSON.parse(localStorage.getItem("usuario"));


function showImagesGallery(array)  {
  let htmlContentToAppend = "";
  
    

    htmlContentToAppend +=
      `
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
      
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="` +
          array[0] +
          `" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="` +
          array[1] +
          `" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="` +
          array[2] +
          `" alt="Third slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="` +
          array[3] +
          `" alt="Third slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="` +
          array[4] +
          `" alt="Third slide">
        </div>
      </div>
      
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    `;
  
  document.getElementById("productsImagesWrapper").innerHTML =
    htmlContentToAppend;
};








function publicada() {
  Swal.fire({
    title: "Enviada!",
    text: "Tu opinión fue enviada con éxito!",
    icon: "success",
    confirmButtonText: "Entendido!",
  });
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
  publicada();
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
            <p  class="pt-2">${product.description}</p>
            <p class="text-right">${product.dateTime}</p>
            <hr>
    </div>
    `;
  }
  document.getElementById("cajaComentarios").innerHTML =
    reviewsHtmlContentToAppend;
};

const showRelatedProducts = (relatedProductsArray) => {
  getJSONData(PRODUCTS_URL).then((resObj) => {
    let relatedProductsHtmlToAppend = "";
    if (resObj.status === "ok") {
      let allProducts = resObj.data;
      for (let i = 0; i < relatedProductsArray.length; i++) {
        let relatedProductPosition = relatedProductsArray[i];
        let related = allProducts[relatedProductPosition];

        relatedProductsHtmlToAppend += `
     
<div class="gallery" onclick="location.href = 'products.html';">
<a target="_blank" href="products.html">
  <img src="${related.imgSrc}">
</a>
<div class="desc"><h5><b>${related.name}</b></h5></div>
    <div class="desc">${related.description}</div>

</div>

  
          `;
      }
    }
    document.getElementById("relatedProductContainer").innerHTML =
      relatedProductsHtmlToAppend;
  });
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then((resObj) => {
    if (resObj.status === "ok") {
      let product = resObj.data;
      getJSONData(PRODUCTS_URL).then(function (resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
          productsArray = resultObj.data;
        }
        for (product of productInfo.relatedProducts) {
          htmlContentToAppend +=
            `
              <div class="gallery" onclick="location.href = 'products.html';">
          <a target="_blank" href="products.html">
            <img src="` +
            productsArray[product].imgSrc +
            `">
          </a>
          <div class="desc"><h5><b>` +
            productsArray[product].name +
            `</b></h5></div>
              <div class="desc">` +
            productsArray[product].description +
            `</div>
  
        </div>
              `;
        }
        document.getElementById("relatedProductContainer").innerHTML =
          htmlContentToAppend;
      });

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
      showRelatedProducts(product.relatedProducts);
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then((resultObj) => {
    let productComments = resultObj.data;
    console.log(productComments);
    showReviews(productComments);
  });
});
