$('#Ctry-Issue').click(function(){


  $('#Country-Issue').append("<input type='text' placeholder='Country of issue' /> <a id='minus'>&#8722;</a>");





});
$(document).on('click', "#Country-Issue",function(evt){

  if($(evt.target).is('#minus'))
  {
      //remove the last textarea and the remove link
      $(this).find('input').last().remove();
      $(this).find('a').last().remove();
      //if its the last textarea then also remove the button

  }

});
