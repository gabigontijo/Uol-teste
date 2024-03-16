package repositories

import (
	"context"

	"github.com/gabigontijo/uol-teste-be/internal/domain/entities"
)

type ClientRepository interface {
	CreateClient(ctx context.Context, entity *entities.Client) error
	UpdateClient(ctx context.Context, entity *entities.Client) error
	FindClientByID(ctx context.Context, id int) (*entities.Client, error)
	ListClient(ctx context.Context) ([]*entities.Client, error)
}
