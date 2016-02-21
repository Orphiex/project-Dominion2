$(document).ready(function(){
  var createNewLi = function(id, actor, car, girl){
    var newLi = "toBeContinued";

    $('#saveGamesList').append(newLi);
  };

  var deleteGame = function(elem){
    var id = $(elem).parent().data('id');

    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:8000/api/game/'+id,
      success: function(response, status){
        console.log(response);
        $(elem).parent().remove();
      },
      error: function(response, status){
        console.log(response);
      }
    });
  };

  var bindSignOut = function(){
    $('#signout').on('click', function(e){
      $.ajax({
        type: 'DELETE',
        url: '/api/signout',
        success: function(response){
          console.log(response);
          window.location.href = '/';
        },
        error: function(response){
          console.log(response);
        }
      });
    });
  };

  var bindNewGame = function(){
    $('#newGame').on('click', function(e){
      console.log("test binding");
      window.location.href = '/game';
    });
  };

  var init = function(){
    bindSignOut();
    bindNewGame();
  };

  init();
});