import { defineStore } from 'pinia';
import { ref } from 'vue';
import listasService from '@/services/listasService';

export const useListasStore = defineStore('listas', () => {
  const listas = ref([]);
  const loading = ref(false);

  // Obtener listas
  async function fetchListas() {
    loading.value = true;
    try {
      listas.value = await listasService.getListas();
    } finally {
      loading.value = false;
    }
  }

  // Crear lista
  async function crearLista(listaData) {
    loading.value = true;
    try {
      const response = await listasService.crearLista(listaData);
      listas.value.unshift(response.lista);
      return response;
    } finally {
      loading.value = false;
    }
  }

  // Actualizar lista
  async function actualizarLista(id, listaData) {
    loading.value = true;
    try {
      const response = await listasService.actualizarLista(id, listaData);
      const index = listas.value.findIndex(l => l._id === id);
      if (index !== -1) {
        listas.value[index] = response.lista;
      }
      return response;
    } finally {
      loading.value = false;
    }
  }

  // Eliminar lista
  async function eliminarLista(id) {
    loading.value = true;
    try {
      await listasService.eliminarLista(id);
      listas.value = listas.value.filter(l => l._id !== id);
    } finally {
      loading.value = false;
    }
  }

  return {
    listas,
    loading,
    fetchListas,
    crearLista,
    actualizarLista,
    eliminarLista,
  };
});
