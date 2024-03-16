package input

type CreateClientInput struct {
	Name   string `json:"name"`
	CPF    string `json:"cpf"`
	Email  string `json:"email"`
	Phone  string `json:"phone"`
	Status string `json:"status"`
}
