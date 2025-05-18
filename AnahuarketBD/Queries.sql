CREATE VIEW PantallaInicial AS
SELECT
  p.idProducto AS producto_id,
  p.nombreProducto AS nombre_producto,
  p.descripcion,
  p.precio,
  c.NombreCategoria AS categoria,
  u.Nombre AS vendedor,
  u.Telefono AS contacto
FROM producto p
JOIN Categorias c ON p.idCategoria = c.idCategoria
JOIN Usuarios u ON p.idUsuario = u.idUsuario;

CREATE VIEW VistaDetallesProducto AS  
SELECT  
    p.idProducto,  
    p.nombreProducto,  
    p.descripcion,  
    p.precio,  
    c.NombreCategoria,  
    d.NombreDisponibilidad,  
    u.idUsuario AS idVendedor,  
    u.Nombre AS vendedor,  
    u.Telefono AS contacto,  
    p.stock,  
    p.fechaPublicacion,  
    p.fotoProducto
FROM Producto p  
INNER JOIN Categorias c ON p.idCategoria = c.idCategoria  
INNER JOIN Disponibilidad d ON p.idDisponibilidad = d.idDisponibilidad  
INNER JOIN Usuarios u ON p.idUsuario = u.idUsuario  
WHERE p.isActive = TRUE;  
