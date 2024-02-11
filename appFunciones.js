function asignarTextoElementos(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
// arreglo para guardar numeros ya jugados
let numerosYaJugados = [];
// máximo de numeros para el juego
let numeroMax = 10;
//  variable a guardar número aleatorio generado
let numeroSecreto;
//variable a guardar el número que el user intente
let numeroUser;
// variable a guardar el conteo de intentos usados por el user
let intentos;
// variable para limitar el numero de intentor permitidos para adivinar
let maximoIntentos = 3;

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales(){
    asignarTextoElementos('h1', 'Juego del Numero Secreto');
    asignarTextoElementos('p', `Intenta un numero entre 1 y ${numeroMax}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}
condicionesIniciales();

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor( Math.random() * numeroMax) + 1;

    if(numerosYaJugados.length == numeroMax){
        asignarTextoElementos('p', 'Ya se sortearon todos los números posibles');
    }else{
        if (numerosYaJugados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            numerosYaJugados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function verificarIntento(){
    while(numeroUser != numeroSecreto){    
        // guardar valor ingresado por user y transformarlo de un string a un numero
        numeroUser = parseInt(document.getElementById('numeroUser').value);
        
        if (numeroUser === numeroSecreto){ // Si user adivinó
            asignarTextoElementos('p',`ADIVINASTE!! Utilizaste ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}!`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else{ // Si user no adivinó
            if (numeroUser > numeroSecreto){
                asignarTextoElementos('p','Menos!');
            } else{
                asignarTextoElementos('p','Mas!!!');
            }

            intentos ++;
            limpiarCajaIntento();

            if(intentos > maximoIntentos){
                asignarTextoElementos('p',`Has utilizado el máximo de ${maximoIntentos} intentos`);
                document.getElementById('reiniciar').removeAttribute('disabled');
                break;
            }
        }
        return;
    }
}

// Función para limpiar el campo de entrada de usuario
function limpiarCajaIntento(){
    document.querySelector('#numeroUser').value = '';
}

// función para reiniciar el juego y restablecer a las condiciones iniciales
function reiniciarJuego(){
    // limpiar campo de intento
    limpiarCajaIntento();
    /* mostrar mensaje de intentar entre 1 y 10
    generar numero aleatorio
    reiniciar conteo de intentos */
    condicionesIniciales();
    // Deshabilitar botón nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    // usando querySelector by id & setAttribute(atributo,true)
}

/* POR MEJORAR
NumeroMax sea definido por el user
Intentos sea definido por el user
No permitir la entrada de intentos (numeros)
Deshabilitar botón Intentar cuando: se acierta y cuando se agotan los intentos
*/