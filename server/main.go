package main

import (
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

func handler(w http.ResponseWriter, r *http.Request, hub *Hub) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	defer func() {
		log.Println("disconnect!")
		conn.Close()
	}()

	if err != nil {
		log.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	user := &User{Name: r.URL.Query().Get("name"), Conn: conn, Hub: hub}
	user.Hub.Register <- user

	user.Read()
}

func main() {
	router := gin.Default()

	hub := NewHub()
	go hub.Start()

	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	router.GET("/ws", func(c *gin.Context) {
		handler(c.Writer, c.Request, hub)
	})

	router.Run(":3030")
}
