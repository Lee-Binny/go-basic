package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type User struct {
	Name string
	Conn *websocket.Conn
	Hub  *Hub
}

func (u *User) Read() {
	for {
		msg := &Messages{}
		err := u.Conn.ReadJSON(msg)
		if err != nil {
			log.Println(err)
			return
		}
		u.Hub.Messages <- NewMessages(msg.Name, msg.Message)
	}
	u.Hub.UnRegister <- u
}

func (u *User) Write(message *Messages) {
	log.Println(message.Name + ": " + message.Message + " " + message.Time)
	err := u.Conn.WriteJSON(message)
	if err != nil {
		log.Println(err)
		return
	}
}
