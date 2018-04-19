//GLOBAL VARIABLE//
var text_step_1 = "Let's go for a short Tutorial, to teach you how I work !";
var text_step_2 = "Here you can choose a continent, then the map will move on the part of the world you've selected.";
var text_step_3 = "Here's the Home page button, it will get where we are now.";
var text_step_4 = "Here's the Login button, where you can Log to your account.";
var text_step_5 = "Here's the Register button, it will allow to create an account.";
var text_step_6 = "Here's the Contact button, it will allow to contact my devellopers for any questions or anything else.";
var text_step_7 = "Now click on one of the marker on the map, an information window will appear. Click when you've done it.";
var text_step_8 = "So there is the information panel about the country you've selected. You can choose between 4 rubrics, Customs, Gestures, Culture and Laws";

var tutorial_current_step;
var last_step;
var popUp;
//---------------//

$(function(){ 
	defautPopUp();
})

//OTHER FUNCTIONS//
function attachPopUp(popUp){ $('#tutorial').append(popUp); }

function detachAll(){ $('#tutorial').find('div').detach(); }
//---------------//

//Functions for creating the pop ups of the tutorial//
function createTutotialPopUp(text){

	var popUp_temp = "<div class=\"div-tuto-step_" + tutorial_current_step + "\">";

	popUp_temp += "<p id=\"tutorial-text\">" + text + "</p>";
	popUp_temp += "<a id=\"tutorial-skipButton\" href=\"#\" onclick=\"defautPopUp()\">Skip tutorial</a>";

	if(tutorial_current_step == 1){
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_1_talking.png\" height=\"385\" width=\"373\"></div>";
	}
	else if(tutorial_current_step == 2 || tutorial_current_step == 7 || tutorial_current_step == 8){
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_2_talking_2.png\" height=\"405\" width=\"307\"></div>";
	}
	else {
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_2_talking.png\" height=\"405\" width=\"307\"></div>";
	}

	popUp_temp += "</div>";

	return popUp_temp;
}

function createPopUpBy(){

	var local_popUp;

	switch(tutorial_current_step){
		case 1:
			local_popUp = createTutotialPopUp(text_step_1);
			break;
		case 2:
			local_popUp = createTutotialPopUp(text_step_2);
			break;
		case 3:
			local_popUp = createTutotialPopUp(text_step_3);
			break;
		case 4:
			local_popUp = createTutotialPopUp(text_step_4);
			break;
		case 5:
			local_popUp = createTutotialPopUp(text_step_5);
			break;
		case 6:
			local_popUp = createTutotialPopUp(text_step_6);
			break;
		case 7:
			local_popUp = createTutotialPopUp(text_step_7);
			break;
		case 8:
			local_popUp = createTutotialPopUp(text_step_8);
			break;
		case 9:
			local_popUp = createTutotialPopUp(text_step_9);
			break;
		case 10:
			local_popUp = createTutotialPopUp(text_step_10);
			break;
	}

	return local_popUp;
}
//-------------------------------------------------//

//If the name isn't obvious enough, this function update de css of the div #tutorial for each step//
function updateCssOfTutorialDiv(){
	switch(tutorial_current_step){
		case 2:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '0%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '15%');
			break;

		case 3:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '0%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '20%');
			break;

		case 4:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '0%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '20%');
			break;

		case 5:
			$('#tutorial-skipButton').css('left', '8%');
			$('#tutorial-skipButton').css('bottom', '0%');

			$('#tutorial-text').css('left', '8%');
			$('#tutorial-text').css('bottom', '20%');
			break;

		case 6:
			$('#tutorial-skipButton').css('left', '8%');
			$('#tutorial-skipButton').css('bottom', '0%');

			$('#tutorial-text').css('left', '8%');
			$('#tutorial-text').css('bottom', '15%');
			break;

		case 7:
			$('#tutorial').css('height', '405px');
			$('#tutorial').css('width', '307px');

			$('#tutorial').css('z-index', '100000');
			break;
		case 8:
			$('#tutorial').css('height', '405px');
			$('#tutorial').css('width', '307px');

			$('#tutorial').css('z-index', '100000');
			break;

	}
}
//------------------------------------------------------------------------------------------------//

//Recursive function which is making run the tutorial//
function tutorial(){

	

	detachAll();

	if(tutorial_current_step == 0){
		defautPopUp();
	}

	else if(last_step != tutorial_current_step){

		last_step = tutorial_current_step;

		popUp = createPopUpBy();
		attachPopUp(popUp);

		updateCssOfTutorialDiv();

		//If sprite is clicked (mean that the tutorial need to go to the next step)
		$('#sprite_' + tutorial_current_step).click(function(){
			tutorial_current_step++;

			if(tutorial_current_step < 9){
				tutorial();
			}
			else{
				defautPopUp();
			}		
		});
	}

	return;
}
//---------------------------------------------------//

//Function for default pop up//
function defautPopUp(){

	detachAll();

	$('#tutorial').css('height', '174px');
	$('#tutorial').css('width', '171px');

	tutorial_current_step = 0;
	last_step = 0;

	var defaultPopUp = createDefaultPopUp();
	attachPopUp(defaultPopUp);

	$('#default_sprite').click(function(){
		tutorial_current_step++;
		$(this).detach();

		$('#tutorial').css('height', '90%');
		$('#tutorial').css('width', '100%');

		popUp = createPopUpBy();
		attachPopUp(popUp);

		$('#sprite_' + tutorial_current_step).click(function(){
			last_step = tutorial_current_step;
			tutorial_current_step++;
			tutorial();
		});
	});
}

function createDefaultPopUp(){
	
	var defaultPopUp = "<img id=\"default_sprite\" src=\"images/sprite_1.png\" height=\"174\" width=\"171\">";
    
	return defaultPopUp;
}
//--------------------------//

