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

type createClientUseCase struct {
	clientRepository repositories.ClientRepository
}

func NewCreateClientUseCase(clientRepository repositories.ClientRepository) contracts.CreateClientUseCase {

	return &createClientUseCase{
		clientRepository: clientRepository,
	}
}

func (c *createClientUseCase) Execute(ctx context.Context, createClient *input.CreateClientInput) (*output.CreateClientOutput, error) {

	if createClient.Name == "" {
		return nil, fmt.Errorf("cannot create a client without name")
	}

	if createClient.Email == "" {
		return nil, fmt.Errorf("cannot create a client without email")
	}

	if createClient.CPF == "" {
		return nil, fmt.Errorf("cannot create a client without CPF")
	}

	if createClient.Phone == "" {
		return nil, fmt.Errorf("cannot create a client without Phone")
	}

	if createClient.Status == "" {
		return nil, fmt.Errorf("cannot create a client without Status")
	}

	client, err := c.clientRepository.FindClientByCPF(ctx, createClient.CPF)
	if err != nil {
		return nil, fmt.Errorf("failed to get client: %v", err)
	}

	if len(client) > 0 {
		return nil, fmt.Errorf("failed, already exists client with the same cpf")
	}

	client, err = c.clientRepository.FindClientByEmail(ctx, createClient.Email)
	if err != nil {
		return nil, fmt.Errorf("failed to get client: %v", err)
	}

	if len(client) > 0 {
		return nil, fmt.Errorf("failed, already exists client with the same email")
	}

	clientEntity := &entities.Client{
		Name:      createClient.Name,
		Email:     createClient.Email,
		Cpf:       createClient.CPF,
		Phone:     createClient.Phone,
		Status:    createClient.Status,
		CreatedAt: time.Now(),
	}

	err := c.clientRepository.CreateClient(ctx, clientEntity)
	if err != nil {
		return nil, fmt.Errorf("cannot save client at database: %v", err)
	}

	createClientOutput := &output.CreateClientOutput{
		ClientID: clientEntity.ID,
	}

	return createClientOutput, nil
}
