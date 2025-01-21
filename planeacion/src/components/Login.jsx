import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import logo from './images/tmologo.png';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/formulario-pedidos');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3306/login', {
                email,
                password,
            });

            console.log('Respuesta de la API:', response.data);
            const { area } = response.data;

            sessionStorage.setItem('token', 'your_generated_token'); // Cambia a un token real
            setIsAuthenticated(true);

            console.log(`Área del usuario: ${area}`);
            if (area === 'Planeacion') {
                navigate('/planeacion');
            } else if (area === 'Produccion') {
                navigate('/produccion');
            } else if (area === 'Gerencia' || area === 'Ingenieria') {
                navigate('/gerencia');
            } else if (area === 'Coordinador') {
                navigate('/coordinador');
            }else {
                Swal.fire('Área no reconocida', 'No se pudo determinar el área de trabajo', 'warning');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión', error);
            Swal.fire({
                icon: 'error',
                title: 'Credenciales incorrectas',
                text: 'Por favor verifica tu correo y contraseña.',
            });
        }
    };

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-start mb-4'>
                <img src={logo} alt='Logo TMO' className='img-fluid' style={{ maxWidth: '150px', cursor: 'pointer' }} />
            </div>
            <div className='border p-4 rounded shadow' style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', marginTop: '100px', backgroundColor:'#4b4b4b' }}>
                <h2>Inicio de Sesion</h2>
                <br />
                <form className='row g-3' onSubmit={handleLogin}>
                    <div className="col-12">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12 position-relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ border: 'none', background: 'transparent' }}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-eye"
                                    viewBox="0 0 16 16"
                                    color='black'

                                >
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-eye-fill"
                                    viewBox="0 0 16 16"
                                    className="bi bi-eye-slash"
                                    color='black'>

                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="col-12 d-grid">
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
