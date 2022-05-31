// Contact JavaScript Document

const formularioWriteToMe = document.querySelector('#writeToMe'); //Apunta al form de test.

eventListeners();

function eventListeners(){
    
    //Cuando se finaliza el formulario
    formularioWriteToMe.addEventListener('submit', recibirMensaje);
    
}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    
function recibirMensaje(e) {
    e.preventDefault();
    
    //Lee los valores de los inputs.
    const nombre = document.querySelector('#nombre').value,
    email = document.querySelector('#email').value,
    mensaje = document.querySelector('#mensaje').value;
    
    
    const textoEnviado = nombre + " " + mensaje;
    
    if(nombre === '' || email === '' || mensaje === '') {
        //En caso de que se envien los campos vacios..
        mostrarNotificacion('Please, field all fields', 'icon-cloud-warning');
    
    }else if(!validate_text(textoEnviado)) {
        
        return;
    
    } else {
        
        //preparacion Ajax
        const mensajeContacto = new FormData();
        mensajeContacto.append('name',nombre);
        mensajeContacto.append('email',email);
        mensajeContacto.append('message',mensaje);
        
        guardarMensaje(mensajeContacto);
    } 
    
}//func leerFormulario


//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
function guardarMensaje(mensajeContacto) {
    
    //llamar Ajax
    const xhr = new XMLHttpRequest();
    
    //abre conexion
    xhr.open('POST', 'inc/modelos/comunicacionMensaje.php', true);
    
    //cargar datos
    xhr.onload = function() {
    //cargar datos
        if(this.status === 200) {
            
            console.log("esta verga tira");
            
            console.log(JSON.parse( xhr.responseText) );
            
    //cargar datos
            //leer respuesta  PHP
            const respuesta = JSON.parse( xhr.responseText );
            
            const textoRespuesta = respuesta.nombre + ", the message has been successfully received, thank you very much for contacting me.";
            
            mostrarNotificacion(textoRespuesta, 'icon-cloud-happy');
            
            document.querySelector('#writeToMe').reset(); 
        }
        else {  
             mostrarNotificacion('Sorry, was a problem', 'icon-cloud-wrong'); //conviene buscar icon-cloud-wrong
             }
    }
    
    //Envia los datos
    xhr.send(mensajeContacto);
    
}