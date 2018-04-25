//-------GLOBAL VARIABLE-------//
var text_step_1 = "Let's go for a short Tutorial, to teach you how I work ! Please <b>click me</b> to run the tutorial until the end.";
var text_step_2 = "Here you can choose a continent, then the map will move on the part of the world you've selected.";
var text_step_3 = "Here's the Home page button, it will get where we are now.";
var text_step_4 = "Here's the Login button, where you can Log to your account.";
var text_step_5 = "Here's the Register button, it will make you create an account.";
var text_step_6 = "Here's the Contact button, it allow you to contact my devellopers for any questions or anything else.";
var text_step_7 = "Now please click on one of the marker on the map, an information panel will appear. <b>Click me</b> when you've done it.";
var text_step_8 = "So here are several informations about the country you've selected. <b>Click me</b> to end the tutorial.";

var tutorial_current_step;
var last_step;
var popUp;
//-----------------------------//

$(function(){
	defautPopUp();
})

//-------ATTACH/DETACH FUNCTIONS-------//

/**
* This function add the created pop-up in the div #tutorial
* var popUp is the html text 
*/
function attachPopUp(popUp){ $('#tutorial').append(popUp); }

/**
* This function is detaching every div inside the div #tutorial
*/
function detachAll(){ $('#tutorial').find('div').detach(); }

//-------------------------------------//



//-------CREATING POP-UP OF THE TUTORIAL-------//

/**
* This function is create the html text of the pop-up and return it
* The current step of the tutorial is take in count during the creation of the pop-up
* var text is the text we want to put inside the pop-up
*/
function createTutorialPopUp(text){

	var popUp_temp = "<div class=\"div-tuto-step_" + tutorial_current_step + "\">";

	popUp_temp += "<p id=\"tutorial-text\">" + text + "</p>";
	popUp_temp += "<a id=\"tutorial-skipButton\" href=\"#\" onclick=\"defautPopUp()\">Skip tutorial</a>";

	if(tutorial_current_step == 1 || tutorial_current_step == 7 || tutorial_current_step == 8){
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_1_talking.png\" height=\"385\" width=\"373\"></div>";
	}
	else if(tutorial_current_step == 2 ){
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_2_talking_2.png\" height=\"405\" width=\"307\"></div>";
	}
	else {
		popUp_temp += "<img id=\"sprite_" + tutorial_current_step + "\" src=\"images/sprite_2_talking.png\" height=\"405\" width=\"307\"></div>";
	}

	popUp_temp += "</div>";

	return popUp_temp;
}

/**
* This function is called the one above it
* Switching on the value of var tutorial_current_step the function will put the text corresponding to the current step
*/
function createPopUpBy(){

	var local_popUp;

	switch(tutorial_current_step){
		case 1:
			local_popUp = createTutorialPopUp(text_step_1);
			break;
		case 2:
			local_popUp = createTutorialPopUp(text_step_2);
			break;
		case 3:
			local_popUp = createTutorialPopUp(text_step_3);
			break;
		case 4:
			local_popUp = createTutorialPopUp(text_step_4);
			break;
		case 5:
			local_popUp = createTutorialPopUp(text_step_5);
			break;
		case 6:
			local_popUp = createTutorialPopUp(text_step_6);
			break;
		case 7:
			local_popUp = createTutorialPopUp(text_step_7);
			break;
		case 8:
			local_popUp = createTutorialPopUp(text_step_8);
			break;
		case 9:
			local_popUp = createTutorialPopUp(text_step_9);
			break;
		case 10:
			local_popUp = createTutorialPopUp(text_step_10);
			break;
	}

	return local_popUp;
}

//---------------------------------------------//



//-------CSS UPDATING-------//

/**
* This function is update the css of the nodes inside the div #tutorial and the css of this div as well for each step of the tutorial
* In other word this function make move the sprite, set position of the text and the position of the <a> node
*/
function updateCssOfTutorialDiv(){
	switch(tutorial_current_step){
		case 0:
			$('#tutorial').css('height', '174px');
			$('#tutorial').css('width', '171px');

			$('#tutorial').css('left', '0%');
			$('#tutorial').css('bottom', '0%');

			$('#tutorial').css('z-index', '4001');
			break;

		case 1:
			$('#tutorial').css('height', '90%');
			$('#tutorial').css('width', '100%');
			break;

		case 2:
			$('#tutorial-skipButton').css('left', '11%');
			$('#tutorial-skipButton').css('bottom', '5%');

			$('#tutorial-text').css('left', '11%');
			$('#tutorial-text').css('bottom', '11%');
			break;

		case 3:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '5%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '17%');
			break;

		case 4:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '5%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '17%');
			break;

		case 5:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '5%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '17%');
			break;

		case 6:
			$('#tutorial-skipButton').css('left', '9%');
			$('#tutorial-skipButton').css('bottom', '5%');

			$('#tutorial-text').css('left', '9%');
			$('#tutorial-text').css('bottom', '17%');
			break;

		case 7:
			$('#tutorial').css('height', '385px');
			$('#tutorial').css('width', '373px');

			$('#tutorial-text').css('bottom', '55%');

			$('#tutorial-skipButton').css('left', '74%');

			$('#tutorial').css('z-index', '100000');
			break;

		case 8:
			$('#tutorial').css('height', '385px');
			$('#tutorial').css('width', '373px');

			$('#tutorial-text').css('left', '29%');
			$('#tutorial-text').css('bottom', '62%');

			$('#tutorial-skipButton').css('left', '74%');

			$('#tutorial').css('z-index', '100000');
			break;

	}
}

//--------------------------//



//---------TUTORIAL---------//

/**
* This the function which is making run the tutorial
* It will create the pop-up correspondind to the current step of the tutorial
* Then if you click on "Skip tutorial" defaultPopUp(); will be called
* if you click on the image the tutorial will continue until you reach he end of the tutorial, then defaultPopUp(); will be called
*/
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

//--------------------------//



//-------DEFAULT POP-UP-------//

/**
* This function is call by default, it create and attach to the page the default pop-up
* If the img is clicked this function will call tutorial();
*/
function defautPopUp(){

	detachAll();

	tutorial_current_step = 0;
	last_step = 0;

	updateCssOfTutorialDiv();

	var defaultPopUp = createDefaultPopUp();
	attachPopUp(defaultPopUp);

	$('#default_sprite').click(function(){
		tutorial_current_step++;
		$(this).detach();

		updateCssOfTutorialDiv();

		popUp = createPopUpBy();
		attachPopUp(popUp);

		$('#sprite_' + tutorial_current_step).click(function(){
			last_step = tutorial_current_step;
			tutorial_current_step++;
			tutorial();
		});
	});
}

/**
* This function is creating the html text of the default pop-up which is just an image
*/
function createDefaultPopUp(){

	var defaultPopUp = "<img id=\"default_sprite\" src=\"images/sprite_1.png\" height=\"174\" width=\"171\">";

	return defaultPopUp;
}

//----------------------------//