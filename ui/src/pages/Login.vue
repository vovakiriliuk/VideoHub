<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push('/videos');
  } catch (err) {
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-header">
          <h1>Welcome <span class="text-green">Back</span></h1>
          <p>Login to manage your video library and share new content.</p>
        </div>
        
        <div class="form-body">
          <div class="form-group">
            <label>Email Address</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-envelope"></i>
              <input v-model="email" type="email" required placeholder="your@email.com" />
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-lock"></i>
              <input v-model="password" type="password" required placeholder="••••••••" />
            </div>
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" :disabled="authStore.loading" class="btn btn-primary btn-block">
            <i class="fas fa-sign-in-alt"></i>
            {{ authStore.loading ? 'Authenticating...' : 'Login to Account' }}
          </button>
          <p class="auth-switch">
            Don't have an account? <router-link to="/register">Create one now</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 1rem;
}

.auth-container {
  max-width: 480px;
  width: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--accent-green-border);
  padding: clamp(1.5rem, 8vw, 3.5rem);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  background: linear-gradient(165deg, var(--bg-secondary), rgba(34, 197, 94, 0.03));
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h1 {
  margin-bottom: 0.5rem;
}

.text-green { color: var(--accent-green); }

.form-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: 0.25rem;
}

.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon-wrapper i {
  position: absolute;
  left: 1.2rem;
  color: var(--accent-green);
  opacity: 0.6;
  pointer-events: none;
}

input {
  padding-left: 3.2rem !important;
}

.btn-block {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.auth-switch {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.auth-switch a {
  color: var(--accent-green);
  font-weight: 600;
}

@media (max-width: 480px) {
  .form-header h1 { font-size: 2rem; }
  .form-header p { font-size: 0.9rem; }
}
</style>
