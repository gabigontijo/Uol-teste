package output

import "github.com/gabigontijo/uol-teste-be/internal/domain/entities"

type ListClientOutput struct {
	Clients []*entities.Client
}
