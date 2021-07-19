package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Message struct {
	Name string `json:"name"`
	Data string `json:"data"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	defer conn.Close()

	if err != nil {
		fmt.Println("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		msg := &Message{}
		err = conn.ReadJSON(msg)
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println(msg)

		err = conn.WriteJSON(msg)
		if err != nil {
			log.Println(err)
			return
		}
	}
}

func main() {
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	router.GET("/ws", func(c *gin.Context) {
		handler(c.Writer, c.Request)
	})

	router.Run(":3030")
}
