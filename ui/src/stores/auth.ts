import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from './toast';

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth`;

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        this.token = response.data.access_token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token as string);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.error = null;
        toast.success(`Welcome back, ${this.user?.username}!`);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Login failed';
        toast.error(this.error || 'Login failed');
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async register(username: string, email: string, password: string) {
      const toast = useToastStore();
      this.loading = true;
      try {
        await axios.post(`${API_URL}/register`, { username, email, password });
        this.error = null;
        toast.success('Account created successfully!');
        await this.login(email, password);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Registration failed';
        toast.error(this.error || 'Registration failed');
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      const toast = useToastStore();
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info('Logged out successfully');
    },
  },
});
