var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game');

var mediFighter = mediFighter || {};

game.state.add('Boot', mediFighter.Boot);
game.state.add('Preloader', mediFighter.Preload);
game.state.add('MainMenu', mediFighter.MainMenu);

game.state.start('Boot');
