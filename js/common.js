$(document).ready(function(){
  var scope ={};
  //open small.json
  $('body').on('click', '#ajaxSmall', function () {
    $.getJSON('json/small.json', function(data){
      scope.data = data;
      parse();
    })
  });
  //open large.json
  $('body').on('click', '#ajaxLarge', function () {
    $.getJSON('json/large.json', function(data){
      scope.data = data;
      parse();
    })
  });
  //parse json
  function parse(){
    var output = '<table class="table table-striped">' + '<thead>' + '<tr>';
    $.each(scope.data, function(keys, val){
      if(keys == 0){
        $.each(val, function(key, value){
        output += '<th>' + value + '</th>';
        });
        output +=  '</tr>' + '</thead>' + '<tbody>';
      }else{
        output += '<tr>';
        $.each(val, function(key, value){
        output += '<td>' + value + '</td>';
        });
        output += '</tr>';
      }
    })
    output += '</tbody>' + '</table>';
    $('#update').html(output);
  }
  //search json
  $('#filter').keyup(function(){
    var searchField = $('#filter').val();
    var myExp = new RegExp(searchField, "i");
    var output = '<table class="table table-striped">' + '<thead>' + '<tr>';
    $.each(scope.data, function(key, val){
      if(key == 0){
        $.each(val, function(key, value){
        output += '<th>' + value + '</th>';
        });
        output +=  '</tr>' + '</thead>' + '<tbody>';
      }else{
        output += '<tr>';
        $.each(val, function(keys, value){
           if((""+val).search(myExp) != -1){
             output += '<td>' + value + '</td>';
           }  
        });
        output += '</tr>';
      }       
    });
    output += '</tbody>' + '</table>';
     $('#update').html(output);
   });
    $('#select_file').change(function() {
      var file    = document.querySelector('#select_file').files[0];
      var reader = new FileReader();
      reader.onloadend = function(event) {
          $.getJSON(reader.result, function(data){
          scope.data = data;
          parse();
          })
      };
      reader.onerror = function(event) {
          alert("Файл не может быть прочитан! код " + event.target.error.code);
      };
      reader.readAsDataURL(file);
  })        
}); //body