//Jquery function test
$(function()
{
    //ensure that it is functioning properly
    console.log('Jquery is working');
    //Set test vairbale to 0;
    var test = 0;
//Have to use document.on instead of other method becuase the html is dynamically loaded into the page
//set Onclick for the four options available then run the function
$(document).on('click', "#Customs, #Gestures, #Cultures, #Laws",function()
{
    //get the Full text from the title in the popup
    var mme = $("#title").text();
    //Set country to mme split the title part from it
    var country = mme.split(":");
    //set crty to the text gotten above
    var ctry = country[1];
    //set variable id to the id of the
	var id = $(this).attr('id');
    //Log all the variables to the console to check they are working
    console.log(mme);
    console.log(country);
    console.log(ctry);
    console.log("."+id+"-Hide");
	$("."+id).html("add more");
    //count the test variable so each one has a id
    test++;
    //show the hidden element for each option selected
   $("."+id+"-Hide").show("fast").prepend("<div id ="+test+"><textarea class='Textarea'></textarea><a href='#' id='minus' class='minus'>remove</a></div>");
    //$("."+id+"-Hide").show("fast").prepend("<div id ="+test+"><textarea class='Textarea'></textarea><button type='button' id='minus' class='minus'>-</buttom></div>");
    //For handling the button removal interaction and adding the button if it was removed
    if($("."+id+"-Hide").find(".Submit").length)
    {
    //testing
    console.log("button exists");
    }
    else
    {
    $("."+id+"-Hide").append("<button type='button' class='Submit'>Submit</button>");
    }

});
//On click function for the textarea/submit/removal of the textarea
$(document).on('click', ".Customs-Hide, .Gestures-Hide, .Cultures-Hide, .Laws-Hide",function(evt)
{
    //If target is textarea then do nothing because otherwise clicking the textarea will delete stuff
    var williwork = $(this).find('textarea').val();
    if($(evt.target).is('.Textarea'))
    {
        //event handling code
    }
    //if the target is the remove link
    else if($(evt.target).is('#minus'))
    {
        //remove the last textarea and the remove link
        $(this).find('textarea').last().remove();
        $(this).find('a').last().remove();
        //if its the last textarea then also remove the button
        if($(this).find('textarea').length == 0)
        {
   		$(this).find('button').last().remove();
        }
    }
    //if the target is submit and the textarea is not null
    else if(($(evt.target).is('.Submit')) && $(this).find('textarea').val() != "")
    {
        var williwork = $(this).find('textarea').val();


        /*if(williwork != "" && williwork <= 10){
          if(williwork != ""){
$(this).find('textarea').attr("placeholder", "Input must not be null");

          }else {
             $(this).find('textarea').attr("placeholder", "Please add more information");
          }


        }*/
        //get the number of textareas for testing
        var numItems = $(this).find('textarea').length;
        //alert(numItems);
        //Basically a for loop for each textarea to loop through them all
        $(this).find('textarea').each(function()
        {
            //This variable is the Content for the textarea
           var Suggestion = $(this).val();
            //get the closest class name for the textarea
           var Class_Name_Raw = $(this).closest('section').attr('class');
            //split the name to get the parent class
           var Class_Name_Array = Class_Name_Raw.split("-");
            //set the class name to the parent classs
           var Class_Name = Class_Name_Array[0];
            //log content for testing
           var title = $("#title").text();
           var title_split = title.split(':');
           var Country = title_split[1].replace(/\s+/g, '');
           console.log(Country);
           console.log("Textarea value is " + Suggestion);
           console.log("Section Identifier is " + Class_Name);
           var obj = {};
           obj.Country = Country;
           obj.Identifier = Class_Name;
           obj.Suggestion = Suggestion;

           //obj.UserID = getCookie("UserID");
           console.log(obj);
            $.ajax({
                  type: "POST",
                  data: JSON.stringify(obj),
                  contentType: "application/json",
                  url: "/suggest"
                  });
        });
        //then remove each feature after submissios
        $(this).find('textarea, a, button').each(function()
        {
        $(this).remove();
        });
        //User feedback to show them theat the submission was successful
        $('#Popup').append("<h3>Submission Successful!</h3>");
        //set the var to 2 sectons
            var delayInMilliseconds = 2000; //1 second
            //set the timeout to run the function
            setTimeout(function()
            {
            //remove the submission successful as it only needs to be there for a little bit
            $('#Popup').find("h3").remove();
            //set the timeout to use the 2 second's defined previously
          }, delayInMilliseconds);
   }
   //else if textarea is null
   else if($(this).find('textarea').val() == "" || williwork.length() <= 10)
   {
       //alert("textarea can not be a null value");
       //User feedback to ensure that empty textareas are not submitted

       if($(this).find('textarea').val() == ""){
$(this).find('textarea').attr("placeholder", "Input must not be null");

}else {
 $(this).find('textarea').attr("placeholder", "Please add more information");

}

   }





});
});
