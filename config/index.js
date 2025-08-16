// 世界
const WORLD = {
    WIDTH: 600,
    HEIGHT: 400,
    BGCOLOR: '#000000'
}

// 玩家
const PLAYER = {
    X: 0,
    Y: 0,
    WIDTH: 30,
    HEIGHT: 30,
    DIRECTION: 'w',
    SPEED: 10
}

// 子弹
const BULLET = {
    WIDTH: 6,
    HEIGHT: 6,
    COLOR: 'red',
    SPEED: 10
}

module.exports = {
    WORLD,
    PLAYER,
    BULLET
}