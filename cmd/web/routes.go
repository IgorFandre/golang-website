package main

import "net/http"

func (app *application) routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", app.handleSimpleRequest("main.page.tmpl", "/"))
	mux.HandleFunc("/about_us", app.handleSimpleRequest("about_us.page.tmpl", "/about_us"))
	mux.HandleFunc("/delivery", app.handleSimpleRequest("delivery.page.tmpl", "/delivery"))
	mux.HandleFunc("/goods_and_services", app.handleSimpleRequest("goods_and_services.page.tmpl", "/goods_and_services"))
	mux.HandleFunc("/send/request", app.handleSendRequest)

	fileServer := http.FileServer(filteredFileSystem{http.Dir("./ui/static/")})
	mux.Handle("/static", http.NotFoundHandler())
	mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	return mux
}
