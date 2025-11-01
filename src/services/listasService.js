import api from './api';

export default {
  // Obtener todas las listas
  async getListas() {
    const response = await api.get('/listas');
    return response.data.listas;
  },

  // Obtener una lista por ID
  async getLista(id) {
    const response = await api.get(`/listas/${id}`);
    return response.data.lista;
  },

  // Crear lista
  async crearLista(listaData) {
    const response = await api.post('/listas', listaData);
    return response.data;
  },

  // Actualizar lista
  async actualizarLista(id, listaData) {
    const response = await api.put(`/listas/${id}`, listaData);
    return response.data;
  },

  // Eliminar lista
  async eliminarLista(id) {
    const response = await api.delete(`/listas/${id}`);
    return response.data;
  },
};
