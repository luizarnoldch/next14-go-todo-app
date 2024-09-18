package application

import "main/src/task/domain/model"

type TaskService interface {
	CreateTask(task *model.Task) error
	GetTaskByID(id int) (*model.Task, error)
	GetAllTasks() ([]model.Task, error)
	UpdateTask(task *model.Task) error
	DeleteTask(id int) error
}
