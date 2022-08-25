document.body.onload = function() {    

const MONEDA="ARS"
const DESCUENTO = 0.2;

let salir=false;
let asientosMetallica = 120;
let asientosSlayer=95;
let asientosIron=135;

let precioTickets = (cantidadDeTickets, precio) => {return cantidadDeTickets * precio};
let asientosDisponibles= (capacidadMaxima,cantidadDeAsientosComprados)=> {return capacidadMaxima-cantidadDeAsientosComprados};
let conBeneficio = (total,descuento) => {return total - (total*descuento )};
let mensaje = (show,precio,moneda) => {return alert(`Señor/a cliente el precio para ver ${show} es de $${precio} ${moneda} por ticket. Asientos disponibles ${asientos}`)};
let mensajeCompraConDescuento = (total,cantidadTickets,descuento) => {return `¡Felicitaciones usted compró ${cantidadTickets} tickets por un valor de $${total} con un descuento del ${descuento*100}%`};
let mensajeCompraSinDescuento = (total,cantidadTickets) => {return `¡Felicitaciones usted compró ${cantidadTickets} tickets por un valor de $${total}`};
let descuento = (eleccion)=> (eleccion=="si") ?  true : false;
let sinAsientos = () => alert("Sin asientos disponibles");

function main(nombre) {
    let cantidad=0;
    let totalSinDescuento =0;
    let disponible=0;
    let total =0;
    let beneficio = false;
    let confirmacion="";

    switch (nombre) {
        case "METALLICA":
            show = "metallica";
            precio=2000;
            asientos=asientosMetallica;
            mensaje(show,precio,MONEDA);
            cantidad = parseInt(prompt("¿Cuántos tickets desea comprar?"));
            totalSinDescuento =precioTickets(cantidad,precio);
            disponible = asientosDisponibles(asientos,cantidad);

            if(disponible <0){
                sinAsientos()
                break;
            }

            desc=prompt("¿Posee algún descuento? (si - no)")

            if(descuento(desc)){
                total = conBeneficio(totalSinDescuento,DESCUENTO);  
                beneficio = true;
            } else{
                total = totalSinDescuento;
            }

            confirmacion = prompt("¿Desea confirmar la compra? (si - no)").toLowerCase();
            if(confirmacion =="si" && beneficio){
                alert(mensajeCompraConDescuento(total,cantidad,DESCUENTO));
                asientosMetallica=disponible;
            }else if(confirmacion =="si" && !beneficio){
                alert(mensajeCompraSinDescuento(total,cantidad));
                asientosMetallica=disponible;
            }else{
                alert("Lamentamos que no hallas confirmado la compra, muchas gracias");
            }


            break;

        case "SLAYER":
            show = "SLAYER";
            precio=2000;
            asientos=asientosSlayer;
            mensaje(show,precio,MONEDA);
            cantidad = parseInt(prompt("¿Cuántos tickets desea comprar?"));
            totalSinDescuento =precioTickets(cantidad,precio);
            disponible = asientosDisponibles(asientos,cantidad);

            if(disponible <0){
                sinAsientos()
                break;
            }

            desc=prompt("¿Posee algún descuento? (si - no)")

            if(descuento(desc)){
                total = conBeneficio(totalSinDescuento,DESCUENTO);  
                beneficio = true;
            } else{
                total = totalSinDescuento;
            }

            confirmacion = prompt("¿Desea confirmar la compra? (si - no)").toLowerCase();
            if(confirmacion =="si" && beneficio){
                alert(mensajeCompraConDescuento(total,cantidad,DESCUENTO));
                asientosSlayer=disponible;
            }else if(confirmacion =="si" && !beneficio){
                alert(mensajeCompraSinDescuento(total,cantidad));
                asientosSlayer=disponible;
            }else{
                alert("Lamentamos que no hallas confirmado la compra, muchas gracias");
            }


            break;
            
        case "IRON MAIDEN":
            show = "iron maiden";
            precio=1800;
            asientos=asientosIron;
            mensaje(show,precio,MONEDA);
            cantidad = parseInt(prompt("¿Cuántos tickets desea comprar?"));
            totalSinDescuento =precioTickets(cantidad,precio);
            disponible = asientosDisponibles(asientos,cantidad);

            if(disponible <0){
                sinAsientos()
                break;
            }

            desc=prompt("¿Posee algún descuento? (si - no)")

            if(descuento(desc)){
                total = conBeneficio(totalSinDescuento,DESCUENTO);  
                beneficio = true;
            } else{
                total = totalSinDescuento;
            }

            confirmacion = prompt("¿Desea confirmar la compra? (si - no)").toLowerCase();
            if(confirmacion =="si" && beneficio){
                alert(mensajeCompraConDescuento(total,cantidad,DESCUENTO));
                asientosIron=disponible;
            }else if(confirmacion =="si" && !beneficio){
                alert(mensajeCompraSinDescuento(total,cantidad));
                asientosIron=disponible;
            }else{
                alert("Lamentamos que no hallas confirmado la compra, muchas gracias");
            }

            break;
        default:
            alert(`El show "${nombre}" no se encuentra disponible`);
            break;
    }
}

while(!salir){

    let seleccion = prompt("Ingrese el evento al que quiere asistir").toUpperCase();

    main(seleccion);

    let seguir = prompt("¿Desea seguir comprando?");
    if(seguir!="si"){
        salir=true;
    }

}//salir
alert("¡¡¡Gracias por su visita!!!");
  }
