package validator

import (
	"fmt"

	"github.com/klassmann/cpfcnpj"
)

func ValidateCPF(s string) error {
	cpf := cpfcnpj.NewCPF(s)

	if !cpf.IsValid() {
		return fmt.Errorf("it is not a valid CPF: %v", cpf)
	}
	return nil
}
