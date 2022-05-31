<?php

//Para evitar falsos errores (avisos).
error_reporting(E_ALL ^ E_NOTICE);


//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// CREAR contacto test.
if($_POST) {
    
    
    if($_POST['accion'] == 'crear'){
    
    require_once('../funciones/bd.php');
    
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING); //Valida o limpia los datos introducidos en el formulario
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);

    //echo json_encode($_POST); 
    
    //Conexion con prepare statements -> stmt
    
    try {
        $stmt = $conn->prepare("INSERT INTO usuario_test (nombre,empresa) VALUES (?,?)");  
        $stmt->bind_param("ss", $nombre, $empresa);
        $stmt->execute();
        
        if($stmt->affected_rows==1) {
            $respuesta = array(
                'respuesta' => 'correcto',
                'datos'     => array(
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'id_insertado' => $stmt->insert_id)
            );     
        }
        
        $stmt->close();
        $conn->close();
        
    } catch(Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
    }
    
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    
    if($_POST['accion'] == 'editar') { //Verifica si la peticion es con el valor crear

        require_once ('../funciones/bd.php'); //llama a la conexion de Base de Datos
        
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING); //Valida o limpia los datos introducidos 
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);  //y pasa cada dato a una variable
        $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
        
        
    try{ //Se reescriben todos los parametros
        $stmt = $conn->prepare("UPDATE usuario_test SET nombre = ?, empresa = ? WHERE id = ?");
        $stmt->bind_param("ssi", $nombre, $empresa, $id);
        $stmt->execute();
        
        //respuesta
        if($stmt->affected_rows==1) {
            $respuesta = array(
                'respuesta' => 'correcto',
                'datos'     => array(
                    'nombre' => $nombre,
                    'empresa' => $empresa,
                    'id' => $id)
            );     
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        
        $stmt->close();
        $conn->close();
        
        } catch(Exception $e) {  //si hay una excepcion o problema que impida conectar, para evitar caer el programa
            $respuesta = array(  //carga estos datos en el array respuesta.
                'error' => $e->getMessage()
            ); //array
        }
        
        echo json_encode($respuesta);
    } //iff accio
    
}//IF POST

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//ELIMINAR DE BD

if($_GET) {
    
    if($_GET['accion'] == 'borrar'){
        
        require_once ('../funciones/bd.php');

        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $stmt = $conn->prepare("DELETE FROM usuario_test WHERE id = ? ");
            $stmt->bind_param("i", $id);
            $stmt->execute();

            if($stmt->affected_rows == 1) {
                $respuesta = array(
                    'respuesta' => 'correcto');
            }//if

            $stmt->close();
            $conn->close();

        } catch(Exception $e){
            $respuesta = array(
                'error' => $e->getMessage());
        }//catch

        echo json_encode($respuesta);
    }
    

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//Leer DE BD ░▒▓░▒▓░▒▓░▒▓░▒▓▒▓▒▓░▓▒░▓░▒▓░▒▓░▒▓▒░
    
    if($_GET['accion'] == 'leer'){
        
        require_once ('../funciones/bd.php');

        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            //$conn->set_charset("utf8");
            $stmt = $conn->prepare("SELECT * FROM usuario_test WHERE id = $id" );
            $stmt->execute();
                //$stmt->bind_result($nombre_contacto, $empresa_contacto);
            $resultados = $stmt->get_result();

            $fila = $resultados->fetch_assoc();
            
            $respuesta = array(
            'respuesta' => 'correcto',
            'datos'     => array(
                'id'    => $id,
                'nombre' => $fila['nombre'],
               'empresa' => $fila['empresa'])
            );

            $stmt->close();
            $conn->close();

        } catch(Exception $e){
            $respuesta = array(
                'error' => $e->getMessage());
        }//catch

        echo json_encode($respuesta);
    }
    
}//if0.
        
    

