import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue';
import router from './router';

// Iconos de PrimeVue
import 'primeicons/primeicons.css';

// Estilos personalizados
import './assets/styles/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
  ripple: true,
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
