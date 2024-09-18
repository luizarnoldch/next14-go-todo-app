# 1. Get All Tasks
curl -X GET http://localhost:4000/tasks \
     -H "Accept: application/json"

# 2. Create a New Task
curl -X POST http://localhost:4000/tasks \
     -H "Content-Type: application/json" \
     -d '{
           "title": "New Task",
           "description": "This is a description for the new task.",
           "status": "pending"
         }'

# 3. Get Task by ID
# Replace TASK_ID with the actual task ID you want to retrieve.
curl -X GET http://localhost:4000/tasks/1 \
     -H "Accept: application/json"

# 4. Update an Existing Task
# Replace TASK_ID with the actual task ID you want to update.
curl -X PUT http://localhost:4000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Updated Task Title",
           "description": "Updated task description.",
           "status": "completed"
         }'

# 5. Delete a Task by ID
# Replace TASK_ID with the actual task ID you want to delete.
curl -X DELETE http://localhost:4000/tasks/1 \
     -H "Accept: application/json"