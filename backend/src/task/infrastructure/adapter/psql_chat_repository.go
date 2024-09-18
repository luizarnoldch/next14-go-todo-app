package adapter

import (
	"main/src/task/domain/model"
	"main/src/task/domain/repository"

	"github.com/gofiber/fiber/v2/log"
	"github.com/jmoiron/sqlx"
)

type TaskPSQLRepository struct {
	client *sqlx.DB
}

func NewTaskPSQLRepository(client *sqlx.DB) repository.TaskRepository {
	return &TaskPSQLRepository{client: client}
}

func (r *TaskPSQLRepository) CreateTask(task *model.Task) error {
	query := `
		INSERT INTO tasks (title, description, status, created_at, updated_at)
		VALUES (:title, :description, :status, :created_at, :updated_at)
		RETURNING id
	`

	rows, err := r.client.NamedQuery(query, task)
	if err != nil {
		log.Infof("Error creating task: %v", err)
		return err
	}
	defer rows.Close()

	if rows.Next() {
		if err := rows.Scan(&task.ID); err != nil {
			log.Infof("Error scanning returned ID: %v", err)
			return err
		}
	}

	return nil
}

func (r *TaskPSQLRepository) GetTaskByID(id int) (*model.Task, error) {
	var task model.Task
	err := r.client.Get(&task, "SELECT * FROM tasks WHERE id = $1", id)
	if err != nil {
		log.Infof("Error getting task by ID: %v", err)
		return nil, err
	}
	return &task, nil
}

func (r *TaskPSQLRepository) GetAllTasks() ([]model.Task, error) {
	var tasks []model.Task
	err := r.client.Select(&tasks, "SELECT * FROM tasks")
	if err != nil {
		log.Infof("Error getting all tasks: %v", err)
		return nil, err
	}
	return tasks, nil
}

func (r *TaskPSQLRepository) UpdateTask(task *model.Task) error {
	_, err := r.client.NamedExec(`
		UPDATE tasks
		SET title = :title, description = :description, status = :status, updated_at = :updated_at
		WHERE id = :id
	`, task)
	if err != nil {
		log.Infof("Error updating task: %v", err)
		return err
	}
	return nil
}

func (r *TaskPSQLRepository) DeleteTask(id int) error {
	_, err := r.client.Exec("DELETE FROM tasks WHERE id = $1", id)
	if err != nil {
		log.Infof("Error deleting task: %v", err)
		return err
	}
	return nil
}
