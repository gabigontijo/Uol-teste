package config

import (
	"os"
	"path"
	"path/filepath"
	"runtime"

	"github.com/spf13/viper"
)

const ServerEnvironment = "SERVER_ENVIRONMENT"

func BuildConfigFilePath(configFileName string) string {
	dir, _ := os.Getwd()
	return filepath.Join(dir, configFileName)
}

func LoadServerEnvironmentVars() error {
	_, filename, _, _ := runtime.Caller(0)
	// filePath := path.Join(path.Dir(filename), "config.json")
	// fmt.Println(filePath)

	viper.SetDefault(ServerEnvironment, "config")
	viper.SetConfigType("json")
	viper.SetConfigName(viper.GetString(ServerEnvironment))

	viper.AddConfigPath(path.Dir(filename))

	err := viper.ReadInConfig()
	if err != nil {
		viper.AutomaticEnv() // if config file is not found, it uses the automatic env
	}

	return err
}

func GetServerPort() string {
	return viper.GetString("SERVER_PORT")
}
