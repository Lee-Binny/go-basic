class websocketConnect {
    constructor() {
        this.websocket = new WebSocket("ws://" + window.location.host + "/ws")
        this.connect()
    }

    connect() {
        this.websocket.onopen = (e) => {
            console.log("onopen", arguments)
        }

        this.websocket.onclose = (e) => {
            console.log("onclose", arguments)
        }

        this.websocket.onmessage = (message) => {
            console.log("meesage: " + message.data)
        }
    }

    sendMessage(name, message) {
        this.websocket.send(JSON.stringify({
            name: name,
            data: message
        }))
    }
}

export default websocketConnect;