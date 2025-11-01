<template>
  <div class="lista-detalle-view">
    <Navbar />

    <div class="container">
      <div class="header">
        <Button icon="pi pi-arrow-left" class="p-button-text" label="Volver" @click="$router.push('/listas')" />
        <h1>{{ nombreLista }}</h1>
        <Button label="Nueva Tarea" icon="pi pi-plus" @click="mostrarDialogNueva = true" />
      </div>

      <div v-if="tareasStore.loading" class="loading-container">
        <ProgressSpinner />
      </div>

      <div v-else-if="tareasStore.tareas.length === 0" class="empty-state">
        <i class="pi pi-check-square" style="font-size: 4rem; color: #ccc"></i>
        <h2>No hay tareas en esta lista</h2>
        <p>Añade tu primera tarea para comenzar</p>
        <Button label="Crear Tarea" icon="pi pi-plus" @click="mostrarDialogNueva = true" />
      </div>

      <div v-else class="tareas-list">
        <Card v-for="tarea in tareasStore.tareas" :key="tarea._id" class="tarea-card">
          <template #content>
            <div class="tarea-content">
              <Checkbox
                :modelValue="tarea.completado"
                :binary="true"
                @update:modelValue="valor => toggleTarea(tarea, valor)" />
              <div class="tarea-info" :class="{ completada: tarea.completado }">
                <p>{{ tarea.descripcion }}</p>
              </div>
              <div class="tarea-actions">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="editarTarea(tarea)" />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger p-button-sm"
                  @click="confirmarEliminar(tarea)" />
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div v-if="tareasStore.tareas.length > 0" class="footer-stats">
        <p>
          Total: {{ tareasStore.tareas.length }} tareas | Completadas: {{ tareasCompletadas }} | Pendientes:
          {{ tareasPendientes }}
        </p>
      </div>
    </div>

    <!-- Dialog Nueva Tarea -->
    <Dialog v-model:visible="mostrarDialogNueva" header="Nueva Tarea" :modal="true" :style="{ width: '450px' }">
      <div class="field">
        <label for="descripcion">Descripción</label>
        <Textarea
          id="descripcion"
          v-model="nuevaTarea.descripcion"
          rows="3"
          placeholder="Describe la tarea..."
          class="w-full" />
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarDialogNueva = false" />
        <Button label="Crear" icon="pi pi-check" @click="crearTarea" />
      </template>
    </Dialog>

    <!-- Dialog Editar Tarea -->
    <Dialog v-model:visible="mostrarDialogEditar" header="Editar Tarea" :modal="true" :style="{ width: '450px' }">
      <div class="field">
        <label for="descripcionEditar">Descripción</label>
        <Textarea
          id="descripcionEditar"
          v-model="tareaEditar.descripcion"
          rows="3"
          placeholder="Descripción"
          class="w-full" />
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarDialogEditar = false" />
        <Button label="Guardar" icon="pi pi-check" @click="actualizarTarea" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTareasStore } from '@/stores/tareas';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Navbar from '@/components/Navbar.vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import ProgressSpinner from 'primevue/progressspinner';

const route = useRoute();
const tareasStore = useTareasStore();
const toast = useToast();
const confirm = useConfirm();

const listaId = route.params.id;
const nombreLista = ref('Mi Lista');
const mostrarDialogNueva = ref(false);
const mostrarDialogEditar = ref(false);

const nuevaTarea = reactive({
  descripcion: '',
});

const tareaEditar = reactive({
  _id: '',
  descripcion: '',
});

const tareasCompletadas = computed(() => {
  return tareasStore.tareas.filter(t => t.completado).length;
});

const tareasPendientes = computed(() => {
  return tareasStore.tareas.filter(t => !t.completado).length;
});

// Cargar tareas al montar el componente
onMounted(() => {
  tareasStore.fetchTareas(listaId);
});

// Crear una nueva tarea
const crearTarea = async () => {
  if (!nuevaTarea.descripcion.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'La descripción es requerida',
      life: 3000,
    });
    return;
  }

  try {
    await tareasStore.crearTarea({
      descripcion: nuevaTarea.descripcion,
      lista: listaId,
      completado: false,
    });
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Tarea creada correctamente',
      life: 3000,
    });
    nuevaTarea.descripcion = '';
    mostrarDialogNueva.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al crear la tarea',
      life: 3000,
    });
  }
};

// Editar tarea
const editarTarea = tarea => {
  tareaEditar._id = tarea._id;
  tareaEditar.descripcion = tarea.descripcion;
  mostrarDialogEditar.value = true;
};

// Actualizar tarea
const actualizarTarea = async () => {
  if (!tareaEditar.descripcion.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'La descripción es requerida',
      life: 3000,
    });
    return;
  }

  try {
    await tareasStore.actualizarTarea(tareaEditar._id, {
      descripcion: tareaEditar.descripcion,
      completado: false,
      lista: listaId,
    });
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Tarea actualizada correctamente',
      life: 3000,
    });
    mostrarDialogEditar.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al actualizar la tarea',
      life: 3000,
    });
  }
};

// Alternar estado de completado
const toggleTarea = async (tarea, nuevoValor) => {
  const estadoAnterior = tarea.completado;

  // Actualizar el estado local inmediatamente para feedback visual
  tarea.completado = nuevoValor;

  try {
    // Actualizar en el backend con el nuevo valor
    const tareaActualizada = await tareasStore.actualizarTarea(tarea._id, {
      descripcion: tarea.descripcion,
      completado: nuevoValor, // ← Usar el nuevo valor explícitamente
      lista: listaId,
    });

    // Sincronizar con la respuesta del servidor
    if (tareaActualizada) {
      tarea.completado = tareaActualizada.completado;
    }
  } catch (error) {
    // Revertir el cambio si falla
    tarea.completado = estadoAnterior;
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al actualizar el estado',
      life: 3000,
    });
  }
};

// Confirmar y eliminar tarea
const confirmarEliminar = tarea => {
  confirm.require({
    message: '¿Estás seguro de eliminar esta tarea?',
    header: 'Confirmar Eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await tareasStore.eliminarTarea(tarea._id, listaId);
        toast.add({
          severity: 'success',
          summary: 'Eliminada',
          detail: 'Tarea eliminada correctamente',
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar la tarea',
          life: 3000,
        });
      }
    },
  });
};
</script>

<style scoped>
.lista-detalle-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.header h1 {
  flex: 1;
  color: #495057;
  margin: 0;
  text-align: center;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 4rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state h2 {
  color: #495057;
  margin: 1rem 0;
}

.empty-state p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.tareas-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tarea-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.tarea-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tarea-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tarea-info {
  flex: 1;
  transition: all 0.3s;
}

.tarea-info p {
  margin: 0;
  color: #495057;
}

.tarea-info.completada p {
  text-decoration: line-through;
  color: #999;
}

.tarea-actions {
  display: flex;
  gap: 0.25rem;
}

.footer-stats {
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  text-align: center;
}

.footer-stats p {
  margin: 0;
  color: #6c757d;
  font-weight: 500;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
  font-weight: 600;
}

.w-full {
  width: 100%;
}
</style>
