package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func main() {
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	router.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	router.Run(":3030")
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		fmt.Print(msg)
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}
