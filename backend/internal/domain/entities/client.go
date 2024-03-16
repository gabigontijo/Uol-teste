package entities

import "time"

type Client struct {
	ID        int    `gorm:"id" json:"id"`
	Name      string `gorm:"size:250" json:"name"`
	Email     string `json:"email"`
	Cpf       string `json:"cpf"`
	Phone     string `json:"phone"`
	Status    string `json:"status"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
