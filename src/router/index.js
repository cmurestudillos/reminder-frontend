import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/listas',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('@/views/RegistroView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/listas',
    name: 'Listas',
    component: () => import('@/views/ListasView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/listas/:id',
    name: 'ListaDetalle',
    component: () => import('@/views/ListaDetalleView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación
router.beforeEach(async to => {
  const authStore = useAuthStore();

  // Si hay token pero no usuario, verificar primero
  if (!authStore.user && authStore.hasToken()) {
    await authStore.checkAuth(); // ← Espera aquí
  }

  const isAuthenticated = authStore.isAuthenticated;

  // Ruta requiere autenticación
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login' };
  }
  // Ruta requiere ser invitado (no autenticado)
  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'Listas' };
  }
  // Continuar normalmente
  return true;
});

export default router;
