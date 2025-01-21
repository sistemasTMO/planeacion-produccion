import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/tmologo.png';
import logo2 from './images/logotmonegro.png'
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Necesario para generar tablas automáticamente

const Estadisticas = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [filtroPedido, setFiltroPedido] = useState('');
    const [filtroCliente, setFiltroCliente] = useState('');
    const [anio, setAnio] = useState(new Date().getFullYear());
    const [showModal, setShowModal] = useState(false);
    const [detalleEfectividad, setDetalleEfectividad] = useState([]); // Cambiado a un arreglo para la tabla

    const handleInicio = () => {
        navigate('/gerencia');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const fetchPedidos = async () => {
        if (anio) {
            try {
                const response = await axios.get(`http://localhost:3306/mostrar-porcentaje-anio/${anio}`);
                setPedidos(response.data);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
                Swal.fire('Error', 'Hubo un problema al obtener los pedidos.', 'error');
            }
        } else {
            setPedidos([]);
        }
    };

    useEffect(() => {
        if (anio) {
            fetchPedidos();
        }
    }, [anio]);

    const filteredPedidos = pedidos.filter((pedido) => {
        const folioStr = pedido.folio ? String(pedido.folio) : '';
        const clienteStr = pedido.nombre_cliente ? String(pedido.nombre_cliente) : '';
        return folioStr.includes(filtroPedido) && clienteStr.includes(filtroCliente);
    });

    const handleOpenModal = async (id_cliente) => {
        try {
            const response = await axios.get(`http://localhost:3306/efectividad/${id_cliente}/${anio}`);
            setDetalleEfectividad(response.data); // Guardar los datos obtenidos
            setShowModal(true);
        } catch (error) {
            console.error('Error al obtener los detalles del cliente:', error);
            Swal.fire('Error', 'Hubo un problema al obtener los detalles del cliente.', 'error');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDetalleEfectividad([]);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const img = new Image();
        img.src = logo2;

        img.onload = () => {
            // Añadir el logotipo
            doc.addImage(img, 'PNG', 10, 5, 30, 13);

            // Título centrado
            const pageWidth = doc.internal.pageSize.width;
            const title = 'Detalle de Efectividad';
            const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
            doc.text(title, titleX, 20);

            // Obtener solo la fecha actual
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toLocaleDateString();

            // Mostrar fecha actual alineada a la izquierda
            doc.text(`Fecha: ${fechaFormateada}`, 10, 30);

            // Nombre del cliente y porcentaje total
            const nombreCliente = detalleEfectividad[0]?.nombre_cliente || 'Cliente Desconocido';
            const porcentajeTotal = pedidos.find(p => p.id_cliente === detalleEfectividad[0]?.id_cliente)?.porcentaje_efectividad_total || 'N/A';

            // Mostrar cliente y porcentaje total
            doc.text(`Cliente: ${nombreCliente}`, 10, 40);
            doc.text(`Porcentaje Total de Efectividad: ${porcentajeTotal}`, 10, 50);

            // Configuración de la tabla
            const headers = ['Folio', 'Productos Completos', 'Productos Cancelados', 'Productos Solicitados', 'Efectividad'];
            const data = detalleEfectividad.map((detalle) => [
                detalle.folio,
                detalle.productos_completos,
                detalle.productos_cancelados,
                detalle.productos_solicitados,
                detalle.porcentaje_completos
            ]);

            doc.autoTable({
                head: [headers],
                body: data,
                startY: 60,
                styles: { cellPadding: 3, fontSize: 10, halign: 'center' },
                headStyles: { fillColor: [255, 216, 0], textColor: [0, 0, 0], fontStyle: 'bold' }
            });

            doc.save(`detalle_efectividad_${nombreCliente.replace(/\s+/g, '_')}.pdf`);
        };
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
                    </button>
                </div>
            </div>

            <h1 className='text-center flex-grow-1' style={{ marginLeft: '-50px', marginTop: '50px' }}>
                Estadistica Anual
            </h1>

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
            <div className='filtros'>
                <label htmlFor="anio" style={{ marginRight: '10px' }}>Año: </label>
                <input type="number" id="anio" value={anio} onChange={(e) => setAnio(e.target.value)} min={0} />
            </div>
            <br />

            <table className='tablaPedidos'>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Pedidos Solicitados</th>
                        <th>Productos Completos</th>
                        <th>Productos Faltantes</th>
                        <th>Productos Cancelados</th>
                        <th>Productos Urgentes</th>
                        <th>Productos Solicitados</th>
                        <th>Efectividad</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPedidos.map((pedido) => (
                        <tr key={pedido.id_cliente}>
                            <td>{pedido.nombre_del_cliente}</td>
                            <td>{pedido.total_pedidos_realizados}</td>
                            <td>{pedido.total_productos_completados}</td>
                            <td>{pedido.total_productos_faltantes}</td>
                            <td>{pedido.total_productos_cancelados}</td>
                            <td>{pedido.total_productos_urgentes}</td>
                            <td>{pedido.total_productos_solicitados}</td>
                            <td>{pedido.porcentaje_efectividad_total}</td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => handleOpenModal(pedido.id_cliente)} // Pasar el id_cliente
                                >
                                    Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050 }}>
                    <div className="modal-dialog" style={{ maxWidth: '90%', width: 'auto' }}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: '#4b4b4b', color: 'white' }}>
                                <h5 className="modal-title">Efectividad por Pedido</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Cerrar"></button>
                            </div>
                            <div className="modal-body" style={{ backgroundColor: '#4b4b4b', maxHeight: '70vh', overflowY: 'auto', padding: '15px' }}>
                                {/* Botón de descarga PDF */}
                                <button className="btn btn-danger mb-3" onClick={handleDownloadPDF}>
                                    PDF
                                </button>

                                {/* Mostrar el nombre del cliente */}
                                {detalleEfectividad.length > 0 && (
                                    <h4 className="text-center mb-3">
                                         {detalleEfectividad[0].nombre_cliente || 'Nombre Desconocido'}
                                    </h4>
                                )}

                                {/* Tabla de detalles */}
                                {detalleEfectividad.length > 0 ? (
                                    <table className="tablaPedidos" style={{ width: '100%', tableLayout: 'auto' }}>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Folio</th>
                                                <th>Productos Completos</th>
                                                <th>Productos Cancelados</th>
                                                <th>Productos Solicitados</th>
                                                <th>Efectividad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {detalleEfectividad.map((detalle, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{detalle.folio}</td>
                                                    <td>{detalle.productos_completos}</td>
                                                    <td>{detalle.productos_cancelados}</td>
                                                    <td>{detalle.productos_solicitados}</td>
                                                    <td>{detalle.porcentaje_completos}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No hay datos disponibles para este cliente.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Estadisticas;
