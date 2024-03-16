package usecases

import (
	"context"
	"fmt"

	"github.com/gabigontijo/uol-teste-be/internal/domain/entities"
	"github.com/gabigontijo/uol-teste-be/internal/repositories"
	"github.com/gabigontijo/uol-teste-be/internal/usecases/contracts"
	"github.com/gabigontijo/uol-teste-be/internal/usecases/ports/output"
)

type listClientUseCase struct {
	clientRepository repositories.ClientRepository
}

func NewListClientUseCase(clientRepository repositories.ClientRepository) contracts.ListClientUseCase {

	return &listClientUseCase{
		clientRepository: clientRepository,
	}
}

func (l *listClientUseCase) Execute(ctx context.Context) (*output.ListClientOutput, error) {
	var err error
	output := &output.ListClientOutput{Clients: []*entities.Client{}}

	output.Clients, err = l.clientRepository.ListClient(ctx)
	if err != nil {
		return nil, fmt.Errorf("error when list clients on database: %v", err)
	}

	return output, nil
}
