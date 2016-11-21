var mediFighter = mediFighter || {};

mediFighter.LevelTest = function (game) {};

var player
var playerObj = {};

mediFighter.LevelTest.prototype = {
  create: function () {
    // Canvas align to center
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();

    //Background and boundaries.
    this.add.tileSprite(0, 32, 800, 336, 'stage');
    this.world.setBounds(0, 0, 800, 336);

    // player sprite
    var ryu = this.add.sprite(100, 180, 'ryuReady');
    ryu.animations.add('tie', null, 6, true);
    ryu.animations.play('tie', true, true);
    ryu.anchor.setTo(0.5, 0);

    ryu.events.onAnimationComplete.add(function(){
      console.log("complete")
    }, this);


    // Set up controls
    cursors = this.input.keyboard.createCursorKeys();
      q = this.input.keyboard.addKey(Phaser.Keyboard.Q);
      w = this.input.keyboard.addKey(Phaser.Keyboard.W);
      a = this.input.keyboard.addKey(Phaser.Keyboard.A);
      s = this.input.keyboard.addKey(Phaser.Keyboard.S);




  }, ////////////// End of Create

  update: function () {

    if (cursors.down.isDown) {
      currentState = 'crouched'
    } else {
      currentState = "standing"
    }
    
    if (cursors.left.isDown) {
      currentState = 'movingBackward'
    } else if (cursors.right.isDown) {
      currentState = 'movingForward'
    } else {
      currentState = "standing"
    }

  }, ////////////// End of Update

  render: function () {

  } ////////////// End of Render

}// End of levelTest Prototype
