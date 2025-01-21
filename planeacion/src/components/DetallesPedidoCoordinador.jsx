import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';

const DetallesPedidoCoordinador = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { id_pedido } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const modalRef = useRef(null);
  const [folio, setFolio] = useState(null);
  const [nombre_cliente, setNombreCliente] = useState(null);
  const [id_cliente, setIdCliente] = useState(null);


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
    navigate('/coordinador');
  };

  const handlePasos = (id_detalle_pedido_producto) => {
    navigate(`/pasos-coordinador/${id_detalle_pedido_producto}`);
  };


  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
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
          style={{ border: 'none', background: 'none' }}
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
                  {product.cantidad_finalizada || "0"}
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

    </div>
  );
};

export default DetallesPedidoCoordinador;
