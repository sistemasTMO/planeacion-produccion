import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PrincipalPlaneacion from './components/PrincipalPlaneacion';
import FormularioPedidos from './components/FormularioPedidos';
import Detalles1 from './components/Detalles1'; // Asegúrate de que el nombre del componente sea correcto
import Pasos from './components/Pasos';
import Login from './components/Login';
import PrincipalProduccion from './components/PrincipalProduccion';
import DetallesPedido from './components/DetallesPedido';
import Pasos_Produccion from './components/Pasos_Produccion';
import PrincipalGerencia from './components/PrincipalGerencia';
import DetallesGerencia from './components/DetallesGerencia';
import Pasos_Gerencia from './components/Pasos_Gerencia';
import Estadisticas from './components/Estadisticas';
import Pasos_Coordinador from './components/Pasos_Coordinador';
import DetallesPedidoCoordinador from './components/DetallesPedidoCoordinador';
import PrincipalCoordinador from './components/PrincipalCoordinador';
import Productos from './components/Productos';
import Pasos_Productos from './components/Pasos_Productos';
import PedidosCompletosCoordinador from './components/PedidosCompletosCoordinador';
import PedidosCompletosGerencia from './components/PedidosCompletosGerencia';
import PedidosCompletosPlaneacion from './components/PedidosCompletosPlaneacion';
import PedidosCompletosProduccion from './components/PedidosCompletosProduccion';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const location = useLocation();

  // Detectar si hay token en sessionStorage al montar el componente
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(!!token); // Actualizar estado basado en el token
    setLoading(false); // Termina la carga
  }, []);

  if (loading) {
    // Mientras se verifica la autenticación, mostramos un indicador de carga
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={location.state?.from?.pathname || "/login"} replace />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route
        path="/planeacion"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PrincipalPlaneacion setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/formulario-pedidos"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <FormularioPedidos setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalles-pedido/:id_pedido" // Cambiar a :id_pedido
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Detalles1 setIsAuthenticated={setIsAuthenticated} /> {/* Pasar setIsAuthenticated */}
          </ProtectedRoute>
        }
      />

      <Route
        path="/pasos/:id_detalle_pedido_producto"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Pasos setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produccion"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PrincipalProduccion setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalles-produccion/:id_pedido"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DetallesPedido setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pasos-produccion/:id_detalle_pedido_producto"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Pasos_Produccion setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gerencia"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PrincipalGerencia setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalles-gerencia/:id_pedido"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DetallesGerencia setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pasos-gerencia/:id_detalle_pedido_producto"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Pasos_Gerencia setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/estadisticas"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Estadisticas setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coordinador"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PrincipalCoordinador setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/detalles-coordinador/:id_pedido"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DetallesPedidoCoordinador setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pasos-coordinador/:id_detalle_pedido_producto"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Pasos_Coordinador setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Productos setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pasos-productos/:idProducto"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Pasos_Productos setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedido-completo-coordinador"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PedidosCompletosCoordinador setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedido-completo-gerencia"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PedidosCompletosGerencia setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedido-completo-planeacion"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PedidosCompletosPlaneacion setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedido-completo-produccion"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PedidosCompletosProduccion setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

// Componente para proteger rutas
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Envolvemos la app en BrowserRouter
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
