const { BULLET } = require('../config');

function generateBullet(ownerId, playerX, playerY, playerWidth, playerHeight, playerDirection) {
    let [x, y, vx, vy] = [0, 0, 0, 0]

    switch (playerDirection) {
        case 'w':
            x = playerX;
            y = playerY - playerHeight / 2;
            vy = -BULLET.SPEED;
            break;
        case 's':
            x = playerX;
            y = playerY + playerHeight / 2;
            vy = BULLET.SPEED;
            break;
        case 'a':
            x = playerX - playerWidth / 2;
            y = playerY;
            vx = -BULLET.SPEED;
            break;
        case 'd':
            x = playerX + playerWidth / 2;
            y = playerY;
            vx = BULLET.SPEED;
            break;
    }

    // 子弹对象
    const bullet = {
        ownerId,
        x,
        y,
        vx,
        vy,
        width: BULLET.WIDTH,
        height: BULLET.HEIGHT,
        color: BULLET.COLOR,
    };

    return bullet;
}

module.exports = {
    generateBullet
};
