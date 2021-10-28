const ORDER_ASC_BY_PRECIO = "Menor precio";
const ORDER_DESC_BY_PRECIO = "Mayor precio";
const ORDER_BY_RELEVANCIA = "Relevancia";
var productsArray = [];
var filteredProducts = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;

      showProductsList(productsArray);
    }
  });
  sortAsc;

  document.getElementById("campo").addEventListener("keyup", () => {
    buscar();
  });

  document.getElementById("campo").addEventListener("mouseover", () => {
    buscar();
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRECIO);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRECIO);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_RELEVANCIA);
  });
});

function showProductsList(array) {
  let htmlContentToAppend = "";

  for (producto of array) {
    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(producto.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
       
 
    <!-- Team Member 1 -->
    <div class="col-xl-3 col-md-6 mb-4">
      <a href="product-info.html" >
      <div  class="card border-0 shadow">
        <img src="` +
        producto.imgSrc +
        `" class="card-img-top" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title mb-0">` +
          producto.name +
          `</h5>
          <div class="card-text text-black-50">` +
          producto.description +
          `</div>
        </div>
      </div>
    </div>
      
      </a>
    
   
  
                   
                    
                    
                    



        `;
    }
  }
  document.getElementById("listado").innerHTML = htmlContentToAppend;
}
function sortAndShowProducts(sortCriteria, prodArray) {
  currentSortCriteria = sortCriteria;

  if (prodArray != undefined) {
    productsArray = prodArray;
  }

  productsArray = sortProducts(currentSortCriteria, productsArray);

  //Muestro los productos ordenadas
  showProductsList(productsArray);
}

function buscar() {
  let busqueda = document.getElementById("campo").value;

  filteredProducts = productsArray.filter((product) => {
    return product.name.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0;
  });
  showProductsList(filteredProducts);
}

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRECIO) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRECIO) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_RELEVANCIA) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

document
  .getElementById("clearRangeFilter")
  .addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList(productsArray);
  });

document
  .getElementById("rangeFilterCount")
  .addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
      minCount = parseInt(minCount);
    } else {
      minCount = undefined;
    }

    if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
      maxCount = parseInt(maxCount);
    } else {
      maxCount = undefined;
    }

    showProductsList(productsArray);
  });



   