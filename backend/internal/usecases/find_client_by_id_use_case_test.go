package usecases_test

import (
	"context"
	"errors"
	"testing"

	"github.com/gabigontijo/Uol-teste/internal/usecases"
	"github.com/gabigontijo/Uol-teste/mocks"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestFindClientByID(t *testing.T) {

	t.Run("when id is empty should return an error", func(t *testing.T) {
		t.Parallel()
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("FindClientByID", mock.Anything, mock.Anything).Return(nil, errors.New("failed to find client"))
		findClientUseCase := usecases.NewFindClientByIDUseCase(clientRepositoryMock)

		output, err := findClientUseCase.Execute(context.Background(), 0)
		require.Error(t, err)
		require.Nil(t, output)
	})

	t.Run("when db store returns an error", func(t *testing.T) {
		t.Parallel()
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("FindClientByID", mock.Anything, mock.Anything).Return(nil, errors.New("database failed"))
		findClientUseCase := usecases.NewFindClientByIDUseCase(clientRepositoryMock)

		output, err := findClientUseCase.Execute(context.Background(), 987654321)
		require.Error(t, err)
		require.Nil(t, output)
	})
}
