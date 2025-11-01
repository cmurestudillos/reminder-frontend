import api from './api';

export default {
  // Registro de usuario
  async register(userData) {
    const response = await api.post('/usuarios', userData);
    return response.data;
  },

  // Login
  async login(credentials) {
    const response = await api.post('/auth', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  // Obtener usuario autenticado
  async getAuthUser() {
    const response = await api.get('/auth');
    return response.data.usuario;
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken');
  },

  // Verificar si hay token
  hasToken() {
    return !!localStorage.getItem('authToken');
  },
};
