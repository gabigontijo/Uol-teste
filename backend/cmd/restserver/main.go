package main

import (
	"fmt"
	"net/http"

	"github.com/gabigontijo/uol-teste-be/config"
	"github.com/gabigontijo/uol-teste-be/internal/infra/di"
	"github.com/gabigontijo/uol-teste-be/services"
)

func main() {
	config.LoadServerEnvironmentVars()

	dependencies := di.NewBuild()

	router := services.NewHTTPRouterClient(dependencies.Usecases.CreateClientUseCase,
		dependencies.Usecases.FindClientByIDUseCase,
		dependencies.Usecases.ListClientUseCase,
		dependencies.Usecases.UpdateClientUseCase)

	fmt.Println("Starting SERVER, LISTEN PORT: " + config.GetServerPort())
	clientErr := http.ListenAndServe(fmt.Sprintf(":%s", config.GetServerPort()), router)
	if clientErr != nil && clientErr != http.ErrServerClosed {
		fmt.Println("failed to create server rest on port: " + config.GetServerPort())
		fmt.Println(clientErr.Error())
	}
}
