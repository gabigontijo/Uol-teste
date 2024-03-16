package contracts

import (
	"context"

	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/output"
)

type ListClientUseCase interface {
	Execute(ctx context.Context) (*output.ListClientOutput, error)
}
