package di

import (
	"github.com/gabigontijo/uol-teste-be/config"
	"github.com/gabigontijo/uol-teste-be/internal/domain/entities"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitGormSQLiteDB() (*gorm.DB, error) {
	config.LoadServerEnvironmentVars()

	// Defina o nome do arquivo SQLite
	dbFileName := "clients.db"

	// Abra a conexão com o SQLite
	sqliteDb, err := gorm.Open(sqlite.Open(dbFileName), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	// Execute as migrações automática
	sqliteDb.AutoMigrate(&entities.Client{})

	return sqliteDb, nil
}
