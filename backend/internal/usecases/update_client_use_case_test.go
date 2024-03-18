package usecases_test

import (
	"context"
	"errors"
	"testing"

	"github.com/gabigontijo/Uol-teste/internal/domain/entities"
	"github.com/gabigontijo/Uol-teste/internal/usecases"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/input"
	"github.com/gabigontijo/Uol-teste/mocks"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestUpdateClient(t *testing.T) {

	t.Run("when the name is empty should return an error", func(t *testing.T) {
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		updateClientInput := &input.UpdateClientInput{
			Name:   "",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when the cpf is invalid should return an error", func(t *testing.T) {
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		updateClientInput := &input.UpdateClientInput{
			Name:   "cliente updated",
			CPF:    "000.000.010-00",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when the email is empty should return an error", func(t *testing.T) {
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		updateClientInput := &input.UpdateClientInput{
			Name:   "cliente updated",
			CPF:    "379.662.813-37",
			Email:  "",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when the phone is empty should return an error", func(t *testing.T) {
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		updateClientInput := &input.UpdateClientInput{
			Name:   "cliente updated",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when exist client with the same cpf should return an error", func(t *testing.T) {
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryMock.On("FindClientByCPF", mock.Anything, mock.Anything).Return(nil, errors.New("cpf ja existe"))
		clientRepositoryMock.On("FindClientByEmail", mock.Anything, mock.Anything).Return(nil, nil)
		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		clientRepositoryMock.On("FindClientByID", mock.Anything, mock.Anything, mock.Anything).
			Return(&entities.Client{ID: 1}, nil)

		updateClientInput := &input.UpdateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when exist client with the same email should return an error", func(t *testing.T) {
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(nil)
		clientRepositoryMock.On("FindClientByCPF", mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryMock.On("FindClientByEmail", mock.Anything, mock.Anything).Return(nil, errors.New("cpf ja existe"))
		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		clientRepositoryMock.On("FindClientByID", mock.Anything, mock.Anything, mock.Anything).
			Return(&entities.Client{ID: 1}, nil)

		updateClientInput := &input.UpdateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when db store returns an error", func(t *testing.T) {
		entity := &entities.Client{
			ID:     1,
			Name:   "cliente teste",
			Cpf:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: "1",
		}
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("UpdateClient", mock.Anything, mock.Anything).Return(errors.New("database failed"))
		clientRepositoryMock.On("FindClientByID", mock.Anything, mock.Anything).Return(entity, nil)
		clientRepositoryMock.On("FindClientByCPF", mock.Anything, mock.Anything).Return(nil, nil)
		clientRepositoryMock.On("FindClientByEmail", mock.Anything, mock.Anything).Return(nil, nil)

		updateClientUseCase := usecases.NewUpdateClientUseCase(clientRepositoryMock)

		updateClientInput := &input.UpdateClientInput{
			Name:   "cliente teste",
			CPF:    "379.662.813-37",
			Email:  "teste@gmail.com",
			Phone:  "(11) 99645-9988",
			Status: 1,
		}

		output, err := updateClientUseCase.Execute(context.Background(), updateClientInput)
		require.Error(t, err)
		require.Nil(t, output)
	})
}
