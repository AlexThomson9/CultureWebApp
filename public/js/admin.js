//Opens the customs tab by default
document.getElementById("defaultOpen").click();

//Change the content depending on selected tab (placeholder function)
function category(evt, category) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(category).style.display = "block";
    evt.currentTarget.className += " active";
}

//Displays the country picked on the dropdown
$('#infoUpdate').change(function(){

  console.log($(this).val());

  $(this).each(function(){

    $('#CountryTitle').text($(this).val());


  });

});

$.ajax({
      type: "GET",
      data: JSON.stringify(Country),
      contentType: "application/json",
      url: "/suggest",
      success: function (data) {
      console.log('success', data);
      response = data;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
     console.log('error', errorThrown);
   }

   $.each(data.data, function(k, v) {
    /// do stuff
    console.log(k, v);
});
      });
    console.log(response);

    if(response != ""){

      console.log("wot");
    }else if (response == ""){


    }
