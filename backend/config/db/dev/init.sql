-- Elimina la tabla de usuarios
DROP TABLE IF EXISTS tasks CASCADE;

-- Re-crea las tablas en el orden necesario

-- Tabla para almacenar los usuarios (opcional)
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
