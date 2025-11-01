<template>
  <div id="app">
    <Toast />
    <ConfirmDialog />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

const authStore = useAuthStore();

onMounted(() => {
  // Verificar si hay un usuario autenticado al cargar la app
  authStore.checkAuth();
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
