//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario.img != undefined) {
    document.getElementById(
      "foto"
    ).innerHTML = `<img src="${usuario.img}" referrerpolicy="no-referrer" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;"> `;
  } else {
    document.getElementById(
      "foto"
    ).innerHTML = `<img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">`;
  }
  document.getElementsByName("n").forEach((name) => {
    name.innerHTML += usuario.nombre;
  });
});

function modificarDatos() {
  ocultar();

  document.getElementById("datos").innerHTML += `
  

  <button type="button" onclick="guardar()" class="btn btn-outline-success">Guardar</button>
  
  <button type="button" onclick="cancelar()" class="btn btn-outline-danger">Cancelar</button>
  `;
  document.getElementById(
    "divNombreCompleto"
  ).innerHTML += `<div class="">
  <input type="input" class="form__fieldd" placeholder="Nombre completo" name="i" id='name' required />
  
</div>`

document.getElementById(
  "divEmail"
).innerHTML += `<div class="">
<input type="email" class="form__fieldd" placeholder="Email" name="name" id='i' required />

</div>`
document.getElementById(
  "divTelefono"
).innerHTML += `<div class="">
<input type="input" class="form__fieldd" placeholder="Teléfono" name="name" id='i' required />

</div>`
document.getElementById(
  "divCelular"
).innerHTML += `<div class="">
<input type="input" class="form__fieldd" placeholder="Celular" name="name" id='i' required />

</div>`


document.getElementById(
  "divDireccion"
).innerHTML += `<div class="">
<input type="input" class="form__fieldd" placeholder="Direccion" name="name" id='i' required />

</div>`




;
}

function ocultar() {
  var clase = document.querySelectorAll(".btn.btn-outline-info"),
    i = 0,
    l = clase.length;

  for (i; i < l; i++) {
    clase[i].style.display = "none";
  }
}

function cancelar() {
  var clase = document.querySelectorAll(
      ".btn.btn-outline-success , .btn.btn-outline-danger "
    ),
    i = 0,
    l = clase.length;

  for (i; i < l; i++) {
    clase[i].style.display = "none";
  }
  var mod = document.querySelectorAll(".btn.btn-outline-info"),
    i = 0;
  l = mod.length;
  for (i; i < l; i++) {
    mod[i].style.display = "";
  }
  document.getElementById(
    "divDireccion"
  ).innerHTML = ``
  
}

function guardar() {
  var clase = document.querySelectorAll(
      ".btn.btn-outline-success , .btn.btn-outline-danger "
    ),
    i = 0,
    l = clase.length;

  for (i; i < l; i++) {
    clase[i].style.display = "none";
  }
  var mod = document.querySelectorAll(".btn.btn-outline-info"),
    i = 0;
  l = mod.length;
  for (i; i < l; i++) {
    mod[i].style.display = "";
  }
}
