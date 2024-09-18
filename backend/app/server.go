package app

import (
	"fmt"
	"main/config"
	"main/config/db"
	task_app "main/src/task/application"
	task_adapter "main/src/task/infrastructure/adapter"
	"os"
	"path/filepath"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	fiberlog "github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Start() {
	currentDir, err := os.Getwd()
	if err != nil {
		fiberlog.Fatalf("Error getting current working directory: %v", err)
	}

	fiberlog.Infof("Current Dir: %s", currentDir)

	dev_sql_tables_inyection_path := filepath.Join(currentDir, "/config/db/dev/init.sql")
	dev_sql_data_inyection_path := filepath.Join(currentDir, "/config/db/dev/data.sql")
	prod_sql_tables_inyection_path := filepath.Join(currentDir, "/config/db/prod/init.sql")
	env_path := filepath.Join(currentDir, ".env")

	// Load environment variables
	ENV_CONFIG, err := config.LoadConfig(env_path)
	if err != nil {
		fiberlog.Fatalf("Error while loading .env file: %s", err)
	}

	fiberlog.Infof("Environment: %s", ENV_CONFIG.ENV)

	psqlClient := config.GetPostgreSQLClient(env_path)
	defer psqlClient.Close()

	if ENV_CONFIG.ENV == "dev" {
		db.SQLInjection(dev_sql_tables_inyection_path, psqlClient)
		db.SQLInjection(dev_sql_data_inyection_path, psqlClient)
	} else if ENV_CONFIG.ENV == "prod" {
		db.SQLInjection(prod_sql_tables_inyection_path, psqlClient)
	}

	// Create a new Fiber app with custom JSON encoder and decoder
	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	// Enable CORS for all routes
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Allow all origins, customize for production
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	// Enable Logger for fiber
	app.Use(logger.New(logger.Config{
		Format:     "${pid} [${ip}]:${port} ${status} - ${method} ${path}\n",
		TimeFormat: "02-Jan-2006",
		TimeZone:   "America/Lima",
	}))

	// Set up the root route
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("BACKEND TODO APP")
	})

	// Initialize repositories, services, and controllers
	taskRepo := task_adapter.NewTaskPSQLRepository(psqlClient)
	taskService := task_app.NewTaskPSQLService(taskRepo)
	taskController := TaskController{s: taskService}

	task_api_group := app.Group("/tasks") // /tasks

	// Add the routes for tasks functions
	task_api_group.Get("/", taskController.GetAllTasks)      // Get all tasks
	task_api_group.Get("/:id", taskController.GetTaskByID)   // Get a specific task by ID
	task_api_group.Post("/", taskController.CreateTask)      // Create a new task
	task_api_group.Put("/:id", taskController.UpdateTask)    // Update a task by ID
	task_api_group.Delete("/:id", taskController.DeleteTask) // Delete a task by ID

	// Start the server
	URL_API := fmt.Sprint(ENV_CONFIG.MICRO.API.API_HOST, ":", ENV_CONFIG.MICRO.API.API_PORT)
	err = app.Listen(URL_API)
	if err != nil {
		fiberlog.Fatalf("Error starting server: %v", err)
	}
}
