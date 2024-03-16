package usecases

import (
	"context"
	"fmt"

	"github.com/gabigontijo/Uol-teste/internal/repositories"
	"github.com/gabigontijo/Uol-teste/internal/usecases/contracts"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/output"
)

type findClientByIDUseCase struct {
	clientRepository repositories.ClientRepository
}

func NewFindClientByIDUseCase(clientRepository repositories.ClientRepository) contracts.FindClientByIDUseCase {

	return &findClientByIDUseCase{
		clientRepository: clientRepository,
	}
}

func (c *findClientByIDUseCase) Execute(ctx context.Context, clientID int) (*output.FindClientOutput, error) {

	clientEntity, err := c.clientRepository.FindClientByID(ctx, clientID)
	if err != nil {
		return nil, fmt.Errorf("erro to find client '%d' at database: '%v'", clientID, err)
	}

	if clientEntity == nil {
		return nil, fmt.Errorf("clientID not found")
	}

	output := &output.FindClientOutput{
		Client: clientEntity,
	}

	return output, nil
}
