/* Filename: script.js
 * Author: Michael Longauer
 * Date: Tuesday, July 12, 2016
 *
 * A jQuery script file associated with recipe.html which contains instructions for the ingredients
 * list, the hide/show images toggle in the header, and the "step-box". The step-box is intended for
 * the user to step through preparation instructions on the page one by one. Uses the $(document).keydown
 * event to proceed and sits in a collapsed div fixed to the bottom of the page.   
 */

$(document).ready(function() {
	
	// ingredients list click event
	$('.ingredients div').click(function() {
		$(this).addClass('checked');
		$(this).prepend('&#10004;&nbsp;');
		$(this).unbind('click');
	});

	// hide/show images button click event
	$('#imageButton').click(function() {

		//hide or show images
		$('img').toggle();

		// switch button text to match next click function
		if($(this).text() === 'Hide Images')
		{
			$(this).html('Show Images');
		}
		else
		{
			$(this).html('Hide Images');
		}
	});

	$('.step-box').on('click', function() {
		// only perform action if box is in collapsed state
		if (!($(this).hasClass('expanded')))
		{
			// prepare box to display steps
			$('body').css('margin-bottom', '210px');
			$(this).addClass('expanded');

			$('.step-box p').remove(); // change box content
			$(this).prepend('<div id="stepCloseButton">&#10006;</div><p style="margin-top:0px;font-size:0.75em;"><em>(Press any key to step through preparation steps!)</em></p><div id="steps"></div>');

			// list first two steps
			var counter = 0;
			$('#steps').append('<p class="step curr-step">' + $("li").get(counter).innerHTML + '</p>');
			counter++;
			$('#steps').append('<p class="step">' + $("li").get(counter).innerHTML + '</p>');

			$('#steps p:first-child').addClass('curr-step');			
			
			// keydown function allows user to step through further instructions
			$(document).keydown(function() {
				
				// remove current step
				$('#steps p:first-child').slideUp(500, function() { 
					$(this).remove();
					
					// highlight new step
					//$('#steps p:first-child').addClass('curr-step');
				});

				$('#steps p:nth-child(2)').addClass('curr-step');

				// if there is another instruction...
				if (typeof $("li").get(counter + 1) !== "undefined")
				{
					// ...display it as the next instruction
					counter++;
					$('#steps').append('<p class="step">' + $("li").get(counter).innerHTML + '</p>');	
				}
			});

			//configure close button
			$('#stepCloseButton').unbind(); // remove inherited/pre-existing listeners
			
			$('#stepCloseButton').click(function(event) {
				event.stopPropagation();	// prevents this click from triggering the parent's event listener
				$(this).parent().empty();
				$('body').css('margin-bottom', '80px');
				$('.step-box').prepend('<p style="text-align:center;"><em>(Click here to step through preparation instructions.)</em></p>');
				$('.step-box').removeClass('expanded');
			});	
		}
	}); // end of step-box.on('click')

}); // end of document.ready