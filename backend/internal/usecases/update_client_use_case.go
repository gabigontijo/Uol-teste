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

	err := validator.ValidateCPF(updateClient.CPF)
	if err != nil {
		return nil, fmt.Errorf("cannot create a client with ivalid CPF")
	}

	if updateClient.Phone == "" {
		return nil, fmt.Errorf("failed phone client is empty")
	}

	if updateClient.Status == 0 {
		return nil, fmt.Errorf("failed status client is empty")
	}

	originalClient, err := c.clientRepository.FindClientByID(ctx, updateClient.ID)
	if err != nil {
		return nil, fmt.Errorf("failed to get client: %v", err)
	}
	if originalClient.Cpf != updateClient.CPF {
		client, err := c.clientRepository.FindClientByCPF(ctx, updateClient.CPF)
		if err != nil {
			return nil, fmt.Errorf("failed to get client: %v", err)
		}
		if len(client) > 0 {
			return nil, fmt.Errorf("CPF ja cadastrado")
		}
	}
	if originalClient.Email != updateClient.Email {
		client, err := c.clientRepository.FindClientByEmail(ctx, updateClient.Email)
		if err != nil {
			return nil, fmt.Errorf("failed to get client: %v", err)
		}
		if len(client) > 0 {
			return nil, fmt.Errorf("email já cadastrado")
		}
	}

	clientEntity := &entities.Client{
		ID:        updateClient.ID,
		Name:      updateClient.Name,
		Email:     updateClient.Email,
		Cpf:       updateClient.CPF,
		Phone:     updateClient.Phone,
		Status:    fmt.Sprint(updateClient.Status),
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
