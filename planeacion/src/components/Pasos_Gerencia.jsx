import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Draggable from 'react-draggable';
import logo from './images/tmologo.png';
import logo2 from './images/logotmonegro.png';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión para tablas

const Pasos_Gerencia = ({ setIsAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [codigo, setCodigo] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [showModalHistorial, setShowModalHistorial] = useState(false);
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();
  const { id_detalle_pedido_producto } = useParams();
  const [idDetallePasosPedido, setIdDetallePasosPedido] = useState(null);
  const [nombrePaso, setNombrePaso] = useState("");

  useEffect(() => {
    fetchDetalles();
  }, [id_detalle_pedido_producto]);

  const fetchDetalles = async () => {
    try {
      const response = await fetch(`http://localhost:3306/obtener-detalles/${id_detalle_pedido_producto}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setDetalles(data);
          setCantidad(data[0].cantidad_terminada);
        } else {
          console.log('No se encontraron detalles para el ID proporcionado.');
        }
      } else {
        console.error('Error al obtener detalles:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const fetchHistorial = async (idDetallePasosPedido) => {
    try {
      const response = await fetch(`http://localhost:3306/visualizar-historial/${idDetallePasosPedido}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Historial recibido:', data); // Agrega un console.log aquí para ver qué se está recibiendo
        setHistorial(data);
      } else {
        console.error('Error al obtener historial:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de historial:', error);
    }
  };

  const handleOpenModalHistorial = (detalle) => {
    if (detalle.id_detalle_pasos_pedido) {
      setIdDetallePasosPedido(detalle.id_detalle_pasos_pedido);
      fetchHistorial(detalle.id_detalle_pasos_pedido); // Llamar al endpoint de historial
      setNombrePaso(detalle.nombre_paso);  // Asignamos el nombre del paso al estado
      setShowModalHistorial(true);
    } else {
      console.error('El detalle no tiene id_detalle_pasos_pedido');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCantidad('');
    setCodigo('');
  };

  const handleCloseModalHistorial = () => {
    setShowModalHistorial(false);
    setHistorial([]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validar que la cantidad terminada no sea mayor que la cantidad solicitada
    if (cantidad > detalles[0]?.cantidad_solicitada) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad inválida',
        text: 'La cantidad terminada no puede ser mayor que la cantidad solicitada.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33',
      });
      return; // Evitar que continúe con el envío si no se cumple la condición
    }

    if (!idDetallePasosPedido) {
      console.error("id_detalle_pasos_pedido no está definido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3306/actualizar-detalle-pasos-pedido/${idDetallePasosPedido}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad_terminada: cantidad, codigo_usuario: codigo }),
      });

      if (response.ok) {
        fetchDetalles();
        handleCloseModal();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar los detalles del pedido');
      }
    } catch (error) {
      console.error('Error al editar los detalles del pedido:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#d33',
      });
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Cargar el logotipo y generar el PDF cuando esté listo
    const img = new Image();
    img.src = logo2;
    
    img.onload = () => {
      // Añadir logotipo en la esquina superior izquierda
      doc.addImage(img, 'PNG', 10, 5, 30, 13); // Ajusta la posición y tamaño según necesites
      
      // Configurar posición del título centrado
      const pageWidth = doc.internal.pageSize.width;
      const title = 'Historial de Pasos';
      
      // Calcular posición X centrada para el título
      const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
      
      // Agregar el título centrado debajo del logotipo
      doc.text(title, titleX, 20); // Posición Y debajo del logotipo
      
      // Obtener los detalles
      const folio = detalles[0]?.folio || 'Folio no disponible';
      const nombreProducto = detalles[0]?.nombre_producto || 'Nombre del producto no disponible';
      const cliente = detalles[0]?.nombre_cliente || 'Cliente no disponible';
      
      // Añadir el Folio, Producto, Cliente
      doc.text(`Folio: ${folio}`, 10, 30);
      doc.text(`Producto: ${nombreProducto}`, 10, 40);
      doc.text(`Cliente: ${cliente}`, 10, 50);
    
      // Ahora, usa el nombrePaso actualizado del historial
      doc.text(`Paso: ${nombrePaso}`, 10, 60);  // Esta es la corrección
      
      // Obtener la fecha y hora actual
      const fechaHoraActual = new Date();
      const fechaFormateada = fechaHoraActual.toLocaleString();
      
      // Definir las columnas para la tabla
      const columns = [
        { title: "No.", dataKey: "no" },
        { title: "Responsable", dataKey: "responsable_cambio" },
        { title: "Cantidad Terminado", dataKey: "cantidad_terminada" },
        { title: "Fecha", dataKey: "fecha_hora_cambio" }
      ];
      
      // Crear los datos para la tabla
      const data = historial.map((item, index) => ({
        no: index + 1,
        responsable_cambio: item.responsable_cambio,
        cantidad_terminada: item.cantidad_terminada,
        fecha_hora_cambio: item.fecha_hora_cambio
      }));
      
      // Agregar la tabla al documento PDF
      doc.autoTable({
        columns: columns,
        body: data,
        startY: 70, // Iniciar la tabla más cerca del texto anterior
        margin: { top: 30 },
        styles: {
          cellPadding: 3,
          fontSize: 10,
          halign: 'center'
        },
        headStyles: {
          fillColor: [255, 216, 0], // Color de fondo del encabezado
          halign: 'center',
          textColor: [0, 0, 0] // Color del texto
        }
      });
      
      // Generar el nombre del archivo
      const fechaHoraFormateada = fechaHoraActual.toISOString().slice(0, 10) + '_' + fechaHoraActual.toISOString().slice(11, 19).replace(/:/g, '-');
      const nombreArchivo = `historial-produccion-${fechaHoraFormateada}.pdf`;
      
      // Guardar el PDF con el nombre personalizado
      doc.save(nombreArchivo);
    };
  };
  return (
    <div className='container mt-5'>
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
          data-bs-toggle="tooltip"
          title="Cerrar Sesión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" color='red' cursor='pointer' fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
          </svg>
        </button>
      </div>

      <h1 className='text-center flex-grow-1' style={{ marginLeft: '-50px' }}>Pasos</h1>
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
      <div style={{ fontSize: '20px' }}>
        <label>Producto: {detalles[0]?.nombre_producto || 'Producto no disponible'}</label>
        <label style={{ marginLeft: '50px' }}>Fecha de Entrega: {detalles[0]?.fecha_entrega_formato || 'Fecha no disponible'}</label>
        <br /><br />
        <label style={{ marginLeft: '' }}>Dimensión: {detalles[0]?.dimension || 'Dimensión no disponible'}</label>
        <label style={{ marginLeft: '180px' }}>Cantidad Solicitada: {detalles[0]?.cantidad_solicitada || 'Dimensión no disponible'}</label>

      </div>
      <br />

      <table className='tablaPedidos'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Paso</th>
            <th>Responsable de Cambio</th>
            <th>Cantidad Finalizada</th>
            <th>Historial</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{detalle.nombre_paso}</td>
              <td>{detalle.responsable_cambio}</td>
              <td>{detalle.cantidad_terminada}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleOpenModalHistorial(detalle)}>
                  Ir a Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Modal para editar detalles */}
      {showModal && (
        <Draggable>
          <div className="modal show" style={{ display: 'block', position: 'absolute', top: '50%', right: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{backgroundColor:'#4b4b4b'}}>
                  <h5 className="modal-title">Editar detalle</h5>
                </div>
                <div className="modal-body" style={{backgroundColor:'#4b4b4b'}}>
                  <form onSubmit={handleEditSubmit}>
                    <div className="form-group">
                      <label>Cantidad Terminado</label>
                      <input
                        type="number"
                        className="form-control"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Código de Usuario</label>
                      <input
                        type="password"
                        className="form-control"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Guardar Cambios</button>
                    <button type="button" className="btn btn-secondary mt-3" style={{ marginLeft: '50px' }} onClick={handleCloseModal}>Cerrar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {/* Modal para mostrar historial */}
      {showModalHistorial && historial.length > 0 && (
        <Draggable>
          <div className="modal show" style={{ display: 'block', position: 'absolute', top: '50%', right: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{backgroundColor:'#4b4b4b', color:'white'}}>
                  <h5 className="modal-title">Historial de Pasos</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModalHistorial} aria-label="Cerrar"></button>
                </div>

                <div className="modal-body" style={{backgroundColor:'#4b4b4b'}}>
                  <h5>Paso: {nombrePaso}</h5> {/* Aquí mostramos el nombre del paso */}
                  <button className="btn btn-danger" onClick={generarPDF} style={{ marginBottom: '10px', marginTop: '5px' }}>
                    PDF
                  </button>
                  <table className="tablaPedidos">
                    <thead >
                      <tr>
                        <th>No.</th>
                        <th>Cantidad</th>
                        <th>Responsable</th>
                        <th>Fecha / Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.cantidad_terminada}</td>
                          <td>{item.responsable_cambio}</td>
                          <td>{item.fecha_hora_cambio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}



    </div>
  );
};

export default Pasos_Gerencia;
