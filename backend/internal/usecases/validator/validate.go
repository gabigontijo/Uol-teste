package validator

import (
	"fmt"

	"github.com/google/uuid"
)

func ValidateUUId(id string, validateEmpty bool, fieldName string) error {
	if len(id) > 0 {
		_, err := uuid.Parse(id)
		if err != nil {
			return fmt.Errorf("%s is not valid UUID: %v", fieldName, err)
		}
	} else if validateEmpty {
		return fmt.Errorf("%s cannot be empty", fieldName)
	}
	return nil
}
