//GLOBAL VARIABLE//
var text_step_1 = "Let's go for a short Tutorial, to teach you how I work !";
var text_step_2 = "Here's the Home page button, it will get where we are now.";
var text_step_3 = "Here's the Login button, where you can Log to your account.";
var text_step_4 = "Here's the Register button, it will allow to create an account.";
var text_step_5 = "Here's the Contact button, it will allow to contact my devellopers for any questions or anything else.";
var text_step_6 = "Here's the Suggest button, through it you will be allowed to improve my knowledge.";
var text_step_7 = "You can select a country's informations by click on the marker in the country you want, try it!";

var text_step_8 = "So there is the information panel, about the country you've selected.\nYou can choose between 4 rubrics, Customs, Gestures, Culture, Laws";
var text_step_9 = "";
var text_step_10 = "";

var tutorial_current_step;
var last_step;
var popUp;

//FUNCTION WHICH IS CALLED AUTOMATICLY//
$(function(){ 
	defautPopUp();
})

//OTHER FUNCTIONS
function attachPopUp(popUp){ $('#tutorial').append(popUp); }

function detachPopUpBy(tutorial_current_step){ popUp = $('div-tuto-step_' + tutorial_current_step).detach(); }

function detachAll(){ $('#tutorial').find('div').detach(); }


function createTutotialPopUp(text, tutorial_current_step){

	var popUp_temp = "<div class=\"div-tuto-step_" + tutorial_current_step + "\">";

	popUp_temp += "<p id=\"tutorial-text\">" + text + "</p>";
	popUp_temp += "<a id=\"tutorial-skipButton\" href=\"#\" >Skip tutorial</a>";

	if(tutorial_current_step == 1){
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_1_talking.png\" height=\"385\" width=\"373\"></div>";
	}
	else {
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_2_talking.png\" height=\"405\" width=\"307\"></div>";
	}

	popUp_temp += "</div>";

	return popUp_temp;
}

function createDefaultPopUp(){
	
	var defaultPopUp = "<img id=\"default_sprite\" src=\"images/sprite_1.png\" height=\"174\" width=\"171\">";
    
	return defaultPopUp;
}

function updateCssOfTutorialDiv(tutorial_current_step){
	switch(tutorial_current_step){
		case 1:
			$('#tutorial').css();
			$('#tutorial-text').css();
			$('.div-tuto-step_1').css();
			break;
		case 2:
			$('#tutorial').css();
			break;
		case 3:
			$('#tutorial').css();
			break;
		case 4:
			$('#tutorial').css();
			break;
		case 5:
			$('#tutorial').css();
			break;
		case 6:
			$('#tutorial').css();
			break;
		case 7:
			$('#tutorial').css();
			break;
		case 8:
			$('#tutorial').css();
			break;
		case 9:
			$('#tutorial').css();
			break;
		case 10:
			$('#tutorial').css();
			break;
	}
}

function createPopUpBy(tutorial_current_step){

	var local_popUp;

	switch(tutorial_current_step){
		case 1:
			local_popUp = createTutotialPopUp(text_step_1, tutorial_current_step);
			break;
		case 2:
			local_popUp = createTutotialPopUp(text_step_2, tutorial_current_step);
			break;
		case 3:
			local_popUp = createTutotialPopUp(text_step_3, tutorial_current_step);
			break;
		case 4:
			local_popUp = createTutotialPopUp(text_step_4, tutorial_current_step);
			break;
		case 5:
			local_popUp = createTutotialPopUp(text_step_5, tutorial_current_step);
			break;
		case 6:
			local_popUp = createTutotialPopUp(text_step_6, tutorial_current_step);
			break;
		case 7:
			local_popUp = createTutotialPopUp(text_step_7, tutorial_current_step);
			break;
		case 8:
			local_popUp = createTutotialPopUp(text_step_8, tutorial_current_step);
			break;
		case 9:
			local_popUp = createTutotialPopUp(text_step_9, tutorial_current_step);
			break;
		case 10:
			local_popUp = createTutotialPopUp(text_step_10, tutorial_current_step);
			break;
	}

	return local_popUp;
}

function tutorial(tutorial_current_step){

	if(tutorial_current_step == 0){

		

		defautPopUp();
	}

	if(last_step != tutorial_current_step){

		if(last_step != 0){
			detachPopUpBy(last_step);
		}

		last_step = tutorial_current_step;

		popUp = createPopUpBy(tutorial_current_step);
		attachPopUp(popUp);

		//If skip button is clicked
		$('#tutorial-skipButton').click(function(){

			detachAll();
			tutorial_current_step = 0;

			defautPopUp();
		});

		//If sprite is clicked (mean that the tutorial need to go to the next step)
		$('#sprite_' + tutorial_current_step).click(function(){

			detachPopUpBy(tutorial_current_step);
			tutorial_current_step++;

			if(tutorial_current_step < 10){
				tutorial(tutorial_current_step);
			}
			else{
				tutorial_current_step = 0;
			}		
		});
	}

	return;
}

function defautPopUp(){

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

		popUp = createPopUpBy(tutorial_current_step);
		attachPopUp(popUp);

		$('#tutorial-skipButton').click(function(){
			detachAll();
			tutorial_current_step = 0;
			defautPopUp();
		});

		$('#sprite_' + tutorial_current_step).click(function(){
			last_step = tutorial_current_step;
			tutorial_current_step++;
			tutorial(tutorial_current_step);
		});
	});
}

