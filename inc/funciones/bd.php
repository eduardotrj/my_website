<?php

/*datos para conectar con BD
Se asigna cada dato a una constante para usarse.
*/

define('DB_USUARIO', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_NOMBRE', 'webcv');

$conn = new MySQLi(DB_HOST,DB_USUARIO, DB_PASSWORD, DB_NOMBRE); //PORT optional

// echo $conn->ping(); //Muestra un 1 si conecta sin fallos..
//se comenta porque la conexion era correcta y imprimir un 1 puede ser erroneo despues.
//  http://127.0.0.1/agendaphp2/inc/funciones/bd.php
