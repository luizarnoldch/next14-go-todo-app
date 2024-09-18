package application

import (
	"main/src/task/domain/model"
	"main/src/task/domain/repository"
	"time"
)

type TaskPSQLService struct {
	r repository.TaskRepository
}

func NewTaskPSQLService(repository repository.TaskRepository) TaskService {
	return &TaskPSQLService{
		r: repository,
	}
}

func (s *TaskPSQLService) CreateTask(task *model.Task) error {
	if task.CreatedAt.IsZero() {
		task.CreatedAt = time.Now()
	}
	task.UpdatedAt = task.CreatedAt

	return s.r.CreateTask(task)
}

func (s *TaskPSQLService) GetTaskByID(id int) (*model.Task, error) {
	return s.r.GetTaskByID(id)
}

func (s *TaskPSQLService) GetAllTasks() ([]model.Task, error) {
	return s.r.GetAllTasks()
}

func (s *TaskPSQLService) UpdateTask(task *model.Task) error {
	task.UpdatedAt = time.Now()
	return s.r.UpdateTask(task)
}

func (s *TaskPSQLService) DeleteTask(id int) error {
	return s.r.DeleteTask(id)
}
