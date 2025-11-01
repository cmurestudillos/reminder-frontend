import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  // Registrar nuevo usuario
  async function register(userData) {
    loading.value = true;
    try {
      const data = await authService.register(userData);
      return data;
    } finally {
      loading.value = false;
    }
  }

  // Iniciar sesión
  async function login(credentials) {
    loading.value = true;
    try {
      await authService.login(credentials);
      await fetchUser();
    } finally {
      loading.value = false;
    }
  }

  // Obtener usuario autenticado
  async function fetchUser() {
    if (!authService.hasToken()) {
      user.value = null;
      return;
    }

    try {
      user.value = await authService.getAuthUser();
    } catch (error) {
      user.value = null;
      authService.logout();
    }
  }

  // Verificar si hay token y obtener usuario
  async function checkAuth() {
    if (authService.hasToken()) {
      await fetchUser();
    }
  }

  // Cerrar sesión
  function logout() {
    authService.logout();
    user.value = null;
  }

  // Verificar si hay token
  function hasToken() {
    return authService.hasToken();
  }

  return {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    fetchUser,
    checkAuth,
    logout,
    hasToken,
  };
});
