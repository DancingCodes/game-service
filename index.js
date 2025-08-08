const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3004 });

function generatePlayer() {
    const player = {
        x: 100,
        y: 200,
        width: 50,
        height: 50,
        color: 'red'
    }
    return player
}

wss.on('connection', (ws) => {
    console.log('一个玩家连接进来了');
   // 生成一个玩家信息
    const player = generatePlayer();
    // 给当前玩家发自己的信息
    ws.send(JSON.stringify({
        type: 'playerInfo',
        data: player
    }));

    ws.on('message', (msg) => {
        // 广播给其他玩家
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });
});
