$(document).ready(function () {
  var bindSignin = function () {
    $('#signin').on('submit', function (e) {
      e.preventDefault();

      var user = {
        username: $('#signin [name="username"]').val(),
        password: $('#signin [name="password"]').val()
      };

      $.ajax({
        type: "POST",
        url: "/api/signin",
        data: user,
        success: function(response){
          window.location.href = "/";
        },
        error: function(response){
          console.log(response);
          var text = response.responseJSON ? response.responseJSON.message : response.responseText;
          $('#signin-form-message').text(text);
        }
      });
    });
  };

  var init = function () {
    bindSignin();
  };

  init();
});
