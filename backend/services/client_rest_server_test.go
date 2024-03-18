package services_test

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gabigontijo/Uol-teste/config"
	"github.com/gabigontijo/Uol-teste/internal/usecases"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/input"
	"github.com/gabigontijo/Uol-teste/mocks"
	"github.com/gabigontijo/Uol-teste/services"
	"github.com/gabigontijo/Uol-teste/utils"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestServerCreateClient(t *testing.T) {
	w := httptest.NewRecorder()
	config.LoadServerEnvironmentVars()

	t.Run("when the name is empty should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("CreateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		createClientUseCase := usecases.NewCreateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(createClientUseCase, nil, nil, nil)
		req := httptest.NewRequest("POST", "/clients", utils.ValidJSON(input.CreateClientInput{
			Name:   "",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusNotFound, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)

	})

	t.Run("when the email is empty should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("CreateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		createClientUseCase := usecases.NewCreateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(createClientUseCase, nil, nil, nil)
		req := httptest.NewRequest("POST", "/clients", utils.ValidJSON(input.CreateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusNotFound, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)

	})

	t.Run("when the phone is empty should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("CreateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		createClientUseCase := usecases.NewCreateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(createClientUseCase, nil, nil, nil)
		req := httptest.NewRequest("POST", "/clients", utils.ValidJSON(input.CreateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "",
			Status: 1,
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusNotFound, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)

	})

	t.Run("when the body is null should return an error", func(t *testing.T) {
		w := httptest.NewRecorder()
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("CreateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		createClientUseCase := usecases.NewCreateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(createClientUseCase, nil, nil, nil)
		req := httptest.NewRequest("POST", "/clients", nil)
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusBadRequest, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)
	})

	t.Run("when the body is invalid should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("CreateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		createClientUseCase := usecases.NewCreateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(createClientUseCase, nil, nil, nil)
		req := httptest.NewRequest("POST", "/clients", utils.ValidJSON(utils.ErrorModel{
			Message: "wrong body",
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusNotFound, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)
	})

	t.Run("when db fail should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("CreateClient", mock.Anything, mock.Anything).Return(errors.New("error"))
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		createClientUseCase := usecases.NewCreateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(createClientUseCase, nil, nil, nil)
		req := httptest.NewRequest("POST", "/clients", utils.ValidJSON(input.CreateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusNotFound, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)
	})
}

func TestServerUpdateClient(t *testing.T) {
	w := httptest.NewRecorder()
	config.LoadServerEnvironmentVars()

	t.Run("when the id is empty should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(nil, nil, nil, updateClientUseCase)
		req := httptest.NewRequest("PUT", "/clients/null", utils.ValidJSON(input.UpdateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusBadRequest, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)
	})

	t.Run("when the body is invalid should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryErrorMock.On("FindClientByCPF", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryErrorMock.On("FindClientByEmail", mock.Anything, mock.Anything, mock.Anything).Return(nil, nil)

		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(nil, nil, nil, updateClientUseCase)
		req := httptest.NewRequest("PUT", "/clients/1", utils.ValidJSON(utils.ErrorModel{
			Message: "wrong body",
		}))
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusBadRequest, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)
	})
}

func TestServerGetClientByID(t *testing.T) {
	w := httptest.NewRecorder()
	config.LoadServerEnvironmentVars()

	t.Run("when the id is null should return an error", func(t *testing.T) {
		clientRepositoryErrorMock := &mocks.ClientRepository{}
		clientRepositoryErrorMock.On("FindClientByID", mock.Anything, mock.Anything).Return(nil, nil)

		findClientByBrandUseCase := usecases.NewFindClientByIDUseCase(clientRepositoryErrorMock)
		server := services.NewHTTPRouterClient(nil, findClientByBrandUseCase, nil, nil)
		req := httptest.NewRequest("GET", "/clients/null", nil)
		server.ServeHTTP(w, req)

		data, err := io.ReadAll(w.Body)
		assert.Nil(t, err)

		response := w.Result()
		defer response.Body.Close()
		assert.Equal(t, http.StatusBadRequest, response.StatusCode)
		model := utils.ErrorModel{}
		err = json.Unmarshal(data, &model)
		assert.Nil(t, err)
		assert.NotNil(t, model.Message)
	})
}
