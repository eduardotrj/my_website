	<footer>
		<?php include 'inc/layout/ventana.php'; ?>
	</footer>
    <script src="js/global.js"></script>
<?php
	// Guarda todo el contenido a un archivo
	$fp = fopen($archivoCache, 'w');
	fwrite($fp, ob_get_contents());
	fclose($fp);
	// Enviar al navegador
	ob_end_flush();
?>
</body>
</html>