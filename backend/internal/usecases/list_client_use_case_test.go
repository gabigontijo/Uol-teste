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

func TestListClient(t *testing.T) {

	t.Run("when db store returns an error", func(t *testing.T) {
		t.Parallel()
		clientRepositoryMock := &mocks.ClientRepository{}
		clientRepositoryMock.On("ListClient", mock.Anything).Return(nil, errors.New("database failed"))
		ListClientUseCase := usecases.NewListClientUseCase(clientRepositoryMock)

		output, err := ListClientUseCase.Execute(context.Background())
		require.Error(t, err)
		require.Nil(t, output)
	})
}
