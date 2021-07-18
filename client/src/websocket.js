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
            console.log("meesage1: " + message.data)
        }
    }

    sendMessage(message) {
        console.log("send message: " + message)
        this.websocket.send(message)
    }
}

export default websocketConnect;