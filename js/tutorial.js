$(function(){ 

	var tutorial_step = 0;

	if(tutorial_step == 0 || tutorial_step == null){
		var defaultPopUp = createDefaultPopUp();

		attachPopUpBy("div-tutorial", "class", defaultPopUp);
	}
	/*
	var popUp = createTutotialPopUp("1st pop-up", tutorial_step);
	attachPopUpBy("TitleBar-d3", "id", popUp);

	$('#tutorial-popUp-skipButton').onClick(function(){
		popUp = $('.tutorial-popUp').detach();	
	});

	$('#tutorial-popUp-gotItButton').onClick(function(){
		popUp = $('.tutorial-popUp').detach();

		switch(tutorial_step){
			case 1:
				attachPopUpBy("", "class", popUp);
				break;
			case 2:
				attachPopUpBy("", "class", popUp);
				break;
			case 3:
				attachPopUpBy("", "class", popUp);
				break;
			case 4:
				attachPopUpBy("", "class", popUp);
				break;
			case 5:
				attachPopUpBy("", "class", popUp);
				break;
			case 6:
				attachPopUpBy("", "class", popUp);
				break;
			case 7:
				attachPopUpBy("", "class", popUp);
				break;
		}

		if(tutorial_step >= 1 && tutorial_step < 8){
			tutorial_step++;
		}
		else{
			tutorial_step = 0;
		}
		

	});*/
})

function createTutotialPopUp(text, tutorial_step){

	var popUp = "<div class=\"tutorial-popUp\">";

	popUp += "<div class=\"tutorial-popUp-textAndButtons\">";

		popUp += "<p id=\"tutorial-popUp-text\">" + text + "</p>";
		popUp += "<button id=\"tutorial-popUp-gotItButton\">Got It</button>";
		popUp += "<a id=\"tutorial-popUp-skipButton\" href=\"#\" >Skip tutorial</a>";

	popUp += "</div>";

	popUp += "<div class=\"tutorial-popUp-sprite-and-bubble\">";

	if(tutorial_step == 0){
		popUp += "<img class=\"sprite\" id=\"sprite_1\" src=\"../images/sprite_1.png\">";
		popUp += "<img class=\"bubble\" id=\"bubble_1\" scr=\"../images/pop-up_bubble_1.png\">";
	}
	else if (tutorial_step > 0 && tutorial_step < 8){
		popUp += "<img class=\"sprite\" id=\"sprite_2\" src=\"../images/sprite_2.png\">";
		popUp += "<img class=\"bubble\" id=\"bubble_2\" scr=\"../images/pop-up_bubble_2.png\">";
	} 

	popUp += "</div>";

	popUp += "</div>";

	return popUp;
}

function createDefaultPopUp(){
	var defaultPopUp = "<div class=\"default-popUp-sprite\">";

	defaultPopUp += "<img class=\"sprite\" src=\"images/sprite_1.png\"></div>";
// id=\"sprite_1\"
	return defaultPopUp
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