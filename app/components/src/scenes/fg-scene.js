import Phaser from 'phaser'
import axios from 'axios'

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene')
    this.cursors = {}
    this.platforms = {}
    this.rocket = {}
    this.player = {}
    this.bombs = {}
    this.clouds = {}
    this.score = 0
    this.scoreText = 'score: 0'
    this.enabledRocket = false
  }

  preload() {
    this.load.image('rocket', 'assets/rocket.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('coin', 'assets/coinGold.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('cloud', 'assets/cloud.png')
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  create() {
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    }).setScrollFactor(0);
    this.cameras.main.setBounds(0, 0, 800, 1200)
    this.physics.world.setBounds(0, 0, 800, 1200)
    this.cursors = this.input.keyboard.createCursorKeys()

    //CREATE PLATFORMS
    this.platforms = this.physics.add.staticGroup()
    this.platforms
      .create(400, 1200, 'ground')
      .setScale(2)
      .refreshBody()

    this.platforms.create(100, 1050, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(50, 800, 'ground')
    this.platforms.create(750, 220, 'ground')
    this.platforms.create(750, 600, 'ground')

    //CREATE ROCKET
    this.rocket = this.physics.add.group()
    this.createRocket(500, 1100)
    this.createRocket(
      Phaser.Math.Between(100, 800),
      Phaser.Math.Between(100, 1100)
    )

    //CREATE PLAYER
    this.player = this.physics.add.sprite(700, 1100, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.createPlayerAnims()

    //CREATE COINS
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 100,
      setXY: {x: 12, y: 0, stepX: 70}
    })
    this.coins.children.iterate(coin => {
      coin.setBounce(1)
      coin.setVelocity(Phaser.Math.Between(100, 100), 20)
      coin.allowGravity = false
      coin.setCollideWorldBounds(true)
    })

    //CREATE CLOUDS
    this.clouds = this.physics.add.group()
    this.createCloud(500, 750)
    this.createCloud(1000, 900)
    this.createCloud(1000, 500)
    this.createCloud(200, 300)

    //CREATE BOMBS
    this.bombs = this.physics.add.group()
    this.createBomb()

    //SET COLLISIONS
    this.setCollision()

    //CAMERA FOLLOWS PLAYER
    this.cameras.main.startFollow(this.player, true, 0.05, 0.005)
  }

  update() {
    //REGULAR MOVEMENT
    if (!this.enabledRocket) {
      this.canWalk()
    }

    //JUMP
    if (this.cursors.space.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }

    //FLYING
    if (this.enabledRocket) {
      this.canFly()
    }
  }

  setCollision() {
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.coins, this.platforms)
    this.physics.add.collider(this.rocket, this.platforms)
    this.physics.add.collider(this.bombs, this.platforms)
    this.physics.add.collider(
      this.player,
      this.clouds,
      this.rideCloud,
      null,
      this
    )
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this)

    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    )
    this.physics.add.overlap(
      this.player,
      this.rocket,
      this.startRocket,
      null,
      this
    )
  }

  //CREATE ASSETS
  createBomb() {
    const x =
      this.player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400)
    let bomb = this.bombs.create(x, 16, 'bomb')
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    bomb.allowGravity = false
  }

  createRocket(x, y) {
    let rocket = this.rocket.create(x, y, 'rocket').setScale(0.01)
    rocket.setCollideWorldBounds(true)
  }

  createCloud(x, y) {
    let cloud = this.clouds.create(x, y, 'cloud')
    cloud.setCollideWorldBounds(true)
    cloud.setBounceX(0.8)
    cloud.body.allowGravity = false
    cloud.body.immovable = true
    cloud.body.velocity.x = Phaser.Math.Between(50, 100)
    cloud.setScale(0.5)
  }

  //ANIMS
  createPlayerAnims() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    })
  }

  //PLAYER MOVEMENT
  canWalk() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }
  }

  canFly() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160)
    } else {
      this.player.setVelocityX(0)
      this.player.setVelocityY(0)
    }
  }

  //GAME UTILITIES
  collectCoin(player, coin) {
    coin.disableBody(true, true)
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
    if (this.coins.countActive(true) === 0) {
      this.coins.children.iterate(child => {
        child.enableBody(true, child.x, 0, true, true)
      })
      this.createBomb()
      this.createRocket(
        Phaser.Math.Between(100, 800),
        Phaser.Math.Between(100, 1100)
      )
    }
  }

  startRocket(player, rocket) {
    setTimeout(() => {
      this.endRocket(player)
    }, 10000)
    this.enabledRocket = true
    rocket.disableBody(true, true)
    player.setTint(0xffff00)
    player.body.allowGravity = false
    player.setBounce(0)
    player.anims.play('turn')
  }

  endRocket(player) {
    this.enabledRocket = false
    player.clearTint()
    player.body.allowGravity = true
    player.setBounce(0.2)
  }

  rideCloud(player, cloud) {
    if (
      cloud.body.moves &&
      cloud.body.touching.up &&
      player.body.touching.down
    ) {
      player.body.allowGravity = true
      player.x = cloud.x
    }
  }
  sendScore() {
    let location = window.location.href
    let nickname = location.slice(location.lastIndexOf('/') + 1)
    axios.post('./api/scores', {
      nickname: nickname,
      score: this.score
    })
  }

  async hitBomb() {
    this.physics.pause()
    this.player.setTint(0xff0000)
    this.player.anims.play('turn')
    this.sendScore()
    await setTimeout(() => {
      this.player.disableBody(true, true)
    }, 5000)
    this.scoreText.setText(`Game Over. Score: ${this.score}. Click to restart.`)
    document.getElementsByTagName('canvas')[0].addEventListener('click', () => {window.location = './'})
  }
}
