-- Insert mock data into the tasks table
INSERT INTO tasks (title, description, status, created_at, updated_at) VALUES
    ('Finish project report', 'Complete the final report for the project.', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Update website', 'Make necessary updates to the company website.', 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Fix bugs in application', 'Address and fix bugs reported by users.', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Plan team meeting', 'Organize and plan the upcoming team meeting.', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Prepare presentation', 'Prepare slides and content for the upcoming presentation.', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
