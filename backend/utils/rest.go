package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"
)

const (
	ErrTypeError = "ERROR"
)

type ErrorModel struct {
	Message string `json:"message"`
	Type    string `json:"type"`
}

func CommonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func WriteErrModel(w http.ResponseWriter, statusCode int, errModel *ErrorModel) {
	jsonStr, err := json.Marshal(errModel)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(statusCode)
	fmt.Fprint(w, string(jsonStr))
}

func NewErrorResponse(msg string) *ErrorModel {
	return &ErrorModel{
		Message: msg,
		Type:    ErrTypeError,
	}
}

func RetrieveParam(r *http.Request, idParam string) (string, error) {
	encodedID := mux.Vars(r)[idParam]
	decodedID, err := url.QueryUnescape(encodedID)
	if err != nil {
		return "", err
	}
	return decodedID, nil
}

func ValidJSON(p interface{}) io.Reader {
	data, err := json.Marshal(p)
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	return bytes.NewReader(data)
}
