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
 var Suggestions = 0;
 var array = [];
$.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/all",
      success: function (data) {
      console.log('success', data);
      response = data;
      $.each(data, function(k, v) {
/// do stuff k number , v = data
console.log(k, v);
Suggestions++;
console.log(Suggestions);
array.push(v);

});

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
     console.log('error', errorThrown);
   }


      });

      $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/Countries",
            success: function (data) {
            console.log('success', data);
            response = data;
            $.each(data, function (i, item) {
              console.log(i, item);
      $('#infoUpdate').append($('<option>', {
          value: item.value,
          text : item.text
      }));
  });

          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
           console.log('error', errorThrown);
         }


            });
      console.log(array);

      $.each(array, function(index, value) {
            alert(value);
            console.log(index, value);

            if(v.Country == "Russia"){

              console.log("pls");
            }

      });
