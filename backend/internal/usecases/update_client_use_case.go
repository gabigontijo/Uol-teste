package usecases

import (
	"context"
	"fmt"
	"time"

	"github.com/gabigontijo/uol-teste-be/internal/domain/entities"
	"github.com/gabigontijo/uol-teste-be/internal/repositories"
	"github.com/gabigontijo/uol-teste-be/internal/usecases/contracts"
	"github.com/gabigontijo/uol-teste-be/internal/usecases/ports/input"
	"github.com/gabigontijo/uol-teste-be/internal/usecases/ports/output"
)

type updateClientUseCase struct {
	clientRepository repositories.ClientRepository
}

func NewUpdateClientUseCase(clientRepository repositories.ClientRepository) contracts.UpdateClientUseCase {

	return &updateClientUseCase{
		clientRepository: clientRepository,
	}
}

func (c *updateClientUseCase) Execute(ctx context.Context, updateClient *input.UpdateClientInput) (*output.CreateClientOutput, error) {

	if updateClient.Name == "" {
		return nil, fmt.Errorf("failed name client is empty")
	}

	if updateClient.Email == "" {
		return nil, fmt.Errorf("failed email client is empty")
	}

	if updateClient.CPF == "" {
		return nil, fmt.Errorf("failed cpf client is empty")
	}

	if updateClient.Phone == "" {
		return nil, fmt.Errorf("failed phone client is empty")
	}

	if updateClient.Status == "" {
		return nil, fmt.Errorf("failed status client is empty")
	}

	clientEntity := &entities.Client{
		ID:        updateClient.ID,
		Name:      updateClient.Name,
		Email:     updateClient.Email,
		Cpf:       updateClient.CPF,
		Phone:     updateClient.Phone,
		Status:    updateClient.Status,
		UpdatedAt: time.Now(),
	}

	errUpdate := c.clientRepository.UpdateClient(ctx, clientEntity)
	if errUpdate != nil {
		return nil, fmt.Errorf("cannot update client at database: %v", errUpdate)
	}

	createClientOutput := &output.CreateClientOutput{
		ClientID: clientEntity.ID,
	}

	return createClientOutput, nil
}
