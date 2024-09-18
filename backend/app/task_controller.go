package app

import (
	"main/src/task/application"
	"main/src/task/domain/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
	fiberlog "github.com/gofiber/fiber/v2/log"
)

type TaskController struct {
	s application.TaskService
}

// GetAllTasks handles retrieving all tasks
func (c *TaskController) GetAllTasks(ctx *fiber.Ctx) error {
	tasks, err := c.s.GetAllTasks()
	if err != nil {
		fiberlog.Errorf("Error retrieving all tasks: %v", err)
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to retrieve tasks",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Tasks retrieved successfully",
		"data":    tasks,
	})
}

// CreateTask handles creating a new task
func (c *TaskController) CreateTask(ctx *fiber.Ctx) error {
	var task model.Task

	// Parse the request body into the task model
	if err := ctx.BodyParser(&task); err != nil {
		fiberlog.Errorf("Error parsing task request body: %v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid request payload",
		})
	}

	// Call the service to create the task
	if err := c.s.CreateTask(&task); err != nil {
		fiberlog.Errorf("Error creating task: %v", err)
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to create task",
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "success",
		"message": "Task created successfully",
		"data":    task,
	})
}

// GetTaskByID handles retrieving a task by ID
func (c *TaskController) GetTaskByID(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		fiberlog.Errorf("Invalid task ID: %v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid task ID",
		})
	}

	task, err := c.s.GetTaskByID(id)
	if err != nil {
		fiberlog.Errorf("Error retrieving task by ID: %v", err)
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Task not found",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Task retrieved successfully",
		"data":    task,
	})
}

// UpdateTask handles updating an existing task
func (c *TaskController) UpdateTask(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		fiberlog.Errorf("Invalid task ID: %v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid task ID",
		})
	}

	var task model.Task
	if err := ctx.BodyParser(&task); err != nil {
		fiberlog.Errorf("Error parsing task request body: %v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid request payload",
		})
	}

	task.ID = id

	if err := c.s.UpdateTask(&task); err != nil {
		fiberlog.Errorf("Error updating task: %v", err)
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to update task",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Task updated successfully",
		"data":    task,
	})
}

// DeleteTask handles deleting a task by ID
func (c *TaskController) DeleteTask(ctx *fiber.Ctx) error {
	idParam := ctx.Params("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		fiberlog.Errorf("Invalid task ID: %v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid task ID",
		})
	}

	if err := c.s.DeleteTask(id); err != nil {
		fiberlog.Errorf("Error deleting task: %v", err)
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to delete task",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Task deleted successfully",
	})
}
