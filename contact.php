<?php 
    	include 'inc/layout/header.php';
		include 'inc/layout/nav.php';
	?>

<article id="contactPage">

    <div class="flex-2-1">
        <section id="Formcontact">
            <p>Do you have any question or are you interessted in my profile? Write to me!</p>
            <form id="writeToMe">
                <div class="panelGrid3 form-final">
                    
                      <div class="field">
                        <label for="nombre">Name:</label>
                        <input type="text" id="nombre" name="nombre" pattern="^[^0-9]+$" maxlength="60" required>
                        </div>
                      <div class="field">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                               maxlength="60" required>
                        </div>
                      <div class="field">
                        <label for="verificacion">Verification: 8 - 3 = </label>
                        <input type="text" placeholder="Result in letters" class="verificacion" pattern="[a-zA-Z]{4}" required>
                        </div>
                </div>
                
                <div class="textarea">
                  <label for="mensaje">Message:</label>
                    <textarea id="mensaje" nombre="mensaje" maxlength="600" required></textarea>
                </div>
                <div class="checkit">
                    <input type="submit" value="Send" class="sendit" >
                    <div>
                      <input type="checkbox" value="" required>
                      <label>I have read and agree to the </label><a href="legaladvise.php"><strong>Privacy Policy</strong></a>
                    </div>
                </div>
            
            </form>
            
        </section>
        
        <section id="Info">
            
            <p>You can also find me on:</p>
            <div>
                <p>Linkedin</p>
                <a href="https://www.linkedin.com/in/eduardo-trujillo-51444a1a9/"><i class="icon-linkedin"></i></a>
            </div>
            <p><small>*All this site was design for me, including code and most of the icons used.</small></p>
        
        </section>
    
    </div>


</article>

<script src="js/contact.js"></script>


<?php 
    	include 'inc/layout/footer.php';
		
	?>