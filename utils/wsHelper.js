function sendJSON(type, data) {
    return JSON.stringify({ type, data })
}

function parseJSON(msg) {
    return JSON.parse(msg);
}

module.exports = {
    sendJSON,
    parseJSON
};
