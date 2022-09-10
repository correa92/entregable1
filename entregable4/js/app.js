document.body.onload = function () {
  class Pelicula {
    constructor(
      id,
      nombrePelicula,
      formato,
      genero,
      estreno,
      idioma,
      sala,
      precio,
      imagen
    ) {
      this.id = id;
      this.nombrePelicula = nombrePelicula;
      this.formato = formato;
      this.genero = genero;
      this.estreno = estreno;
      this.idioma = idioma;
      this.sala = sala;
      this.precio = precio;
      this.imagen = imagen;
    }

  } //fin class Pelicula

  class Carrito {
    constructor(cantidadTicket, precio, nombrePelicula, formato) {
      this.cantidadTicket = cantidadTicket;
      this.precio = precio;
      this.nombrePelicula = nombrePelicula;
      this.formato = formato;
    }

    subtotal = () => this.precio * this.cantidadTicket;

    mostrarCarrito() {
      return `Pelicula: ${this.nombrePelicula}
      Formato: ${this.formato}
      Cantidad tickets: ${this.cantidadTicket}
      Precio x tickets: ${this.precio}
      Total: $${this.subtotal()}
      `;
    }
  }

  //--------------variables-------------------------------------------------------------------------------------------------------------
  const formatosDisponibles = ["2D", "3D", "4D", "MONSTER"];
  const precioPorSala = [500, 600, 700, 800];
  const generosDisponibles = ["ACCIÓN","SUSPENSO","TERROR","COMEDIA","ROMANTICA","INFANTIL"];
  const idiomasDisponibles = ["INGLÉS SUBTITULADO", "LATINO"];
  

  let peli1 = new Pelicula(0,"THOR, AMOR Y TRUENO",formatosDisponibles[1],generosDisponibles[0],"02/10/2022",idiomasDisponibles[1],1,precioPorSala[1],"./img/thor-amor-y-trueno-500x760.jpg");
  let peli2 = new Pelicula(1,"JACK EN LA CAJA MALDITA",formatosDisponibles[0],"TERROR","08/12/2021",idiomasDisponibles[0],2,precioPorSala[0],"./img/jack-en-la-caja-maldita-2-el-despertar.jpg");
  let peli3 = new Pelicula(2,"TOP GUN MAVERICK",formatosDisponibles[3],"INFANTIL","12/06/2022",idiomasDisponibles[1],3,precioPorSala[3],"./img/top-gun-2-maverick-500x760.jpg");
  let peli4 = new Pelicula(3,"EL PERRO SAMURAI",formatosDisponibles[0],"INFANTIL","02/04/2022",idiomasDisponibles[1],4,precioPorSala[0],"./img/el-perro-samurai-500x760.jpg");
  let peli5 = new Pelicula(4,"AFTER, AMOR INFINITO",formatosDisponibles[2],"ROMANTICA","23/10/2021",idiomasDisponibles[0],5,precioPorSala[2],"./img/after-amor-infinito-500x760.jpg");
  let peli6 = new Pelicula(5,"INVITACION AL INFIERNO",formatosDisponibles[3],"TERROR","26/12/2022",idiomasDisponibles[0],6,precioPorSala[3],"./img/invitacion-al-infierno-500x760.jpg");
  let peli7 = new Pelicula(6,"TREN BALA",formatosDisponibles[1],"ACCIÓN","20/09/2022",idiomasDisponibles[1],7,precioPorSala[1],"./img/tren-bala-500x760.jpg");
  let peli8 = new Pelicula(7,"PRINCESA POR ACCIDENTE",formatosDisponibles[1],"INFANTIL","09/10/2022",idiomasDisponibles[1],8,precioPorSala[1],"./img/princesa-por-accidente-500x760.jpg");


  let peliculasEnCartelera = [peli1, peli2, peli3,peli4,peli5,peli6,peli7,peli8];

  //-----------------------------------------------Programa Principal-----------------------------------------------------------------------------

crearCartelera();

  let filtro2D = document.getElementById("btn-2D");
  filtro2D.addEventListener('click',()=>{
    filtrar("btn-2D","2D");
    eliminarError('busqueda');
    eliminarPeliculasCartelera();
    if(!filtro2D.classList.contains('btn-activado')){
      crearCartelera();
    } });

  let filtro3D = document.getElementById("btn-3D");
  filtro3D.addEventListener('click',()=>{filtrar("btn-3D","3D");
  eliminarError('busqueda');
  eliminarPeliculasCartelera();
    if(!filtro3D.classList.contains('btn-activado')){
      crearCartelera();
    } });

  let filtro4D = document.getElementById("btn-4D");
  filtro4D.addEventListener('click',()=>{filtrar("btn-4D","4D");
  eliminarError('busqueda');
  eliminarPeliculasCartelera();
    if(!filtro4D.classList.contains('btn-activado')){
      crearCartelera();
    } });

  let filtroMONSTER = document.getElementById("btn-monster");
  filtroMONSTER.addEventListener('click',()=>{filtrar("btn-monster","MONSTER")
  eliminarError('busqueda');
  eliminarPeliculasCartelera();
    if(!filtroMONSTER.classList.contains('btn-activado')){
      crearCartelera();
    } });

    let peliculaBuscada = "";
    let input = document.getElementById('buscador');
    input.addEventListener('input',()=> {
      eliminarError('busqueda');
      peliculaBuscada = input.value;
      peliculaBuscada = peliculaBuscada.toUpperCase();
    });
   
    
    let botonBuscar = document.getElementById("btn-buscar");
    botonBuscar.addEventListener('click',()=>{
      let contenedor = document.getElementById('peliculas-contenedor');
      contenedor.innerHTML="";
      
      eliminarError('busqueda');
      buscarPelicula(peliculaBuscada);
      ;})


//-------------------------------------Funciones----------------------------------------------

function crearCartelera(){

  
  let contenedorPeliculas = document.getElementById("peliculas-contenedor");

  if(contenedorPeliculas.innerText ===""){
    for (const elem of peliculasEnCartelera) {
  
      let div = document.createElement('div');
        div.className = `pelicula`;
      
        div.innerHTML = ` 
        <div class="imagen">
          <picture>
            <img
              loading="lazy"
              src=${elem.imagen}
              alt="${elem.nombrePelicula}"
              title="${elem.nombrePelicula}"
            />
          </picture>
        </div>
        <!--fin imagen-->
      
        <div class="info">
          <div class="par">
            <span>${elem.nombrePelicula}</span>
          </div>
          <input class="btn btn-comprar" type="button" value="COMPRAR" />
        </div>
        <!--fin info-->
        `;
      
      contenedorPeliculas.append(div);
      
  }
  

  
  }
}// crearCartelera

function filtrar(boton,formatoPeli) {

  let contenedor = document.getElementById("peliculas-contenedor");
  let btn = document.getElementById(boton);
  if(btn.classList.contains('btn-activado')){
    eliminar(formatoPeli);
    
  }else{
    let resultados = peliculasEnCartelera.filter((el) => el.formato === formatoPeli );

    for (const elem of resultados) {
      let div = document.createElement('DIV');
      div.className = `pelicula formato-${formatoPeli}`;

      div.innerHTML = `
       
      <div class="imagen" >
        <picture>
          <img
            loading="lazy"
            src=${elem.imagen}
            alt="${elem.nombrePelicula}"
            title="${elem.nombrePelicula}"
          />
        </picture>
      </div>
      <!--fin imagen-->
    
      <div class="info">
        <div class="par">
          <span>${elem.nombrePelicula}</span>
        </div>
        <input class="btn btn-comprar" type="button" value="COMPRAR" />
      </div>
      <!--fin info-->
      `;
  
      contenedor.appendChild(div);
    }
    // btn.classList.toggle('btn-activado');
    
  }

  btn.classList.toggle('btn-activado');
  
}

function eliminar(formato){
let contenedor = document.querySelectorAll(`.formato-${formato}`);
for (const i of contenedor) {
  i.remove();
  
}
}//eliminar

function eliminarPeliculasCartelera() {
  let peliculasContenedor = document.querySelectorAll(".pelicula");

  for (const elem of peliculasContenedor) {
    if(elem.classList.length==1){
      elem.remove();
    }
  }

}

function buscarPelicula(pelicula) {
  
  let resultado = peliculasEnCartelera.filter((elem)=> elem.nombrePelicula === pelicula );
  if(resultado.length ==0){
    eliminarPeliculasCartelera();
    let contenedor = document.getElementById("main");
      let div = document.createElement('DIV');
      div.className = "busqueda";
      div.innerHTML = `<p> LO SENTIMOS, NO ENCONTRAMOS LA PELÍCULA INGRESADA =( </p>`;

    contenedor.appendChild(div);
  }else{
    eliminarPeliculasCartelera();
    mostrarPelicula(resultado);
  }
  
}//buscarPelicula

function mostrarPelicula(objetoPelicula){

  
  let contenedor = document.getElementById("peliculas-contenedor");
      let div = document.createElement('DIV');
      div.className = `pelicula formato-${objetoPelicula[0].formato}`;

      div.innerHTML = `
      <div class="imagen" >
        <picture>
          <img
            loading="lazy"
            src=${objetoPelicula[0].imagen}
            alt="${objetoPelicula[0].nombrePelicula}"
            title="${objetoPelicula[0].nombrePelicula}"
          />
        </picture>
      </div>
      <!--fin imagen-->
    
      <div class="info">
        <div class="par">
          <span>${objetoPelicula[0].nombrePelicula}</span>
        </div>
        <input class="btn btn-comprar" type="button" value="COMPRAR" />
      </div>
      <!--fin info-->
      `; 
      contenedor.appendChild(div);

  }//mostrarPelicula


function eliminarError(clase){

  let elemento = document.querySelector(`.${clase}`);
  if(elemento != null){
      elemento.remove();
  }
  
}//eliminarError






}//onload
