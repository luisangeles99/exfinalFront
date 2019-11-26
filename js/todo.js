var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://exfinal-a01273884.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        
        console.log(data[i].description)
        addTodo(data[i]._id, data[i].description, data[i].completed)
       
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
      url: 'https://exfinal-a01273884.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    loadTodos()
    input.value = '';
  }
})


function addTodo(id, todoText, completed) {
    var _id =id
    var text = todoText
    var com = completed
    if (com)
      var estado = 'Completado'
    else
      var estado = 'No Completado!'

    var newHtml = `
    <li><input type="checkbox" name="todo" value="1"><span>${text}</span></li>
    <li><name="todo" value="1" class="completed"><span>Estado: ${estado}</span></li>
    <br>
    `
    $('#todo-list').append(newHtml)
}


$('#logout').on('click', function(){
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://exfinal-a01273884.herokuapp.com/logout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    success: function(data){
      alert('Cerraste sesión da refresh');
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html'
    }
  });
})