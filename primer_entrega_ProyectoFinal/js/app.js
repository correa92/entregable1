document.body.onload = function () {
  class Pelicula {
    constructor(
      nombrePelicula,
      formato,
      genero,
      estreno,
      idioma,
      sala,
      precio
    ) {
      this.nombrePelicula = nombrePelicula;
      this.formato = formato;
      this.genero = genero;
      this.estreno = estreno;
      this.idioma = idioma;
      this.sala = sala;
      this.precio = precio;
    }

    mostrarPelicula = () => {
      return `Pelicula: ${this.nombrePelicula.toUpperCase()}
             Formato: ${this.formato}
             Genero: ${this.genero}
             Estreno: ${this.estreno}
             Idioma: ${this.idioma}
             Sala: ${this.sala}`;
    };

    comprarPelicula() {
      return confirm(`¿Desea comprar tickets para la siguiente pelicula?
      ${this.mostrarPelicula()}`);
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
  const generosDisponibles = [
    "ACCIÓN",
    "SUSPENSO",
    "TERROR",
    "COMEDIA",
    "ROMANTICA",
    "INFANTIL",
  ];
  const idiomasDisponibles = ["INGLÉS SUBTITULADO", "LATINO"];
  let carrito = [];
  let total = 0;

  let peli1 = new Pelicula(
    "IRON MAN",
    ["3D", "4D"],
    generosDisponibles[0],
    "02/10/2022",
    idiomasDisponibles[1],
    3,
    null
  );
  let peli2 = new Pelicula(
    "CAR",
    ["2D"],
    "infantil",
    "08/12/2021",
    "ingles",
    8,
    formatosDisponibles[0]
  );
  let peli3 = new Pelicula(
    "THOR",
    ["4D"],
    "ACCIÓN",
    "23/10/2021",
    "ingles",
    7,
    formatosDisponibles[3]
  );

  let peliculasEnCartelera = [peli1, peli2, peli3];

  //-----------------------------------------------Programa Principal-----------------------------------------------------------------------------
  let salir = false;

  while (!salir) {
    let eleccion = parseInt(
      prompt(`¿Qué acción desea realizar?
        1- Ver Cartelera
        2- Buscar Cartelera
        3- Ver Carrito
        4- Vaciar Carrito
        9- Salir`)
    );

    switch (eleccion) {
      case 1:
        //muestro la informacion de la pelicula y obtengo su posicion en el array
        let index = mostrarCartelera();
        let precioDeSala = 0;
        let conFormato = false;
        let formatoSeleccionado = null;

        while (!conFormato) {
          // si el cliente desea comprar y la pelicula tiene varios formatos
          // debera elegir uno para poder seleccionar el precio.
          if (peliculasEnCartelera[index].formato.length > 1) {
            //obtengo los formatos de la pelicula seleccionada
            for (
              let i = 0;
              i < peliculasEnCartelera[index].formato.length;
              i++
            ) {
              //obtengo el formato disponible
              formatoSeleccionado = peliculasEnCartelera[index].formato[i];

              //busco el indice de este formato para buscar el precio correcto.
              let indexPrecio =
                formatosDisponibles.indexOf(formatoSeleccionado);
              // pregunto al usuario si desea este formato en particular para elegir el precio correcto del ticket
              let eleccion = confirm(
                `¿Desea el formato ${formatoSeleccionado}?`
              );

              if (eleccion == true) {
                precioDeSala = precioPorSala[indexPrecio];
                conFormato = true;
                break;
              }
            } //fin del for
          } else {
            // si la pelicula tiene un solo formato tiene el precio que le corresponde dependiendo del tipo de sala.
            formatoSeleccionado = peliculasEnCartelera[index].formato;
            precioDeSala = precioPorSala[0];
            conFormato = true;
          }
        }

        do {
          //pregunto al usuario cuantos tickets quiere comprar
          cantidadTicket = parseInt(prompt(`¿Cuántos tickets desea comprar?`));
        } while (cantidadTicket < 1 || isNaN(cantidadTicket));

        //genero el pedido
        let pedido = new Carrito(
          cantidadTicket,
          precioDeSala,
          peliculasEnCartelera[index].nombrePelicula,
          formatoSeleccionado
        );

        //si el carrito ya tiene elementos se asegura q no se repitan, si no tiene lo agrega directamente
          if(carrito.length>0){
            let resultado = carrito.find((elem)=>elem.nombrePelicula===pedido.nombrePelicula);
            let resultado2  = carrito.find((elem) => elem.formato===pedido.formato);

            if(!(resultado && resultado2)){
                        //agrego al carrito el pedido
                        carrito.push(pedido);
                        alert("¡¡¡La película se agregó al carrito!!!");     
          }else{
            alert("La película con este formato ya se encuentra en el carrito, seleccione otra.");
          }
        }else{
          carrito.push(pedido);
          alert("¡¡¡La película se agregó al carrito!!!");
        }   

        break;

      case 2:
        let busqueda = prompt(
          "Introduzca el título de la película"
        ).toUpperCase();

        buscarCartelera(peliculasEnCartelera, busqueda);

        break;
      
      case 3:
        if (carrito.length < 1) {
          alert("El carrito está vacío =(");

          break;
        } else {

          for (const elem of carrito) {
            alert(elem.mostrarCarrito());
          }
          console.log('longitud del carrito: ',carrito.length);
          total = carrito.reduce((acum, elem) => acum + (elem.precio*elem.cantidadTicket), 0);

          console.log(total, "prueba");

          if (confirm(`Su total es: $${total}, ¿Desea confirmar la compra?`)) {
            alert(
              "Su compra se a realizado con exito!!! Gracias por utilizar nuestros servicios. -CINELAND- "
            );
            total = 0;
            carrito = [];
          } else {
            alert("Su compra no se a confirmado");
          }
        }

        break;

      case 4:
        if (confirm("¿Desea vaciar su carrito?")) {
          carrito = [];
          total = 0;
          alert("Su carrito se a vaciado correctamente");
          break;
        } else {
          alert("Su carrito no se a vaciado");
          break;
        }

      case 9:
        salir = true;
        break;
      default:
        alert("Acción no disponible");
        break;
    }
  } // salir while

  //-------------------------------------FUNCIONES--------------------------------------

  function mostrarCartelera() {
    for (let i = 0; i < peliculasEnCartelera.length; i++) {
      if (peliculasEnCartelera[i].comprarPelicula()) {
        return i;
      }
    }
    return alert("Películas no disponibles");
  } //mostrarCartelera
};

let total = (elem) =>
  elem.reduce((acumulador, elemento) => acumulador + elemento.precio, 0);

function buscarCartelera(array, busqueda) {
  let resultado = array.find((el) => el.nombrePelicula === busqueda);

  if (resultado) {
    alert(resultado.mostrarPelicula());
  } else {
    alert("No se encontró la película");
  }
  return resultado;
}
