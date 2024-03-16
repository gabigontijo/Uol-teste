package services

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/gabigontijo/Uol-teste/internal/usecases/contracts"
	"github.com/gabigontijo/Uol-teste/internal/usecases/ports/input"
	"github.com/gabigontijo/Uol-teste/utils"
	"github.com/gorilla/mux"
)

type Handler struct {
	CreateClientUseCase   contracts.CreateClientUseCase
	FindClientByIDUseCase contracts.FindClientByIDUseCase
	ListClientUseCase     contracts.ListClientUseCase
	UpdateClientUseCase   contracts.UpdateClientUseCase
}

func NewHTTPRouterClient(createClientUseCase contracts.CreateClientUseCase,
	findClientByIDUseCase contracts.FindClientByIDUseCase,
	listClientUseCase contracts.ListClientUseCase,
	updateClientUseCase contracts.UpdateClientUseCase) *mux.Router {
	router := mux.NewRouter()
	handler := Handler{
		CreateClientUseCase:   createClientUseCase,
		FindClientByIDUseCase: findClientByIDUseCase,
		ListClientUseCase:     listClientUseCase,
		UpdateClientUseCase:   updateClientUseCase,
	}
	router.UseEncodedPath()
	router.Use(utils.CommonMiddleware)

	router.HandleFunc("/clients", handler.ListClients).Methods(http.MethodGet)
	router.HandleFunc("/clients/{id}", handler.GetClientByID).Methods(http.MethodGet)
	router.HandleFunc("/clients", handler.CreateClient).Methods(http.MethodPost)
	router.HandleFunc("/clients/{id}", handler.UpdateClient).Methods(http.MethodPut)

	return router
}

func (h *Handler) ListClients(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	response, err := h.ListClientUseCase.Execute(ctx)
	if err != nil {
		utils.WriteErrModel(w, http.StatusNotFound,
			utils.NewErrorResponse(fmt.Sprintf("failed to get clients, error: '%s'", err.Error())))
		return
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		utils.WriteErrModel(w, http.StatusInternalServerError,
			utils.NewErrorResponse("Failed to marshal client response"))
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, string(jsonResponse))
}

func (h *Handler) GetClientByID(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	id, err := utils.RetrieveParam(r, "id")
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("error reading id"))
		return
	}

	idInt, err := strconv.Atoi(id)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("error cast id to int"))
		return
	}

	response, err := h.FindClientByIDUseCase.Execute(ctx, idInt)
	if err != nil {
		utils.WriteErrModel(w, http.StatusNotFound,
			utils.NewErrorResponse(fmt.Sprintf("failed to find client, error: '%s'", err.Error())))
		return
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		utils.WriteErrModel(w, http.StatusInternalServerError,
			utils.NewErrorResponse("Failed to marshal client response"))
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, string(jsonResponse))
}

func (h *Handler) UpdateClient(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	id, err := utils.RetrieveParam(r, "id")
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("error reading id"))
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("error reading request body"))
		return
	}

	client := input.UpdateClientInput{}
	err = json.Unmarshal(body, &client)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("failed to parse request body"))
		return
	}

	client.ID, err = strconv.Atoi(id)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("error cast id to int"))
		return
	}

	response, err := h.UpdateClientUseCase.Execute(ctx, &client)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest,
			utils.NewErrorResponse(fmt.Sprintf("failed to update client, error:'%s'", err.Error())))
		return
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		utils.WriteErrModel(w, http.StatusInternalServerError,
			utils.NewErrorResponse("Failed to marshal client response"))
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, string(jsonResponse))
}

func (h *Handler) CreateClient(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	defer r.Body.Close()

	body, err := io.ReadAll(r.Body)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("error reading request body"))
		return
	}

	client := input.CreateClientInput{}
	err = json.Unmarshal(body, &client)
	if err != nil {
		utils.WriteErrModel(w, http.StatusBadRequest, utils.NewErrorResponse("failed to parse request body"))
		return
	}

	response, err := h.CreateClientUseCase.Execute(ctx, &client)
	if err != nil {
		utils.WriteErrModel(w, http.StatusNotFound,
			utils.NewErrorResponse(fmt.Sprintf("failed to create client, error: '%s'", err.Error())))
		return
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		utils.WriteErrModel(w, http.StatusInternalServerError,
			utils.NewErrorResponse("Failed to marshal client response"))
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, string(jsonResponse))
}
