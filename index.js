const { WORLD_WIDTH, WORLD_HEIGHT, WORLD_BGCOLOR } = require('./config');
const { generatePlayer } = require('./utils/generatePlayer');
const { sendJSON } = require('./utils/wsHelper');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3004 });

const players = []

wss.on('connection', (ws) => {
    console.log('一个玩家连接进来了');

    // 生成地图
    ws.send(sendJSON('initMap', {
        WORLD_WIDTH,
        WORLD_HEIGHT,
        WORLD_BGCOLOR
    }));

    // 生成玩家并广播
    const player = generatePlayer()
    ws.player = player;
    players.push(player)
    wss.clients.forEach(client => {
        client.send(sendJSON('updatePlayers', players));
    });


    // 玩家断开并广播
    ws.on('close', () => {
        players.splice(players.findIndex(p => p.id !== ws.player.id), 1)
        wss.clients.forEach(client => {
            client.send(sendJSON('updatePlayers', players));
        });
    });


    // 接受玩家移动的消息
    ws.on('message', (msg) => {
        const { type, data } = JSON.parse(msg);
        if (type === 'move') {
            const player = ws.player
            const step = 5;
            switch (data) {
                case 'w':
                    player.y = Math.max(0, player.y - step);
                    break;
                case 'a':
                    player.x = Math.max(0, player.x - step);
                    break;
                case 's':
                    player.y = Math.min(WORLD_HEIGHT - player.height, player.y + step);
                    break;
                case 'd':
                    player.x = Math.min(WORLD_WIDTH - player.width, player.x + step);
                    break;
            }
            wss.clients.forEach(client => {
                client.send(sendJSON('updatePlayers', players));
            });
        }
    });
});