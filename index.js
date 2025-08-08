const { generatePlayer } = require('./utils/generatePlayer');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3004 });

const playerList = []

wss.on('connection', (ws) => {
    console.log('一个玩家连接进来了');

    // 生成一个玩家信息，并发送给当前玩家
    const player = generatePlayer()
    playerList.push(player)
    ws.send({
        type: 'playerInfo',
        data: player
    });
    // 接受玩家移动的消息
    ws.on('message', (msg) => {
        const { type, data } = JSON.parse(msg);
        if (type === 'move') {
            const play = playerList.find(i => i.id === data.id)
            play.x = data.x
            play.y = data.y
            // 发送给玩家
            wss.clients.forEach(client => {
                client.send({ type: 'updatePlayers', data: playerList });
            });
        }
    });
});
