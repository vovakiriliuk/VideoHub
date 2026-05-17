import { defineStore } from 'pinia';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    addToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      
      setTimeout(() => {
        this.removeToast(id);
      }, 5000);
    },
    removeToast(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    success(message: string) {
      this.addToast(message, 'success');
    },
    error(message: string) {
      this.addToast(message, 'error');
    },
    info(message: string) {
      this.addToast(message, 'info');
    },
  },
});
