package contracts

import (
	"context"

	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/input"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/output"
)

type UpdateClientUseCase interface {
	Execute(ctx context.Context, updateClient *input.UpdateClientInput) (*output.CreateClientOutput, error)
}
