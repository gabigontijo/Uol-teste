package usecases

import (
	"context"
	"fmt"
	"time"

	"github.com/gabigontijo/Uol-teste/internal/domain/entities"
	"github.com/gabigontijo/Uol-teste/internal/repositories"
	"github.com/gabigontijo/Uol-teste/internal/usecases/contracts"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/input"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/output"
	"github.com/gabigontijo/Uol-teste/internal/usecases/validator"
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

	err := validator.ValidateCPF(createClient.CPF)
	if err != nil {
		return nil, fmt.Errorf("cannot create a client with ivalid CPF")
	}

	if createClient.Phone == "" {
		return nil, fmt.Errorf("cannot create a client without Phone")
	}

	if createClient.Status == 0 {
		return nil, fmt.Errorf("cannot create a client without Status")
	}

	client, err := c.clientRepository.FindClientByCPF(ctx, createClient.CPF)
	if err != nil {
		return nil, fmt.Errorf("failed to get client: %v", err)
	}

	if len(client) > 0 {
		return nil, fmt.Errorf("CPF já cadastrado")
	}

	client, err = c.clientRepository.FindClientByEmail(ctx, createClient.Email)
	if err != nil {
		return nil, fmt.Errorf("failed to get client: %v", err)
	}

	if len(client) > 0 {
		return nil, fmt.Errorf("email já cadastrado")
	}

	clientEntity := &entities.Client{
		Name:      createClient.Name,
		Email:     createClient.Email,
		Cpf:       createClient.CPF,
		Phone:     createClient.Phone,
		Status:    fmt.Sprint(createClient.Status),
		CreatedAt: time.Now(),
	}

	err = c.clientRepository.CreateClient(ctx, clientEntity)
	if err != nil {
		return nil, fmt.Errorf("cannot save client at database: %v", err)
	}

	createClientOutput := &output.CreateClientOutput{
		ClientID: clientEntity.ID,
	}

	return createClientOutput, nil
}
