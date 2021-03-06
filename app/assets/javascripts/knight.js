var mediFighter = mediFighter || {}


// mediFighter.stateData = {
//   standing:
// };

mediFighter.gameStates = {
    // Movement, defence, combat, and other attack move states
    idle: {
      animation: 'idle',
      update: function() {

      },
      nextStates: ["moveRight", "moveLeft", "crouching", "standBlocking", "jumping", "forwardJump", "backwardJump", "hit", "attacking", "stunned", "throw", "knockedDown", "thrown"]
    },
    moveRight:{
      animation: "moveRight",
      nextStates: ["attacking", "idle", "crouching", "standBlocking", "forwardJump", "hit", "stunned", "knockedDown", "throw", "thrown"]
    },
    moveLeft: {
      animation: "moveLeft",
      nextStates: ["attacking", "idle", "crouching", "standBlocking", "backwardJump", "hit", "stunned", "knockedDown", "throw", "thrown"]
    },
    crouching:{
      animation: 'crouching',
      nextStates:["idle", "stunned", "knockedDown", "crouchBlocking", "blockHit", "hit", "attacking"],
      canBeCancelledBy: [ "hit", ]
    },
    standBlocking:{
      animation: "block",
      nextStates: ["blockHit", "stunned", "knockedDown"]
    },
    crouchBlocking: ["blockHit", "stunned", "knockedDown"],
    jumping: {
      animation: 'vertJump',
      nextStates:["attacking", "idle", "knockedDown"]
    },
    forwardJump: ["attacking", "knockedDown"],
    backwardJump: ["attacking", "knockedDown"],
    hit: ["idle", "thrown", "stunned", "knockedDown"],
    blockHit: ["blocking"],
    attacking:["attacking", "idle", "hit", "stunned", "knockedDown"],
    straightPunch:{
      animation: "straightPunch",
      nextStates: ["attacking", "idle", "hit", "stunned", "knockedDown"]
    },
    straightPunch:{
      animation: "straightPunch",
      nextStates: ["attacking", "idle", "hit", "stunned", "knockedDown"]
    },
    throw: ["idle"],
    thrown: ["stunned", "knockedDown"],
    stunned: ["idle", "hit", "knockedDown", "stunned"],
    knockedDown: ["idle"]

    //Environmental states:
    // Entrenched (Effect only lasts while in mud)
    // Waterlogged (Effect lasts while in certain depth of water - effect lasts for a short time after getting clear of water)
};

/*
states:
idle
movingRight
movingLeft
crouching
standBlocking
crouchBlocking
jumping
forwardJump
backwardJump
hit (as in, taking a hit - creates new animation, quick stun effect (allow for combos))
blockHit(as in hit while you are blocking - should just freeze your block animation for a moment)
attacking (Engaged in an animation. Refine combo system later)
throw (action is same as attack state, but when successfully connected, call this.)
thrown (as in being currently thrown by the other player)

/////////////////////////////////////////////////////////////////////////


var createplayer = function(username, selectedCharacter){
  return {
    userName: username,
    currentState: 'idle',
    sprite:  this.game.add.sprite(250, 400, selectedCharacter), // or similar
    startLeft: true
  };
};

var newPlayer = new createPlayer('myUsername', 'spritesheetname');

// option 1: array of players, if you're happy to index the players by numbers
var players = [];
players.push( newPlayer );  // add each new player to the array

// how to access:
players[0], players[1]


// ooption 2: object of players, indexed by unique player names
var player = {};

player['newplayersname'] = newPlayer;

player = {
  newplayersname: {
                    userName: ....,
                    currentState: ...,
                  }
}




on keypress:
var currentState = ''
  var newState = getMoveForKey(keypress) // Key press action

  var nextStates = mediFighter[player.currentState] // Potential next states, based on current state

  if nextStates.includes(newState) // Check if the state is allowed
    do it!

*/
