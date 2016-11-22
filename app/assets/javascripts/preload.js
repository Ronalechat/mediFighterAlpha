var mediFighter = mediFighter || {};

mediFighter.Preload = function (game) {
  this.ready = false;
  console.log("Preload loading");
};

this.text;

mediFighter.Preload.prototype = {
  preload: function () {
    this.load.spritesheet('button', 'assets/start_button-05.png', 193, 81);
    this.load.spritesheet('ryu', 'assets/RyuSFA3.gif', 78, 110, 24);
    this.load.spritesheet('stage', 'assets/villageOfTwilight.gif', 800, 336);
    this.load.atlas("ryuIntro", 'assets/RyuSFA3.gif', 'assets/ryu.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlasJSONArray("ryuAnims", 'assets/RyuSFA3.gif', "", mediFighter.stateAnimation);
    // this.load.atlasJSONArray("ryuIdle", 'assets/RyuSFA3.gif', "", mediFighter.stateAnimation.idle);
    this.load.onLoadComplete.add(this.loadComplete, this);
  },
  create: function () {
    //Set the canvas position
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();
    // this.stage.backgroundColor = '#000';
    console.log('Preloader create');
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);
    this.text = this.add.text(game.world.centerX, game.world.centerY, "Called");
    this.load.start();



  },
  loadStart: function () {
    text.text= "Loading..."
  },

  fileComplete: function(progress, success) {

	text.text = ("File Complete: " + progress + "%");

},



  update: function () {
    console.log('Preloader update', this.ready)
    if (this.ready === true) {
      this.state.add('LevelTest', mediFighter.LevelTest)
      this.state.start('MainMenu')
    }
  },

  loadComplete: function () {
    this.ready = true;
  }
}
