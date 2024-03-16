package contracts

import (
	"context"

	"github.com/gabigontijo/uol-teste-be/internal/usecases/ports/output"
)

type FindClientByIDUseCase interface {
	Execute(ctx context.Context, clientID int) (*output.FindClientOutput, error)
}
