var mediFighter = mediFighter || {};

mediFighter.Boot = function (game) {}

mediFighter.Boot.prototype = {
  // preload: function () {
  //   this.load.stage.
  // }
  create: function() {
    //Set canvas position
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();
    console.log('Boot create');
    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
      this.scale.pageAlignHorizontally = true;
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 568;
      this.scale.minHeight = 600;
      this.scale.maxWidth = 2048;
      this.scale.maxHeight = 1536;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    }
    this.state.start('Preloader');
  }
}; // End of boot prototype
