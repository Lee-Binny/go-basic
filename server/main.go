package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Chat struct {
	Name    string `json:"name"`
	Message string `json:"message"`
	Time    string `json:"time"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	defer func() {
		log.Println("disconnect!")
		conn.Close()
	}()

	if err != nil {
		log.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		chat := &Chat{}
		err = conn.ReadJSON(chat)
		if err != nil {
			log.Println(err)
			return
		}

		chat.Time = time.Now().Format("2006-01-02 15:04:05")
		log.Println(chat.Name + ": " + chat.Message + " " + chat.Time)
		err = conn.WriteJSON(chat)
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
