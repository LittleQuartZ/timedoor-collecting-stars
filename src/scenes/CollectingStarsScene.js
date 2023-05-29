import Phaser from "phaser";

class CollectingStarsScene extends Phaser.Scene {
  constructor() {
    super("collecting-stars");
  }
  init() {
    this.platforms = undefined;
    this.player = undefined;
    this.stars = undefined;
  }
  preload() {
    this.load.image("sky", "images/sky.png");
    this.load.image("tanah", "images/platform.png");
    this.load.image("bintang", "images/star.png");
    this.load.image("bom", "images/bomb.png");

    this.load.spritesheet("pemain", "images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    this.add.image(400, 300, "sky");

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(600, 400, "tanah");
    this.platforms.create(50, 250, "tanah");
    this.platforms.create(300, 120, "tanah");

    this.platforms.create(400, 568, "tanah").setScale(2).refreshBody();

    this.player = this.physics.add.sprite(100, 450, "pemain");
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.stars = this.physics.add.group({
      key: "bintang",
      repeat: 10,
      setXY: {
        x: 50,
        y: 0,
        stepX: 70,
      },
    });
    this.physics.add.collider(this.stars, this.platforms);

    // @ts-ignore
    this.stars.children.iterate(function (child) {
      // @ts-ignore
      child.setBounceY(0.5);
    });
  }
  update() {}
}

export default CollectingStarsScene;
