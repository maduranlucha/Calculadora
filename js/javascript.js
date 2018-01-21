window.onload = () => {
  'use strict';
  //Capturamos los botones de la calculadora
  let botones = document.getElementById("botones");
  //Capturamos la pantalla.
  let pantalla = document.getElementById("pantalla");
  let bateria = document.getElementById("bateria");
  //Variables
  let operacion = "";
  let valor = 0;
  let pantallaArray = [];
  let carga = 50;

  botones.addEventListener("click",(e)=>{
    let numero = e.target;
    //Comprobamos que el elemento es un Input (boton)
    if(numero.type ==="button"){
      carga -=1;
      if(numero.className.indexOf("numero") !== -1){
        pantalla.value += numero.value;
      }else if (numero.className.indexOf("operacion") !== -1){
        if (valor === 0) {
          valor = parseFloat(pantalla.value);
        } else {
          valor = parseFloat(pantalla.value);
        }
        operacion = numero.name;
        pantalla.value = "";
        //Boton para limpiar la pantalla y la variable valor.
      }else if(numero.className.indexOf("limpiar") !== -1){
        pantalla.value = "";
        valor = 0;
      }else if(numero.className.indexOf("guardarcookie") !== -1){
        setCookie("memoria",pantalla.value,5);
        pantalla.value ="";
      }else if(numero.className.indexOf("recuperarcookie") !== -1){
        pantalla.value = getCookie("memoria");
      }else if(numero.className.indexOf("lupa") !== -1){
        //Solo funciona con localhost
        window.open("big.html", "ventanon", `width=600, height=600`);
        //Para calcular el resultado de la operacion
      }else if(numero.className.indexOf("igual") !== -1){
        switch (operacion) {
        case "sumar":
          valor += parseFloat(pantalla.value);
          pantalla.value = valor;
          valor = 0;
          break;
        case "restar":
          valor -= parseFloat(pantalla.value);
          pantalla.value = valor;
          valor = 0;
          break;
        case "multiplicar":
          valor *= parseFloat(pantalla.value);
          pantalla.value = valor;
          valor = 0;
          break;
        case "dividir":
          valor /= parseFloat(pantalla.value);
          pantalla.value = valor;
          valor = 0;
          break;
        default:
          break;
        }
      }else if(numero.className.indexOf("decimal") !== -1){
        pantallaArray = pantalla.value.split("");
        if (pantallaArray.indexOf(".") === -1){
          pantalla.value += ".";
        }
      }
    }
    e.preventDefault();
  });
  setInterval (() =>{
    carga++;
    if(carga > 100){
      carga = 100;
    }
    if(carga < 0){
      carga = 0;
    }
    if(carga > 99){
      bateria.src= "imagenes/bateria5.png";
    }else if ((carga <= 99)  && (carga >= 75)){
      bateria.src ="imagenes/bateria4.png";
    }else if((carga < 75) && (carga >=50)){
      bateria.src ="imagenes/bateria3.png";
    }else if((carga < 50) && (carga >=25)){
      bateria.src ="imagenes/bateria2.png";
    }else if((carga < 25) && (carga >=1)){
      bateria.src ="imagenes/bateria1.png";
    }
  },1500);
};
//------FUNCIONES COOCKIES------//
//FUNCION PARA GUARDAR UN VALOR EN UNA COOKIE (nombre, valor, tiempo de expiracion)
let setCookie = (cname, cvalue, exdays) => {
  "use strict";
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};
//FUNCION PARA RECUPERAR UN VALOR DE UNA COOKIE
let getCookie = (cname) => {
  "use strict";
  let name = `${cname}=`;
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};