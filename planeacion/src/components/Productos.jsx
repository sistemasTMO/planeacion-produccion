import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import Swal from 'sweetalert2';

const Productos = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [filtroPedido, setFiltroPedido] = useState(''); // Estado para filtrar por folio
  const [filtroCliente, setFiltroCliente] = useState(''); // Estado para filtrar por cliente
  const [anio, setAnio] = useState(new Date().getFullYear()); // Estado para almacenar el año, por defecto el año actual

  const handleInicio = () => {
    navigate('/gerencia');
  };

  const handleDetalles = (nombreProducto) => {
    navigate(`/pasos-productos/${nombreProducto}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchPedidos = async () => {
    if (anio) {
      try {
        const response = await axios.get(`http://localhost:3306/productos_pk`);
        setPedidos(response.data); // Actualizar el estado de los pedidos con los nuevos datos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        Swal.fire('Error', 'Hubo un problema al obtener los productos.', 'error');
      }
    } else {
      // Si no se ha seleccionado un año, no se hace la solicitud                                                                                 
      setPedidos([]);
    }
  };

  useEffect(() => {
    if (anio) {
      fetchPedidos(); // Realizar la solicitud cuando se seleccione un año
    }
  }, [anio]); // Se ejecuta cada vez que cambia el año

  // Filtrar pedidos
  const filteredPedidos = pedidos.filter((pedido) => {
    const folioStr = pedido.folio ? String(pedido.folio) : '';
    const clienteStr = pedido.nombre_cliente ? String(pedido.nombre_cliente) : '';
    return folioStr.includes(filtroPedido) && clienteStr.includes(filtroCliente);
  });

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
      </div>

      <h1 className='text-center flex-grow-1' style={{ marginLeft: '-50px', marginTop: '50px' }}>
        Productos
      </h1>

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

        <label htmlFor="" style={{ marginRight: '10px', marginLeft: '0px' }}>Cliente: </label>
        <input type="text" value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)} />

      </div>
      <br />

      <table className='tablaPedidos'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map((pedido, index) => (
            <tr key={pedido.id_pedido}>
              <td>{index + 1}</td>
              <td>{pedido.nombre_cliente}</td>
              <td>{pedido.nombre_producto}</td>
              <td>
                <button
                  className='btn btn-primary'
                  onClick={() => handleDetalles(pedido.id_producto)}
                >
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

    </div>
  );
};
export default Productos;