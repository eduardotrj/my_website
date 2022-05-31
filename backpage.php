<?php 
    	include 'inc/layout/header.php';
		include 'inc/layout/nav.php';
        include 'inc/funciones/funciones.php';

   /* ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL ^ E_NOTICE);*/
	?>

<article id="BackPage">
	<div class="columns">
	  <section id="Php">
		<h2>PHP</h2>
		<p>Project development, data verification. Access to servers. CRUD execution. Insertion and modification of HMTL code. Extra security on forms and databases</p>
		<img>

	  </section>

	  <section id="SQL">
		<h2>SQL</h2>
		<p class="ponEnRojo">Database creation, search and selection of specific elements, development of database design flowcharts. Realization of different types of join. Organization of the elements according to their values.</p>
		<img>

	  </section>



	  <section id="Java">
		<h2>JAVA</h2>
		<p>Working with classes and object in depth. Creation of visual interfaces for Windows. Control by keyboard, window, mouse or internal events. Development of simple logarithms for problem solving in specific conditions.</p>
		<img>

	  </section>
	</div>
	
    <div id="ServerPart">
		
      <section id="FormDB">
        <form id="formulario-test" autocomplete="off">
          <div class="campo">
              
            <label for="nombreTest">Name:</label>
            <input type="text" id="nombreTest" name="nombreTest" pattern="<?php include 'inc/layout/pattern.php'; ?>" maxlength="30" required>
              
          </div>
          <div class="campo">
              
            <label for="empresaTest">Company:</label>
            <input type="text" id="empresaTest" name="empresaTest" pattern="<?php include 'inc/layout/pattern.php'; ?>" maxlength="60" required>
              
          </div>
          <div class="campo">
			<label>Try me!</label>
            <input type="submit" value="" class="iconAdd">
          </div>	
        </form>
      </section>
      
      <section id="DB">
        <table id="listado-contactos">
		 		<thead>
                    <tr class="fila">
						<th class="firstColumn">&nbsp&nbsp Action</th>
                        <th class="otherColumn">&nbsp&nbsp Name</th>
                        <th class="otherColumn">&nbsp Company</th> 
                    </tr>
                </thead>
		  
		  		<tbody>
                    
                    <?php $contactos = obtenerContactos();
                    
                    if($contactos->num_rows){
                        
                        foreach($contactos as $contacto){   ?>
                            
                            <tr class="fila">
                                <td class="firstColumn">
                                    
                                    <button data-id="<?php echo $contacto['id']; ?>" type="button" class="btn-editar">
                                        <i class="icon-user-edit"></i>
                                    </button>
                                    <button data-id="<?php echo $contacto['id']; ?>" type="button" class="btn-borrar">
                                        <i class="icon-user-delete"></i>
                                    </button>
                                
                                </td>
                                <td class="otherColumn"><?php echo $contacto['nombre'];?></td>
                                <td class="otherColumn"><?php echo $contacto['empresa'];?></td>
                            </tr>
                    
                    <!--------------------------------------->
                    
                    
                    
                    <!--------------------------------------->
                    
                    <!--<tr class="fila">
						<td class="firstColumn">
							<button data-id="1" type="button" class="btn-editar btn">
                                <i class="icon-user-edit"></i>
                            </button>
							<button data-id="1" type="button" class="btn-borrar btn">
                                <i class="icon-user-delete"></i>
                            </button>
						
						</td>
                        <td class="otherColumn">Manuel </td>
						<td class="otherColumn">Porculez sanches sl</td>
                    </tr>-->
           
                        <?php }//Foreach 
                        
                    }//if num_rows
                    
                    ?>
    
            
                </tbody>
		        <input type="text" id="buscar" placeholder="Search contacts...">
		</table> 
      </section>
    </div>


</article>



</div>
<script src="js/backend.js"></script>
<?php 
    	include 'inc/layout/footer.php';
		
	?>