Users
{

}

Game State
{
  _id: ObjectId("asdkfjsdklfjsdfjeie"),
  p1: {
    deck: {},
    hand: {},
    discard: {}
  },
  p2: {
    deck: {},
    hand: {},
    discard: {}
  },
  shop: {},
  turn: {
    playerTurn: "True" or "False",
    step: "" // Action, Buy
  }
}

Action P1 -> played -> ajax -> save action to db -> success -> continue
Action P1 -> played -> ajax -> save action to db -> success -> continue
Press Pass -> ajax -> save pass to db -> success -> continue
Buy P1 -> buy - ajax -> save buy to db -> succes -> continue
Press Pass -> ajax -> save pass to db -> success -> continue
client -> cleanup -> manage decks -> action

Save/Load

Deck
[
  { // base
    initial: {},
    empty: {}
  },
  { // intrigue
    initial: {},
    empty: {}
  }
]

Copper:       http://wiki.dominionstrategy.com/images/archive/f/fb/20151114150923%21Copper.jpg
Silver:       http://wiki.dominionstrategy.com/images/archive/5/5d/20151114152404%21Silver.jpg
Gold:         http://wiki.dominionstrategy.com/images/archive/5/50/20151114153520%21Gold.jpg

Estate:       http://wiki.dominionstrategy.com/images/archive/9/91/20151114151927%21Estate.jpg
Duchy:        http://wiki.dominionstrategy.com/images/archive/4/4a/20151114152932%21Duchy.jpg
Province:     http://wiki.dominionstrategy.com/images/archive/8/81/20151114154028%21Province.jpg
Curse:        http://wiki.dominionstrategy.com/images/archive/9/97/20151114151611%21Curse.jpg

Cellar:       http://wiki.dominionstrategy.com/images/archive/1/1c/20151113001136%21Cellar.jpg
Chapel:       http://wiki.dominionstrategy.com/images/archive/2/29/20151113012415%21Chapel.jpg
Moat:         http://wiki.dominionstrategy.com/images/archive/f/fe/20151113014012%21Moat.jpg

Chancellor:   http://wiki.dominionstrategy.com/images/archive/b/b7/20151113030155%21Chancellor.jpg
Village:      http://wiki.dominionstrategy.com/images/archive/5/5a/20151113145455%21Village.jpg
Woodcutter:   http://wiki.dominionstrategy.com/images/archive/d/d6/20151113151058%21Woodcutter.jpg
Workshop:     http://wiki.dominionstrategy.com/images/archive/5/50/20151113151617%21Workshop.jpg

Bureaucrat:   http://wiki.dominionstrategy.com/images/archive/4/4d/20151113152827%21Bureaucrat.jpg
Feast:        http://wiki.dominionstrategy.com/images/archive/9/9c/20151113153632%21Feast.jpg
Gardens:      http://wiki.dominionstrategy.com/images/archive/8/8c/20151113155402%21Gardens.jpg
Militia:      http://wiki.dominionstrategy.com/images/archive/a/a0/20151113160438%21Militia.jpg
Moneylender:  http://wiki.dominionstrategy.com/images/archive/7/70/20151113162342%21Moneylender.jpg
Remodel:      http://wiki.dominionstrategy.com/images/archive/2/2e/20151113171859%21Remodel.jpg
Smithy:       http://wiki.dominionstrategy.com/images/archive/3/36/20151113172850%21Smithy.jpg
Spy:          http://wiki.dominionstrategy.com/images/archive/c/cb/20151113171145%21Spy.jpg
Thief:        http://wiki.dominionstrategy.com/images/archive/f/f5/20151113170852%21Thief.jpg
Throne Room:  http://wiki.dominionstrategy.com/images/archive/d/d1/20151113173740%21Throne_Room.jpg

Council Room: http://wiki.dominionstrategy.com/images/archive/e/e0/20151113174426%21Council_Room.jpg
Festival:     http://wiki.dominionstrategy.com/images/archive/e/ec/20151113231645%21Festival.jpg
Laboratory:   http://wiki.dominionstrategy.com/images/archive/0/0c/20151113233034%21Laboratory.jpg
Library:      http://wiki.dominionstrategy.com/images/archive/9/98/20151113233228%21Library.jpg
Market:       http://wiki.dominionstrategy.com/images/archive/7/7e/20151113234930%21Market.jpg
Mine:         http://wiki.dominionstrategy.com/images/archive/8/8e/20151114000542%21Mine.jpg
Witch:        http://wiki.dominionstrategy.com/images/archive/f/f3/20151114001250%21Witch.jpg

Adventurer:   http://wiki.dominionstrategy.com/images/archive/7/71/20151114001603%21Adventurer.jpg

q
