//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_PRECIO = "Menor precio";
const ORDER_DESC_BY_PRECIO = "Mayor precio";
const ORDER_BY_RELEVANCIA = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
document.addEventListener("DOMContentLoaded", function (e) {

    
getJSONData(PRODUCTS_URL).then(function(resultObj){ 
if (resultObj.status === "ok"){
    productsArray = resultObj.data ;

    showProductsList(productsArray)
}


});
document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_PRECIO);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_PRECIO);
});

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_RELEVANCIA);
});


});
var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";

    for(producto of productsArray){
       
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <small class="text-muted">` + producto.currency +` `+ producto.cost +  ` </small>
                    </div>
                    <p class="mb-1">` + producto.description + `</p>

                </div>
            </div>
        </div>
        `

        document.getElementById("listado").innerHTML = htmlContentToAppend;
        
    }
}
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCIA){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}