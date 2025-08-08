const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3004 });

wss.on('connection', (ws) => {
    console.log('一个玩家连接进来了');

    ws.on('message', (msg) => {
        // 广播给其他玩家
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        });
    });
});
