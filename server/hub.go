package main

import (
	"log"
)

type Hub struct {
	Users      map[string]*User
	Messages   chan *Messages
	Register   chan *User
	UnRegister chan *User
}

func NewHub() *Hub {
	return &Hub{
		Users:      make(map[string]*User),
		Messages:   make(chan *Messages),
		Register:   make(chan *User),
		UnRegister: make(chan *User),
	}
}

func (h *Hub) Start() {
	for {
		select {
		case message := <-h.Messages:
			h.broadcast(message)
		case user := <-h.Register:
			h.addUser(user)
		case user := <-h.UnRegister:
			h.deleteUser(user)
		}
	}
}

func (h *Hub) addUser(user *User) {
	if _, ok := h.Users[user.Name]; !ok {
		h.Users[user.Name] = user
		log.Println("add new user: " + user.Name)
	}
}

func (h *Hub) deleteUser(user *User) {
	delete(h.Users, user.Name)
	log.Println("delete user: " + user.Name)
}

func (h *Hub) broadcast(message *Messages) {
	for _, user := range h.Users {
		user.Write(message)
	}
}
