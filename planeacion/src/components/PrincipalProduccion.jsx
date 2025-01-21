import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import Swal from 'sweetalert2';

const PrincipalProduccion = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [filtroPedido, setFiltroPedido] = useState(''); // Estado para filtrar por folio
  const [filtroCliente, setFiltroCliente] = useState(''); // Estado para filtrar por cliente
  const [anio, setAnio] = useState(new Date().getFullYear()); // Estado para almacenar el año, por defecto el año actual

  const handleInicio = () => {
    navigate('/produccion');
  };

  const handleDetalles = (id) => {
    navigate(`/detalles-produccion/${id}`);
  };

  const handleCompletos = () => {
    navigate('/pedido-completo-produccion');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchPedidos = async () => {
    if (anio) {
      try {
        const response = await axios.get(`http://localhost:3306/mostrar-pedidos-anio/${anio}`);
        setPedidos(response.data); // Actualizar el estado de los pedidos con los nuevos datos
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        Swal.fire('Error', 'Hubo un problema al obtener los pedidos.', 'error');
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

  // Función para obtener el color del estado del producto
  const getColorByEstado = (estado_pedido) => {
    switch (estado_pedido) {
      case 'Urgente':
        return 'red'; // Rojo para urgente
      case 'En Proceso':
        return '#00d5ff';
      case 'No Iniciado':
        return '#ff9100'; // Anaranjado para no realizado
      case 'Completo':
        return '00e904'; // Verde para completo
        case 'Cancelado':
        return '00e904';
      default:
        return 'black'; // Color por defecto
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
        Pedidos
      </h1>
      <br />
      <div className='clasificacionColor'>
        <div className="estado-item">
          <label htmlFor="">Urgente:</label>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" color='red' className="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>

          <label htmlFor="" style={{ marginLeft: '15px' }}>No Iniciado:</label>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" color='#ff9100' className="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>

          <label htmlFor="" style={{ marginLeft: '15px' }}>En Proceso:</label>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" color='#00d5ff' className="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>

          <label htmlFor="" style={{ marginLeft: '15px' }}>Completo:</label>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" color='#00e904' className="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
      </div>

      <br />
      <div>
        <label htmlFor="" style={{ marginRight: '10px' }}>Pedido: </label>
        <input type="text" value={filtroPedido} onChange={(e) => setFiltroPedido(e.target.value)} />
        <label htmlFor="" style={{ marginRight: '10px', marginLeft: '50px' }}>Cliente: </label>
        <input type="text" value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)} />
        <label htmlFor="anio" style={{marginRight: '10px', marginLeft:'50px' }}>Año: </label>
        <input type="number" id="anio" value={anio} onChange={(e) => setAnio(e.target.value)} min={0} />
        <button className='btn btn-success' onClick={handleCompletos} style={{marginLeft:'50px' }}>Pedidos Completos</button>
      </div>
      <br />

      <table className='tablaPedidos'>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Fecha de Solicitud</th>
            <th>Fecha de Entrega</th>
            <th>Estado Pedido</th> {/* Nueva columna para el estado del producto */}
            <th>Detalles</th>

          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map((pedido) => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.folio}</td>
              <td>{pedido.nombre_cliente}</td>
              <td>{pedido.fecha_solicitud_formateada}</td>
              <td>{pedido.fecha_entrega_formateada}</td>
              <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                  style={{ color: getColorByEstado(pedido.estado_pedido) }}>

                  <circle cx="8" cy="8" r="8" />
                </svg>
              </td>
              <td>
                <button className='btn btn-primary' onClick={() => handleDetalles(pedido.id_pedido)}>
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

export default PrincipalProduccion;
