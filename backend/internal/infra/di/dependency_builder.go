package di

import (
	"log"

	"github.com/gabigontijo/Uol-teste/internal/repositories"
	"github.com/gabigontijo/Uol-teste/internal/usecases"
	"github.com/gabigontijo/Uol-teste/internal/usecases/contracts"
	"gorm.io/gorm"
)

type DenpencyBuild struct {
	DB           *gorm.DB
	Repositories Repositories
	Usecases     Usecases
}

type Repositories struct {
	ClientRepository repositories.ClientRepository
}

type Usecases struct {
	CreateClientUseCase   contracts.CreateClientUseCase
	FindClientByIDUseCase contracts.FindClientByIDUseCase
	ListClientUseCase     contracts.ListClientUseCase
	UpdateClientUseCase   contracts.UpdateClientUseCase
}

func NewBuild() *DenpencyBuild {

	builder := &DenpencyBuild{}

	builder = builder.buildDB().
		buildRepositories().
		buildUseCases()

	return builder
}

func (d *DenpencyBuild) buildDB() *DenpencyBuild {
	var err error
	d.DB, err = InitGormSQLiteDB()
	if err != nil {
		log.Fatal(err)
	}
	return d
}

func (d *DenpencyBuild) buildRepositories() *DenpencyBuild {
	d.Repositories.ClientRepository = repositories.NewClientRepository(d.DB)
	return d
}

func (d *DenpencyBuild) buildUseCases() *DenpencyBuild {
	d.Usecases.CreateClientUseCase = usecases.NewCreateClientUseCase(d.Repositories.ClientRepository)
	d.Usecases.FindClientByIDUseCase = usecases.NewFindClientByIDUseCase(d.Repositories.ClientRepository)
	d.Usecases.ListClientUseCase = usecases.NewListClientUseCase(d.Repositories.ClientRepository)
	d.Usecases.UpdateClientUseCase = usecases.NewUpdateClientUseCase(d.Repositories.ClientRepository)

	return d
}
