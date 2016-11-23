var mediFighter = mediFighter || {};

mediFighter.LevelTest = function (game) {};

var player;
var playerObj = {};
var currentState = 'idle';
var nextStates;
var ryu;
var hitboxes
var stateText;
var canAttack = true;
var timer;
var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var players = {};
var inputArray = [];

this.style2 = { font: '10px Alegreya Sans SC', fill: '#ffffff', };


mediFighter.LevelTest.prototype = {

  player: {
    currentState: 'standing',
    health: 1000
  },


  create: function () {
    // Canvas align to center
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();










    //
    //
    // this.game.input.keyboard.onUpCallback = function (e) {
    //   console.log('keyUp event: ', e.code);
    // };
    //
    // this.game.input.keyboard.onDownCallback = function (e) {
    //   console.log('keyDown event: ', e.code);
    // };

    //Physics //////////////////////////////////////////////////
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 200;


    //Background and boundaries.
    this.add.tileSprite(0, 32, 800, 336, 'stage');
    this.world.setBounds(0, 0, 800, 336);

    // Add player sprite and set
    ryu = this.add.sprite(100, 336, 'ryuAnims');
    ryu.anchor.setTo(0.5, 1);

    //Hitboxes
    hitboxes = game.add.group()
    hitboxes.enableBody = true;
    ryu.addChild(hitboxes)

    var hitbox1 = hitboxes.create(0,0, null)// set size and position of hitbox relative to the player.
    hitbox1.body.setSize(50, 50, this.player.width, this.player.height / 2); // add properties to the hitbox
    hitbox1.name = "punch";
    hitbox1.damage = 50;
    // hitbox1.knockbackDirection = 0.5;
    // hitbox1.knockbackAmt = 600;
    // enableHitbox(hitbox1)


    // this.physics.arcade.enable(ryu);
    this.game.physics.enable( ryu, Phaser.Physics.ARCADE)
    ryu.body.collideWorldBounds = true;

    this.player.sprite = ryu;




    ryu.animations.add('idle', [10,11,12,13,14,15,16,17,18], 6, true);
    ryu.animations.add('ready', [0,1,2,3,4,5,6,7,8,9,10], 6, true);

    //movement
    ryu.animations.add('moveForward', [18,19,20, 21, 22, 23, 24], 6, true);
    ryu.animations.add('moveBackward', [24, 25, 26, 27, 28, 29, 30], 6, true);
    ryu.animations.add('vertJump', [31, 32, 33, 34, 35, 36, 37], 10, false);
    ryu.animations.add('vertJumpFall', [37], 1, true);
    ryu.animations.add('forwardJump', [40, 41, 42, 43, 44, 45, 46, 47], 6, false);
    ryu.animations.add('forwardJumpFall', [47], 1, true);
    ryu.animations.add('backwardJump', [47, 46, 45, 44, 43, 42, 41, 40], 6, false);
    ryu.animations.add('backwardJumpFall', [40], 1, true);

    //Crouch and crouchblock
    ryu.animations.add('crouching', [39], 1, true);
    ryu.animations.add('crouchingBlock', [38], 1, true);

    //Crouch attack
    ryu.animations.add('crouchingPunch', [ 83, 84, 85], 6, true);
    ryu.animations.add('sweepKick', [ 86, 87, 88, 89, 90, 91], 6, true);
    ryu.animations.add('crouchingKick', [ 92, 93], 6, true);

    // Block and blockHit frames
    ryu.animations.add('blockHit', [48], 6, true);
    ryu.animations.add('block', [49], 6, true);

    //Standing attack animation
    ryu.animations.add('straightPunch', [50, 51, 50], 6, true);
    ryu.animations.add('heavyPunch', [52, 53, 54, 55], 6, true);
    ryu.animations.add('roundPunch', [56, 57, 58, 59, 60], 6, true);
    ryu.animations.add('lowKick', [60, 61, 62, 63, 64, 65, 66], 6, true);
    ryu.animations.add('highKick', [ 66, 67, 68], 6, true);
    ryu.animations.add('roundKick', [ 69, 70, 71, 72, 73, 74], 6, true);
    ryu.animations.add('topKick', [ 94, 95, 96, 97, 98, 99, 100], 6, true);

    //Special attack
    ryu.animations.add('diveKick', [ 75, 76, 77], 6, true);
    ryu.animations.add('divePunch', [ 78, 79, 80, 81, 82], 6, true);
    ryu.animations.add('hadouken', [ 101, 102, 103, 104, 105], 6, true);
    ryu.animations.add('bigHadouken', [ 106, 107, 108, 109, 110, 111, 112, 113, 114, 115], 6, true);
    ryu.animations.add('dragonKick', [ 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134], 6, true);
    ryu.animations.add('dragonPunch', [ 135, 136, 137, 138, 139, 140], 6, true);
    //Grab and throws
    ryu.animations.add('grab', [ 141, 142, 143], 6, true);
    ryu.animations.add('throw', [ 144, 145, 146, 147], 6, true);
    ryu.animations.add('longThrow', [ 148, 149, 150], 6, true);
    //Other animation
    ryu.animations.add('downToStanding', [ 151, 152], 6, true);
    ryu.animations.add('hitLight', [ 153], 6, true);
    ryu.animations.add('hitHeavy', [ 154, 155 ], 6, true);
    ryu.animations.add('falling', [ 157 ], 6, true);
    ryu.animations.add('down', [ 158 ], 6, true);
    ryu.animations.add('bigHit', [ 159, 160 ], 6, true);
    ryu.animations.add('ded', [ 161,162, 163, 164, 165, 166, 167, 168, 169, 170 ], 6, true);
    ryu.animations.add('victory', [ 171, 172, 173, 174, 175, 176, 177, 178, 179, 180 ], 6, true);
    ryu.animations.add('victoryIdle', [ 179, 178, 180, 179, 180, 179, 178, 177, 178 ], 6, true);




    ryu.animations.play('idle', 6, true, false)
    ryu.events.onAnimationComplete.add(function(){
      ryu.animations.play('idle', 6, true, false)
    }, this);

    this.game.physics.enable(ryu, this.player, Phaser.Physics.ARCADE)


    // ryu.animations.play('ready', true, true);
    // ryu.animations.add('ready', Phaser.Animation.generateFrameNames('ready', 0, 10), 5, true);


    // ryu.animations.add('ready', null, 6, true);

    // STATE TEXT FOR DEBUGGING:
    stateText = this.add.text(this.world.centerX, this.world.centerY, 'words', {fill: "#fff"});
    stateText.anchor.setTo(0.5, 1);

    timer = this.add.text(this.world.centerX, (this.world.centerY + 100), '00:00:00', {fill: "#fff"});
    timer.anchor.setTo(0.5, 0.5);
    this.game.time.reset()


    // stateText.fixedToCamera = true;


    // Set up controls
    cursors = this.input.keyboard.createCursorKeys();
    q = this.input.keyboard.addKey(Phaser.Keyboard.Q);
    w = this.input.keyboard.addKey(Phaser.Keyboard.W);
    a = this.input.keyboard.addKey(Phaser.Keyboard.A);
    s = this.input.keyboard.addKey(Phaser.Keyboard.S);



    cursors.down.onDown.add(function(){
      // console.log(this);
      // this.keyHandler("crouching");
      this.inputDetect("down");
    }.bind(this));


    // cursors.down.onUp.add(function(e){
    //   this.keyHandler("standing");
    //   // console.log('Standing');
    //   // if( this.input.keyboard.downDuration(a, 2000) ) {
    //   //   console.log('%cUP WAS PRESSED!!!', 'font-size: 20pt');
    //   // }
    // }.bind(this));

    cursors.right.onDown.add(function(){
      // console.log(this);
      // this.keyHandler("moveForward");
      this.inputDetect("right")
    }.bind(this));

    cursors.right.onUp.add(function(){
      this.keyHandler("standing");
      // console.log('Standing');
    }.bind(this));

    cursors.left.onDown.add(function(){
      // console.log(this);
      this.inputDetect("left");
    }.bind(this));


    cursors.left.onUp.add(function(){
      this.keyHandler("standing");
      // console.log('Standing');
    }.bind(this));

    cursors.up.onDown.add(function(){
      // console.log(this);
      this.inputDetect('up')
    }.bind(this));

    q.onDown.add(function(){
      this.inputDetect('punch')
    }.bind(this));
    w.onDown.add(function(){
      this.inputDetect('kick')
    }.bind(this));
    a.onDown.add(function(){
      this.inputDetect('block')
    }.bind(this));


    // q.onDown.add(function(){
    //   if (canAttack === true){
    //     this.attackHandler("straightPunch", 400)
    //   } else {
    //     return;
    //   }
    // }, this)





    // cursors.up.onUp.add(function(){
    //   this.keyHandler("standing");
    //   console.log('Standing');
    // }.bind(this));

//pauseKey.onDown.add(pauseFunction, this);pauseFunction = function(){    pause = !pause;}
    this.input.keyboard.addCallbacks()

    // cursors.down.onDown.add(this.crouchFunction, this)

    // q.onUp.add(this.crouchFunction, this)



  }, ////////////// End of Create

  update: function () {

    this.floorCheck()
    this.inputArrayGarbageCollection(inputArray);

    this.updateTimer();

    this.priorityCheck(inputArray);

    this.updateStateText();

    //collision detection:
    // this.physics.arcade.collide(player);


    //Attack controls






    // if (cursors.left.isDown) {
    //   currentState = mediFighter.gameStates.movingBackward
    // } else if (cursors.right.isDown) {
    //   currentState = mediFighter.gameStates.movingForward
    //
    // } else {
      // currentState = 'standing'
      // ryu.animations.play(mediFighter.gameStates.standing.animation, 6, false, false)
    // }

    // if (cursors.down.isDown) {
    //   currentState = 'crouching'; //mediFighter.gameStates.crouching
    //   ryu.animations.play(mediFighter.gameStates.crouching.animation, 6, false, false);
    //
    //   //mediFighter.gameStates[currentState]; // gives you allowable transition states
    // } else {
    //   currentState = 'standing'
    //   ryu.animations.play(mediFighter.gameStates.standing.animation, 6, true, false)
    //
    // }

    // if (this.player.sprite.body.y < 50) {
    //   this.player.sprite.body.velocity.y = 200;
    // } else if ( this.player.sprite.body.y <= 229) {
    //   this.keyHandler("standing")
    // }

  }, ////////////// End of Update

  render: function () {

    this.game.debug.body(ryu);

  }, ////////////// End of Render

  updateStateText: function () {
    // console.log('in updateStateText()');
    stateText.text = this.player.currentState;
  },

  attackHandler: function(key, timeoutVal){
    ryu.animations.play(key, 6, false, false)
    currentState = 'attacking';
    canAttack = false;

    //TODO On animation end

    //
    // setTimeout(function() {
    //   canAttack = true;
    //   console.log(canAttack);
    // }, timeoutVal);


  },

  keyHandler: function(newState) {

    // newState is the state which this key wants to transition to;
    // first check if it's allowed to

    var transitionStates = mediFighter.gameStates[this.player.currentState].nextStates;
     // Potential next states, based on current state

    //  console.log('gameStates[%s].nextStates ', this.player.currentState);
    //  console.log(transitionStates.toString());


      if(transitionStates.includes(newState)) {
        // state was allowed, so transition to this state


        this.player.currentState = newState;
        // console.log('%cNew state: %s', 'font-weight: bold', newState);

        this.changePlayerState(this.player, newState);
      }

    },

    changePlayerState: function(player, state) {

      player.sprite.animations.play(mediFighter.gameStates[state].animation, 6, true, false);


      switch(state){
        case 'moveForward':
          player.sprite.body.velocity.x = 80;
          player.sprite.scale.x = 1;
        break;
        case 'standing':
          player.sprite.body.velocity.x = 0;
          player.sprite.offsetY = 29;
          player.sprite.body.setSize(66, 95, 0, 0)
        break;
        case 'crouching':
          player.sprite.body.velocity.x = 0;
          player.sprite.offsetY = 29;
          player.sprite.body.setSize(62, 65, 0, 29)
          //Ignore move commands?
        break;
        case 'moveBackward':
          player.sprite.body.velocity.x = -80;
          player.sprite.scale.x = -1;

        break;
        case 'jumping':
          player.sprite.body.velocity.y = -200;
        break;
      }
    },

    inputDetect: function(keyPressValue) {
      timeOfPress = Date.now();
      pressedKeysObject = { key: keyPressValue, ts: timeOfPress };
      inputArray.push(pressedKeysObject)
      console.log(keyPressValue);
    },

    priorityCheck: function(inputArray) {
      switch (currentState) {
        case "crouching":
          this.attackMoveCheck(inputArray) || this.blockCheck(inputArray)
          break;
        case "jumping":
          this.attackMoveCheck(inputArray);
          break;
        case "idle":
          this.specialMoveCheck(currentState, inputArray) || this.comboMoveCheck(currentState, inputArray) || this.blockCheck(currentState, inputArray) || this.attackMoveCheck(currentState, inputArray) || this.movementCheck(currentState, inputArray)
          break;
      }



      // if (currentState == "standing") {
      //   this.specialMoveCheck(inputArray) || this.comboMoveCheck(inputArray) || this.movementCheck(inputArray)
      // } else if ()

      // if standing/blocking chill AF
      // Special moves
      //
      // if none, combos,




      // special moves:
      //  inputArray[0], inputArray[1], inputArray[2] within window
      //
      //  inputArray[0], inputArray[1], inputArray[2] === down, right, punch
      //  DO hadouken
      //  inputArray[0], inputArray[1], inputArray[2] === down, left punch
      //  DO dragon punch
      //
      //
      //
      // combo?:
      //  inputArray[0], inputArray[1] within window
      //
      //  inputArray[0], inputArray[1], inputArray[2] === punch, punch, kick
      //  combo1, 3 hits
      //  inputArray[0], inputArray[1], inputArray[2] === punch, kick, punch
      //  combo2, 4 hits.






      // console.log('key event:', keyPressValue);

      // keyPressValue
      // timeOfInput =
      //
      // var time = Date.now();
      //
      // inputs.push( {key: keyPressValue, time: time })

      // var now = Get.time
      // var later = get.time + 300
      // var closed = gettime + 500
      // now > later Allow input
      // now > closed back to normal

//    FIRST THING: MARK TIME FOR INPUT
      // if HIT => cancel/ignore input
//     while isJumping => Only attack
//    While crouching => block, attack, crouch, check for special
//      while blocking => crouching(block crouch)
    // standing => attack, block, move, jump, check for special
    // attack => combo, check for special
//       combo => combo, check for special
//
//
//
//
//
//
//
//
      // var special1 = 2, 6, q
      // var special2 = 2, 4, q
      // var special3 = 4, 6, w
      //If no match to special within (this time)
      // DO first input (move)
      // DO next input


      // Special > combo > attack > movement (except Jump wind up).


      //Attack (input, combo time, next input time)
      // comboNum += 1
      // var comboInputs1 = q,
      // var comboInputs2 = w
      // If === comboInputs1 {
      // Attack(combo time, next input time)
    // } else if ( == comboInputs2){
    //  attack(combo time, next input time)
  // }
  //If isJumping, only allow for punch or kick
  // Cancel jumping if hit or on ground.
  //  Roof detection (If player, above Y, velocity.y = + )
  //Movement:
  //If (standing){
  // if input right = 6, velocity.x = +
  // if input left = 4, velocity.x = -
  //
  //If input 6 && input 8,
  // Forward jump

  // if input 4 && input 8
  //}
  //
  // direction detection
  // Player1.x < player2.x
  // player 1 face right scale.x(0.5, 1)
  // player 2 face left scale.x(0.5, -1)
  //
  // Player1.x > player2.x
  // player 1 face left scale.x(0.5, -1)
  // player 2 face rightt scale.x(0.5, 1)
  //
  //
  //
  },
  floorCheck: function() {
    if (this.player.sprite.y > 351) {
      console.log(this.player.sprite.y);
      currentState = "standing"
      ryu.animations.play('idle', 6, true, false)


    }
  },


  inputArrayGarbageCollection:function(inputArray) {
      var currentTime = Date.now();

      for (var i = 0; i < inputArray.length; i++) {
        inputArray[i]
        if ((currentTime - inputArray[i].ts) > 800){
         inputArray.splice(i, 1);
        }
      }
  },

  specialMoveCheck: function(inputArray){
    for (var i = 0; i < inputArray.length - 2; i++) {
        var first = inputArray[i].key
        var second = inputArray[i+1].key
        var third = inputArray[i+2].key

        if (first + second + third === "THIS THREE MOVE COMBO") {
          return true;
          //TODO: DO A HADOUKEN
        } else if (first + second + third === "SECOND THREE MOVE COMBO") {
          //TODO: DO A DRAGONPUNCH
          return true;
        } else {
          return false;
        }
     }
  },
  blockCheck: function(currentState, inputArray) {
    // is blocking? If so, change state.
    // Change animation
    // Ignore input.
    // return true
  },

  comboMoveCheck: function(currentState, inputArray){
    for (var i = 0; i < inputArray.length - 2; i++) {
        var first = inputArray[i].key
        var second = inputArray[i+1].key
        var third = inputArray[i+2].key

        var timeDifference = inputArray[i+2].ts - inputArray[i].ts
          if (timeDifference < 600) {

        if (first + second + third === "THIS THREE MOVE COMBO") {
          return true;
          //TODO: DO A P+P+K
        } else if (first + second + third === "SECOND THREE MOVE COMBO") {
          //TODO: DO A P + K + P
          return true;
        } else {
          return false;
        }
     }
   }

    //Check input,
    //Check action time,
    //Check combo count (leveltest variable vs object data),
    //    Does move correspond to valid combo input?
    // RUN COMBO: Do combo set move (according to object?)
    // Return true/false?????
  },

  attackMoveCheck: function(currentState, inputArray) {
    // valid input?
    // Is jumping?
    // crouching?
    // standing?
    //Return true/false?
  },

  movementCheck: function(currentState, inputArray) {

    switch (currentState) {
      case "crouching":
        return false;
        break;
      case "jumping":
        return false;
        break
      case "idle":
      //TODO Check for horizontal movement. if right, x= + ---- if left x = -
        for (var i = 0; i < inputArray.length-1; i++) {
          var first = inputArray[i].key
          var second = inputArray[i+1].key

          var timeDifference = inputArray[i+1].ts - inputArray[i].ts
          if (timeDifference < 300) {
            if (first + second === "upright" || first + second === "rightup") {
              console.log("upright");
              // player.sprite.body.velocity.y = - 2000
            } else if (first + second === "upleft" || first + second === "leftup") {
              console.log("upleft");
            }
          } else if (first === 'up') {
            //vertJump
            currentState = 'jumping'
            ryu.animations.play('vertJump', 6, false, false)
            ryu.events.onAnimationComplete.add(function(){
              ryu.animations.play('vertJumpFall', 1, false, false)
              currentState = 'jumpFall'
            }, this);
            this.player.sprite.body.velocity.y = -200;
          } else if (first === 'right') {
            this.player.sprite.body.velocity.x = + 80;
          } else if (first === 'left') {
            this.player.sprite.body.velocity.x = - 80;
          }
        }
    }


    // if standing
    // change X/Y
    // else{ ignore. }


  },
  updateTimer: function () {
    // console.log(whenDown);
    var minutes = Math.floor(this.game.time.time / 60000) % 60;
    var seconds = Math.floor(this.game.time.time / 1000) % 60;
    var milliseconds = Math.floor(this.game.time.time) % 100;
    //If any of the digits becomes a single digit number, pad it with a zero

    // if (secondsElapsed < 10 ) {
    //   timeDisplay.text = "0:0" + secondsElapsed;
    // } else if ( secondsElapsed < 60) {
    //   timeDisplay.text = "0:" + secondsElapsed;
    // } else if ( secondsElapsed > 60 && seconds < 10) {
    //   timeDisplay.text = minutes + ":0" + seconds;
    // } else if ( secondsElapsed > 60 && seconds >= 10) {
    //   timeDisplay.text = minutes + ":" + seconds;
    // }

    if (milliseconds < 10){
      milliseconds = '0' + milliseconds;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10){
      minutes = '0' + minutes;
    }
    timer.text = (minutes + ':'+ seconds + ':' + milliseconds);
  }




}// End of levelTest Prototype
