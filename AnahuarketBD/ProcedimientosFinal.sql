USE Anahuarket;

DELIMITER //

CREATE PROCEDURE RegistrarUsuario(
    IN p_Nombre VARCHAR(100),
    IN p_Correo VARCHAR(100),
    IN p_Contrasena VARCHAR(255),
    IN p_Telefono VARCHAR(15)
)
BEGIN
    INSERT INTO Usuarios (Nombre, Correo, Telefono, Contrasena, isActive)
    VALUES (p_Nombre, p_Correo, p_Telefono, p_Contrasena, TRUE);
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE AgregarProducto(
    IN p_idUsuario INT,
    IN p_nombreProducto VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_idCategoria INT,
    IN p_precio DECIMAL(10,2),
    IN p_idDisponibilidad INT,
    IN p_stock INT
)
BEGIN
    INSERT INTO Producto (idUsuario, nombreProducto, descripcion, idCategoria, precio, idDisponibilidad, stock)
    VALUES (p_idUsuario, p_nombreProducto, p_descripcion, p_idCategoria, p_precio, p_idDisponibilidad, p_stock);
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE EditarProducto(
    IN p_idProducto INT,
    IN p_nombreProducto VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_idCategoria INT,
    IN p_precio DECIMAL(10,2),
    IN p_idDisponibilidad INT,
    IN p_stock INT
)
BEGIN
    UPDATE Producto
    SET 
        nombreProducto = COALESCE(NULLIF(p_nombreProducto, ''), nombreProducto),
        descripcion = COALESCE(NULLIF(p_descripcion, ''), descripcion),
        idCategoria = COALESCE(NULLIF(p_idCategoria, 0), idCategoria),
        precio = COALESCE(NULLIF(p_precio, -1), precio),
        idDisponibilidad = COALESCE(NULLIF(p_idDisponibilidad, 0), idDisponibilidad),
        stock = COALESCE(NULLIF(p_stock, -1), stock)
    WHERE idProducto = p_idProducto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE BuscarProducto(
    IN p_palabraClave VARCHAR(100)
)
BEGIN
    SELECT * FROM Producto
    WHERE (nombreProducto LIKE CONCAT('%', p_palabraClave, '%') OR p_palabraClave IS NULL)
    AND isActive = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE BuscarProductosPorIdCategoria(
    IN p_idCategoria INT
)
BEGIN
    SELECT * 
    FROM Producto 
    WHERE (idCategoria = p_idCategoria OR p_idCategoria IS NULL)
    AND isActive = TRUE;
END //
DELIMITER ;

DELIMITER $$

CREATE PROCEDURE EditarUsuario(
    IN p_idUsuario INT,
    IN p_Nombre VARCHAR(100),
    IN p_Correo VARCHAR(255),
    IN p_Telefono VARCHAR(15),
    IN p_Contrasena VARCHAR(50)
)
BEGIN
    UPDATE Usuarios
    SET 
        Nombre = COALESCE(NULLIF(p_Nombre, ''), Nombre),
        Correo = COALESCE(NULLIF(p_Correo, ''), Correo),
        Telefono = COALESCE(NULLIF(p_Telefono, ''), Telefono),
        Contrasena = COALESCE(NULLIF(p_Contrasena, ''), Contrasena)
    WHERE idUsuario = p_idUsuario;
END $$

DELIMITER ;









