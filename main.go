package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	args := os.Args[1:]

	if len(args) != 1 {
		fmt.Printf("Usage: ./ben <port>\nStart the Talking Ben web app on <port>\n")
		os.Exit(1)
	}

	app := http.FileServer(http.Dir("./app"))
	http.Handle("/", app)

	fmt.Printf("Talking Ben is listening on `localhost:%s`\n", args[0])
	err := http.ListenAndServe(":" + args[0], nil)
	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}
}