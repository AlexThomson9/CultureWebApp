//Little bit of jquery for the contact page
//If country issue clicked
$('#Ctry-Issue').click(function(){
  //add a input box for if their was an issue with a specific country
  $('#Country-Issue').append("<input type='text' placeholder='Country of issue' /> <a id='minus'>&#8722;</a>");
});
//If input is clicked then
$(document).on('click', "#Country-Issue",function(evt){
  //if minus is clicked then
  if($(evt.target).is('#minus'))
  {
      //remove the last textarea and the minus
      $(this).find('input').last().remove();
      $(this).find('a').last().remove();
  }
});
