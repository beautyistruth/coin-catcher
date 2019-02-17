import Phaser from 'phaser'

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene')
  }

  preload() {
    this.load.image('sky', 'assets/sky.png')
  }

  create() {
    this.add.image(400, 300, 'sky')
  }
}
