import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import './styles.css';

const Pasos_Productos = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { idProducto } = useParams(); // Obtener el nombreProducto de la URL
  const [detalles, setDetalles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pasosProducto, setPasosProducto] = useState([]); // Guarda los pasos
  const [selectedPaso, setSelectedPaso] = useState('');
  const [currentIdRuta, setCurrentIdRuta] = useState(null); // Guarda el id_ruta actual
  const [currentIdProducto, setCurrentIdProducto] = useState(null); // Guarda el id_producto actual
  const [nombreProducto, setNombreProducto] = useState(''); // Estado para el nombre del producto
  const [showModalAddPaso, setShowModalAddPaso] = useState(false); // Estado para el nuevo modal
  const [nuevoPaso, setNuevoPaso] = useState(''); // Estado para manejar el nombre del paso
  const [showModalPasosExistente, setShowModalPasosExistente] = useState(false);

  const handleShowModalPasoExistente = async (idProducto) => {
    setShowModalPasosExistente(true);
    setShowModalAddPaso(false); // Cerrar el modal de agregar paso si está abierto
    setShowModal(false); // Cerrar el modal de orden de pasos si está abierto

    // Asignar el id_producto actual directamente desde la tabla (detalles)
    if (detalles.length > 0) {
      setCurrentIdProducto(idProducto); // Asignar el id_producto actual
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede identificar el producto actual.',
      });
      return;
    }

    // Llamada para obtener los pasos existentes
    await fetchPasosProducto();  // Esta función actualiza pasosProducto
  };


  const handleShowModalAddPaso = () => {
    if (!currentIdProducto) {
      // Si el id del producto no está definido, intenta obtenerlo del contexto actual
      if (detalles.length > 0) {
        setCurrentIdProducto(detalles[0].id_producto); // Asignar el id_producto desde detalles
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se puede identificar el producto actual.',
        });
        return;
      }
    }

    setShowModalAddPaso(true);
    setShowModal(false); // Cerrar otros modales si están abiertos
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal de orden de pasos
    setShowModalAddPaso(false); // Cerrar el modal de agregar paso
    setSelectedPaso(''); // Reiniciar la selección de paso
    setShowModalPasosExistente(false);

  };

  const handleShowModal = async (id_ruta, id_producto) => {
    setCurrentIdRuta(id_ruta);
    setCurrentIdProducto(id_producto); // Actualizar el id_producto actual
    await fetchPasosProducto();
    setShowModal(true);
    setShowModalAddPaso(false);
  };

  useEffect(() => {
    fetchPasos(); // Llamar a la función al cargar el componente
  }, [idProducto]);

  const fetchPasos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3306/obtener-pasos/${idProducto}`
      );
      setDetalles(response.data);
    } catch (error) {
      console.error('Error al obtener los pasos:', error);
    }
  };

  const fetchPasosProducto = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3306/pasos_general`
      );
      setPasosProducto(response.data); // Actualiza los pasos del producto
    } catch (error) {
      console.error('Error al obtener los pasos:', error);
    }
  };

  const handleAgregarPaso = async (e) => {
    e.preventDefault();

    if (!nuevoPaso.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, ingresa el nombre del paso',
      });
      return;
    }

    if (!currentIdProducto) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede identificar el producto actual.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3306/agregar-paso', {
        id_producto: currentIdProducto,
        nombre_paso: nuevoPaso,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.data.message,
        });

        // Recargar los pasos después de agregar uno nuevo
        await fetchPasos();

        setShowModalAddPaso(false);
        setNuevoPaso('');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Hubo un error al agregar el paso',
      });
    }
  };

  const handleAddPasosExistente = async (e) => {
    e.preventDefault();

    // Verificar que el id_paso y id_producto estén seleccionados
    if (!selectedPaso || !currentIdProducto) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, selecciona un paso y un producto.',
      });
      return;
    }

    try {
      // Realizar la solicitud POST al endpoint para agregar la nueva ruta
      const response = await axios.post('http://localhost:3306/agregar-nueva-ruta', {
        id_paso: selectedPaso,
        id_producto: currentIdProducto, // Usar currentIdProducto para el producto actual
      });

      // Si la respuesta es exitosa, muestra un mensaje de éxito
      if (response.status === 200) {
        // Actualizar los pasos inmediatamente (deberías asegurarte de que `fetchPasos` está configurado correctamente para esto)
        fetchPasos((prevPasos) => [
          ...prevPasos,
          {
            id_paso: selectedPaso,
            id_producto: currentIdProducto,
            // Agrega otros datos necesarios, como el nombre del paso o producto
          },
        ]);

        // Mostrar la alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.data.message || 'Ruta agregada correctamente',
        });

        // Cerrar el modal y limpiar los estados si es necesario
        setShowModal(false);
        setSelectedPaso(''); // Limpiar la selección del paso
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Hubo un error al agregar la nueva ruta',
      });
      console.error('Error al agregar la nueva ruta:', error);
    }
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3306/actualizar-relacion-ruta/${currentIdRuta}`,
        {
          id_producto: currentIdProducto,
          id_paso: selectedPaso,
        }
      );

      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Orden de pasos actualizado exitosamente.',
        });

        // Recargar los pasos después de la actualización
        await fetchPasos();

        setShowModal(false);
      } else {
        throw new Error('Error en la actualización');
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el orden de pasos. Intenta nuevamente.',
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleEliminarPaso = async (idRuta) => {
    try {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el paso permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmacion.isConfirmed) {
        const response = await axios.delete(`http://localhost:3306/eliminar-paso/${idRuta}`);

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: response.data.message,
          });

          // Recargar los pasos después de eliminar el paso
          await fetchPasos();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Hubo un error al eliminar el paso',
      });
    }
  };


  return (
    <div className='container mt-5'>
      {/* Encabezado y Logout */}
      <div className='d-flex justify-content-start mb-4'>
        <img
          src={logo}
          alt='Logo TMO'
          className='img-fluid'
          onClick={() => navigate('/gerencia')}
          style={{ maxWidth: '150px', cursor: 'pointer' }}
        />
      </div>

      <div className="position-absolute" style={{ top: '50px', right: '70px' }}>
        <button
          className="btn btn-light"
          onClick={handleLogout}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          title="Cerrar Sesión"
        >
          {/* Logout Icon */}
        </button>
      </div>

      <h1 className='text-center'>Ruta de Proceso</h1>

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
      <button className="btn btn-primary mb-3" onClick={handleShowModalAddPaso}>
        Agregar Nuevo Paso
      </button>

      <button
        style={{ marginLeft: '30px' }}
        className="btn btn-warning mb-3"
        onClick={() => {
          if (detalles.length > 0) {
            handleShowModalPasoExistente(detalles[0].id_producto); // Usar detalles[0].id_producto si existe
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'No se puede agregar un paso sin detalles del producto.',
            });
          }
        }}
      >
        Agregar Paso Existente
      </button>


      <br />
      <div style={{ fontSize: '20px', marginBottom: '10px' }}>
        <label><strong>Producto: {detalles[0]?.nombre_producto || ''}</strong></label>
      </div>
      <br />

      {/* Tabla de pasos */}
      <table className="tablaPedidos">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre Paso</th>
            <th>Orden Pasos</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {detalles.length > 0 ? (
            detalles.map((detalle, index) => (
              <tr key={detalle.id_paso}>
                <td>{index + 1}</td>
                <td>{detalle.nombre_paso}</td>
                <td>
                  <button
                    className='btn btn-success'
                    onClick={() => handleShowModal(detalle.id_ruta, detalle.id_producto)} // Valores dinámicos

                  >
                    Orden
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '0',
                    }}
                    title="Eliminar Paso"
                    onClick={() => handleEliminarPaso(detalle.id_ruta)} // Llamar a la función
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
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No hay pasos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <div className="modal" style={{ display: 'block' }} onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleGuardarCambios}>
              <div className="modal-content" style={{ backgroundColor: '#4b4b4b' }}>
                <div className="modal-header" style={{ backgroundColor: '#4b4b4b' }}>
                  <h5 className="modal-title">Orden de Pasos</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body" style={{ backgroundColor: '#4b4b4b' }}>
                  <label htmlFor="selectPaso">Seleccionar Paso:</label>
                  <select
                    id="selectPaso"
                    className="form-control"
                    value={selectedPaso}
                    onChange={(e) => setSelectedPaso(e.target.value)}
                  >
                    <option value="">Seleccione un paso</option>
                    {pasosProducto.map((paso) => (
                      <option key={paso.id_paso} value={paso.id_paso}>
                        {paso.nombre_paso}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#4b4b4b' }}>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para agregar paso */}
      {showModalAddPaso && (
        <div className="modal" style={{ display: 'block' }} onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAgregarPaso}>
              <div className="modal-content" style={{ backgroundColor: '#4b4b4b' }}>
                <div className="modal-header" style={{ backgroundColor: '#4b4b4b' }}>
                  <h5 className="modal-title">Agregar Nuevo Paso</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body" style={{ backgroundColor: '#4b4b4b' }}>
                  <label htmlFor="nuevoPaso">Nombre del Nuevo Paso:</label>
                  <input
                    type="text"
                    id="nuevoPaso"
                    className="form-control"
                    value={nuevoPaso}
                    onChange={(e) => setNuevoPaso(e.target.value)} // Capturar el valor del input
                  />
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#4b4b4b' }}>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModalPasosExistente && (
        <div className="modal" style={{ display: 'block' }} onClick={handleCloseModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAddPasosExistente}>
              <div className="modal-content" style={{ backgroundColor: '#4b4b4b' }}>
                <div className="modal-header" style={{ backgroundColor: '#4b4b4b' }}>
                  <h5 className="modal-title">Agregar Paso Existente</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body" style={{ backgroundColor: '#4b4b4b' }}>
                  <label htmlFor="selectPaso">Seleccionar Paso:</label>
                  <select
                    id="selectPaso"
                    className="form-control"
                    value={selectedPaso}
                    onChange={(e) => setSelectedPaso(e.target.value)}
                  >
                    <option value="">Seleccione un paso</option>
                    {pasosProducto.map((paso) => (
                      <option key={paso.id_paso} value={paso.id_paso}>
                        {paso.nombre_paso}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#4b4b4b' }}>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pasos_Productos;
