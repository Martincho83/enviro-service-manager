import { defineStore } from 'pinia';
import apiClient from '../services/api';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  // 1. STATE: Datos que almacenamos
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  
  // 2. GETTERS: Propiedades computadas del estado
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  // 3. ACTIONS: Métodos para cambiar el estado
  actions: {
    async login(credentials) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        const { accessToken, ...userData } = response.data;

        // Guardamos el token y los datos del usuario
        this.token = accessToken;
        this.user = userData;

        // Persistimos en localStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirigimos al dashboard
        router.push('/dashboard'); 
      } catch (error) {
        // Si hay un error, lo lanzamos para que el componente de login lo maneje
        console.error('Error en el login:', error);
        throw error;
      }
    },

    logout() {
      // Limpiamos el estado
      this.token = null;
      this.user = null;

      // Limpiamos localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirigimos al login
      router.push('/login');
    },
  },
});