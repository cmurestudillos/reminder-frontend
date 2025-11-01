<template>
  <div class="listas-view">
    <Navbar />

    <div class="container">
      <div class="header">
        <h1>
          <i class="pi pi-list"></i>
          Mis Listas
        </h1>
        <Button label="Nueva Lista" icon="pi pi-plus" @click="mostrarDialogNueva = true" />
      </div>

      <div v-if="listasStore.loading" class="loading-container">
        <ProgressSpinner />
      </div>

      <div v-else-if="listasStore.listas.length === 0" class="empty-state">
        <i class="pi pi-inbox" style="font-size: 4rem; color: #ccc"></i>
        <h2>No tienes listas aún</h2>
        <p>Crea tu primera lista para empezar a organizar tus tareas</p>
        <Button label="Crear Primera Lista" icon="pi pi-plus" @click="mostrarDialogNueva = true" />
      </div>

      <div v-else class="listas-grid">
        <Card v-for="lista in listasStore.listas" :key="lista._id" class="lista-card" @click="verLista(lista._id)">
          <template #header>
            <div class="card-header-actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click.stop="editarLista(lista)" />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-danger"
                @click.stop="confirmarEliminar(lista)" />
            </div>
          </template>
          <template #title>
            {{ lista.titulo }}
          </template>
          <template #content>
            <div class="lista-info">
              <p>
                <i class="pi pi-calendar"></i>
                {{ formatearFecha(lista.creadaEn) }}
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Dialog Nueva Lista -->
    <Dialog v-model:visible="mostrarDialogNueva" header="Nueva Lista" :modal="true" :style="{ width: '450px' }">
      <div class="field">
        <label for="titulo">Título de la lista</label>
        <InputText id="titulo" v-model="nuevaLista.titulo" placeholder="Ej: Lista de compras" class="w-full" />
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarDialogNueva = false" />
        <Button label="Crear" icon="pi pi-check" @click="crearLista" />
      </template>
    </Dialog>

    <!-- Dialog Editar Lista -->
    <Dialog v-model:visible="mostrarDialogEditar" header="Editar Lista" :modal="true" :style="{ width: '450px' }">
      <div class="field">
        <label for="tituloEditar">Título de la lista</label>
        <InputText id="tituloEditar" v-model="listaEditar.titulo" placeholder="Título" class="w-full" />
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarDialogEditar = false" />
        <Button label="Guardar" icon="pi pi-check" @click="actualizarLista" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useListasStore } from '@/stores/listas';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Navbar from '@/components/Navbar.vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';

const router = useRouter();
const listasStore = useListasStore();
const toast = useToast();
const confirm = useConfirm();

const mostrarDialogNueva = ref(false);
const mostrarDialogEditar = ref(false);

const nuevaLista = reactive({
  titulo: '',
});

const listaEditar = reactive({
  _id: '',
  titulo: '',
});

// Cargar listas al montar el componente
onMounted(() => {
  listasStore.fetchListas();
});

// Crear Lista
const crearLista = async () => {
  if (!nuevaLista.titulo.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'El título es requerido',
      life: 3000,
    });
    return;
  }

  try {
    await listasStore.crearLista({ titulo: nuevaLista.titulo });
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Lista creada correctamente',
      life: 3000,
    });
    nuevaLista.titulo = '';
    mostrarDialogNueva.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al crear la lista',
      life: 3000,
    });
  }
};

// Editar Lista
const editarLista = lista => {
  listaEditar._id = lista._id;
  listaEditar.titulo = lista.titulo;
  mostrarDialogEditar.value = true;
};

// Actualizar Lista
const actualizarLista = async () => {
  if (!listaEditar.titulo.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'El título es requerido',
      life: 3000,
    });
    return;
  }

  try {
    await listasStore.actualizarLista(listaEditar._id, { titulo: listaEditar.titulo });
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Lista actualizada correctamente',
      life: 3000,
    });
    mostrarDialogEditar.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al actualizar la lista',
      life: 3000,
    });
  }
};

// Confirmar y Eliminar Lista
const confirmarEliminar = lista => {
  confirm.require({
    message: `¿Estás seguro de eliminar la lista "${lista.titulo}"?`,
    header: 'Confirmar Eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await listasStore.eliminarLista(lista._id);
        toast.add({
          severity: 'success',
          summary: 'Eliminada',
          detail: 'Lista eliminada correctamente',
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar la lista',
          life: 3000,
        });
      }
    },
  });
};

// Navegar a Detalle de Lista
const verLista = id => {
  router.push(`/listas/${id}`);
};

// Formatear Fecha
const formatearFecha = fecha => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<style scoped>
.listas-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #495057;
  margin: 0;
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

.listas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.lista-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.lista-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem;
}

.lista-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
}

.lista-info i {
  font-size: 0.9rem;
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
