var mediFighter = mediFighter || {};

mediFighter.LevelTest = function (game) {};

var player;
var playerObj = {};
var currentState = '';
var nextStates;
var ryu;
var hitboxes
var stateText;
var canAttack = true;
var timer;
var milliseconds = 0;
var seconds = 0;
var minutes = 0;
// var players = [];
var canHorizontalMove = true;
var canOtherHorizontalMove = true;
var inputArray = [];



this.style2 = { font: '10px Alegreya Sans SC', fill: '#ffffff', };


mediFighter.LevelTest.prototype = {

  players: [],

  player: {
    currentState: 'idle',
    health: 1000
  },
  playerOther: {
    currentState: 'idle',
    health: 1000
  },


  create: function () {
    // Canvas align to center
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();

    //Physics //////////////////////////////////////////////////
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 1000;


    //Background and boundaries.
    this.add.tileSprite(0, 32, 800, 336, 'stage');
    this.world.setBounds(0, 0, 800, 336);

    game.input.gamepad.start();


    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;

    // game.input.onDown.add(dump, this);

    // bothPlayers = []

    // // Add player sprite and set
    // ryu = this.add.sprite(300, 336, 'ryuAnims');
    // ryu2 = this.add.sprite(500, 336, 'ryuAnims');
    // ryu2.anchor.setTo(0.5, 1);
    // this.player.sprite.anchor.setTo(0.5, 1);


    // //Hitboxes
    // hitboxes = game.add.group()
    // hitboxes.enableBody = true;
    // this.player.sprite.addChild(hitboxes)
    //
    // var hitbox1 = hitboxes.create(0,0, null)// set size and position of hitbox relative to the player.
    // hitbox1.body.setSize(50, 50, this.player.width, this.player.height / 2); // add properties to the hitbox
    // hitbox1.name = "punch";
    // hitbox1.damage = 50;


    // hitbox1.knockbackDirection = 0.5;
    // hitbox1.knockbackAmt = 600;
    // enableHitbox(hitbox1)


    // this.physics.arcade.enable(ryu);
    // this.game.physics.enable( ryu, Phaser.Physics.ARCADE)
    // this.player.sprite.body.collideWorldBounds = true;
    //
    // this.player.sprite = ryu;
    // this.playerOther.sprite = ryu2;
    // this.playerOther.sprite.scale.x = -1;

    // this.playerOther.sprite = ryuOther;

    var initPlayer = function (x, y) {

      ryu = this.add.sprite(x, y, 'ryuAnims');

      ryu.anchor.setTo(0.5, 1);

      ryu.animations.add('idle', [10,11,12,13,14,15,16,17,18], 8, true);
      ryu.animations.add('ready', [0,1,2,3,4,5,6,7,8,9,10], 6, true);

      //movement
      ryu.animations.add('moveRight', [19,20, 21, 22, 23, 24], 6, true);
      ryu.animations.add('moveLeft', [ 25, 26, 27, 28, 29, 30], 6, true);
      ryu.animations.add('vertJump', [31, 32, 33, 34, 35, 36, 37], 10, false);
      ryu.animations.add('vertJumpFall', [37], 1, true);
      ryu.animations.add('forwardJump', [40, 41, 42, 43, 44, 45, 46, 47], 6, false);
      ryu.animations.add('forwardJumpFall', [47], 1, true);
      ryu.animations.add('backwardJump', [47, 46, 45, 44, 43, 42, 41, 40], 6, false);
      ryu.animations.add('backwardJumpFall', [40], 1, true);

      //Crouch and crouchblock
      ryu.animations.add('crouch', [39], 1, true);
      ryu.animations.add('crouchBlock', [38], 1, true);

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
      ryu.animations.add('divePunch', [ 80, 81, 82, 82], 12, true);
      ryu.animations.add('hadouken', [ 101, 102, 103, 104, 105], 6, true);
      ryu.animations.add('bigHadouken', [ 106, 107, 108, 109, 110, 111, 112, 113, 114, 115], 6, true);
      ryu.animations.add('dragonKick', [ 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134], 6, true);
      ryu.animations.add('dragonPunch', [ 135, 136, 137, 138, 139, 140], 6, true);
      //Grab and throws
      ryu.animations.add('grab', [ 141, 142, 143], 6, true);
      ryu.animations.add('throw', [ 144, 145, 146, 147], 6, true);
      ryu.animations.add('longThrow', [ 148, 149, 150], 6, true);
      //Other animation
      ryu.animations.add('downToIdle', [ 151, 152], 6, true);
      ryu.animations.add('hitLight', [ 153], 6, true);
      ryu.animations.add('hitHeavy', [ 154, 155 ], 6, true);
      ryu.animations.add('falling', [ 157 ], 6, true);
      ryu.animations.add('down', [ 158 ], 6, true);
      ryu.animations.add('bigHit', [ 159, 160 ], 6, true);
      ryu.animations.add('ded', [ 161,162, 163, 164, 165, 166, 167, 168, 169, 170 ], 6, true);
      ryu.animations.add('victory', [ 171, 172, 173, 174, 175, 176, 177, 178, 179, 180 ], 6, true);
      ryu.animations.add('victoryIdle', [ 179, 178, 180, 179, 180, 179, 178, 177, 178 ], 6, true);

      // hitboxes = game.add.group()
          // hitboxes.enableBody = true;
          // this.player.sprite.addChild(hitboxes)


      this.game.physics.enable( ryu, Phaser.Physics.ARCADE)
      ryu.body.collideWorldBounds = true;


      ryu.animations.play('idle', 8, true, false);
      this.physics.arcade.enable(ryu, [this.player, this.playerOther], Phaser.Physics.ARCADE)
      ryu.body.enable = true;
      return ryu;

    }.bind(this); // use game 'this'

    var p1 = {
      name: 'player1',
      sprite: initPlayer(300, 336)
    };

    this.players.push( p1 );


    var p2 = {
      name: 'player2',
      sprite: initPlayer(500, 336)
    };

    this.players.push( p2 );



    this.player.sprite = p1.sprite;
    this.playerOther.sprite = p2.sprite;

    this.playerOther.sprite.scale.x = -1;
    // this.playerOther.sprite = ryuOther;

    var physicsSetup = [];


    // set up physics interactions between both players
    for (var i = 0; i < this.players.length; i++) {
      var p = this.players[i];

      // for each player, set up physics between this player and every other player
      for (var j = 0; j < this.players.length; j++) {
        var pOther = this.players[j];
        var playersID = [p.name, pOther.name].sort().join('');
        // don't set up physics between player and itself
        if(p.name === pOther.name || physicsSetup.indexOf(playersID) !== -1 ) {
          console.log('SKIP Setting up physics between %s and %s', p.name, pOther.name);
          continue;
        }

        console.log('Setting up physics between %s and %s', p.name, pOther.name);
        physicsSetup.push( playersID ); // save into our record of player-players setups already done

        // setup collions and hitboxes and other physics between p and pOther
        //p.sprite. pOther.sprite
        this.physics.arcade.collide(pOther.sprite.body, p.sprite.body);



      }

    }



    /*

    ryu.animations.add('idle', [10,11,12,13,14,15,16,17,18], 8, true);
    ryu.animations.add('ready', [0,1,2,3,4,5,6,7,8,9,10], 6, true);

    //movement
    ryu.animations.add('moveRight', [19,20, 21, 22, 23, 24], 6, true);
    ryu.animations.add('moveLeft', [ 25, 26, 27, 28, 29, 30], 6, true);
    ryu.animations.add('vertJump', [31, 32, 33, 34, 35, 36, 37], 10, false);
    ryu.animations.add('vertJumpFall', [37], 1, true);
    ryu.animations.add('forwardJump', [40, 41, 42, 43, 44, 45, 46, 47], 6, false);
    ryu.animations.add('forwardJumpFall', [47], 1, true);
    ryu.animations.add('backwardJump', [47, 46, 45, 44, 43, 42, 41, 40], 6, false);
    ryu.animations.add('backwardJumpFall', [40], 1, true);

    //Crouch and crouchblock
    ryu.animations.add('crouch', [39], 1, true);
    ryu.animations.add('crouchBlock', [38], 1, true);

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
    ryu.animations.add('downToIdle', [ 151, 152], 6, true);
    ryu.animations.add('hitLight', [ 153], 6, true);
    ryu.animations.add('hitHeavy', [ 154, 155 ], 6, true);
    ryu.animations.add('falling', [ 157 ], 6, true);
    ryu.animations.add('down', [ 158 ], 6, true);
    ryu.animations.add('bigHit', [ 159, 160 ], 6, true);
    ryu.animations.add('ded', [ 161,162, 163, 164, 165, 166, 167, 168, 169, 170 ], 6, true);
    ryu.animations.add('victory', [ 171, 172, 173, 174, 175, 176, 177, 178, 179, 180 ], 6, true);
    ryu.animations.add('victoryIdle', [ 179, 178, 180, 179, 180, 179, 178, 177, 178 ], 6, true);




    ryu.animations.play('idle', 8, true, false)
    ryu.events.onAnimationComplete.add(function(){
      ryu.animations.play('idle', 8, true, false)
    }, this);

    this.game.physics.enable(ryu, this.player, Phaser.Physics.ARCADE)


    */

    // ryu.animations.play('ready', true, true);
    // ryu.animations.add('ready', Phaser.Animation.generateFrameNames('ready', 0, 10), 5, true);


    // ryu.animations.add('ready', null, 6, true);

    // STATE TEXT FOR DEBUGGING:
    // stateText = this.add.text(this.world.centerX, this.world.centerY, 'words', {fill: "#fff"});
    // stateText.anchor.setTo(0.5, 1);

    // timer = this.add.text(this.world.centerX, (this.world.centerY + 100), '00:00:00', {fill: "#fff"});
    // timer.anchor.setTo(0.5, 0.5);
    // this.game.time.reset()


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


    cursors.down.onUp.add(function(e){
      this.inputDetect("idle");
      // console.log('Standing');
      // if( this.input.keyboard.downDuration(a, 2000) ) {
      //   console.log('%cUP WAS PRESSED!!!', 'font-size: 20pt');
      // }
    }.bind(this));

    cursors.right.onDown.add(function(){
      // console.log(this);
      // this.keyHandler("moveRight");
      this.inputDetect("right")
    }.bind(this));

    // cursors.right.onUp.add(function(){
    //   this.keyHandler("idle");
    //   // console.log('Standing');
    // }.bind(this));

    cursors.left.onDown.add(function(){
      // console.log(this);
      this.inputDetect("left");
    }.bind(this));


    // cursors.left.onUp.add(function(){
    //   this.keyHandler("idle");
    //   // console.log('Standing');
    // }.bind(this));

    cursors.up.onDown.add(function(){
      // console.log(this);
      this.inputDetect('up')
    }.bind(this));

    // Attack keys
    q.onDown.add(function(){
      this.inputDetect('punch')
    }.bind(this));
    w.onDown.add(function(){
      this.inputDetect('kick')
    }.bind(this));

    // Block keys
    a.onDown.add(function(){
      this.inputDetect('block')
    }.bind(this));


//pauseKey.onDown.add(pauseFunction, this);pauseFunction = function(){    pause = !pause;}
    this.input.keyboard.addCallbacks()

    // cursors.down.onDown.add(this.crouchFunction, this)

    // q.onUp.add(this.crouchFunction, this)



  }, ////////////// End of Create

  update: function () {

    this.priorityCheck(this.player.currentState, inputArray);

    console.log(inputArray);

    if (canHorizontalMove === true && cursors.right.isDown) {
      // currentState = "moveRight"
      this.player.sprite.body.velocity.x = 90;
      this.player.sprite.animations.play('moveRight', 8, true, false)
    } else if (canHorizontalMove === true && cursors.left.isDown) {
      // currentState = "moveLeft"
      this.player.sprite.body.velocity.x = -90;
      this.player.sprite.animations.play('moveLeft', 8, true, false)
    } else  if (canHorizontalMove === true ){
      this.player.currentState = 'idle'
      this.player.sprite.body.velocity.x = 0;
      this.player.sprite.animations.play('idle', 8, true, false)
   }

   if (this.player.currentState == "idle" && cursors.down.isDown) {
      canHorizontalMove = false
      this.player.sprite.animations.play('crouch', 1, true, false)
      this.player.currentState = "crouching"
      this.player.sprite.body.velocity.x = 0;
      App.game.sendMove({'move': 'crouching'});
    } else if (this.player.currentState == "crouching" && cursors.down.isUp) {
      canHorizontalMove = true
     this.player.sprite.animations.play('idle', 8, true, false)
     this.player.currentState = "idle"
    }

    if ( this.player.sprite.body.velocity.y < 0 ) {
      this.player.currentState = "jumping";
    } else if ( this.player.sprite.body.velocity.y > 100) {
      this.player.currentState = "jumpFall";
    } else {
      this.player.currentState;
    }

    if (this.player.sprite.x < this.playerOther.sprite.x ) {
      this.player.sprite.scale.x = 1;
      this.playerOther.sprite.scale.x = -1;
    } else {
      this.player.sprite.scale.x = -1;
      this.playerOther.sprite.scale.x = 1;
    }
    // console.log(this.player.sprite.x + " ||||| " + this.playerOther.sprite.x);



    //Gamepad controls /////////////////////////////////////////////////////////
    if (canOtherHorizontalMove === true) {
      if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
      {
          this.playerOther.sprite.body.velocity.x = -90
          this.playerOther.sprite.animations.play('moveRight', 12, true, false)

      }
      else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
      {
          this.playerOther.sprite.body.velocity.x = 90
          this.playerOther.sprite.animations.play('moveLeft', 12, true, false)
      } else {
        this.playerOther.sprite.body.velocity.x = 0
        // this.playerOther.sprite.events.onAnimationComplete.add(function(){
        //     this.playerOther.sprite.animations.play('idle', 12, true, false)
        //}, this);
        this.playerOther.sprite.animations.play('idle', 12, true, false)
      }
    }

    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
    {
      canOtherHorizontalMove = false;
      this.playerOther.sprite.body.velocity.y = -500
      this.playerOther.currentState = "jumping"
      this.playerOther.sprite.animations.play('vertJump', 12, false, false)
      this.playerOther.sprite.events.onAnimationComplete.add(function(){
        this.playerOther.currentState = "jumpFall"
        this.playerOther.sprite.animations.play('vertJumpFall', 1, true, false)
      }, this);

      // this.playerOther.sprite.animations.play('straightPunch', 10, false, false)
    }

    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
      this.playerOther.sprite.animations.play('crouch', 1, true, false)
      this.playerOther.sprite.body.velocity.x = 0
      canOtherHorizontalMove = false;

        // sprite.y++;
    } else if (pad1.justReleased(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
      this.playerOther.sprite.animations.play('idle', 12, true, false)
      canOtherHorizontalMove = true;
    }

    if (pad1.justPressed(Phaser.Gamepad.XBOX360_A))
    {
      canOtherHorizontalMove = false
      this.playerOther.sprite.animations.play('lowKick', 12, false, false)
      this.playerOther.sprite.events.onAnimationComplete.add(function(){
        this.playerOther.sprite.animations.play('idle', 12, true, false)
        canOtherHorizontalMove = true
      }, this);
    }

    if (pad1.justReleased(Phaser.Gamepad.XBOX360_B))
    {
      canOtherHorizontalMove = false
      this.playerOther.sprite.animations.play('topKick', 12, false, false);
      this.playerOther.sprite.events.onAnimationComplete.add(function(){
        this.playerOther.sprite.animations.play('idle', 12, true, false);
        canOtherHorizontalMove = true;
      }, this);
    }
    if (pad1.justPressed(Phaser.Gamepad.XBOX360_X))
    {
      canOtherHorizontalMove = false;
      this.playerOther.sprite.animations.play('straightPunch', 12, false, false);
      this.playerOther.sprite.events.onAnimationComplete.add(function(){
        this.playerOther.sprite.animations.play('idle', 12, true, false);
        canOtherHorizontalMove = true;
      }, this);
    }

    if (pad1.justReleased(Phaser.Gamepad.XBOX360_Y))
    {
      canOtherHorizontalMove = false;
      this.playerOther.sprite.animations.play('roundPunch', 12, false, false)
      this.playerOther.sprite.events.onAnimationComplete.add(function(){
        this.playerOther.sprite.animations.play('idle', 12, true, false)
        canOtherHorizontalMove = true;
      }, this);
    }

    // if (pad1.connected)
    // {
    //     var rightStickX = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
    //     var rightStickY = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
    //
    //     if (rightStickX)
    //     {
    //         sprite.x += rightStickX * 10;
    //     }
    //
    //     if (rightStickY)
    //     {
    //         sprite.y += rightStickY * 10;
    //     }
    // }











    this.floorCheck()
    this.inputArrayGarbageCollection(inputArray);

    // this.updateTimer();



    // this.updateStateText();

    //collision detection:
    this.physics.arcade.collide(this.player.sprite, this.playerOther.sprite);




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

    this.game.debug.body(this.player.sprite);
    this.game.debug.body(this.playerOther.sprite);

  }, ////////////// End of Render

  // updateStateText: function () {
  //   // console.log('in updateStateText()');
  //   stateText.text = this.player.currentState;
  // },


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

      // player.sprite.animations.play(mediFighter.gameStates[state].animation, 6, true, false);
      //
      //
      // switch(state){
      //   case 'moveRight':
      //     player.sprite.body.velocity.x = 80;
      //     player.sprite.scale.x = 1;
      //   break;
      //   case 'idle':
      //     player.sprite.body.velocity.x = 0;
      //     player.sprite.offsetY = 29;
      //     player.sprite.body.setSize(66, 95, 0, 0)
      //   break;
      //   case 'crouching':
      //     player.sprite.body.velocity.x = 0;
      //     player.sprite.offsetY = 29;
      //     player.sprite.body.setSize(62, 65, 0, 29)
      //     //Ignore move commands?
      //   break;
      //   case 'moveLeft':
      //     player.sprite.body.velocity.x = -80;
      //     player.sprite.scale.x = -1;
      //
      //   break;
      //   case 'jumping':
      //     player.sprite.body.velocity.y = -200;
      //   break;
      // }
    },

    inputDetect: function(keyPressValue) {
      timeOfPress = Date.now();
      pressedKeysObject = { key: keyPressValue, ts: timeOfPress };
      inputArray.push(pressedKeysObject)
      console.log(keyPressValue);
    },

    priorityCheck: function(currentState, inputArray) {
      switch (currentState) {
        case "crouching":
          this.attackMoveCheck(currentState, inputArray) || this.blockCheck(currentState, inputArray) || this.movementCheck(currentState, inputArray)
          break;
        case "jumping":
          this.attackMoveCheck(currentState, inputArray);
          break;
        case "jumpFall":
          this.attackMoveCheck(currentState, inputArray);
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
    if (this.player.currentState == "jumpFall" && this.player.sprite.y > 327) {
      // this.player.currentState = "idle"
      this.player.sprite.animations.play('idle', 6, true, false)
      canHorizontalMove = true;
    }
    if (this.playerOther.currentState == "jumpFall" && this.playerOther.sprite.y > 327) {
      // this.player.currentState = "idle"
      this.playerOther.sprite.animations.play('idle', 6, true, false)
      canOtherHorizontalMove = true;
    }
  },


  inputArrayGarbageCollection:function(inputArray) {
      var currentTime = Date.now();

      for (var i = 0; i < inputArray.length; i++) {
        inputArray[i]
        if ((currentTime - inputArray[i].ts) > 500){
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

        if (first + second + third === "punchpunchkick") {
          this.player.sprite.animations.play('straightPunch', 12, false, false)
          inputArray.splice(i, i+1)
          inputArray.splice(i+1, i+2)
          inputArray.splice(i+2, i+3)
          canHorizontalMove = false
          this.player.sprite.events.onAnimationComplete.add(function(){
            this.player.sprite.animations.play('roundPunch', 8, false, false)
            this.player.sprite.events.onAnimationComplete.add(function(){
              this.player.sprite.animations.play('topKick', 9, false, false)
              this.player.sprite.events.onAnimationComplete.add(function(){
                this.player.sprite.animations.play('idle', 10, true, false)
                canHorizontalMove = true;
              }, this);
            }, this);
              }, this);
          //TODO: DO A P+P+K
        } else if (first + second + third === "punchkickpunch") {
          console.log("DRAGONKICK");
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
    switch (currentState) {
      case "crouching":
        return false;
        break;
      case "jumping":
        return false;
        break
      case "jumpFall":
          for (var i = 0; i < inputArray.length-1; i++) {
            var first = inputArray[i].key
            var second = inputArray[i+1].key

            var timeDifference = inputArray[i+1].ts - inputArray[i].ts
            if (first === 'punch') {

              // this.player.currentState = 'attacking'
              this.player.sprite.animations.play('divePunch', 12, false, false)
              // Vertical speed
              canHorizontalMove = false
              this.player.sprite.events.onAnimationComplete.add(function(){
                this.player.sprite.animations.play('jumpFall', 1, true, false)
              }, this);

            }
            if (first === 'kick') {

              this.player.currentState = 'attacking'
              this.player.sprite.animations.play('diveKick', 10, false, false)
              // Vertical speed
              canHorizontalMove = false
              this.player.sprite.events.onAnimationComplete.add(function(){
                this.player.sprite.animations.play('jumpFall', 1, true, false)

                this.player.currentState = 'jumpFall'
              }, this);
            }
          }
        //  else {
        //   return false;
        // }
        break
      case "idle":
          for (var i = 0; i < inputArray.length-1; i++) {
            var zeroeth = inputArray[0].key
            var first = inputArray[i].key
            var second = inputArray[i+1].key

            var timeDifference = inputArray[i+1].ts - inputArray[i].ts
            if ( zeroeth === 'punch') {

              this.player.currentState = 'attacking'
              this.player.sprite.animations.play('straightPunch', 10, false, false)
              inputArray.splice(i, i+1)
              canHorizontalMove = false
              this.player.sprite.events.onAnimationComplete.add(function(){
                this.player.sprite.animations.play('idle', 8, true, false)
                this.player.currentState = 'idle'
                canHorizontalMove = true
                console.log("inside logging state "+this.player.currentState);
              }, this);

            }
            if (first === 'kick') {

              this.player.currentState = 'attacking'
              this.player.sprite.animations.play('lowKick', 8, false, false)
              // Vertical speed
              canHorizontalMove = false
              this.player.sprite.events.onAnimationComplete.add(function(){
                this.player.sprite.animations.play('idle', 8, true, false)
                this.player.currentState = 'idle'
                canHorizontalMove = true
              }, this);

            } else {
              return false
            }

          }
  }
  },

  movementCheck: function(currentState, inputArray) {

    switch (currentState) {
      case "crouching":
        for (var i = 0; i < inputArray.length-1; i++) {
            var first = inputArray[i].key
            var second = inputArray[i+1].key



            var timeDifference = inputArray[i+1].ts - inputArray[i].ts
            //Crouching TODO: has issues. Does not uncrouch on command.
            // if (inputArray[i] === "down") {
              // this.player.sprite.animations.play('crouch', 1, true, false)
              // currentState = "crouching"
              // canHorizontalMove = false
              // this.player.sprite.events.onAnimationComplete.add(function(){
              //     this.player.sprite.animations.play('idle', 8, false, false)
              //     currentState = 'idle'
              //     canHorizontalMove = true
              // }, this);
            // }

          }

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
            // if (inputArray[i].key === 'right') {
            //   this.player.sprite.body.velocity.x = 80;
            //
            // } else if ( inputArray[i].key === 'left') {
            //   this.player.sprite.body.velocity.x = - 80;
            // } else {
            //     this.player.sprite.body.velocity.x = 0;
            // }
            if (inputArray[i].key == 'up') {
              //vertJump
              this.player.currentState = 'jumping'
              this.player.sprite.animations.play('vertJump', 5, false, false)
              // Vertical speed
              this.player.sprite.body.velocity.y = -690;
              canHorizontalMove = false
              this.player.sprite.events.onAnimationComplete.add(function(){
                this.player.sprite.animations.play('vertJumpFall', 1, false, false)
                this.player.currentState = 'jumpFall'
              }, this);

            }
            //Crouching TODO: has issues. Does not uncrouch on command.
            // if (first == "down") {
            //   this.player.sprite.animations.play('crouch', 10, true, false)
            //   this.player.currentState = "crouching"
            //   canHorizontalMove = false
            // }
            if (timeDifference < 90) {
              if (first + second === "upright" || first + second === "rightup") {

                canHorizontalMove = false
                this.player.sprite.body.velocity.y = -620;
                this.player.sprite.body.velocity.x = 120;

                this.player.sprite.animations.play('forwardJump', 12, false, false)

                this.player.sprite.events.onAnimationComplete.add(function(){
                  this.player.sprite.animations.play('forwardJumpFall', 1, true, false)
                }, this);

              } else if (first + second === "upleft" || first + second === "leftup") {

                canHorizontalMove = false
                this.player.sprite.body.velocity.y = -620;
                this.player.sprite.body.velocity.x = -120;

                this.player.sprite.animations.play('backwardJump', 12, false, false)

                this.player.sprite.events.onAnimationComplete.add(function(){
                  this.player.sprite.animations.play('backwardJumpFall', 1, true, false)
              }, this);
            }

          }
        }
  }


    // if standing
    // change X/Y
    // else{ ignore. }


  },
  // updateTimer: function () {
  //   // console.log(whenDown);
  //   var minutes = Math.floor(this.game.time.time / 60000) % 60;
  //   var seconds = Math.floor(this.game.time.time / 1000) % 60;
  //   var milliseconds = Math.floor(this.game.time.time) % 100;
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

  //   if (milliseconds < 10){
  //     milliseconds = '0' + milliseconds;
  //   }
  //   if (seconds < 10) {
  //     seconds = '0' + seconds;
  //   }
  //   if (minutes < 10){
  //     minutes = '0' + minutes;
  //   }
  //   timer.text = (minutes + ':'+ seconds + ':' + milliseconds);
  // }




}// End of levelTest Prototype
