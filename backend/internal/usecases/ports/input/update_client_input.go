package input

type UpdateClientInput struct {
	ID     int    `json:"id,omitempty"`
	Name   string `json:"name"`
	CPF    string `json:"cpf"`
	Email  string `json:"email"`
	Phone  string `json:"phone"`
	Status int    `json:"status"`
}
