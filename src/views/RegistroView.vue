<template>
  <div class="registro-container">
    <Card class="registro-card">
      <template #header>
        <div class="card-header">
          <i class="pi pi-user-plus" style="font-size: 3rem; color: #6366f1"></i>
          <h1>Crear Cuenta</h1>
          <p>Únete a Reminder hoy</p>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleRegistro">
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
              placeholder="Mínimo 6 caracteres"
              toggle-mask
              :class="{ 'p-invalid': errors.password }"
              required />
            <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
          </div>

          <div class="field">
            <label for="confirmPassword">Confirmar Contraseña</label>
            <Password
              id="confirmPassword"
              v-model="formData.confirmPassword"
              placeholder="Repite tu contraseña"
              :feedback="false"
              toggle-mask
              :class="{ 'p-invalid': errors.confirmPassword }"
              required />
            <small v-if="errors.confirmPassword" class="p-error">{{ errors.confirmPassword }}</small>
          </div>

          <Button type="submit" label="Crear Cuenta" icon="pi pi-check" :loading="loading" class="w-full" />
        </form>

        <Divider />

        <div class="text-center">
          <p>¿Ya tienes cuenta?</p>
          <Button label="Iniciar Sesión" icon="pi pi-sign-in" class="p-button-text" @click="$router.push('/login')" />
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
  confirmPassword: '',
});

const errors = ref({});
const loading = ref(false);

// Validación simple
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (formData.password.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres';
    isValid = false;
  }

  if (formData.password !== formData.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden';
    isValid = false;
  }

  return isValid;
};

// Manejar registro
const handleRegistro = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    await authStore.register({
      email: formData.email,
      password: formData.password,
    });

    toast.add({
      severity: 'success',
      summary: 'Cuenta creada',
      detail: 'Ahora puedes iniciar sesión',
      life: 3000,
    });
    router.push('/login');
  } catch (error) {
    const message = error.response?.data?.msg || 'Error al crear la cuenta';
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.registro-card {
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
