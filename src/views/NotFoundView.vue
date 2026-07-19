<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <i class="pi pi-exclamation-triangle" style="font-size: 5rem; color: #f59e0b"></i>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Button label="Volver al inicio" icon="pi pi-home" @click="$router.push('/listas')" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.not-found-content {
  text-align: center;
  padding: 2rem;
}

.not-found-content h1 {
  font-size: 6rem;
  color: #495057;
  margin: 1rem 0 0;
}

.not-found-content h2 {
  color: #6c757d;
  margin: 0.5rem 0;
}

.not-found-content p {
  color: #999;
  margin: 1rem 0 2rem;
}
</style>
