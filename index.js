const { WORLD } = require('./config');
const { generatePlayer } = require('./utils/generatePlayer');
const { generateBullet } = require('./utils/generateBullet');
const { isBulletHitPlayer } = require('./utils/isBulletHitPlayer');
const { sendJSON } = require('./utils/wsHelper');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3004 });


const game = {
    players: [],
    bullets: []
}

setInterval(() => {
    for (let i = game.bullets.length - 1; i >= 0; i--) {
        const b = game.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 0 || b.x > WORLD.WIDTH || b.y < 0 || b.y > WORLD.HEIGHT) {
            game.bullets.splice(i, 1);
            continue;
        }


        for (let j = 0; j < game.players.length; j++) {
            const p = game.players[j];

            if (isBulletHitPlayer(p, b)) {
                p.isAlive = false
                wss.clients.forEach(client => {
                    client.send(sendJSON('message', ` ${p.id} 完蛋了！`));
                });
            }
        }

    }

    wss.clients.forEach(client => {
        client.send(sendJSON('renderGame', game));
    });
}, 16);

wss.on('connection', (ws) => {
    console.log('一个玩家进来了');

    // 生成地图
    ws.send(sendJSON('initMap', WORLD));

    // 生成玩家并广播
    const player = generatePlayer()


    ws.player = player;
    game.players.push(player)
    wss.clients.forEach(client => {
        client.send(sendJSON('message', ` ${player.id} 进来了！`));
    });


    // 玩家断开并广播
    ws.on('close', () => {
        console.log('一个玩家离开了');
        game.players.splice(game.players.findIndex(p => p.id === ws.player.id), 1)
        wss.clients.forEach(client => {
            client.send(sendJSON('message', ` ${ws.player.id} 离开了！`));
        });
    });


    // 接受玩家移动的消息
    ws.on('message', (msg) => {
        const { type, data } = JSON.parse(msg);
        if (type === 'move') {
            const player = ws.player

            if (!player.isAlive) {
                return
            }

            switch (data) {
                case 'w':
                    player.y = Math.max(0, player.y - player.speed);
                    player.direction = data
                    break;
                case 'a':
                    player.x = Math.max(0, player.x - player.speed);
                    player.direction = data
                    break;
                case 's':
                    player.y = Math.min(WORLD.HEIGHT - player.height, player.y + player.speed);
                    player.direction = data
                    break;
                case 'd':
                    player.x = Math.min(WORLD.WIDTH - player.width, player.x + player.speed);
                    player.direction = data
                    break;
            }
        }

        if (type === 'fire') {
            const player = ws.player
            const bullet = generateBullet(ws.player.id, player.x, player.y, player.width, player.height, player.direction)
            game.bullets.push(bullet)
        }
    });
});