import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import Swal from 'sweetalert2';

const PedidosCompletosPlaneacion = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [filtroPedido, setFiltroPedido] = useState(''); // Estado para filtrar por folio
  const [filtroCliente, setFiltroCliente] = useState(''); // Estado para filtrar por cliente
  const [anio, setAnio] = useState(new Date().getFullYear()); // Estado para almacenar el año, por defecto el año actual

  const handleInicio = () => {
    navigate('/planeacion');
  };

  const handleAgregarPedido = () => {
    navigate('/formulario-pedidos');
  };

  const handleDetalles = (id) => {
    navigate(`/detalles-pedido/${id}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null); // Estado para almacenar el id_pedido seleccionado
  const [fechaSolicitud, setFechaSolicitud] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  const handleOpenModal = (idPedido, fechaSolicitud, fechaEntrega) => {
    setSelectedPedidoId(idPedido); // Guardar el id del pedido
    setFechaSolicitud(fechaSolicitud); // Inicializar las fechas en el modal
    setFechaEntrega(fechaEntrega); // Inicializar las fechas en el modal
    setShowModal(true); // Mostrar el modal
  };
  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedPedidoId(null); // Limpiar el id seleccionado
    setFechaSolicitud(''); // Limpiar la fecha
    setFechaEntrega(''); // Limpiar la fecha
  };


  const handleGuardarCambios = async () => {
    try {
      const response = await fetch('http://localhost:3306/actualizar-fechas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pedido: selectedPedidoId,
          fecha_solicitud: fechaSolicitud,
          fecha_entrega: fechaEntrega,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Mostrar una alerta de éxito
        Swal.fire({
          title: '¡Éxito!',
          text: data.message || 'Las fechas se actualizaron correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        });

        handleCloseModal(); // Cerrar el modal después de actualizar

        // Re-fetch de los pedidos después de la actualización
        fetchPedidos();

      } else {
        // Mostrar una alerta de error
        Swal.fire({
          title: 'Error',
          text: data.error || 'Hubo un problema al actualizar las fechas.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar las fechas.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d33',
      });
    }
  };

  // Función para hacer el re-fetch de los pedidos

  const fetchPedidos = async () => {
    if (anio) {
      try {
        const response = await axios.get(`http://p3plzcpnl506561.prod.phx3.secureserver.net:3306/mostrar-pedidos-anio-completos/${anio}`);
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
        return '#00d5ff';//Azul en Proceso
      case 'No Iniciado':
        return '#ff9100'; // Anaranjado para no realizado
      case 'Completo':
        return '00e904'; // Verde para completo
      default:
        return 'black'; // Color por defecto
    }
  };


  // Función para eliminar un pedido
  const handleEliminarPedido = async (idPedido) => {
    const token = sessionStorage.getItem('token');

    // Mostrar confirmación antes de eliminar el pedido
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este pedido será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      try {
        // Llamar al endpoint DELETE para eliminar el pedido
        const response = await axios.delete(`http://p3plzcpnl506561.prod.phx3.secureserver.net:3306/eliminar-pedido/${idPedido}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // Eliminar el pedido de la lista localmente si la respuesta es exitosa
          setPedidos((prevPedidos) =>
            prevPedidos.filter((pedido) => pedido.id_pedido !== idPedido)
          );

          // Mostrar el mensaje de éxito de SweetAlert
          await Swal.fire('Eliminado', 'El pedido ha sido eliminado.', 'success');
        } else {
          throw new Error('Error al eliminar el pedido');
        }
      } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el pedido.', 'error');
      }
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

        <button
          className='btn btn-success'
          style={{ position: 'absolute', top: '50px', right: '10px', marginRight: '200px', marginTop: '50px' }}
          onClick={handleAgregarPedido}
        >
          Agregar Pedido
        </button>

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

      <h1 className='text-center flex-grow-1' style={{ marginLeft: '-50px', marginTop: '50px', color:'white' }}>
        Pedidos Completos
      </h1>
      <br />
      <div className='clasificacionColor' style={{color:'white'}}>
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
      <div style={{color:'white'}}> 
        <label htmlFor="" style={{ marginRight: '10px' }}>Pedido: </label>
        <input type="text" value={filtroPedido} onChange={(e) => setFiltroPedido(e.target.value)} />
        <label htmlFor="" style={{ marginRight: '10px', marginLeft: '50px' }}>Cliente: </label>
        <input type="text" value={filtroCliente} onChange={(e) => setFiltroCliente(e.target.value)} />
        <label htmlFor="anio" style={{marginRight: '10px', marginLeft:'50px' }}>Año: </label>
        <input type="number" id="anio" value={anio} onChange={(e) => setAnio(e.target.value)} min={0} />
        <button className='btn btn-primary' onClick={handleInicio} style={{marginLeft:'50px' }}>Pedidos</button>

      </div>
      <br />

      <table className='tablaPedidos'>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Fecha de Solicitud</th>
            <th>Fecha de Entrega</th>
            <th>Estado Pedido</th>
            <th>Detalles</th>
            <th>Editar</th>
            <th>Eliminar</th>
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
              <td>
                <button
                  onClick={() => handleOpenModal(pedido.id_pedido, pedido.fecha_solicitud, pedido.fecha_entrega)} // Pasa el id_pedido al hacer clic
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                    color="cyan"
                    cursor="pointer"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5H2.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 0-1 0v6z" />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  disabled={pedido.eliminando} // Deshabilitar el botón mientras se está eliminando
                  onClick={() => handleEliminarPedido(pedido.id_pedido)}
                  style={{
                    cursor: pedido.eliminando ? 'not-allowed' : 'pointer',
                    opacity: pedido.eliminando ? 0.5 : 1,
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
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{backgroundColor:'#4b4b4b'}}>
                <h5 className="modal-title">Fechas Pedido</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body"style={{backgroundColor:'#4b4b4b'}}>
                <div className="form-group">
                  <label htmlFor="fecha_solicitud">Fecha de Solicitud</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_solicitud"
                    value={fechaSolicitud}
                    onChange={(e) => setFechaSolicitud(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="fecha_entrega">Fecha de Entrega</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_entrega"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer" style={{backgroundColor:'#4b4b4b'}}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleGuardarCambios}>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PedidosCompletosPlaneacion;
