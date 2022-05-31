<?php 

//PHP rellenea y prepara los campos para permitir a JavaScript introducir posteriormente esta fila.

include 'inc/funciones/funciones.php';
$contacto = obtenerContacto(); 

?>
<tr id="Contacto-edicion" class="fila">
    
    <td class="firstColumn">
        <button type="button" class="btn-aceptar btn">
            <input type="submit" value="" class="icon-correct-box">
        </button>
        <button type="button" class="btn-cancelar btn">
            <input type="reset" value="" class="icon-wrong-box">
        </button>
    </td>
    
    <td class="otherColumn">
        <input type="text" id="nombreEdit" pattern="<?php include 'inc/layout/pattern.php'; ?>" value="<?php echo $contacto['nombre'] ?>"
        > 
    </td>
    <td class="otherColumn">
        <input type="text" id="empresaEdit" pattern="<?php include 'inc/layout/pattern.php'; ?>" value="<?php echo $contacto['empresa'] ?>"
        > 
    </td>     
</tr>