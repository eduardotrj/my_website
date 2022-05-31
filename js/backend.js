
//BACK-END JAVASCRIPT

const formularioContactos = document.querySelector('#formulario-test'), //Apunta al form de test.
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners(){
    
    //Cuando se finaliza el formulario
    formularioContactos.addEventListener('submit', leerFormulario);
    
    //if(listadoContactos){
    listadoContactos.addEventListener('click', modificarContacto);
    //}
    //Buscador
    inputBuscador.addEventListener('input', buscarContactos);
}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    
function leerFormulario(e) {
    e.preventDefault();
    
    //Lee los valores de los inputs.
    const nombreTest = document.querySelector('#nombreTest').value;
    const empresaTest = document.querySelector('#empresaTest').value;
    
    const textoEnviado = nombreTest + " " + empresaTest;
    
    if(nombreTest === '' || empresaTest === '') {
        //En caso de que se envien los campos vacios..
        mostrarNotificacion('Please, field all fields', 'icon-cloud-warning');
    
    }else if(!validate_text(textoEnviado)) {
        
        return;
    
    } else {
        
        //preparacion Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre',nombreTest);
        infoContacto.append('empresa',empresaTest);
        infoContacto.append('accion',"crear");
        
        insertarTest(infoContacto);
    } 
    
}//func leerFormulario


//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

/* Conectar con el servidor para enviar los datos. Se crea un objt. XMLHttpRequest() */

function insertarTest(infoContacto) {
    
    //llamar Ajax
    const xhr = new XMLHttpRequest();
    
    //abre conexion
    xhr.open('POST', 'inc/modelos/comunicacionTest.php', true);
    
    //cargar datos
    xhr.onload = function() {
        
    //cargar datos
        if(this.status === 200) {

            //console.log(JSON.parse( xhr.responseText) );
            
    //cargar datos
            //leer respuesta  PHP
            const respuesta = JSON.parse( xhr.responseText );
            
            //░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            //TABLA TEST
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.classList.add('fila');
            
            //crear contenedores para los botones
            const contenedorAcciones = document.createElement('td');
            contenedorAcciones.classList.add('firstColumn');
            
            //crear el icono de editar y eliminar, asignarle clases
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('icon-user-edit');
            
            const iconoBorrar = document.createElement('i');
            iconoBorrar.classList.add('icon-user-delete');
            
            //Crear botones y add como hijo el iconoEditar
            const btnEditar = document.createElement('button');
            btnEditar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEditar.appendChild(iconoEditar);
            
            const btnBorrar = document.createElement('button');
            btnBorrar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnBorrar.appendChild(iconoBorrar);
            
            //añádir botones al contenedor y el contenedor a..
            contenedorAcciones.appendChild(btnEditar);
            contenedorAcciones.appendChild(btnBorrar);
           
            //Los otros datos a la fila
            nuevoContacto.innerHTML = `
                <td class="otherColumn">${respuesta.datos.nombre}</td>
                <td class="otherColumn">${respuesta.datos.empresa}</td>
            `;
             //nuevoContacto.firstChild(contenedorAcciones);
            nuevoContacto.insertBefore(contenedorAcciones, nuevoContacto.firstChild);
            
            //Pasa a la tabla html.
            listadoContactos.insertBefore(nuevoContacto, listadoContactos.firstChild);
            //listadoContactos.appendChild(nuevoContacto);
            
            //Mostrar la notificacion
            mostrarNotificacion('User successfully created', 'icon-cloud-up');
            //░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            
            
             document.querySelector('#formulario-test').reset(); 
        }
        else {  
             mostrarNotificacion('Sorry, was a problem', 'icon-cloud-wrong'); //conviene buscar icon-cloud-wrong
             }
    }
    
    //Envia los datos
    xhr.send(infoContacto);
    
}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

function modificarContacto(e){

    //Borrar.
    if(e.target.parentElement.classList.contains('btn-borrar') ) {
        eliminarContacto(e);
    } //if borrar


    //Editar.
    if(e.target.parentElement.classList.contains('btn-editar') ) {
        editarContacto(e);                      
    }//if editar
    
    
    if(e.target.classList.contains('btn-cancelar') ) {
            restaurarContacto(e);  
    }//if editar
    
    
    if(e.target.classList.contains('btn-aceptar') ) {
        const id = e.target.getAttribute('data-id');
        e.preventDefault();
        //Lee los valores de los inputs y los limpia.
        const nombreTest = document.querySelector('#nombreEdit').value;
        const empresaTest = document.querySelector('#empresaEdit').value;
    
        const textoEnviado = nombreTest + " " + empresaTest;
        
        if(nombreTest === '' || empresaTest === '') {
        //En caso de que se envien los campos vacios..
        mostrarNotificacion('Please, field all fields', 'icon-cloud-warning');
    
        }else if(!validate_text(textoEnviado)) {
        
            return;
    
        } else {
        
        //preparacion Ajax
            const editContacto = new FormData();
            editContacto.append('id',id);
            editContacto.append('nombre',nombreTest);
            editContacto.append('empresa',empresaTest);
            editContacto.append('accion', 'editar');

            actualizarContacto(e, editContacto);
        } 
                                
    }//if editar
}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
function editarContacto(e){
    
        const id = e.target.parentElement.getAttribute('data-id');
        const contactoEditable = e.target.parentElement.parentElement.parentElement;
    
        if(id!=1) {
        
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `inc/modelos/comunicacionTest.php?id=${id}&accion=leer`, true);

            xhr.onload = function() {
                if(this.status === 200) {

                    //leer respuesta  PHP
                    const respuesta = JSON.parse( xhr.responseText );

            //░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            //Se guarda la fila correspondiente en dos valores, el primero es donde insertaremos
            //el nuevo formulario, con los valores preestablecidos, el segundo es para restaurar?

            const nuevoContacto = document.createElement('tr');
                  nuevoContacto.classList.add('fila');

            nuevoContacto.innerHTML = `
                <td class="firstColumn">
                    <button data-id="${id}" type="submit" class="btn-aceptar icon-correct-box">
                    </button>
                    <button data-id="${id}" type="reset" class="btn-cancelar icon-wrong-box">
                    </button>
                </td>`;

            const celdaContactoNombre = document.createElement('td');
            celdaContactoNombre.classList.add('otherColumn');
            const celdaContactoEmpresa = document.createElement('td');
            celdaContactoEmpresa.classList.add('otherColumn');

            const patternContacto = "(?!.*pene|.*coño|.*polla|.*bitch|.*polla|.*cabron|.*PENE|.*POLLA|.*COÑO|.*PUTA|.*puta|.*asshole|.*zorra|.*ZORRA|.*fuck|.*FUCK.*)(?!.*\bcock|.*\bdick|.*\bDICK|.*\bDick|.*\bCock|.*\bCOCK\b)[a-zA-Z0-9&_.0'\u00C0-\u00FF\s]*";

            const inputContactoNombre = document.createElement('input');
            inputContactoNombre.setAttribute('type', 'text');
            inputContactoNombre.setAttribute('id', 'nombreEdit');
            inputContactoNombre.setAttribute('value', respuesta.datos.nombre);
            inputContactoNombre.setAttribute('pattern', patternContacto);
            inputContactoNombre.setAttribute('maxlength', '30');
            inputContactoNombre.required = true;
                    
            const inputContactoEmpresa = document.createElement('input');
            inputContactoEmpresa.setAttribute('type', 'text');
            inputContactoEmpresa.setAttribute('id', 'empresaEdit');
            inputContactoEmpresa.setAttribute('value', respuesta.datos.empresa);
            inputContactoEmpresa.setAttribute('pattern', patternContacto);
            inputContactoEmpresa.setAttribute('maxlength', '60');
            inputContactoNombre.required = true;

            celdaContactoNombre.appendChild(inputContactoNombre);
            celdaContactoEmpresa.appendChild(inputContactoEmpresa);

            nuevoContacto.appendChild(celdaContactoNombre);
            nuevoContacto.appendChild(celdaContactoEmpresa);

            contactoEditable.replaceWith(nuevoContacto);

                }//if200
            }//onload            

           xhr.send(null);
    
    } else {
        mostrarNotificacion('Sorry, you can\'t edit the web creator', 'icon-cloud-sad');
    }

}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
function eliminarContacto(e){
    
    
    const id = e.target.parentElement.getAttribute('data-id');
    const respuesta = confirm('¿Estas seguro de tus acciones?');
        
        if(respuesta && (id!=1)) {
            
            const xhr = new XMLHttpRequest();
            
            xhr.open('GET', `inc/modelos/comunicacionTest.php?id=${id}&accion=borrar`, true);
            
            xhr.onload = function() {
                if(this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);
                    
                    //eliminar de tabla
                    if(resultado.respuesta == 'correcto'){
                        
                        
                        e.target.parentElement.parentElement.parentElement.remove();
                        
                        mostrarNotificacion('User deleted', 'icon-cloud-correct');
                    
                    } else {
                        mostrarNotificacion('Sorry, was a problem', 'icon-cloud-warning');
                    }
                    
                }//if 200
            }//onload

            xhr.send();

        } else {
            
            if (id == 1){
                mostrarNotificacion('Sorry, you can\'t delete the web creator', 'icon-cloud-sad');
            }
            else { 
                mostrarNotificacion('Action cancelled', 'icon-cloud-eyes');
            }
        }
}
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
function restaurarContacto(e){
    
    const id = e.target.getAttribute('data-id');
    const fila = e.target.parentElement.parentElement;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `inc/modelos/comunicacionTest.php?id=${id}&accion=leer`, true);
    
    xhr.onload = function() {
            if(this.status === 200) {
                //leer respuesta  PHP
                const respuesta = JSON.parse( xhr.responseText );
                
                const valorRestaurado = document.createElement('tr');
                valorRestaurado.classList.add('fila');
                
                valorRestaurado.innerHTML =
                    `
                                <td class="firstColumn">
                                    
                                    <button data-id="${id}" type="button" class="btn-editar">
                                        <i class="icon-user-edit"></i>
                                    </button>
                                    <button data-id="${id}" type="button" class="btn-borrar">
                                        <i class="icon-user-delete"></i>
                                    </button>
                                
                                </td>
                                <td class="otherColumn">${respuesta.datos.nombre}</td>
                                <td class="otherColumn">${respuesta.datos.empresa}</td>
                            `
                
                fila.replaceWith(valorRestaurado);
  
            }
    }
    
    xhr.send(null);
}    

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

function actualizarContacto(e, editContacto){
    
    const filaEditada = e.target.parentElement.parentElement;

    const xhr = new XMLHttpRequest();

            xhr.open('POST', 'inc/modelos/comunicacionTest.php', true);

            xhr.onload = function(){
                if(this.status === 200) {

                    const respuesta = JSON.parse(xhr.responseText);
                        
                    const valorRestaurado = document.createElement('tr');
                    valorRestaurado.classList.add('fila');
                
                    valorRestaurado.innerHTML =
                    `
                                <td class="firstColumn">
                                    
                                    <button data-id="${respuesta.datos.id}" type="button" class="btn-editar">
                                        <i class="icon-user-edit"></i>
                                    </button>
                                    <button data-id="${respuesta.datos.id}" type="button" class="btn-borrar">
                                        <i class="icon-user-delete"></i>
                                    </button>
                                
                                </td>
                                <td class="otherColumn">${respuesta.datos.nombre}</td>
                                <td class="otherColumn">${respuesta.datos.empresa}</td>
                            `
                
                        filaEditada.replaceWith(valorRestaurado);
                        mostrarNotificacion('User correctly edited', 'icon-cloud-update');

                    } else {
                        mostrarNotificacion('Sorry, was a problem', 'icon-cloud-warning');
                
                }//if200
            }//onload
            xhr.send(editContacto);

}

//Seleccionamos ventana, cargamos mensaje
//aplicamos la clase al i -> Quiza mejor crear tambien el i
//aplicamos clase visible, lo mandamo to a la puta wey

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Buscador
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"), //carga (e.target.value) dentro de expresion
          //la i se usa para evitar la diferencia entre capitalletters
          registros = document.querySelectorAll('tbody tr'); //carga en registro todo lo que haya en tbody tr
    
    registros.forEach(registro => { //Recorre todos los resultados
        registro.style.display = 'none'; //oculta todos los registros
        
        //1 para nombre, 3 empresa, 5 telefono
        //console.log(registro.childNodes[1].textContent);
        if((registro.childNodes[3].textContent.replace(/\s/g," ").search(expresion) != -1 )||((registro.childNodes[5].textContent.replace(/\s/g," ").search(expresion) != -1 ))){  //trae unicamente el contenido. sin espacios. Busca los elementos coincidentes.
            
            registro.style.display = 'table-row';   //los vuelve visibles
        }
        
        //numeroContactos();  //Se llama para que actualice al buscar contactos
    })
}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░














