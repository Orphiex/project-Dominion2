$(document).ready(function(){

  // hide cover-page
  $('#start-game').on('click', function(){
    $('#cover-page').fadeOut({
      duration: "slow",
      complete: function(){
        $('#login-page').fadeIn('slow');
      }
    });
  });

  $('#signup').on('submit', function (e){
    e.preventDefault();
    $('#signup-form-message').text('');

    var user = {
      email   : $('#signup [name="email"]').val(),
      username: $('#signup [name="username"]').val(),
      password: $('#signup [name="password"]').val()
    };

    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: user,
      success: function(response){
        console.log(response);
        $('#signup-form-message').text(response);
        $('#signup input:not([type="submit"])').val('');

      },
      error: function(response){
        console.log(response);
        $('#signup-form-message').text(response.responseJSON.message);
      }
    });
  });

  $('#signin').on('submit', function (e){
    e.preventDefault();

    var user = {
      username: $('#signin [name="username"]').val(),
      password: $('#signin [name="password"]').val()
    };

    $.ajax({
      type: 'POST',
      url: '/api/signin',
      data: user,
      dataType: 'JSON',
      xhrFields: {
        withCredentials: true
      },
      success: function(response){
        console.log('create session / logged in', response);
        window.location.href = '/setup';
      }
    });
  });

});