import api from './api';

export default {
  // Obtener tareas de una lista
  async getTareas(listaId) {
    const response = await api.get('/tareas', {
      params: { lista: listaId },
    });
    return response.data.tareas;
  },

  // Crear tarea
  async crearTarea(tareaData) {
    const response = await api.post('/tareas', tareaData);
    return response.data.tarea;
  },

  // Actualizar tarea
  async actualizarTarea(id, tareaData) {
    const response = await api.put(`/tareas/${id}`, tareaData);
    return response.data.tarea;
  },

  // Eliminar tarea
  async eliminarTarea(id, listaId) {
    const response = await api.delete(`/tareas/${id}`, {
      params: { lista: listaId },
    });
    return response.data;
  },
};
