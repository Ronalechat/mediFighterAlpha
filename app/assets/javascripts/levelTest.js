var mediFighter = mediFighter || {};

mediFighter.LevelTest = function (game) {};

var player;
var playerObj = {};
var currentState = 'idle';
var nextStates;
var ryu;
var stateText;
var canAttack = true;

var players = {};


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


    var crouch = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)


    console.log(this.player);

    console.log('medi', mediFighter.gameStates);


    //
    //
    // this.game.input.keyboard.onUpCallback = function (e) {
    //   console.log('keyUp event: ', e.code);
    // };
    //
    // this.game.input.keyboard.onDownCallback = function (e) {
    //   console.log('keyDown event: ', e.code);
    // };

    //Background and boundaries.
    this.add.tileSprite(0, 32, 800, 336, 'stage');
    this.world.setBounds(0, 0, 800, 336);

    // Add player sprite and set
    ryu = this.add.sprite(100, 200, 'ryuAnims');
    ryu.anchor.setTo(0.5);



    this.physics.arcade.enable(ryu);
    ryu.body.collideWorldBounds = true;

    this.player.sprite = ryu;




    ryu.animations.add('idle', [10,11,12,13,14,15,16,17,18], 6, true);
    ryu.animations.add('ready', [0,1,2,3,4,5,6,7,8,9,10], 6, true);

    //movement
    ryu.animations.add('moveForward', [18,19,20, 21, 22, 23, 24], 6, true);
    ryu.animations.add('moveBackward', [24, 25, 26, 27, 28, 29, 30], 6, true);
    ryu.animations.add('vertJump', [31, 32, 33, 34, 35, 36, 37], 6, true);
    ryu.animations.add('forwardJump', [40, 41, 42, 43, 44, 45, 46, 47], 6, true);
    ryu.animations.add('backwardJump', [47, 46, 45, 44, 43, 42, 41, 40], 6, true);

    //Crouch and crouchblock
    ryu.animations.add('crouching', [39], 6, true);
    ryu.animations.add('crouchingBlock', [38], 6, true);

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




    ryu.animations.play('victory', 6, false, false)
    ryu.events.onAnimationComplete.add(function(){
    // ryu.animations.play('victoryIdle', 6, true, false)
    }, this);


    // ryu.animations.play('ready', true, true);
    // ryu.animations.add('ready', Phaser.Animation.generateFrameNames('ready', 0, 10), 5, true);


    // ryu.animations.add('ready', null, 6, true);

    // STATE TEXT FOR DEBUGGING:
    stateText = this.add.text(this.world.centerX, this.world.centerY, 'words', {fill: "#fff"});
    stateText.anchor.setTo(0.5, 0.5);
    // stateText.fixedToCamera = true;


    // Set up controls
    cursors = this.input.keyboard.createCursorKeys();
    q = this.input.keyboard.addKey(Phaser.Keyboard.Q);
    w = this.input.keyboard.addKey(Phaser.Keyboard.W);
    a = this.input.keyboard.addKey(Phaser.Keyboard.A);
    s = this.input.keyboard.addKey(Phaser.Keyboard.S);


    cursors.down.onDown.add(function(){
      // console.log(this);
      this.keyHandler("crouching");
    }.bind(this));


    cursors.down.onUp.add(function(){
      this.keyHandler("standing");
      console.log('Standing');
    }.bind(this));

    cursors.right.onDown.add(function(){
      // console.log(this);
      this.keyHandler("moveForward");
    }.bind(this));

    cursors.right.onUp.add(function(){
      this.keyHandler("standing");
      console.log('Standing');
    }.bind(this));

    cursors.left.onDown.add(function(){
      // console.log(this);
      this.keyHandler("moveBackward");
    }.bind(this));


    cursors.left.onUp.add(function(){
      this.keyHandler("standing");
      console.log('Standing');
    }.bind(this));

//pauseKey.onDown.add(pauseFunction, this);pauseFunction = function(){    pause = !pause;}
    this.input.keyboard.addCallbacks()

    // cursors.down.onDown.add(this.crouchFunction, this)

    // q.onUp.add(this.crouchFunction, this)



  }, ////////////// End of Create

  update: function () {
    // idle
    // if (true) {
    //   currentState = 'standing';
    //   ryu.animations.play(mediFighter.gameStates[currentState].animation, 6, true, false)
    // }


    this.updateStateText();

    // cursors.down.onDown.add(function(){
    //   this.keyHandler("crouching")
    // }, this)
    // cursors.up.onDown.add(function(){
    //   this.keyHandler("jumping")
    // }, this)
    // cursors.right.onDown.add(function(){
    //   this.keyHandler("moveForward")
    // }, this)
    // cursors.left.onDown.add(function(){
    //   this.keyHandler("moveBackward")
    // }, this)
    // a.onDown.add(function(){
    //   this.keyHandler("standBlocking")
    // }, this)


    //Attack controls

    q.onDown.add(function(){
      if (canAttack === true){
        this.attackHandler("straightPunch", 400)
      } else {
        return;
      }
    }, this)




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

  }, ////////////// End of Update

  render: function () {

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
    

    setTimeout(function() {
      canAttack = true;
      console.log(canAttack);
    }, timeoutVal);


  },

  keyHandler: function(newState) {

    // newState is the state which this key wants to transition to;
    // first check if it's allowed to

    var transitionStates = mediFighter.gameStates[this.player.currentState].nextStates;
     // Potential next states, based on current state

     console.log('gameStates[%s].nextStates ', this.player.currentState);
     console.log(transitionStates.toString());


      if(transitionStates.includes(newState)) {
        // state was allowed, so transition to this state


        this.player.currentState = newState;
        console.log('%cNew state: %s', 'font-weight: bold', newState);

        this.changePlayerState(this.player, newState);
      }

    },



    changePlayerState: function(player, state) {

      player.sprite.animations.play(mediFighter.gameStates[state].animation, 6, true, false);


      switch(state){
        case 'moveForward':
          player.sprite.body.velocity.x = 80;
        break;
        case 'standing':
          player.sprite.body.velocity.x = 0;
        break;
        case 'moveBackward':
          player.sprite.body.velocity.x = -80;
        break;
      }
    },



    // currentState = key;
    // ryu.animations.currentAnim.onComplete.add(function () {	ryu.animations.play("idle", 6, true, false);}, this);


    // console.log('in keyHandler():');

    // var nextMove = this.getMoveForKey(key);

    // var newStates = mediFighter[player.currentState].nextStates // Potential next states, based on current state

    // Check if the state is allowed
    // if(nextStates.includes(newState)) {
      // state was allowed, so transition to this state

      //this.players[me].currentState = newState;
      // this.input.keyboard.onDownCallback = function (key) {

      // }
      // this.changePlayerState(newState);

    // }

  idle: function () {
      // If not key press, idle

  },

  // getMoveForKey: function(key) {
  //   {
  //     'cursors.right': 'moveRight',
  //     'cursors.left': 'moveLeft',
  //     'cursors.down': 'crouch',
  //     'cursors.up': 'vertJump',
  //   }
  // }

}// End of levelTest Prototype
