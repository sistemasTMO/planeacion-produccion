import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import Swal from 'sweetalert2';

const Detalles1 = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { id_pedido } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [folio, setFolio] = useState(null);
  const [nombre_cliente, setNombreCliente] = useState(null);
  const [id_cliente, setIdCliente] = useState(null);
  const [productos, setProductos] = useState([]); // Nuevo estado para productos
  const [selectedProducto, setSelectedProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [dimension, setDimension] = useState('');
  const [showModalEdit, setShowModalEdit] = useState(false);  // Agrega el estado para el modal de edición
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para almacenar el producto seleccionado para editar
  const [observaciones, setObservacion] = useState('');
  const [statusPedido, setStatusPedido] = useState(1); // Valor por defecto 1

  const handleEdit = (product) => {
    setSelectedProduct(product);  // Save selected product for editing
    setCantidad(product.cantidad_solicitada || '');  // Pre-populate form fields
    setDimension(product.dimension || '');  // Pre-populate dimension field
    setShowModalEdit(true);  // Show the modal
    setObservacion(product.observaciones);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);  // Cierra el modal de edición
    setSelectedProduct(null); // Limpia el producto seleccionado
  };
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(`Fetching order details for id_pedido: ${id_pedido}`);
        const response = await fetch(`http://localhost:3306/obtener-detalles-pedido/${id_pedido}`);

        if (!response.ok) {
          throw new Error('Error fetching order details');
        }

        const data = await response.json();
        console.log("Data fetched from server:", data);
        setOrderDetails(data);

        if (data.length > 0) {
          setFolio(data[0].folio);
          setNombreCliente(data[0].nombre_cliente);
          setIdCliente(data[0].id_cliente);
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        alert('Error al cargar los detalles del pedido.');
      }
    };

    if (id_pedido) {
      fetchOrderDetails();
    }
  }, [id_pedido]);

  const handleInicio = () => {
    navigate('/planeacion');
  };

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

  const eliminarProducto = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33', // Color rojo para la acción de eliminar
      cancelButtonColor: '#ccc', // Color gris para cancelar
      reverseButtons: true, // Para invertir el orden de los botones
    });

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3306/eliminar-detalle-pedido-producto/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setOrderDetails((prevDetalles) => prevDetalles.filter((producto) => producto.id_detalle_pedido_producto !== id));
          Swal.fire({
            icon: 'success',
            title: '¡Producto eliminado!',
            text: 'El producto se ha eliminado correctamente.',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#3085d6',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el producto.',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#d33',
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

  const handlePasos = (id_detalle_pedido_producto) => {
    navigate(`/pasos/${id_detalle_pedido_producto}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducto('');
    setCantidad('');
    setDimension('');
  };

  const handleOpenModal = () => {
    setShowModal(true);
    loadProductosPorCliente(id_cliente); // Cargar productos al abrir el modal
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validaciones más estrictas
    if (!selectedProducto) {
      Swal.fire("Error", "Por favor, selecciona un producto.", "error");
      return;
    }
  
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
      Swal.fire("Error", "Por favor, ingresa una cantidad válida.", "error");
      return;
    }
  
    if (!dimension.trim()) {
      Swal.fire("Error", "Por favor, ingresa la dimensión.", "error");
      return;
    }
  
    try {
      const payload = {
        id_pedido, // Debe estar definido
        nombre_producto: selectedProducto,
        cantidad_solicitada: parseInt(cantidad),
        dimension: dimension.trim(), // Remueve espacios en blanco extra
        observaciones: observaciones || "", // Envía cadena vacía si no hay valor
        status_pedido: statusPedido, // Valor por defecto numérico
      };
  
      console.log("Payload enviado al backend:", payload);
  
      const response = await fetch('http://localhost:3306/insertar-detalle-pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        Swal.fire("Éxito", result.message, "success");
  
        const updatedOrderDetailsResponse = await fetch(`http://localhost:3306/obtener-detalles-pedido/${id_pedido}`);
        if (updatedOrderDetailsResponse.ok) {
          const updatedData = await updatedOrderDetailsResponse.json();
          setOrderDetails(updatedData);
        }
  
        handleCloseModal();
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.error || "Error al insertar el detalle del pedido.", "error");
      }
    } catch (error) {
      console.error("Error al insertar el detalle del pedido:", error);
      Swal.fire("Error", "Hubo un problema al insertar el detalle del pedido.", "error");
    }
  };
  
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    // Validación de la cantidad
    if (!cantidad || isNaN(cantidad) || parseInt(cantidad) <= 0) {
      console.error('Por favor, ingresa una cantidad válida.');
      return;
    }

    // Validación de la selección del producto
    if (!selectedProduct) {
      console.error('Producto no seleccionado.');
      return;
    }

    try {
      // Crear el cuerpo dinámicamente, excluyendo campos vacíos
      const bodyData = {
        cantidad_solicitada: cantidad ? parseInt(cantidad) : undefined,
        status_pedido: selectedProduct.status_pedido || undefined,
        observaciones: observaciones || undefined,
      };

      // Limpiar los valores `undefined` del objeto
      const sanitizedBody = Object.fromEntries(
        Object.entries(bodyData).filter(([_, value]) => value !== undefined)
      );

      // Realizar la actualización del producto
      const response = await fetch(`http://localhost:3306/editar-detalle-pedido-producto/${selectedProduct.id_detalle_pedido_producto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.error || 'Error al actualizar el producto.');
        return;
      }

      // Si la actualización fue exitosa, muestra el mensaje de éxito
      const result = await response.json();
      console.log(result.message);

      // Mostrar la alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El producto ha sido editado con éxito.',
        confirmButtonText: 'Aceptar',
      });

      // Actualizar los detalles del pedido de manera optimizada
      const updatedOrderDetailsResponse = await fetch(`http://localhost:3306/obtener-detalles-pedido/${id_pedido}`);
      if (updatedOrderDetailsResponse.ok) {
        const updatedData = await updatedOrderDetailsResponse.json();
        setOrderDetails(updatedData); // Actualiza el estado con los detalles más recientes
      } else {
        console.error('Error al obtener los detalles actualizados del pedido.');
      }

      // Cerrar el modal de edición después de la actualización
      handleCloseModalEdit();
    } catch (error) {
      console.error('Error al actualizar el detalle del pedido:', error);
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

      <h1 className='text-center flex-grow-1'>Pedido</h1>
      <br />

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
      <div>
        <label>Folio: {folio}</label>
        <br />
        <label>Cliente: {nombre_cliente}</label>
      </div>
      <br />

      <button className="btn btn-primary mb-3" onClick={handleOpenModal}>
        Agregar Producto
      </button>

      <table className='tablaPedidos'>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad Solicitada</th>
            <th>Cantidad Finalizada</th>
            <th>Dimension</th>
            <th>Estado</th>
            <th>Observación</th>
            <th>Pasos</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderDetails) && orderDetails.length > 0 ? (
            orderDetails.map((product) => (
              <tr key={product.id_detalle_pedido_producto}>
                <td
                  style={{
                    textDecoration: product.status_pedido_descripcion === "Cancelado" ? "line-through" : "none",
                  }}
                >
                  {product.nombre_producto}
                </td>
                <td
                  style={{
                    textDecoration: product.status_pedido_descripcion === "Cancelado" ? "line-through" : "none",
                  }}
                >
                  {product.cantidad_solicitada}
                </td>
                <td
                  style={{
                    textDecoration: product.status_pedido_descripcion === "Cancelado" ? "line-through" : "none",
                  }}
                >
                  {product.cantidad_terminada || "0"}
                </td>
                <td
                  style={{
                    textDecoration: product.status_pedido_descripcion === "Cancelado" ? "line-through" : "none",
                  }}
                >
                  {product.dimension}
                </td>
                <td
                  style={{
                    textDecoration: product.status_pedido_descripcion,
                  }}
                >
                  {product.status_pedido_descripcion}
                </td>
                <td
                  style={{
                    textDecoration: product.status_pedido_descripcion === "Cancelado" ? "line-through" : "none",
                  }}
                >
                  {product.observaciones}
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handlePasos(product.id_detalle_pedido_producto)}
                    disabled={product.status_pedido_descripcion === "Cancelado"}
                    style={{
                      cursor: product.status_pedido_descripcion === "Cancelado" ? "no-drop" : "pointer",
                      opacity: product.status_pedido_descripcion === "Cancelado" ? 0.5 : 1,
                    }}
                  >
                    Ver Pasos
                  </button>
                </td>
                <td>
                  {/* El ícono de editar siempre estará disponible */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                    color="cyan"
                    cursor="pointer"
                    onClick={() => handleEdit(product)} // Open modal with selected product
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5H2.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 0-1 0v6z"
                    />
                  </svg>
                </td>
                <td>
                  <button
                    onClick={() => eliminarProducto(product.id_detalle_pedido_producto)}
                    disabled={product.eliminando}
                    style={{
                      cursor: product.eliminando ? "not-allowed" : "pointer",
                      opacity: product.eliminando ? 0.5 : 1,
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "0",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      color="red"
                      cursor="pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No hay detalles de pedido disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Modal */}

{showModal && (
  <div className="modal" style={{ display: 'block' }} ref={modalRef} onClick={handleCloseModal}>
    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: '#4b4b4b' }}>
            <h5 className="modal-title">Agregar Producto</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Cerrar"></button>
          </div>
          <div className="modal-body" style={{ backgroundColor: '#4b4b4b' }}>
            <div>
              <label htmlFor="nombreProducto">Nombre del Producto:</label>
              <select
                className='form-control mb-3'
                id='nombreProducto'
                value={selectedProducto}
                onChange={(e) => setSelectedProducto(e.target.value)}
                required
              >
                <option value=''>Seleccione un Producto</option>
                {productos.map((producto) => (
                  <option key={producto.id_producto} value={producto.nombre_producto}>
                    {producto.nombre_producto}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
                min="1"
              />
            </div>
            <div>
              <label htmlFor="dimension">Dimensión:</label>
              <input
                type="text"
                className="form-control"
                id="dimension"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="observaciones">Observaciones:</label>
              <textarea
                className="form-control"
                id="observaciones"
                value={observaciones}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status_pedido" className="form-label">Estado del Pedido</label>
              <select
                id="status_pedido"
                className="form-control"
                value={statusPedido}
                onChange={(e) => setStatusPedido(parseInt(e.target.value))}
              >
                <option value="1">No Iniciado</option>
                <option value="2">Urgente</option>
              </select>
            </div>
          </div>
          <div className="modal-footer" style={{ backgroundColor: '#4b4b4b' }}>
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </div>
      </form>
    </div>
  </div>
)}

      {showModalEdit && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#4b4b4b' }}>
                <h5 className="modal-title">Editar Producto</h5>
              </div>
              <div className="modal-body" style={{ backgroundColor: '#4b4b4b' }}>
                <form onSubmit={handleSubmitEdit}>
                  <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad Solicitada</label>
                    <input
                      type="number"
                      id="cantidad"
                      className="form-control"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      required // Este sí debe ser obligatorio
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status_pedido" className="form-label">Estado del Pedido</label>
                    <select
                      id="status_pedido"
                      className="form-control"
                      value={selectedProduct ? selectedProduct.status_pedido : ''}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, status_pedido: e.target.value })}
                    >
                      <option value="">Seleccione una opción:</option>
                      <option value="2">Urgente</option>
                      <option value="4">Cancelado</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="observaciones" className="form-label">Observaciones</label>
                    <input
                      type="text"
                      id="observaciones"
                      className="form-control"
                      value={observaciones}
                      onChange={(e) => setObservacion(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer" style={{ backgroundColor: '#4b4b4b' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModalEdit}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Detalles1;
