document.body.onload = function () {

  class Pelicula {
    constructor(nombrePelicula, formato, genero, estreno, idioma, sala) {
      this.nombrePelicula = nombrePelicula;
      this.formato = formato;
      this.genero = genero;
      this.estreno = estreno;
      this.idioma = idioma;
      this.sala = sala;
    }

    mostrarPelicula = () => {
      alert(
        `Pelicula: ${this.nombrePelicula.toUpperCase()}
           Formato: ${this.formato}
           Genero: ${this.genero}
           Estreno: ${this.estreno}
           Idioma: ${this.idioma}
           Sala: ${this.sala}`
      );
    };

    validacion = (accion) => alert(`La película ${this.nombrePelicula.toUpperCase()} se ${accion} correctamente`);
    noValido = (accion) => alert(`La película ${this.nombrePelicula.toUpperCase()} no se ${accion} correctamente`)

  } //fin class Pelicula

  const formatosDisponibles = ["2D", "3D", "4D", "Monster"];
  const generosDisponibles = ["Acción","Suspenso","Terror","Comedia","Romantica","Infantil"];
  const idiomasDisponibles = ["Inglés subtitulado", "Latino"];
  let salasSinUso = [1,2,4,5,7,9,6];

  let peli1 = new Pelicula("IRON MAN",["3D","4D"],"acción","02/10/2022","latino",3);
  let peli2 = new Pelicula("CAR", "2D", "infantil", "08/12/2021", "ingles", 8);

  let peliculasEnCartelera = [peli1, peli2];

  //Programa Principal
  let salir = false;

  while (!salir) {

    salasSinUso.sort((a,b)=> {return a-b});

    console.log("PELÍCULAS EN CARTELERA ",peliculasEnCartelera);
    console.log("SALAS SIN USO ",salasSinUso);



    let eleccion = parseInt(
      prompt(`¿Qué acción desea realizar?
      1- Crear Cartelera
      2- Eliminar Cartelera
      3- Buscar Cartelera
      9- Salir`)
    );

    switch (eleccion) {
      case 1:
        crearCartelera();
        break;
      case 2:
        eliminarCartelera();
        break;
      case 3:
        buscarCartelera();
        break;
      case 9:
        salir = true;
        break;
      default:
        alert("Acción no disponible");
        break;
    }


  } // salir while

  function crearCartelera() {
    let nombrePelicula = prompt("Ingrese nombre de película").toUpperCase();
    let formatos = [];
    let generos = [];
    let idiomas = [];
    let sala=0;
    let validaciones = [];

    if(nombrePelicula.length <1){
        validaciones.push(false);
    }else{validaciones.push(true);}

    //recorre formatos
    for (let i = 0; i < formatosDisponibles.length; i++) {
      let tieneEsteFormato = prompt(
        `¿Tiene formato ${formatosDisponibles[i]}? (SI - NO)`
      ).toUpperCase();
      if (tieneEsteFormato == "SI") {
        formatos.push(formatosDisponibles[i]);
        validaciones.push(true);
      }
    }

    //recorre generos
    for (let i = 0; i < generosDisponibles.length; i++) {
      let tieneEsteGenero = prompt(
        `¿Es de ${generosDisponibles[i]}? (SI - NO)`
      ).toUpperCase();
      if (tieneEsteGenero == "SI") {
        generos.push(generosDisponibles[i]);
        validaciones.push(true);
        break;
      }
    }

    // ingresa Fecha de Estreno
    let fechaEstreno = prompt("Ingrese fecha de estreno");
    if(fechaEstreno.length>=6){
        validaciones.push(true);
    }else{
        alert("Fecha incorrecta");
        validaciones.push(false);
    }
    //Ingresa idioma
    for (let i = 0; i < idiomasDisponibles.length; i++) {
      let tieneEsteIdioma = prompt(
        `¿Es de idioma ${idiomasDisponibles[i]}? (SI - NO)`).toUpperCase();
      if (tieneEsteIdioma == "SI") {
        idiomas.push(idiomasDisponibles[i]);
        validaciones.push(true);
      }
    }

    //Ingresa Sala
    if (salasSinUso.length > 0) {
        let numeroSala = parseInt(prompt(
            `Sala de proyección disponibles: [${salasSinUso.join('-')}] \nSeleccione una`));
    
            for (let i = 0; i < salasSinUso.length; i++) {

                if(numeroSala==salasSinUso[i]){
                    sala = numeroSala;
                    validaciones.push(true);                 
                }              
            }

            if(sala==0){
                alert('Eligio una sala incorrecta');
                validaciones.push(false);
            }
        
    }else{
        alert('Salas no disponibles');
        validaciones.push(false);
    }

    // si se encuentra alguna validacion falsa entonces no se crea el objeto
    let sePuedeCrear = true

    for (const valor of validaciones) {
        
        if(valor === false){
            sePuedeCrear =false;
        }
    }
    if(sePuedeCrear){
        let pelicula = new Pelicula(nombrePelicula,formatos,generos,fechaEstreno,idiomas,sala);
        peliculasEnCartelera.push(pelicula);
        pelicula.mostrarPelicula();
        pelicula.validacion('creó');
        let indexSala = salasSinUso.indexOf(sala); //busco el indice del numero de sala para luego eliminarlo de la lista
        salasSinUso.splice(indexSala,1); //elimino el numero de sala
        

    }else{
        alert("No se pudo crear la cartelera, ingrese los datos correctamente");
    }

  } // crearCartelera


  function eliminarCartelera() {
    
    let indexPeli = -1;

    for (let i = 0; i < peliculasEnCartelera.length; i++) {

        let eleccion = prompt(`¿Desea eliminar la siguiente película? ${peliculasEnCartelera[i].nombrePelicula.toUpperCase()} - (SI-NO)`).toUpperCase();
        
        if(eleccion=="SI"){
            indexPeli = i;  
            break;          
        }
        
    }
    if(indexPeli != -1){
        
      salasSinUso.push(peliculasEnCartelera[indexPeli].sala);
      peliculasEnCartelera[indexPeli].validacion('eliminó');
      peliculasEnCartelera.splice(indexPeli,1);
    }else{ alert("Sin peliculas en cartelera");}

  }//eliminarCartelera

  function buscarCartelera(){
    let index = -1;
    let buscador = prompt('¿Qué pelicula desea buscar?').toUpperCase();

    for (let i = 0; i < peliculasEnCartelera.length; i++) {
        
        if(peliculasEnCartelera[i].nombrePelicula===buscador){
            index = i;
        }
        
    }
   
    console.log(index);
    if(index !=-1){
        peliculasEnCartelera[index].validacion('encontró');
        peliculasEnCartelera[index].mostrarPelicula();
    }else{
        alert(`La película ${buscador} no se ha encontrado en nuestro registros.`);
    
    }
  }//buscarCartelera



  

}
