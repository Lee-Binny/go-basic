package main

import (
	"log"
	"time"
)

type Messages struct {
	Name    string `json:"name"`
	Message string `json:"message"`
	Time    string `json:"time"`
}

func NewMessages(name, message string) *Messages {
	log.Println("new message!")
	return &Messages{
		Name:    name,
		Message: message,
		Time:    time.Now().Format("2006-01-02 15:04:05"),
	}
}
