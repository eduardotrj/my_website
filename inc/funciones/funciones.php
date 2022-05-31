<?php

/*Obtener contactos de la base de datos para imprimirlos en la tabla.
*/

function obtenerContactos(){
    include 'bd.php'; 
    
    try{
        
        return $conn->query("SELECT id, nombre, empresa FROM usuario_test ORDER BY id DESC");
        
    }catch(Exception $e) {
        
        echo 'Error!!' . $e->getMessage() . "<br>";
        return false;
    }
}

