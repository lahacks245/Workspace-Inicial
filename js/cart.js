//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let product = [];
let precioArt = 0;
let valor = 0;
let relacionEnvio = 0;
let costoTotal = 0;

  


document.addEventListener("DOMContentLoaded", function (e) {
  
  
  
  
  
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      compras(product.articles);
      total();
      document.getElementById("totalPago").innerHTML = "USD" + " " + costoTotal;
    }
  });
});

function compras(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let producto = array[i];

    if (product.articles[i].currency == "UYU") {
      product.articles[i].unitCost = product.articles[i].unitCost / 40;
      product.articles[i].currency = "USD";
    }
    htmlContentToAppend += `
                  <div width=device-width class="product">
                    <div class="row">
                      <div class="col-md-3">
                        <img class="item-image img-fluid mx-auto d-block image" src="${producto.src}">
                      </div>
                      <div class="col-md-8">
                        <div class="info">
                          <div class="row">
                            <div class="col-md-5 product-name">
                              <div class="product-name">
                                <a class="item-title" href="#">${producto.name}</a>
                                
                              </div>
                            </div>
                            <div class="col-md-4 quantity">
                              <label for="quantity">Cantidad:</label>
                              <input type="number" min=0 onchange="total()" name="cant" id="productCount${i}" value=${producto.count} class="form-control quantity-input">
                            </div>
                            <div class="col-md-12 col-lg-4 precio">
                              <span><b>${producto.currency} </b></span>
                              &nbsp
                              <span  class="item-price "> <b>${producto.unitCost}  </b>                
                              </span>

                            </div>
                            <span onclick="eliminarArticulo(${i})" class="icono">   <i class="fa fa-trash" aria-hidden="true"></i> </span>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr> `;
  }
  document.getElementById("compras").innerHTML = htmlContentToAppend;
  console.log(precioArt);
}

function total() {
  let subTotal = 0;
  for (let i = 0; i < product.articles.length; i++) {
    subTotal +=
      parseInt(document.getElementById("productCount" + i).value) *
      parseFloat(product.articles[i].unitCost);
  }
  document.getElementById("subTotal").innerHTML = " USD " + subTotal;

  document.getElementsByName("r").forEach((input) => {
    if (input.checked == true) {
      if (input.value == 1) {
        relacionEnvio = 0.15;
      } else if (input.value == 2) {
        relacionEnvio = 0.07;
      } else if (input.value == 3) {
        relacionEnvio = 0.05;
      }
    }
  });

  document.getElementById("envio").innerHTML =
    " USD " + (subTotal * relacionEnvio).toFixed(2);

  costoTotal = (subTotal + subTotal * relacionEnvio).toFixed(2);
  document.getElementById("total").innerHTML = " USD " + costoTotal;
}

function alertaEnvío() {
  Swal.fire({
    title: "Como calcular costos de envío",
    icon: "question",

    html:
      "Para calcular el costo de tu envío,debes de tener en cuenta que existen <b>3 tipos de envíos:</b> " +
      "<br></br>" +
      "Envío <b>premium</b>(2 a 5 días):<br>Este tipo de envío tiene un costo del <b>15 %</b> sobre el subtotal de la compra." +
      "<br>" +
      "Envío <b>express</b>(5 a 8 días):<br>Este tipo de envío tiene un costo del <b>7 %</b> sobre el subtotal de la compra." +
      "<br>" +
      "Envío <b>standard</b>(12 a 15 días):<br>Este tipo de envío tiene un costo del <b>5 %</b> sobre el subtotal de la compra." +
      "<br>" +
      "Si tenés dudas,podes usar nuestra<b> calculadora de envíos</b>.",

    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Calculadora de envíos",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      calcu();
    }
  });
}

function valorNumerico() {
  Swal.fire({
    imageUrl: "img/valor.png",
    imageWidth: 800,
    imageHeight: 400,

    confirmButtonText: "Ok",

    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      calcu();
    }
  });
}

/*Acá conecté con una api que no la uso nunca,ya que me basé en un ejemplo
de la documentación de SweetAlert,y también tengo que mejorar varias cosas en la Calculadora */
function calcu() {
  (async () => {
    const { value: fruit } = await Swal.fire({
      title: "Seleccioná un tipo de envío",
      input: "select",

      inputOptions: {
        Premium: "Premium",
        Express: "Express",
        Estandard: "Estandard",
      },

      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "Premium") {
            (async () => {
              const ipAPI = "//api.ipify.org?format=json";

              const inputValue = fetch(ipAPI)
                .then((response) => response.json())
                .then((data) => data.ip);

              const { value: parametro } = await Swal.fire({
                title: "Ingresá el monto del artículo",
                input: "text",
                inputPlaceholder: "Ingresa sólo el numero",
                inputValue: inputValue,
                footer:
                  '<button type="button" onClick="valorNumerico()" class="btn btn-info">¿Cuál es el valór numérico?</button>',

                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "El valor no puede estár vacío y solo debe ser númerico!";
                  }
                },
              });

              if (parametro) {
                Swal.fire(`El costo del envío es de: USD ${parametro * 0.15}`);
              }
            })();
          } else if (value == "Express") {
            (async () => {
              const ipAPI = "//api.ipify.org?format=json";

              const inputValue = fetch(ipAPI)
                .then((response) => response.json())
                .then((data) => data.ip);

              const { value: parametro } = await Swal.fire({
                title: "Ingresá el monto del artículo",
                input: "text",
                inputPlaceholder: "Ingresa sólo el numero",
                inputValue: inputValue,
                footer:
                  '<button type="button" onClick="valorNumerico()" class="btn btn-info">¿Cuál es el valór numérico?</button>',

                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "El valor no puede estár vacío y solo debe ser númerico!";
                  }
                },
              });

              if (parametro) {
                Swal.fire(
                  `El costo del envío es de: USD ${
                    parametro * (0.07).toFixed(2)
                  }`
                );
              }
            })();
          } else if (value == "Estandard") {
            (async () => {
              const ipAPI = "//api.ipify.org?format=json";

              const inputValue = fetch(ipAPI)
                .then((response) => response.json())
                .then((data) => data.ip);

              const { value: parametro } = await Swal.fire({
                title: "Ingresá el monto del artículo",
                input: "text",
                inputPlaceholder: "Ingresa sólo valor numérico",
                inputValue: inputValue,
                footer:
                  '<button type="button" onClick="valorNumerico()" class="btn btn-info">¿Cuál es el valór numérico?</button>',
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "El valor no puede estár vacío y solo debe ser númerico!";
                  }
                },
              });

              if (parametro) {
                Swal.fire(
                  `El costo del envío es de: USD ${
                    parametro * (0.05).toFixed(2)
                  }`
                );
              }
            })();
          }
        });
      },
    });
  })();
}

function finalizarCompra() {
  if (costoTotal == 0) {
    Swal.fire({
      title: "No hay artículos en el carrito",
      text: "Para finalizar la compra, debe agregar al menos un artículo",
      icon: "error",
      backdrop: `
        rgba(0,0,0,0.5)
    url("https://lahacks245.github.io/Workspace-Inicial/images/carroVacio.png")
    bottom left
    no-repeat
  `,
      confirmButtonText: "Ok",
    });
  } else {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez finalizada la compra, no podrás volver a modificarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Finalizar compra",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Compra finalizada",
          text: "Gracias por comprar en nuestra tienda",
          icon: "success",
          confirmButtonText: "Ok",
          backdrop: `
        rgba(0,0,0,0.5)
    url("https://lahacks245.github.io/Workspace-Inicial/images/compraFinalizada.png")
    bottom left
    no-repeat
  `,
        });
      }
    });
  }
}

function proceda() {
  Swal.fire({
    title: "proceda",
    text: "proceda",
    imageUrl: "https://lahacks245.github.io/Workspace-Inicial/images/proceda.jpg",
    imageWidth: 400,
    imageHeight: 250,
    imageAlt: "Custom image",
  });
}


function eliminarArticulo(posicion) {
product.articles.splice(posicion, 1);
compras(product.articles)
total()

}