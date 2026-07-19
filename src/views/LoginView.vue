<template>
  <div class="login-container">
    <Card class="login-card">
      <template #header>
        <div class="card-header">
          <i class="pi pi-check-circle" style="font-size: 3rem; color: #6366f1"></i>
          <h1>Reminder</h1>
          <p>Gestiona tus tareas de forma eficiente</p>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleLogin">
          <div class="field">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="tu@email.com"
              :class="{ 'p-invalid': errors.email }"
              required />
            <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
          </div>

          <div class="field">
            <label for="password">Contraseña</label>
            <Password
              id="password"
              v-model="formData.password"
              placeholder="Tu contraseña"
              :feedback="false"
              toggle-mask
              :class="{ 'p-invalid': errors.password }"
              required />
            <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
          </div>

          <Button
            type="submit"
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            :loading="authStore.loading"
            class="w-full" />
        </form>

        <Divider />

        <div class="text-center">
          <p>¿No tienes cuenta?</p>
          <Button
            label="Crear cuenta"
            icon="pi pi-user-plus"
            class="p-button-text"
            @click="$router.push('/registro')" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const formData = reactive({
  email: '',
  password: '',
});

const errors = ref({});

// Manejar el inicio de sesión
const handleLogin = async () => {
  errors.value = {};

  try {
    await authStore.login(formData);
    toast.add({
      severity: 'success',
      summary: 'Bienvenido',
      detail: 'Inicio de sesión exitoso',
      life: 3000,
    });
    router.push('/listas');
  } catch (error) {
    const message = error.response?.data?.msg || 'Error al iniciar sesión';
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.card-header {
  text-align: center;
  padding: 2rem 1rem 1rem;
}

.card-header h1 {
  margin: 1rem 0 0.5rem;
  color: #495057;
  font-size: 2rem;
}

.card-header p {
  color: #6c757d;
  margin: 0;
}

.field {
  margin-bottom: 1.5rem;
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

.text-center {
  text-align: center;
}

.text-center p {
  margin-bottom: 0.5rem;
  color: #6c757d;
}
</style>
