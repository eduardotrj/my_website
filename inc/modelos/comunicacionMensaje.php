<?php
if($_POST) {
    require_once('../funciones/bd.php');
    
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING); //Valida o limpia los datos introducidos en el formulario
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    //echo json_encode($_POST); 

    //Conexion con prepare statements -> stmt
    
    try {
        $stmt = $conn->prepare("INSERT INTO contactos_web (name,email,message) VALUES (?,?,?)");  
        $stmt->bind_param("sss", $name, $email, $message);
        $stmt->execute();
        
        if($stmt->affected_rows==1) {
            $respuesta = array( 'nombre' => $name );     
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