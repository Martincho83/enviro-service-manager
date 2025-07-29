import axios from 'axios';

// 1. Crear una instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api', // La URL base de nuestro backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Configurar un interceptor para añadir el token a cada petición
// Un interceptor es una función que se ejecuta ANTES de que una petición se envíe.
apiClient.interceptors.request.use(
  (config) => {
    // Obtenemos el token de localStorage (que guardaremos al hacer login)
    const token = localStorage.getItem('token');
    if (token) {
      // Si el token existe, lo añadimos al header de autorización
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Devolvemos la configuración para que la petición continúe
  },
  (error) => {
    // Si hay un error en la configuración, rechazamos la promesa
    return Promise.reject(error);
  }
);

export default apiClient;