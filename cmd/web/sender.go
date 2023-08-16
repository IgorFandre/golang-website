package main

import (
	"net/smtp"
)

const (
	USERNAME = "..."          // set your email bot name (i used mail.ru)
	PASSWORD = "..."          // set its password (mail.ru also allows you to create password for internal apps)
	HOST     = "smtp.mail.ru" // host for mail.ru
)

type sender struct {
	Name    string `json:"name"`
	Contact string `json:"contact"`
	Message string `json:"message"`
}

func (app *application) sendEmail(mailTo string, snd *sender) {
	from := USERNAME
	password := PASSWORD

	to := []string{mailTo}

	// smtp server configuration
	smtpHost := HOST
	smtpPort := "587" // do not change, working port

	body := "<strong>Сообщение:</strong> " + snd.Message + "<br/>" +
		"<strong>Ответить на данный контакт:</strong> " + snd.Contact

	message := []byte("To: " + to[0] +
		"\r\nContent-Type: text/html" +
		"\r\nSubject:" + "Заявка от " + snd.Name +
		"\r\n\r\n" + body)

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		app.errorLog.Println(err)
	}
	return
}
