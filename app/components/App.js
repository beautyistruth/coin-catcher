import React from 'react'
import Phaser from 'phaser'
import config from './src/config'

import BgScene from './src/scenes/bg-scene'
import FgScene from './src/scenes/fg-scene'
import MainScene from './src/scenes/main-scene'

class Game extends Phaser.Game {
  constructor() {
    super(config)
    this.scene.add('BgScene', BgScene)
    this.scene.add('FgScene', FgScene)
    this.scene.add('MainScene', MainScene)
    this.scene.start('MainScene')
  }
}

const startGame = () => {
  window.game = new Game()
}

const App = () => {
  startGame()
  return (
    <div>
      <h3>Coin Catcher</h3>
      <form>
        <label>
          <input type="text" name="nickname" />
        </label>
        <input type="submit" value="Play Game" />
      </form>
    </div>
  )
}

export default App
