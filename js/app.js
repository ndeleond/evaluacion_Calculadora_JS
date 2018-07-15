    // Calculadora
var calculadora = {
    operacion: "",
    primerValor: 0,
    segundoValor: 0,
    resultado: 0,
    aux: false,
    //f(x) de operacion
    suma: function(){return this.primerValor + this.segundoValor},
    rest: function(){return this.primerValor - this.segundoValor},
    mult: function(){return this.primerValor * this.segundoValor},
    divi: function(){return this.primerValor / this.segundoValor},
    //f(x) de asignación de valores
    asig: function (valor){
      if (this.primerValor === 0) {
        this.primerValor = parseFloat(valor);
       } else {
        this.segundoValor = parseFloat(valor);
      }
    },
      //Calcular
    calc : function() {
      if (this.operacion == "mas") {
        this.resultado = this.suma();
      }else if (this.operacion == "menos") {
        this.resultado = this.rest();
      }else if (this.operacion == "por") {
        this.resultado = this.mult();
      }else if (this.operacion == "dividido") {
        this.resultado = this.divi();
      }
      this.primerValor = 0;
      this.segundoValor = 0;
    }
  };
  // Teclas
  var teclas = document.getElementsByClassName('tecla');
  //click a teclas
  for (var i = 0; i < teclas.length; i+=1) {
    teclas[i].onmousedown = preBtn;
    teclas[i].onclick = preClick;
    teclas[i].onmouseup = soltarBtn;
  }
  //Formato botones
  //presionar botón
  function preBtn(e){
    e.target.style.opacity=0.5;
  }
  //soltar botón
  function soltarBtn(e){
    e.target.style.opacity = 1.0;
  }
    
  // click en botón
  function preClick(e){
    var pantalla = document.getElementById('display').innerHTML;
    if (pantalla == "0" && e.target.id != "punto" && e.target.id != "sign"){
      pantalla = "";
    }
      //inicio calculadora
      if (e.target.id == "on"){
        pantalla = "0";
        calculadora.aux = false;
      //verificar operaciones
      } else if (e.target.id == "mas" || e.target.id == "menos" || e.target.id == "por" || e.target.id == "dividido"){
          //asigna valor
          calculadora.asig(pantalla);
          //Si existe valor2 calcula y asigna resultado a valor1
          if (calculadora.segundoValor != 0){
            calculadora.calc();
            calculadora.primerValor = calculadora.resultado;
            calculadora.segundoValor = 0;
          }
          calculadora.operacion = e.target.id;
          calculadora.aux = false;
          pantalla = "";
      //mostrar resultado al presionar boton =
      } else if (e.target.id == "igual"){
          if (pantalla == ""){
            pantalla = "0";
          }
          calculadora.asig(pantalla);
          calculadora.calc();
          pantalla = calculadora.resultado.toString().substr(0, 8);
      //controla longitud de número ingresado
      } else if (pantalla.length < 8){
        //controla punto, signo y concatena números
        switch (e.target.id) {
          case "punto":
            if (!calculadora.aux){
              pantalla = pantalla + ".";
              calculadora.aux = true;
            }
            break;
          case "sign":
            if (pantalla != "0"){
              if (pantalla.substr(0,1) == "-"){
                pantalla = pantalla.substr(1);
              }else{
                pantalla = "-" + pantalla;
              }
            }
            break;
          default:
            pantalla = pantalla + e.target.id;
        }
      }
    //muestra resultado
    document.getElementById('display').innerHTML = pantalla;
  }