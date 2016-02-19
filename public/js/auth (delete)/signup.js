$(document).ready(function(){
  var bindSignup = function () {
    $('#signup').on('submit', function (e) {
      e.preventDefault();
      $('#signup-form-message').text('');

      var user = {
        email   : $('#signup [name="email"]').val(),
        username: $('#signup [name="username"]').val(),
        password: $('#signup [name="password"]').val()
      };

      $.ajax({
        method: "POST",
        url: '/api/signup',
        data: user,
        success: function (response) {
          window.location.href = "/signin?message=Account Created, Please Sign In";
        },
        error: function (response) {
          console.log(response);
          var text = response.responseJSON ? response.responseJSON.message : response.responseText;
          $('#signup-form-message').text(text);
        }
      });
    });
  };

  var init = function () {
    bindSignup();
  };

  init();
});
