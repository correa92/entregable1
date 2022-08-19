
let cantidad =parseInt(prompt("¿Cuántos alumnos desea inscribir?"));

while (cantidad<1) {
    cantidad =parseInt(prompt("¿Cuántos alumnos desea inscribir?"));
}

for (let i = 0; i < cantidad; i++) {
    
    let nombre= prompt("Ingrese nombre");
    let nota =parseInt(prompt("Ingrese promedio final"));
    
    while (nombre ==="" || nota<0 || nota>10 ) {
        alert("Datos no válidos, por favor complete correctamente los campos")
        nombre= prompt("Ingrese nombre");2
        nota =parseInt(prompt("Ingrese promedio final")); 
    }

    alert(`Alumno: ${nombre.toUpperCase()} , Promedio: ${nota} \n ¡Datos ingresados correctamente!`);

}

if (cantidad ===1) {
    alert(`¡Se ingresó ${cantidad} alumno con exito!`);
}else if(cantidad>1){
    alert(`¡Se ingresaron ${cantidad} alumnos con exito!`);
}else{
    //si cantidad es null  ejecuta la siguien linea
    alert("¡¡¡No ingresó ningun valor!!!");
}
