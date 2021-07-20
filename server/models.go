package main

import "github.com/gorilla/websocket"

type User struct {
	Name string
	Conn *websocket.Conn
}

type Messages struct {
	Name    string `json:"name"`
	Message string `json:"message"`
	Time    string `json:"time"`
}
