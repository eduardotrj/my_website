
/*  Debe leer la dirección url y limpiarla para averiguar que página esta activa. Después, debe seleccionar el elemento correcto dentro del MENU NAV y aplicarle la clase "menuSeleccionActiva" y quitarsela al resto de elementos, si la tuviera.

*** REVISAR CUANDO SE SUBA A INTERNET DE QUE ESTE CORRECTAMENTE LAS ULRS ***
*/
paginaActualBorder();

function paginaActualBorder(){
    
    //Obtiene un array.
    var direccionURL = window.location.pathname; 
    var paginaActual = direccionURL.replace('.','/').split('/');
    
    //El valor de interés se guarda en la posición 2 del array. Siendo 0:"" 1:webname.
    //Para el Index, quizá haya que validar para php en vez de Index en server.    
    
    /* quita la  clase menuSelecccionACtiva a cualquier elemento del menu antes de anadir .*/
    
    // var elements = document.querySelectorAll('#MenuWebList > li > a'); 
    
    var idObjetivo = document.querySelector("#Nav-" + paginaActual[2]);
    
    //añadir la clase al id correspondiente con paginaACtual
    idObjetivo.classList.add("menuSeleccionActiva"); 
    
 }

//MENU RESPONSIVE
$(document).ready(function(){
  $("#menuPlegable").click(function(){
    $("#MenuWebList").slideToggle();
  });
});


//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// JavaScript Document
function mostrarNotificacion(mensaje, clase) {
    //selecciona el elemento div, y le añáde el texto recibido.
    const notificacion = document.querySelector('#ventanaFlotante');
    notificacion.innerHTML = `<p>${mensaje}</p>`;
    
    
    //Crea el elemnto icono y le anade la clase con el simbolo deseado.
    const iconoNotificacion = document.createElement('i'); 
    iconoNotificacion.classList.add(clase); 
    notificacion.appendChild(iconoNotificacion);
    
    notificacion.classList.add('mostrar');
    notificacion.classList.add('visible');
    //Muestra y oculta la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');
        //anade clase visible
        
        setTimeout(() => {
            notificacion.classList.remove('visible');
            
            
            setTimeout(() => {//permite dar tiempo a la transision de ocultarse
                notificacion.classList.remove('mostrar');
                //notificacion.remove(); //Evita que se acumulen multiples div, =
            }, 500);
            
        }, 2000); //Remueve la clase visible despues de 3s
        
    },100);
    
}//fun mostarnotificacion

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//Comprobar valores de entrada por JavaScript
// List of words to avoid (bad words)
var listaPalabras=new Array("sexo","polla","pene","fuck","chupar","cojon","puta","bitch","suck","mierda","maricon","shit", "piss off","asshole","bastard","zorra","gilipo","cunt", "dick","bollocks","bugger","bloody","choad","rubbish","capull","fulana","picha","stupid","cabron","coño","putita","putilla","yonki","pedoph","pedof","correrse","pussy","vagina","joder");

var contadorAlert=new Array;
var contadorPalabraAlert=0;
function resetContadorPalabra()
{
    contadorPalabraAlert=0;
}
function validate_text(textoEnviado)
{
     resetContadorPalabra();
    
     var compare_text=textoEnviado;
    
     for(var i=0; i<listaPalabras.length; i++)
     {
          for(var j=0; j<(compare_text.length); j++)
          {
               if(listaPalabras[i]==compare_text.substring(j,(j+listaPalabras[i].length)).toLowerCase())
               {
                    contadorAlert[contadorPalabraAlert]=compare_text.substring(j,(j+listaPalabras[i].length));
                    contadorPalabraAlert++;
               }
          }
     }
    
     var alert_text="";
     for(var k=1; k<=contadorPalabraAlert; k++)
     {
        alert_text+="\n" + "(" + k + ")  " + contadorAlert[k-1];
     }
     if(contadorPalabraAlert>0)
     {
          /*alert("The message will not be sent!!!\nThe following illegal words were found:\n_______________________________\n" + alert_text + "\n_______________________________");
          document.form1.text.select();*/
         
         mostrarNotificacion('Please, try avoid to use this words:\n' + alert_text, 'icon-cloud-warning');
         return false;
     }
     else
     {
        return true;
     }
    
}
