import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Draggable from 'react-draggable';
import logo from './images/tmologo.png';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la extensión para tablas

const Pasos = ({ setIsAuthenticated }) => {
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

  const handleCloseModalHistorial = () => {
    setShowModalHistorial(false);
    setHistorial([]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    // Titulo del documento
    doc.text('Historial de Pasos', 20, 10);

    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const fechaFormateada = fechaHoraActual.toLocaleString(); // Formato: "12/11/2024, 15:30:00"

    // Asegúrate de que la variable nombre_paso esté definida,
    // o reemplázala por algo que tenga el nombre del paso en detalles.
    const nombre_paso = detalles[0]?.nombre_paso;
    doc.text(`Paso: ${nombre_paso}`, 20, 20);

    // Definir las columnas para la tabla
    const columns = [
      { title: "No.", dataKey: "no" },  // Nueva columna para el número de registro
      { title: "Responsable", dataKey: "responsable_cambio" },
      { title: "Cantidad Terminado", dataKey: "cantidad_terminada" },
      { title: "Fecha", dataKey: "fecha_hora_cambio" }
    ];

    // Crear los datos para la tabla, extraídos del historial
    const data = historial.map((item, index) => ({
      no: index + 1, // Agregar el número de registro
      responsable_cambio: item.responsable_cambio,
      cantidad_terminada: item.cantidad_terminada,
      fecha_hora_cambio: item.fecha_hora_cambio
    }));

    // Agregar la tabla al documento PDF
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 30, // Definir la posición de inicio de la tabla
      margin: { top: 30 }, // Ajustar los márgenes si es necesario
      styles: { cellPadding: 3, fontSize: 10 }, // Opcional: personalizar el estilo de las celdas
    });

    // Obtener la fecha y hora formateada como "YYYY-MM-DD_HH-MM-SS"
    const fechaHoraFormateada = fechaHoraActual.toISOString().slice(0, 10) + '_' + fechaHoraActual.toISOString().slice(11, 19).replace(/:/g, '-');

    // Crear el nombre del archivo con fecha y hora
    const nombreArchivo = `historial-produccion-${fechaHoraFormateada}.pdf`;

    // Guardar el PDF con el nombre personalizado
    doc.save(nombreArchivo);
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-start mb-4'>
        <img
          src={logo}
          alt='Logo TMO'
          className='img-fluid'
          onClick={() => navigate('/planeacion')}
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
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{detalle.nombre_paso}</td>
              <td>{detalle.responsable_cambio}</td>
              <td>{detalle.cantidad_terminada}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Modal para mostrar historial */}
      {showModalHistorial && historial.length > 0 && (
        <Draggable>
          <div className="modal show" style={{ display: 'block', position: 'absolute', top: '50%', right: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{backgroundColor:'#4b4b4b'}}>
                  <h5 className="modal-title">Historial de Pasos</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModalHistorial} aria-label="Cerrar"></button>
                </div>

                <div className="modal-body">
                  <h5>Paso: {nombrePaso}</h5> {/* Aquí mostramos el nombre del paso */}
                  <button className="btn btn-danger" onClick={generarPDF} style={{ marginBottom: '10px', marginTop: '5px' }}>
                    PDF
                  </button>
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
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

export default Pasos;
