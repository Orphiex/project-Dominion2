var dominionCards = {
  "copper": {
    "supply": 60,
    "cost": 0,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/f/fb/20151114150923%21Copper.jpg",
    "type": "treasure",
    "treasureValue": 1
  },
  "silver": {
    "supply": 40,
    "cost": 3,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/5/5d/20151114152404%21Silver.jpg",
    "type": "treasure",
    "treasureValue": 2
  },
  "gold": {
    "supply": 30,
    "cost": 6,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/5/50/20151114153520%21Gold.jpg",
    "type": "treasure",
    "treasureValue": 3
  },
  "estate": {
    "supply": 14,
    "cost": 2,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/9/91/20151114151927%21Estate.jpg",
    "type": "victory",
    "victoryValue": 1
  },
  "duchy": {
    "supply": 8,
    "cost": 5,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/4/4a/20151114152932%21Duchy.jpg",
    "type": "victory",
    "victoryValue": 3
  },
  "province": {
    "supply": 8,
    "cost": 8,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/8/81/20151114154028%21Province.jpg",
    "type": "victory",
    "victoryValue": 6
  },
  "cellar": {
    "supply": 10,
    "cost": 2,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/1/1c/20151113001136%21Cellar.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusAction",
        "amount": 1
      },
      {
        "name": "draw/discard"
        // "": drawDiscard
      }
    ]
  },
  // cards["Cellar"].effects[1].xxx()
  "market": {
    "supply": 10,
    "cost": 5,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/7/7e/20151113234930%21Market.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusCard",
        "amount": 1
      },
      {
        "name": "plusAction",
        "amount": 1
      },
      {
        "name": "plusBuy",
        "amount": 1
      },
      {
        "name": "plusTreasure",
        "amount": 1
      }
    ]
  },
  "throneroom": {
    "supply": 10,
    "cost": 4,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/d/d1/20151113173740%21Throne_Room.jpg",
    "type": "action",
    "effects": [
      {
        "name": "playTwice",
        "": ""
      }
    ]
  },
  "festival": {
    "supply": 10,
    "cost": 5,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/e/ec/20151113231645%21Festival.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusAction",
        "amount": 2
      },
      {
        "name": "plusBuy",
        "amount": 1
      },
      {
        "name": "plusTreasure",
        "amount": 2
      }
    ]
  },
  "smithy": {
    "supply": 10,
    "cost": 4,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/3/36/20151113172850%21Smithy.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusCard",
        "amount": 3
      }
    ]
  },
  "village": {
    "supply": 10,
    "cost": 3,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/5/5a/20151113145455%21Village.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusCard",
        "amount": 1
      },
      {
        "name": "plusAction",
        "amount": 2
      }
    ]
  },
  "woodcutter": {
    "supply": 10,
    "cost": 3,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/d/d6/20151113151058%21Woodcutter.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusBuy",
        "amount": 1
      },
      {
        "name": "plusTreasure",
        "amount": 2
      }
    ]
  },
  "workshop": {
    "supply": 10,
    "cost": 3,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/5/50/20151113151617%21Workshop.jpg",
    "type": "action",
    "effects": [
      {
        "name": "upTo4",
        "amount": ""
      }
    ]
  },
  "councilroom": {
    "supply": 10,
    "cost": 5,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/e/e0/20151113174426%21Council_Room.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusCard",
        "amount": 4
      },
      {
        "name": "plusBuy",
        "amount": 1
      },
      {
        "name": "otherPlayersDraw",
        "amount": 1
      }
    ]
  },
  "laboratory": {
    "supply": 10,
    "cost": 5,
    "card-image": "http://wiki.dominionstrategy.com/images/archive/0/0c/20151113233034%21Laboratory.jpg",
    "type": "action",
    "effects": [
      {
        "name": "plusCard",
        "amount": 2
      },
      {
        "name": "plusAction",
        "amount": 1
      }
    ]
  }
};
