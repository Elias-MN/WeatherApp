let url = 'https://raw.githubusercontent.com/Elias-MN/JSON/main/tiempo.json';

const contenedor = document.getElementById("contenedor");

const imgDiaActual = document.getElementById("img-dia-actual");
const temperaturaDiaActual = document.getElementById("temperatura-dia-actual");
const estadoDiaActual = document.getElementById("estado-nombre");
const ciudad = document.getElementById("ciudad");

const diasElement = document.getElementsByClassName("dia");
const imgsDiaElement = document.getElementsByClassName("img-dia");
const temperaturaDiaElement = document.getElementsByClassName("temperatura-dia");

const vientoActual = document.getElementById("viento-dia");
const humedadActual = document.getElementById("humedad-dia");

const parteDer = document.getElementsByClassName("parte-derecha");
const parteIzq = document.getElementsByClassName("parte-izquierda");
const pronosticoDias = document.getElementsByClassName("pronostico-dia");
const datosAtmosfericos = document.getElementsByClassName("datos-atmosfericos-dato");

const azulMarino = "#404376";
const azulCobalto = "#110d42";
const azulClaroCyan = "#E0FFFF";
const azulClaroCielo = "#87CEFA";
const amarilloOro = "#FFD700";
const amarilloAmbar = "#FAFAD2";


async function obtenerJSON(url){
    const respuesta = await fetch(url);
    const json = await respuesta.json();
    return json;
}

function obtenerIcono(nombre){
	switch (nombre) {
		case "soleado": 
			return "./imagenes/soleado.png";
			break;
		case "nublado": 
			return "./imagenes/nublado.png";
			break;
		case "truenos": 
			return "./imagenes/truenos.png";
			break;
		case "lluvia": 
			return "./imagenes/lluvia.png";
			break;
		default:
			break;
	}
}

function cambiarColor(color1, color2){
	parteDer[0].style.backgroundColor = color1;
	parteIzq[0].style.backgroundColor = color2;
	for (var i=0; i<pronosticoDias.length; i++){
		pronosticoDias[i].style.backgroundColor = color2;
	}
	for (var j=0; j<datosAtmosfericos.length; j++){
		datosAtmosfericos[j].style.backgroundColor = color2;
	}
}

function cambiarColorFondo(temperatura){

	if(temperatura < 10){
		cambiarColor(azulMarino, azulCobalto);
	}else if (temperatura >= 10 && temperatura < 25){
		cambiarColor(azulClaroCyan, azulClaroCielo);
	}else if(temperatura >= 25){
		cambiarColor(amarilloOro, amarilloAmbar);
	}
}


obtenerJSON(url)
	.then(json => {

		//Día actual
		imgDiaActual.src = obtenerIcono(json.dias[0].estado.nombre);
		temperaturaDiaActual.innerText = json.dias[0].temperatura + "º";
		estadoDiaActual.innerText = json.dias[0].estado.nombre.toUpperCase();
		ciudad.innerText = json.ciudad;

		//Pronostico
		for(var i = 0; i < json.dias.length-1; i++){
			diasElement[i].innerText = "Día " + json.dias[i+1].dia;
			imgsDiaElement[i].src = obtenerIcono(json.dias[i+1].estado.nombre);
			temperaturaDiaElement[i].innerText = json.dias[i+1].temperatura + "º";
		}		

		//Viento y humedad
		vientoActual.innerText = json.dias[0].viento + "Km/h";
		humedadActual.innerText = json.dias[0].humedad + "%";

		//Estilos
		cambiarColorFondo(json.dias[0].temperatura);
		//cambiarColorFondo(35);
	});