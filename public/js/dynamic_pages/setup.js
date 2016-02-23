$(document).ready(function(){
  var createNewLi = function(id, savegame_id){
    var newLi = '<li data-id="' + id +
      '" data-savegame_id="' + savegame_id +
      '">' +
      '<button class="edit btn btn-success">Play</button>' +
      '<button class="delete btn btn-danger">Delete</button>' +
    '</li>';

    $('#saveGamesList').append(newLi);
  };

  var getPlayerSaves = function(){
    $.ajax({
      method: 'GET',
      url: '/api/savegames',
      success: function(response, status){
        response.forEach(function(elem){
          createNewLi(elem._id, elem.savegame_id);
        });
      }
    });
  };

  var deleteGame = function(elem){
    var id = $(elem).parent().data('id');

    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:8000/api/savegames/'+id,
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

  var init = function(){
    bindSignOut();
  };

  init();
});
