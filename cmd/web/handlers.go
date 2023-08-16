package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

func (app *application) handleSimpleRequest(fileName string, path string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != path {
			app.notFound(w)
			return
		}
		files := []string{
			"./ui/html/" + fileName,
			"./ui/html/base.layout.tmpl",
			"./ui/html/partial/footer.partial.tmpl",
			"./ui/html/partial/button.partial.tmpl",
			"./ui/html/partial/email_form.partial.tmpl",
			"./ui/html/partial/phone_form.partial.tmpl",
		}

		ts, err := template.ParseFiles(files...)
		if err != nil {
			app.serverError(w, err)
			return
		}

		err = ts.Execute(w, nil)
		if err != nil {
			app.serverError(w, err)
		}
	}
}

func (app *application) handleSendRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)
		return
	}

	var resp sender

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		app.serverError(w, err)
		return
	} else if err = json.Unmarshal(body, &resp); err != nil {
		app.serverError(w, err)
		return
	}
	app.sendEmail("...", &resp) // write a work email address where the bot will send emails
	fmt.Fprint(w, "Заявка принята. С вами свяжутся в ближайшее время!")
}
