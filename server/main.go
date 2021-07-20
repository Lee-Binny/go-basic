package main

import (
	"fmt"
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

type User struct {
	Name string
	Conn *websocket.Conn
}

type Messages struct {
	Name    string `json:"name"`
	Message string `json:"message"`
	Time    string `json:"time"`
}

type Hub struct {
	Users      map[string]*User
	Messages   chan *Messages
	Register   chan *User
	UnRegister chan *User
}

func newHub() *Hub {
	return &Hub{
		Users:      make(map[string]*User),
		Messages:   make(chan *Messages),
		Register:   make(chan *User),
		UnRegister: make(chan *User),
	}
}

func (h *Hub) AddUser(user *User) {
	if _, ok := h.Users[user.Name]; !ok {
		h.Users[user.Name] = user
	}
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

	fmt.Println(r.Form)

	for {
		msg := &Messages{}
		err = conn.ReadJSON(msg)
		if err != nil {
			log.Println(err)
			return
		}

		msg.Time = time.Now().Format("2006-01-02 15:04:05")
		log.Println(msg.Name + ": " + msg.Message + " " + msg.Time)
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
