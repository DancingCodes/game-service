const { WORLD, PLAYER } = require('../config');
let id = 1
function generatePlayer() {
    const player = {
        id: id++,
        x: Math.floor(PLAYER.WIDTH / 2 + Math.random() * (WORLD.WIDTH - PLAYER.WIDTH)),
        y: Math.floor(PLAYER.HEIGHT / 2 + Math.random() * (WORLD.HEIGHT - PLAYER.HEIGHT)),
        width: PLAYER.WIDTH,
        height: PLAYER.HEIGHT,
        direction: PLAYER.DIRECTION,
        speed: PLAYER.SPEED,
        isAlive: true
    }
    return player
}

module.exports = {
    generatePlayer
}