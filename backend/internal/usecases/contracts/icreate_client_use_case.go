package contracts

import (
	"context"

	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/input"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/output"
)

type CreateClientUseCase interface {
	Execute(ctx context.Context, createClient *input.CreateClientInput) (*output.CreateClientOutput, error)
}
