import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormularioPedidos = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isFirstFormValid, setIsFirstFormValid] = useState(false);
  const [pedidoData, setPedidoData] = useState({
    folio: '',
    nombre_cliente: '',
    fecha_solicitud: '',
    fecha_entrega: '',
    id_pedido: null, // Asegurarse de inicializar id_pedido
  });

  // Cambios en la función eliminarProducto para manejar el estado `eliminando`
  const eliminarProducto = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33', // Rojo para eliminar
      cancelButtonColor: '#ccc', // Gris para cancelar
      reverseButtons: true, // Invertir botones para que el de eliminar esté a la izquierda
    });

    if (isConfirmed) {
      try {
        // Llamada al backend para eliminar el producto
        const response = await fetch(`http://localhost:3306/eliminar-detalle-pedido-producto/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Eliminar el producto de la lista localmente
          setDetallesPedido((prevDetalles) => prevDetalles.filter((producto) => producto.id_detalle_pedido_producto !== id));

          Swal.fire({
            icon: 'success',
            title: '¡Producto eliminado!',
            text: 'El producto se ha eliminado correctamente.',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#3085d6', // Color azul para cerrar
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el producto.',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#d33', // Rojo para el error
          });
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar el producto.',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const [clientes, setClientes] = useState([]);
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [productos, setProductos] = useState([]); // Nuevo estado para productos
  const modalRef = useRef(null);

  // Cargar los clientes
  useEffect(() => {
    const loadClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3306/obtener-clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    };

    loadClientes();
  }, []);

  const handleInicio = () => {
    navigate('/planeacion');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleFirstFormSubmit = async (e) => {
    e.preventDefault();

    const { folio, nombre_cliente, fecha_solicitud, fecha_entrega } = pedidoData;

    if (!folio || !nombre_cliente || !fecha_solicitud || !fecha_entrega) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3306/insertar-pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'El folio ya existe para este cliente en el mismo año') {
          Swal.fire({
            icon: 'error',
            title: 'El folio ya existe',
            text: 'El folio ya existe para este cliente en el mismo año',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Folio ya existente',
            text: data.message || 'El folio ya existe con el mismo cliente',
          });
        }
        return;
      }

      const pedidoId = data.id_pedido;

      if (!pedidoId) {
        console.error('ID del pedido no recibido');
        return;
      }

      setPedidoData((prevData) => ({
        ...prevData,
        id_pedido: pedidoId,
      }));

      setIsFirstFormValid(true);
      await loadDetallesPedido(pedidoId);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al insertar el pedido: ' + error.message,
      });
    }
  };

  const loadDetallesPedido = async (idPedido) => {
    try {
      const response = await fetch(`http://localhost:3306/obtener-detalles-pedido/${idPedido}`);
      if (!response.ok) {
        throw new Error('Error al cargar los detalles del pedido: ' + response.statusText);
      }

      const data = await response.json();
      setDetallesPedido(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar los detalles del pedido: ' + error.message);
    }
  };

  // Nueva función para obtener productos por cliente
  const loadProductosPorCliente = async (id_cliente) => {
    try {
      const response = await fetch(`http://localhost:3306/ver-producto-por-cliente/${id_cliente}`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos del cliente: ' + response.statusText);
      }

      const data = await response.json();
      setProductos(data); // Actualiza los productos
    } catch (error) {
      console.error(error);
      alert('Error al cargar los productos: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPedidoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Cargar productos cuando se selecciona un cliente
    if (name === 'nombre_cliente' && value) {
      const clienteSeleccionado = clientes.find((cliente) => cliente.nombre_cliente === value);
      if (clienteSeleccionado) {
        loadProductosPorCliente(clienteSeleccionado.id_cliente); // Llamar al endpoint con el id_cliente
      }
    }
  };

  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();

    const nombreProducto = e.target.nombreProducto.value.trim();
    const cantidad = e.target.cantidad.value;
    const dimension = e.target.dimension.value.trim();
    const observaciones = e.target.observaciones.value;
    const status_pedido = e.target.status_pedido.value;

    if (!nombreProducto || !cantidad || !dimension) {
      alert('Por favor, completa todos los campos del producto.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3306/insertar-detalle-pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pedido: pedidoData.id_pedido,
          nombre_producto: nombreProducto,
          cantidad_solicitada: cantidad,
          dimension,
          observaciones: observaciones,
          status_pedido,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      await loadDetallesPedido(pedidoData.id_pedido);
    } catch (error) {
      console.error(error);
      alert('Error al agregar el producto: ' + error.message);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-start mb-4'>
        <img
          src={logo}
          alt='Logo TMO'
          className='img-fluid'
          onClick={handleInicio}
          style={{ maxWidth: '150px', cursor: 'pointer' }}
        />
      </div>

      <div className="position-absolute" style={{ top: '50px', right: '70px' }}>
        <button
          className="btn btn-light"
          onClick={handleLogout}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          data-bs-toggle="tooltip"
          title="Cerrar Sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" color='red' className="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
          </svg>
        </button>
      </div>

      <h1 className='text-center mb-4'>Formulario de Pedidos</h1>
      <div>
        <button
          className='regresarPagina'
          onClick={() => window.history.back()}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          title='Regresar'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </button>
      </div>
      <br />
      <div className='border p-4 rounded shadow'>
        <form className='row g-3' onSubmit={handleFirstFormSubmit}>
          <div className='col-md-6 form-group'>
            <div className='form-floating'>
              <input type='text' className='form-control custom-input' id='folio' name='folio' placeholder=' ' value={pedidoData.folio} onChange={handleInputChange} required />
              <label htmlFor='folio'>Folio</label>
            </div>
          </div>

          <div className='col-md-6 form-group'>
            <div className='form-floating'>
              <select className='form-control custom-input' id='nombre_cliente' name='nombre_cliente' value={pedidoData.nombre_cliente} onChange={handleInputChange} required>
                <option value=''>Seleccione un Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.nombre_cliente}>
                    {cliente.nombre_cliente}
                  </option>
                ))}
              </select>
              <label htmlFor='nombre_cliente'>Nombre del Cliente</label>
            </div>
          </div>

          <div className='col-md-6 form-group'>
            <div className='form-floating'>
              <input type='date' className='form-control custom-input' id='fechaSolicitud' name='fecha_solicitud' value={pedidoData.fecha_solicitud} onChange={handleInputChange} required />
              <label htmlFor='fechaSolicitud'>Fecha de Solicitud</label>
            </div>
          </div>

          <div className='col-md-6 form-group'>
            <div className='form-floating'>
              <input type='date' className='form-control custom-input' id='fechaEntrega' name='fecha_entrega' value={pedidoData.fecha_entrega} onChange={handleInputChange} required />
              <label htmlFor='fechaEntrega'>Fecha de Entrega</label>
            </div>
          </div>

          <div style={{ marginLeft: '50px' }} className='col-2'>
            <button type='submit' className='btn btn-primary w-100'>
              Crear Pedido
            </button>
          </div>
        </form>
      </div>

      {isFirstFormValid && (
        <div className='mt-4'>
          <h4>Agregar Productos</h4>
          <form onSubmit={handleSecondFormSubmit}>
            <div className='form-group'>
              <select className='form-control mb-3' id='nombreProducto' name='nombreProducto' required>
                <option value=''>Seleccione un Producto</option>
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <option key={producto.id_producto} value={producto.nombre_producto}>
                      {producto.nombre_producto}
                    </option>
                  ))
                ) : (
                  <option>No hay productos disponibles</option>
                )}
              </select>
              <label htmlFor="">Cantidad:</label>
              <input type='number' className='form-control mb-3' id='cantidad' name='cantidad' placeholder='Cantidad' />
              <label htmlFor="">Dimension:</label>
              <input type='text' className='form-control mb-3' id='dimension' name='dimension' placeholder='Dimensión' />
              <label htmlFor="">Observaciones:</label>
              <input type='text' className='form-control mb-3' id='observaciones' name='observaciones' placeholder='Observaciones' />
              <label htmlFor=""> Estado del Producto:</label>
              <select name="status_pedido" id="status_pedido" className="form-control mb-3">
                <option value="0">No iniciado</option>
                <option value="2">Urgente</option>
              </select>


            </div>
            <button type='submit' className='btn btn-success'>Agregar Producto</button>
            <button style={{ marginLeft: '100px' }} className='btn btn-warning' onClick={handleInicio}>Finalizar Pedido</button>

          </form>
          {detallesPedido.length > 0 && (
            <div className="mt-4">
              <h5>Detalles del Pedido</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del Producto</th>
                    <th scope="col">Cantidad Solicitada</th>
                    <th scope="col">Dimensión</th>
                    <th scope="col">Observación</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesPedido.map((detalle, index) => (
                    <tr key={detalle.id_detalle_pedido_producto}>
                      <th scope="row">{index + 1}</th>
                      <td>{detalle.nombre_producto}</td>
                      <td>{detalle.cantidad_solicitada}</td>
                      <td>{detalle.dimension}</td>
                      <td>{detalle.observaciones}</td>

                      <td>
                        <button
                          onClick={() => eliminarProducto(detalle.id_detalle_pedido_producto)}
                          disabled={detalle.eliminando} // Deshabilita el botón mientras se está eliminando
                          style={{
                            cursor: detalle.eliminando ? 'not-allowed' : 'pointer',
                            opacity: detalle.eliminando ? 0.5 : 1,
                            backgroundColor: 'transparent', // Fondo transparente para estilo de icono
                            border: 'none',
                            padding: '0',
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            fill="currentColor"
                            class="bi bi-trash-fill"
                            color='red'
                            cursor='pointer'
                            viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              <br />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormularioPedidos;
