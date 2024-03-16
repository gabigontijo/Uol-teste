package contracts

import (
	"context"

	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/output"
)

type FindClientByIDUseCase interface {
	Execute(ctx context.Context, clientID int) (*output.FindClientOutput, error)
}
