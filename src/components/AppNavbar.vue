<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="navbar-brand">
        <i class="pi pi-check-circle"></i>
        <span>Reminder</span>
      </div>

      <div class="navbar-actions">
        <span class="user-email">{{ authStore.user?.email }}</span>
        <Button icon="pi pi-sign-out" label="Cerrar Sesión" class="p-button-text" @click="handleLogout" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Manejar cierre de sesión
const handleLogout = () => {
  authStore.logout();
  toast.add({
    severity: 'info',
    summary: 'Sesión cerrada',
    detail: 'Has cerrado sesión correctamente',
    life: 3000,
  });
  router.push('/login');
};
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
}

.navbar-brand i {
  font-size: 2rem;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  color: #6c757d;
  font-weight: 500;
}

@media (max-width: 768px) {
  .navbar-content {
    padding: 1rem;
  }

  .user-email {
    display: none;
  }
}
</style>
