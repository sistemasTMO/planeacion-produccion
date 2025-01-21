const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');  // Esto es necesario para usar promesas

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3306;

// Conexión a MySQL
const dbConfig = {
  host: 'p3plzcpnl506561.prod.phx3.secureserver.net', // Dominio del servidor
  user: 'sistemastmo', // Usuario de la base de datos
  password: 'sisTMO2025*', // Contraseña del usuario
  database: 'produccionplaneacion', // Nombre de la base de datos
  port: 3306 // Puerto de MySQL (generalmente 3306)
};
let db;
let pool = mysql.createPool(dbConfig);


// Inicializa la conexión a la base de datos
(async () => {
  db = await mysql.createConnection(dbConfig);
  console.log('Conectado a la base de datos');
})();

// Ruta de autenticación
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  try {
    const [results] = await db.execute(query, [email]);
    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];
    // Verificar si la contraseña coincide
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.json({ area: user.area });
  } catch (err) {
    console.error('Error en la base de datos:', err);
    return res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Ruta para obtener la tabla inicial de estados
app.get('/pedidos', async (req, res) => {
  try {
    const [results] = await db.query('CALL mostrar_pedidos()');
    res.json(results[0]);
  } catch (err) {
    console.error('Error al obtener los datos:', err);
    return res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Endpoint para obtener detalles del pedido
app.get('/obtener-detalles-pedido/:idPedido', async (req, res) => {
  const { idPedido } = req.params;

  if (!idPedido) {
    return res.status(400).send('Falta el parámetro id_pedido');
  }

  try {
    const query = 'CALL ObtenerDetallesPedido(?)';
    const [results] = await db.execute(query, [idPedido]);
    res.json(results[0]);
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    return res.status(500).send('Error en la ejecución del procedimiento');
  }
});

// INSERTAR PEDIDO
app.post('/insertar-pedido', async (req, res) => {
  const { folio, nombre_cliente, fecha_solicitud, fecha_entrega } = req.body;

  try {
    // Ejecuta el procedimiento almacenado
    const [result] = await db.execute(
      'CALL InsertarPedido(?, ?, ?, ?, @p_id_pedido)',
      [folio, nombre_cliente, fecha_solicitud, fecha_entrega]
    );

    // Recupera el valor de la variable de salida
    const [rows] = await db.execute('SELECT @p_id_pedido AS id_pedido');
    const idPedido = rows[0].id_pedido;

    // Si el idPedido es null, significa que hubo un error al insertar el pedido
    if (!idPedido) {
      throw new Error('No se pudo insertar el pedido');
    }

    // Envía la respuesta al cliente con el id_pedido
    res.json({ id_pedido: idPedido });
  } catch (error) {
    console.error('Error al insertar pedido:', error);

    // Si el error tiene un mensaje específico, lo enviamos
    const errorMessage = error.message.includes('folio ya existe')
      ? 'El folio ya existe para este cliente en el mismo año'
      : 'Error al insertar pedido';

    // Envia el error al cliente
    res.status(500).json({ error: errorMessage, details: error.message });
  }
});

// INSERTAR PRODUCTOS
app.post('/insertar-detalle-pedido', async (req, res) => {
  const { id_pedido, nombre_producto, cantidad_solicitada, dimension, observaciones, status_pedido } = req.body;

  try {
    const query = 'CALL InsertarDetallePedido(?, ?, ?, ?, ?, ?)';
    await db.execute(query, [id_pedido, nombre_producto, cantidad_solicitada, dimension, observaciones, status_pedido]);
    res.status(200).json({ message: 'Detalle del pedido insertado correctamente' });
  } catch (error) {
    console.error('Error al insertar el detalle del pedido:', error);
    return res.status(500).json({ error: 'Error al insertar el detalle del pedido' });
  }
});

//End point ver pasos
app.get('/obtener-detalles/:idDetallePedidoProducto', async (req, res) => {
  const start = Date.now();
  const { idDetallePedidoProducto } = req.params;

  try {
    const [results] = await pool.execute('CALL ObtenerDetallesPorIdPedidoProducto(?)', [idDetallePedidoProducto]);
    const end = Date.now();

    if (results && results[0] && results[0].length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'No se encontraron resultados para el ID proporcionado' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
});

// Ver productos por Cliente
app.get('/ver-producto-por-cliente/:id_cliente', async (req, res) => {
  const start = Date.now();
  const { id_cliente } = req.params;

  try {
    // Ejecutar el procedimiento almacenado ver_producto_por_cliente
    const [results] = await pool.execute('CALL ver_producto_por_cliente(?)', [id_cliente]);

    const end = Date.now();
    const duration = end - start;

    console.log(`Tiempo de ejecución de la consulta: ${duration}ms`);

    // Verificar si se encontraron productos
    if (results && results[0] && results[0].length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron productos para el cliente proporcionado' });
    }
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// VISUALIZAR CLIENTES
app.get('/obtener-clientes', async (req, res) => {
  const query = 'CALL ver_cliente()';  // Llamamos al procedimiento almacenado

  try {
    const [results] = await db.execute(query);
    res.json(results[0]);  // Devolvemos los resultados que contienen los clientes
  } catch (err) {
    console.error('Error al obtener clientes:', err);
    return res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

//ELIMINAR PRODUCTOS DE UN PEDIDO CON LOS PASOS CORRESPONDIENTES AL PRODUCTO
app.delete('/eliminar-detalle-pedido-producto/:id', async (req, res) => {
  const idDetallePedidoProducto = req.params.id;

  try {
    // Ejecutar el procedimiento almacenado con el parámetro proporcionado
    const [result] = await db.execute(
      'CALL EliminarDetallePedidoProducto(?)',
      [idDetallePedidoProducto]
    );

    res.status(200).json({
      message: 'Detalle de pedido producto eliminado exitosamente',
      result
    });
  } catch (error) {
    console.error("Error al eliminar el detalle de pedido producto:", error);
    res.status(500).json({
      message: 'Error al eliminar el detalle de pedido producto',
      error
    });
  }
});

//ACTUALIZAR CANTIDAD RELAIZADA EN PASOS
app.put('/actualizar-detalle-pasos-pedido/:id', async (req, res) => {
  const { id } = req.params;  // El id_detalle_pasos_pedido
  const { cantidad_terminada, codigo_usuario } = req.body;
  console.log('cantidad:', { cantidad_terminada }, 'codigo:', { codigo_usuario });

  try {
    if (!cantidad_terminada || !codigo_usuario) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
    }

    const sql = `CALL ActualizarDetallePasosPedido(?, ?, ?)`;

    // Aquí usamos pool.execute directamente, no hace falta llamar a promise()
    await pool.execute(sql, [id, cantidad_terminada, codigo_usuario]);

    res.status(200).json({ message: 'Detalle de paso de pedido actualizado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar los detalles del paso del pedido' });
  }
});

//ELIMINAR PEDIDOS

app.delete('/eliminar-pedido/:id', async (req, res) => {
  const idPedido = req.params.id;

  try {
    // Ejecutar el procedimiento almacenado con el parámetro proporcionado
    const [result] = await db.execute(
      'CALL EliminarPedido(?)',
      [idPedido]
    );

    res.status(200).json({
      message: 'Pedido  eliminado exitosamente',
      result
    });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).json({
      message: 'Error al eliminar el pedido ',
      error
    });
  }
});

//Editar detalle pedido
app.put('/editar-detalle-pedido-producto/:id', async (req, res) => {
  const { id } = req.params; // id_detalle_pedido_producto
  const { cantidad_solicitada, status_pedido, observaciones } = req.body;

  console.log("Recibiendo datos:", { id, cantidad_solicitada, status_pedido, observaciones }); // Log para depuración

  try {
    // Validar que al menos un campo esté presente
    if (cantidad_solicitada == null && status_pedido == null && observaciones == null) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
    }

    // Construir la consulta SQL dinámicamente
    let fields = [];
    let values = [];

    if (cantidad_solicitada != null) {
      fields.push("cantidad_solicitada = ?");
      values.push(cantidad_solicitada);
    }

    if (status_pedido != null) {
      fields.push("status_pedido = ?");
      values.push(status_pedido);
    }

    if (observaciones != null) {
      fields.push("observaciones = ?");
      values.push(observaciones);
    }

    // Incluir el ID al final de los valores
    values.push(id);

    const sql = `UPDATE detalle_pedido_producto SET ${fields.join(", ")} WHERE id_detalle_pedido_producto = ?`;

    // Ejecutar la consulta
    await pool.execute(sql, values);

    res.status(200).json({ message: 'Producto actualizado exitosamente' });

  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: 'Error al actualizar los detalles del Producto' });
  }
});



//Ver Historial
app.get('/visualizar-historial/:id_detalle_pasos_pedido', async (req, res) => {
  const start = Date.now();
  const { id_detalle_pasos_pedido } = req.params;

  try {
    const [results] = await pool.execute('CALL visualizar_historial(?)', [id_detalle_pasos_pedido]);
    const end = Date.now();

    if (results && results[0] && results[0].length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'No se encontraron resultados para el ID proporcionado' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en la consulta a la base de datos' });
  }
});

// Editar las fechas del pedido
app.put('/actualizar-fechas', async (req, res) => {
  const { id_pedido, fecha_solicitud, fecha_entrega } = req.body;

  try {
    const [result] = await db.execute(
      'CALL ActualizarFechasPedido(?, ?, ?)',
      [id_pedido, fecha_solicitud, fecha_entrega]
    );

    res.json({ message: 'Fechas actualizadas correctamente' });
  } catch (error) {
    console.error('Error al actualizar fechas:', error);
    res.status(500).json({ error: 'Error al actualizar fechas', details: error.message });
  }
});

//MOSTRAR PEDIDOS POR AÑO
app.get('/mostrar-pedidos-anio/:anio', async (req, res) => {
  const { anio } = req.params;

  try {
    // Validar que el parámetro anio es un número
    if (isNaN(anio)) {
      return res.status(400).json({ error: 'El parámetro año debe ser un número válido.' });
    }

    // Crear la conexión a la base de datos
    const db = await mysql.createConnection(dbConfig);

    // Ejecutar el procedimiento almacenado
    const [rows] = await db.execute(
      'CALL mostrar_pedidos_y_efectividad(?)',
      [parseInt(anio, 10)]
    );

    // Cerrar la conexión
    await db.end();

    // Devolver los datos obtenidos
    res.status(200).json(rows[0]); // `rows[0]` contiene los resultados del SELECT en el procedimiento.
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});
//MOSTRAR PEDIDOS POR AÑO
app.get('/mostrar-pedidos-anio-completos/:anio', async (req, res) => {
  const { anio } = req.params;

  try {
    // Validar que el parámetro anio es un número
    if (isNaN(anio)) {
      return res.status(400).json({ error: 'El parámetro año debe ser un número válido.' });
    }

    // Crear la conexión a la base de datos
    const db = await mysql.createConnection(dbConfig);

    // Ejecutar el procedimiento almacenado
    const [rows] = await db.execute(
      'CALL mostrar_pedidos_completos(?)',
      [parseInt(anio, 10)]
    );

    // Cerrar la conexión
    await db.end();

    // Devolver los datos obtenidos
    res.status(200).json(rows[0]); // `rows[0]` contiene los resultados del SELECT en el procedimiento.
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

//MOSTRAR SETADISTICAS POR CLIENTE Y AÑO
app.get('/mostrar-porcentaje-anio/:anio', async (req, res) => {
  const { anio } = req.params;

  try {
    // Validar que el parámetro anio es un número
    if (isNaN(anio)) {
      return res.status(400).json({ error: 'El parámetro año debe ser un número válido.' });
    }

    // Crear la conexión a la base de datos
    const db = await mysql.createConnection(dbConfig);

    // Ejecutar el procedimiento almacenado
    const [rows] = await db.execute(
      'CALL ObtenerEfectividadTotalPorAno(?)',
      [parseInt(anio, 10)]
    );

    // Cerrar la conexión
    await db.end();

    // Devolver los datos obtenidos
    res.status(200).json(rows[0]); // `rows[0]` contiene los resultados del SELECT en el procedimiento.
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

//Efectividad por folio
app.get('/efectividad/:id_cliente/:anio', async (req, res) => {
  const { id_cliente, anio } = req.params;

  try {
    // Validar que el parámetro 'anio' es un número
    if (isNaN(anio)) {
      return res.status(400).json({ error: 'El parámetro año debe ser un número válido.' });
    }

    // Validar que el parámetro 'id_cliente' es un número
    if (isNaN(id_cliente)) {
      return res.status(400).json({ error: 'El parámetro id_cliente debe ser un número válido.' });
    }

    // Crear la conexión a la base de datos
    const db = await mysql.createConnection(dbConfig);

    // Ejecutar el procedimiento almacenado con los dos parámetros
    const [rows] = await db.execute(
      'CALL ObtenerEfectividadPorPedidoPorCliente(?, ?)',
      [parseInt(id_cliente, 10), parseInt(anio, 10)]
    );

    // Cerrar la conexión
    await db.end();

    // Devolver los datos obtenidos
    res.status(200).json(rows[0]); // `rows[0]` contiene los resultados del SELECT en el procedimiento.
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Ver productos por Cliente ID Producto
// Ruta para obtener la tabla inicial de estados
app.get('/productos_pk', async (req, res) => {
  try {
    const [results] = await db.query('CALL ver_clientes_y_productos()');
    res.json(results[0]);
  } catch (err) {
    console.error('Error al obtener los datos:', err);
    return res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Rutas
app.get('/obtener-pasos/:idProducto', async (req, res) => {
  const { idProducto } = req.params;

  try {
    // Validar que el parámetro idProducto es válido
    if (!idProducto || isNaN(idProducto)) {
      return res.status(400).json({ error: 'El parámetro idProducto es obligatorio y debe ser un número válido.' });
    }

    // Crear la conexión a la base de datos
    const db = await mysql.createConnection(dbConfig);

    // Ejecutar el procedimiento almacenado
    const [rows] = await db.execute(
      'CALL ObtenerPasosPorProducto(?)',
      [parseInt(idProducto)] // Aseguramos que el parámetro es un número entero
    );

    // Verificar si se obtuvo un resultado
    if (rows && rows.length > 0) {
      // Si el procedimiento devuelve varios resultados, extraer el primero (ya que es el relevante)
      return res.status(200).json(rows[0]);
    } else {
      return res.status(404).json({ error: 'No se encontraron pasos para el producto con ese ID.' });
    }

    // Cerrar la conexión
    await db.end();
  } catch (error) {
    console.error('Error al ejecutar el procedimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener Pasos
app.get('/pasos_general', async (req, res) => {
  try {
    const [results] = await db.query('CALL Pasos()');
    res.json(results[0]);
  } catch (err) {
    console.error('Error al obtener los datos:', err);
    return res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Actualizar pasos
app.put('/actualizar-relacion-ruta/:idRuta', (req, res) => {
  const { id_producto, id_paso } = req.body; // Datos del cuerpo de la petición
  const { idRuta } = req.params; // Obtener idRuta de los parámetros de la URL

  // Validación de los parámetros recibidosw
  if (!idRuta || !id_producto || !id_paso) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Llamada al procedimiento almacenado
  const query = 'CALL actualizar_relacion_ruta(?, ?, ?)';
  db.query(query, [idRuta, id_producto, id_paso], (err, results) => {
    if (err) {
      console.error('Error al actualizar la relación:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    res.status(200).json({
      message: 'Relación actualizada exitosamente',
      results
    });
  });
});

// Agregar un nuevo Paso a la Ruta
app.post('/agregar-paso', async (req, res) => {
  const { id_producto, nombre_paso } = req.body;

  try {
    // Ejecutar el procedimiento para insertar el nuevo paso
    const [result] = await db.execute(
      'CALL agregar_nuevo_paso(?, ?)', // Llamada al procedimiento 'agregar_nuevo_paso'
      [id_producto, nombre_paso]
    );

    // Verificar si el paso fue insertado correctamente
    if (result.affectedRows === 0) {
      throw new Error('No se pudo agregar el paso');
    }

    // Si todo salió bien, enviar una respuesta con el mensaje de éxito
    res.json({ message: 'Paso agregado exitosamente' });

  } catch (error) {
    console.error('Error al agregar paso:', error);

    // Si el error tiene un mensaje específico, lo enviamos
    const errorMessage = error.message.includes('El paso ya existe')
      ? 'El paso ya existe para este producto'
      : 'Error al agregar paso';

    // Enviar el error al cliente
    res.status(500).json({ error: errorMessage, details: error.message });
  }
});

// Eliminar Paso
app.delete('/eliminar-paso/:id_ruta', (req, res) => {
  const { id_ruta } = req.params;

  if (!id_ruta) {
    return res.status(400).json({ error: 'El parámetro id_ruta es obligatorio.' });
  }

  // Llamada al procedimiento almacenado
  db.query('CALL eliminar_paso(?)', [id_ruta], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    res.status(200).json({ message: `Paso con id_ruta ${id_ruta} eliminado exitosamente.` });
  });
});

// Agregar paso exxistente a la ruta 
app.post('/agregar-nueva-ruta', (req, res) => {
  const { id_paso, id_producto } = req.body;

  if (!id_paso || !id_producto) {
    return res.status(400).json({ error: 'id_paso and id_producto are required' });
  }

  const query = `CALL agregar_nueva_ruta(?, ?)`;

  db.execute(query, [id_paso, id_producto], (err, results) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      return res.status(500).json({ error: 'Error executing stored procedure' });
    }

    res.status(200).json({ message: 'Ruta added successfully', results });
  });
});

//Puerto a escuchar
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
