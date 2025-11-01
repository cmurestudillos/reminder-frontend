import { defineStore } from 'pinia';
import { ref } from 'vue';
import tareasService from '@/services/tareasService';

export const useTareasStore = defineStore('tareas', () => {
  const tareas = ref([]);
  const loading = ref(false);

  // Obtener tareas de una lista
  async function fetchTareas(listaId) {
    loading.value = true;
    try {
      tareas.value = await tareasService.getTareas(listaId);
    } finally {
      loading.value = false;
    }
  }

  // Crear tarea
  async function crearTarea(tareaData) {
    loading.value = true;
    try {
      const tarea = await tareasService.crearTarea(tareaData);
      tareas.value.unshift(tarea);
      return tarea;
    } finally {
      loading.value = false;
    }
  }

  // Actualizar tarea
  async function actualizarTarea(id, tareaData) {
    loading.value = true;
    try {
      const tareaActualizada = await tareasService.actualizarTarea(id, tareaData);
      const index = tareas.value.findIndex(t => t._id === id);
      if (index !== -1) {
        tareas.value[index] = tareaActualizada;
      }
      return tareaActualizada;
    } finally {
      loading.value = false;
    }
  }

  // Eliminar tarea
  async function eliminarTarea(id, listaId) {
    loading.value = true;
    try {
      await tareasService.eliminarTarea(id, listaId);
      tareas.value = tareas.value.filter(t => t._id !== id);
    } finally {
      loading.value = false;
    }
  }

  // Limpiar tareas (por ejemplo, al cambiar de lista)
  function limpiarTareas() {
    tareas.value = [];
  }

  return {
    tareas,
    loading,
    fetchTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    limpiarTareas,
  };
});
