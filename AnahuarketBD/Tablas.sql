CREATE DATABASE IF NOT EXISTS Anahuarket;
USE Anahuarket;

CREATE TABLE Usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(255) NOT NULL UNIQUE,
    Telefono VARCHAR(15) NULL,
    Contrasena VARCHAR(255) NOT NULL,
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_correo CHECK (Correo LIKE '%@anahuac.mx')
);

CREATE USER 'admin_backup'@'localhost' IDENTIFIED BY 'TuPasswordSegura';
GRANT SELECT, SHOW VIEW, EVENT, TRIGGER, LOCK TABLES ON Anahuarket.* TO 'admin_backup'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Categorias (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    NombreCategoria VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE Disponibilidad (
    idDisponibilidad INT AUTO_INCREMENT PRIMARY KEY,
    NombreDisponibilidad VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    nombreProducto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    idCategoria INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    idDisponibilidad INT NOT NULL,
    stock INT DEFAULT 0 CHECK (stock >= 0),
    fechaPublicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
    fotoProducto LONGBLOB,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria),
    FOREIGN KEY (idDisponibilidad) REFERENCES Disponibilidad(idDisponibilidad)
);

CREATE INDEX idx_producto_nombre ON Producto(nombreProducto);
CREATE INDEX idx_producto_categoria ON Producto(idCategoria);