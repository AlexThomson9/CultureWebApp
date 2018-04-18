//GLOBAL VARIABLES//

var tutorial_step = 0;
var popUp;

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


//FUNCTION WHICH IS CALLED AUTOMATICLY//
$(function(){ 

	if(tutorial_step == null){
		tutorial_step = 0;
	}

	if(tutorial_step == 0){

		var defaultPopUp = createDefaultPopUp();
		attachPopUpBy("tutorial", "id", defaultPopUp);

		$('#default_sprite').addEventListener('click', function(){
			tutorial_step++;
			console.log("you clicked the sprite");
			$(this).detach();
		});
	}

	else if(tutorial_step == 1){

		updateCssOfTutorialDiv(tutorial_step);

		popUp = createTutotialPopUp(text_step_1, tutorial_step);
		attachPopUpBy("turorial", "id", popUp);
	}

	else{

	}

	$('#tutorial-skipButton').addEventListener('click', function(){
		tutorial_step = 0;	
	});

	$('#tutorial-gotItButton').addEventListener('click', function(){
		detachPopUpBY(tutorial_step);
		tutorial_step++;
	});

	/*TitleBar-d3*/
})

function createTutotialPopUp(text, tutorial_current_step){

	var popUp = "<div class=\"div-tuto-step_" + tutorial_current_step + "\">";s

		popUp += "<div class=\"tutorial-textAndButtons\">";

			popUp += "<p id=\"tutorial-text\">" + text + "</p>";
			popUp += "<button id=\"tutorial-gotItButton\">Got It</button>";
			popUp += "<a id=\"tutorial-skipButton\" href=\"#\" >Skip tutorial</a>";

		popUp += "</div>";

		popUp += "<div class=\"sprite\">"

			if(tutorial_current_step == 1){
				popUp += "<img id=\"sprite_1\" src=\"images/sprite_1_talking.png\" height=\"385\" width=\"373\"></div>";
			}
			else {

			}

		popUp += "</div>";

	popUp += "</div>";

	return popUp;
	
	/*
	var popUp;

	if(tutorial_step == 1){
		popUp += 
	}
	else{

	}

	return popUp;*/
}

function createDefaultPopUp(){
	
	var defaultPopUp = "<img id=\"default_sprite\" src=\"images/sprite_1.png\" height=\"174\" width=\"171\">";
    
	return defaultPopUp;
}

function attachPopUpBy(name, type, popUp){
	var obj;

	if(type == "class"){
		obj = '.' + name;
	}
	else if(type == "id"){
		obj = '#' + name;
	}
	else{
		obj = name;
	}

	$(obj).append(popUp);
}

function detachPopUpBY(tutorial_current_step){
	popUp = $('div-tuto-step_' + tutorial_current_step).detach();
}

function updateCssOfTutorialDiv(tutorial_current_step){
	switch(tutorial_current_step){
		case 1:
			$('#tutorial').css({height: "385px", width: "373px"});
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

function createPopUpBY(tutorial_current_step){

	switch(tutorial_current_step){
		case 2:
			createTutotialPopUp(text_step_2, )
			break;
		case 3:
			
			break;
		case 4:
			
			break;
		case 5:
			
			break;
		case 6:
			
			break;
		case 7:
			
			break;
		case 8:
			
			break;
		case 9:
			
			break;
		case 10:
			
			break;
	}
}