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
    ).innerHTML =`<img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">` ;
  }
  document.getElementsByName("n").forEach((name) => {
    name.innerHTML += usuario.nombre;
  });
});
