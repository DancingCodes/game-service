const { WORLD_WIDTH, WORLD_HEIGHT } = require('../config');
let id = 1
function generatePlayer() {
    const width = 30;
    const height = 30;
    const x = Math.floor(Math.random() * (WORLD_WIDTH - width));
    const y = Math.floor(Math.random() * (WORLD_HEIGHT - height));

    const player = {
        id: id++,
        x,
        y,
        width,
        height,
    }
    return player
}

module.exports = {
    generatePlayer
}