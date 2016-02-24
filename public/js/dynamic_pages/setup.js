$(document).ready(function(){
  var createNewLi = function(id, name){
    var newLi = '' +
    '<li data-id="' + id + '">' +
      '<p>' + name + '</p>' +
      '<a href="/game/' + id + '" class="play btn btn-success">Play</a>' +
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
          createNewLi(elem._id, elem.game_name);
          bindDelete();
        });
      },
      error: function (response) {
        console.log(response);
      }
    });
  };

  var deleteGame = function(elem){
    var id = $(elem).parent().data('id');

    $.ajax({
      method: 'DELETE',
      url: '/api/savegames/'+id,
      success: function(response, status){
        $(elem).parent().remove();
      },
      error: function(response, status){
        console.log(response);
      }
    });
  };

  var bindDelete = function(){
    $('.delete').off().on('click', function (e){
      e.preventDefault();
      deleteGame(this);
    });
  };

  var bindSignOut = function(){
    $('#signout').on('click', function(e){
      $.ajax({
        type: 'DELETE',
        url: '/api/signout',
        success: function(response){
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
    getPlayerSaves();
  };

  init();
});
