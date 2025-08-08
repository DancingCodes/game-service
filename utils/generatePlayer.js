let id = 1
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
export function generatePlayer() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const player = {
        id: id++,
        x: 100,
        y: 200,
        width: 50,
        height: 50,
        color,
    }
    return player
}