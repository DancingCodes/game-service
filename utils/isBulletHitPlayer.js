function isBulletHitPlayer(player, bullet) {
    const halfW = player.width / 2;
    const halfH = player.height / 2;
    const px = player.x;
    const py = player.y;

    const left = px - halfW;
    const right = px + halfW;
    const top = py - halfH;
    const bottom = py + halfH;

    const bx = bullet.x;
    const by = bullet.y;
    const r = bullet.width / 2;

    const nearestX = Math.max(left, Math.min(bx, right));
    const nearestY = Math.max(top, Math.min(by, bottom));

    const dx = bx - nearestX;
    const dy = by - nearestY;

    // 勾股定理
    return dx * dx + dy * dy <= r * r;
}


module.exports = {
    isBulletHitPlayer
};
