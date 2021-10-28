//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let nombreCompleto = {};
let email = {};
let telefono = 0;
let celular = 0;
let direccion = {};

document.addEventListener("DOMContentLoaded", function (e) {
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

  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (
    usuario.nombreCompleto == undefined &&
    usuario.email == undefined &&
    usuario.telefono == undefined &&
    usuario.ceuluar == undefined &&
    usuario.direccion == undefined
  ) {
    modificarDatos();
  } else {
    document.getElementById("divNombreCompleto").innerHTML =
      usuario.nombreCompleto;
    document.getElementById("divEmail").innerHTML = usuario.email;
    document.getElementById("divTelefono").innerHTML = usuario.telefono;
    document.getElementById("divCelular").innerHTML = usuario.celular;
    document.getElementById("divDireccion").innerHTML = usuario.direccion;
  }

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

  document.getElementsByName("name").forEach((input) => {
    if (input.hidden == true) {
      input.hidden = false;
    }
  });
  document.getElementsByName("spans").forEach((span) => {
    if (span.innerText != "") {
      span.previousElementSibling.value = span.innerText;
      span.hidden = true;
    }
  });
  var clase = document.querySelectorAll(
      ".btn.btn-outline-success , .btn.btn-outline-danger "
    ),
    i = 0,
    l = clase.length;

  for (i; i < l; i++) {
    clase[i].style.display = "";
  }
}

function avatar() {
  document.getElementsByName("o").forEach((input) => {
   
    if (input.selected == true) {
      if (input.value == 1) {
        
        document.getElementById(
          "foto"
        ).innerHTML = `<img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">`;

      } else if (input.value == 2) {
        document.getElementById(
          "foto"
        ).innerHTML = `<img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava4.png" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">`;
      }
    }
  });
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

  document.getElementsByName("spans").forEach((span) => {
    span.hidden = false;
  });
  document.getElementsByName("name").forEach((input) => {
    input.hidden = true;
  });
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

  valorStorage();
  document.getElementsByName("name").forEach((input) => {
    if (input.hidden == false) {
      input.hidden = true;
    }
  });
}

document.addEventListener("keypress", (event) => {
  if (event.code == "Enter") {
    guardar();
  }
});

function valorStorage() {
  nombreCompleto = document.getElementById("nombre").value;
  email = document.getElementById("email").value;
  telefono = document.getElementById("telefono").value;
  celular = document.getElementById("celular").value;
  direccion = document.getElementById("direccion").value;
  local();
}

function local() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  usuario.nombreCompleto = nombreCompleto;
  usuario.email = email;
  usuario.telefono = telefono;
  usuario.celular = celular;
  usuario.direccion = direccion;

  localStorage.setItem("usuario", JSON.stringify(usuario));
  sessionStorage.setItem("usuario", JSON.stringify(usuario));

  document.getElementById("divNombreCompleto").innerHTML =
    usuario.nombreCompleto;
  document.getElementById("divEmail").innerHTML = usuario.email;
  document.getElementById("divTelefono").innerHTML = usuario.telefono;
  document.getElementById("divCelular").innerHTML = usuario.celular;
  document.getElementById("divDireccion").innerHTML = usuario.direccion;
}
