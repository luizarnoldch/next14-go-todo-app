package model

import "time"

// Task represents a task in the task management system.
type Task struct {
	ID          int       `json:"id" db:"id"`
	Title       string    `json:"title" db:"title"`                       // Task title
	Description string    `json:"description,omitempty" db:"description"` // Task description
	Status      string    `json:"status" db:"status"`                     // Task status (e.g., "pending", "completed")
	CreatedAt   time.Time `json:"created_at" db:"created_at"`             // Time when the task was created
	UpdatedAt   time.Time `json:"updated_at,omitempty" db:"updated_at"`   // Time when the task was last updated
}
