package contracts

import (
	"context"

	"github.com/gabigontijo/uol-teste-be/internal/usecases/ports/output"
)

type ListClientUseCase interface {
	Execute(ctx context.Context) (*output.ListClientOutput, error)
}
