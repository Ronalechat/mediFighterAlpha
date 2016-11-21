var mediFighter = mediFighter || {};

console.log("Main menu loading");

mediFighter.MainMenu = function (game) {

};

var startButton;
var style = { font: "12px Times New Roman", fill: "#fff", align: "center" };
var versionText;

mediFighter.MainMenu.prototype = {
  create: function () {
    //Align the canvas
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();

    startButton = this.add.sprite(400, 150, 'button') // , this.startGame(), this, 1, 0, 2);
    startButton.inputEnabled = true;
    startButton.input.pixelPerfectClick = true;
    startButton.events.onInputDown.add(this.clicked, this);
    startButton.anchor.setTo(0.5, 0.5);

    console.log("Menu loaded")
    this.stage.backgroundColor = '#000';

    versionText = this.add.text(680, 340, "MediFighter 0.01a", style);
    versionText.anchor.set(0.5, 0.5);
    versionText.fixedToCamera = true;
  },

  clicked: function (pointer) {
    console.log("I am being called");
  }

};
