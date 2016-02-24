$(document).ready(function(){

  // Set starting active buttons
  var buttonSetup = function() {
    $('button').prop('disabled', true);
    $('#new-game').removeAttr('disabled');
    $('#quit-game').removeAttr('disabled');
    $('.start-turn').removeAttr('disabled');
    $('#endGameModal button').removeAttr('disabled');
    $('#quitGameModal button').removeAttr('disabled');
  };

  var bindQuitGame = function(){
    $('#quit-game').off().on('click', function(e){
      $('#quitGameModal').modal();
    });

    $('#keepSaveGame').off().on('click', function(e){
      window.location.href = '/setup';
    });

    $('#deleteSaveGame').off().on('click', function(e){
      deleteSaveGame();
      window.location.href = '/setup';
    });
  };

// Declare global variables ----------------------------------------

  var fullDeck  = null;
  var emptyDeck = null;

  // Set deck objects
  var p1_deck = {};
  var p1_hand = [];
  var p1_discard = {};
  var p2_deck = {};
  var p2_hand = [];
  var p2_discard = {};

  // Declare player card storage variables
  var playerTurn = true;
  var playerDeck;
  var playerHand;
  var playerDiscard;

// AJAX database requests -----------------------------------

  var setGameDecks = function(){
    if ($("#game-id").data('new') == true) {
      $.ajax({
        method: 'GET',
        url: '/api/cards',
        success: function (response) {
          fullDeck  = response[0].cards;
          emptyDeck = response[1].cards;
          shopSetup(fullDeck);
          assignArrays();
          startSetup();
          turnSetup();
          bindQuitGame();
          createSaveGame();
        },
        error: function (response) {
          console.log(response);
        }
      });
    } else {
      $.ajax({
        method: 'GET',
        url: '/api/savegames/' + $('#game-id').data('id'),
        success: function (response) {
          p1_deck = response.player_1.deck;
          p1_discard = response.player_1.discard;
          p2_deck = response.player_2.deck;
          p2_discard = response.player_2.discard;
          playerTurn = response.turn;

          p1_hand = response.player_1.hand;
          p2_hand = response.player_2.hand;
          restoreHand();

          shopSetup(response.shop);
          turnSetup();
          setPlayerTab();
          bindQuitGame();
        },
        error: function (response){
          console.log(response);
        }
      });
    }
  };

  var createSaveGame = function(){

    var saveFile = {
      savegame_id: $('#game-id').data('id'),
      game_name: $('#editGameName').val() || "Unnamed Game",
      player_1: {
        deck: p1_deck,
        discard: p1_discard,
        hand: p1_hand
      },
      player_2: {
        deck: p2_deck,
        discard: p2_discard,
        hand: p2_hand
      },
      shop: dominionShop,
      turn: playerTurn
    };

    var jsonString = JSON.stringify(saveFile);

    $.ajax({
      method: 'POST',
      url: '/api/savegames',
      data: {jsonString: jsonString},
      dataType: "json",
      success: function(response, status){
        console.log(response);
      },
      error: function(response, status){
        console.log(response);
      }
    });
  };

  var updateSaveGame = function(){

    var savegame_id = $('#game-id').data('id');
    var saveFile = {
      game_name: $('#editGameName').val() || "Unnamed Game",
      player_1: {
        deck: p1_deck,
        discard: p1_discard,
        hand: p1_hand
      },
      player_2: {
        deck: p2_deck,
        discard: p2_discard,
        hand: p2_hand
      },
      shop: dominionShop,
      turn: playerTurn
    };

    var jsonString = JSON.stringify(saveFile);

    $.ajax({
      method: 'PUT',
      url: '/api/savegames/' + savegame_id,
      data: {jsonString: jsonString},
      success: function(response, status){
        console.log(response);
      },
      error: function(response, status){
        console.log(response);
      }
    });
  };

  var deleteSaveGame = function(){
    $.ajax({
      method: 'DELETE',
      url: '/api/savegames/' + $('#game-id').data('id'),
      success: function(response, status){
        console.log(response);
      },
      error: function(response, status){
        console.log(response);
      }
    });
  };

// --------------------------------------------------------

  // Build shop and assemble decks
  var startSetup = function(){
    // create player start decks
    createDeck(p1_deck);
    createDeck(p2_deck);
    drawHand(p1_deck, p1_hand);
    drawHand(p2_deck, p2_hand);
  };

  var actionCount = 1;
  var buyCount = 1;
  var treasureCount = 0;

  // Reset count displays
  // Set card storage fields based on turn order
  var turnSetup = function(){
    $('.actionPoints').text('Action Points: 1');
    $('.buyPoints').text('Buy Points: 1');
    $('.treasurePoints').text('Treasure Points: 0');
    actionCount = 1;
    buyCount = 1;
    treasureCount = 0;
    if (playerTurn === true) {
      playerDeck = p1_deck;
      playerHand = $('#player1 .player-hand');
      playerDiscard = p1_discard;
    } else {
      playerDeck = p2_deck;
      playerHand = $('#player2 .player-hand');
      playerDiscard = p2_discard;
    }
  };

  // Set up shop
  // Assign supply values

  function shopSetup (shopObject){
    dominionShop = shopObject;
    for (var key in dominionShop){
      $('.buy-button[data-name="' + key + '"]').data("supply", dominionShop[key].supply).data("cost", dominionShop[key].cost).data("type", dominionShop[key].type);
    }
  };

  var assignArrays = function(){
    $.extend(true, p1_deck, emptyDeck);
    $.extend(true, p1_discard, emptyDeck);
    $.extend(true, p2_deck, emptyDeck);
    $.extend(true, p2_discard, emptyDeck);
  };


  // Create player decks
  function createDeck(playerDeck) {
    // move 7 copper from shop to deck
    for (var j = 0; j < 7; j++) {
      playerDeck["copper"].supply++;
      var currentValue = $('.buy-button[data-name="copper"]').data("supply");
      $('.buy-button[data-name="copper"]').data("supply", currentValue-1);
    }
    // move 3 estate from shop to deck
    for (var k = 0; k < 3; k++) {
      playerDeck["estate"].supply++;
      var currentValue2 = $('.buy-button[data-name="estate"]').data("supply");
      $('.buy-button[data-name="estate"]').data("supply", currentValue2-1);
    }
  }

  // Resets the game
  $('#new-game').on('click', function(){
    !$.isEmptyObject(p1_hand) && clearHand (p1_hand, p1_discard);
    !$.isEmptyObject(p2_hand) && clearHand (p2_hand, p2_discard);
    buttonSetup();
    startSetup();
    turnSetup();
  });


// Turn management functions -----------------------------------------


  // Step 2 binding
  // Start turn
  $('.start-turn').on('click', function(){
    $('.start-turn').prop('disabled', true);
    if (checkHandAction(playerHand, playerDeck) === true) {
      $('.play-action').removeAttr('disabled');
    }
    $('.pass-action').removeAttr('disabled');
  });

  // Step 3 binding
  // if click on action
    // choose action card
    // actionCount--;
    // $('.actionPoints').text('Action Points: ' + actionCount);
    // if (actionCount == 0) {
      // go to 4
  // end

  $('.play-action').on('click', function(){
    $('.play-action').prop('disabled', true);
    $('.pass-action').prop('disabled', true);
    actionCount--;
    $('.actionPoints').text('Action Points: ' + actionCount);
    $('.play-buy').removeAttr('disabled');
    $('.pass-buy').removeAttr('disabled');
  });

  $('.pass-action').on('click', function(){
    $('.play-action').prop('disabled', true);
    $('.pass-action').prop('disabled', true);
    $('.play-buy').removeAttr('disabled');
    $('.pass-buy').removeAttr('disabled');
    countHandTreasure(playerHand, playerDeck, playerDiscard);
  });

  // Step 4 binding - buy
  $('.play-buy').on('click', function(){
    $('.play-buy').prop('disabled', true);
    $('.pass-buy').prop('disabled', true);

    var $elems = $('.buy-button');
    $elems.each(function(index, elem){
      if (($(elem).data('cost') <= treasureCount) && ($(elem).data("type") !== "action") && ($(elem).data("supply") > 0)) {
        $(elem).removeAttr('disabled');
      }
    });
  });

  // Step 4.5 binding - individual buy buttons
  $('.buy-button').on('click', function(){
    buyCard(this, playerDiscard);
    buyCount--;
    $('.buyPoints').text('Buy Points: ' + buyCount);
    $('.buy-button').prop('disabled', true);
    if (buyCount > 0) {
      $('.play-buy').removeAttr('disabled');
      $('.pass-buy').removeAttr('disabled');
    } else {
      $('.play-cleanup').removeAttr('disabled');
    }
  });

  $('.pass-buy').on('click', function(){
    $('.play-buy').prop('disabled', true);
    $('.pass-buy').prop('disabled', true);
    $('.play-cleanup').removeAttr('disabled');
  });

  // Step 5 binding - cleanup
  $('.play-cleanup').on('click', function(){
    clearHand(playerHand, playerDiscard);
    $('.play-cleanup').prop('disabled', true);
    $('.play-draw').removeAttr('disabled');
  });

  // Step 6 binding - draw new hand
  $('.play-draw').on('click', function(){
    $('.play-draw').prop('disabled', true);
    if (dominionShop["province"].supply === 0) {
      endgame();
    } else {
      drawHand(playerDeck);
      $('.end-turn').removeAttr('disabled');
    }
  });

  // Step 7 binding - end turn
  $('.end-turn').on('click', function() {
    $('.end-turn').prop('disabled', true);
    if(playerTurn === true) {
      $('#playerHands a:last').tab('show');
      playerTurn = false;
    } else {
      $('#playerHands a:first').tab('show');
      playerTurn = true;
    }
    $('.start-turn').removeAttr('disabled');
    turnSetup();
    updateSaveGame();
  });

  var setPlayerTab = function(){
    if(playerTurn !== true) {
      $('#playerHands a:last').tab('show');
    } else {
      $('#playerHands a:first').tab('show');
    }
  };

  // Step 8 binding - endgame
  var p1score = 0;
  var p2score = 0;
  var winner = '';
  function endgame() {
    !$.isEmptyObject(p1_hand) && clearHand (p1_hand, p1_discard);
    !$.isEmptyObject(p2_hand) && clearHand (p2_hand, p2_discard);
    discardMerge (p1_discard, p1_deck);
    discardMerge (p2_discard, p2_deck);
    p1score = findDeckVictory(p1_deck);
    p2score = findDeckVictory(p2_deck);

    if (p1score > p2score) {
      winner = 'Player 1';
    } else {
      winner = 'Player 2';
    }
    var modalBody = $('#endGameModal .modal-body');
    modalBody.append('<p>Score:</p>');
    modalBody.append('<p>Player 1:  ' + p1score + ' points</p>');
    modalBody.append('<p>Player 2:  ' + p2score + ' points</p>');
    modalBody.append('<p>' + winner + ' Wins!</p>');
    $('#endGameModal').modal();
    $('#endGameModal button').on('click', function(){
      modalBody.empty();
    });
  }


// Card Management Functions ----------------------------------------


  // Buy a card
  function buyCard(elem, playerDiscard) {
    var cardName = $(elem).data('name');
    var currentValue = $(elem).data("supply");
    $(elem).data("supply", currentValue-1);
    dominionShop[cardName].supply--
    playerDiscard[cardName].supply++;
  }

  // Return the number of cards in the deck
  function findDeckSize(playerDeck) {
    var totalSize = 0;
    for (var key in playerDeck) {
      totalSize += playerDeck[key].supply;
    }
    return totalSize;
  }

  // Draw one card
  function drawCard(playerDeck) {
    if (findDeckSize(playerDeck) < 1) {
      discardMerge(playerDiscard, playerDeck);
    }
    var cardObj = shuffleDeck(playerDeck);
    var html = '<div class="handCards" data-name="' + cardObj.name + '" style="background-image: url(' + cardObj.cardImage + ');"></div>';

    if (p1_deck === playerDeck) {
      $('#player1 .player-hand').append(html);
      p1_hand.push(cardObj);
    } else {
      $('#player2 .player-hand').append(html);
      p2_hand.push(cardObj);
    }
    playerDeck[cardObj.name].supply--;
  }

  function drawHand(playerDeck) {
    for (var i = 0; i < 5; i++) {
      drawCard(playerDeck);
    }
  }

  var restoreHand = function(){
    p1_hand.forEach(function(elem){
      var cardObj = elem;
      var html = '<div class="handCards" data-name="' + cardObj.name + '" style="background-image: url(' + cardObj.cardImage + ');"></div>';
      $('#player1 .player-hand').append(html);
    });
    p2_hand.forEach(function(elem){
      var cardObj = elem;
      var html = '<div class="handCards" data-name="' + cardObj.name + '" style="background-image: url(' + cardObj.cardImage + ');"></div>';
      $('#player2 .player-hand').append(html);
    });
  };

  // Pick one key pointing to a card currently in the deck
  function shuffleDeck(playerDeck) {
    var playerDeckKeys = Object.keys(playerDeck);
    var timesToRun = playerDeckKeys.length;
    for(var j = 0; j < timesToRun; j++){
      var k = Math.floor(Math.random() * playerDeckKeys.length);
      if(playerDeck[playerDeckKeys[k]].supply > 0) {
        return {
          name: playerDeckKeys[k],
          cardImage: $(playerDeck[playerDeckKeys[k]])[0].cardImage
        };
      } else {
        playerDeckKeys.splice(k,1);
      }
    }
  }

  // Checks to see if there are any action cards in the player's hand
  function checkHandAction(playerHand, playerDeck) {
    var actionPresent = false;
    playerHand.find('.handCards').each(function(index, elem){
      var cardName = $(elem).data('name');
      if (playerDeck[cardName].type == "action") {
        actionPresent = true;
      }
    });
    return actionPresent;
  }

  // Calculates the value of the treasure cards in the player's hand
  function countHandTreasure(playerHand, playerDeck, playerDiscard) {
    playerHand.find('.handCards').each(function(index, elem){
      var cardName = $(elem).data('name');
      if (playerDeck[cardName].type == "treasure") {
        treasureCount += playerDeck[cardName].amount;
        discardCard(elem, cardName, playerDiscard);
      }
      $('.treasurePoints').text('Treasure Points: ' + treasureCount);
    });
  }

  // Discards every card
  function clearHand(playerHand, playerDiscard){
    playerHand.find('.handCards').each(function(index, elem){
      var cardName = $(elem).data('name');
      discardCard(elem, cardName, playerDiscard);
    });
  }

  // Moves one card to the discard pile
  function discardCard(elem, cardName, playerDiscard) {
    var activeHand;
    if (playerTurn === true) {
      activeHand = p1_hand;
    } else {
      activeHand = p2_hand;
    }
    for (var i = 0; i < activeHand.length; i++) {
      if (activeHand[i].name === cardName) {
        activeHand.splice(i, 1);
        break;
      }
    }
    elem.remove();
    playerDiscard[cardName].supply++;
  }

  // Merges the discard pile into the draw pile
  function discardMerge(playerDiscard, playerDeck) {
    for (var key in playerDiscard) {
      playerDeck[key].supply += playerDiscard[key].supply;
      playerDiscard[key].supply = 0;
    }
  }

  // Returns the total point value of all the victory cards in the player's deck
  function findDeckVictory(playerDeck) {
    var totalScore = 0;
    for (var key in playerDeck) {
      if (playerDeck[key].type == "treasure") {
        totalScore += (playerDeck[key].amount * playerDeck[key].supply);
      }
    }
    return totalScore;
  }

  var init = function(){
    buttonSetup();
    setGameDecks();
  };

  init();

});
