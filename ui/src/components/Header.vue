<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { useWidth } from '../hooks/useWidth';

const authStore = useAuthStore();
const router = useRouter();
const { width } = useWidth();
const menuOpen = ref(false);

const isMobile = computed(() => width.value <= 768);

const handleLogout = () => {
  authStore.logout();
  menuOpen.value = false;
  router.push('/login');
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<template>
  <header class="header-content">
    <div class="logo">
      <router-link to="/" @click="closeMenu">
        <i class="fas fa-play-circle logo-icon"></i>
        <span class="logo-text">Video</span><span class="logo-accent">Hub</span>
      </router-link>
    </div>

    <button 
      class="burger" 
      @click="toggleMenu" 
      :class="{ open: menuOpen }"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav :class="{ open: menuOpen }">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/videos" class="nav-link" @click="closeMenu">
            <i class="fas fa-compass"></i> <span>Browse</span>
          </router-link>
        </li>
        
        <template v-if="authStore.isAuthenticated">
          <li class="nav-item">
            <router-link to="/my-videos" class="nav-link" @click="closeMenu">
              <i class="fas fa-video"></i> <span>My Library</span>
            </router-link>
          </li>
          
          <li class="nav-item user-item">
            <div class="user-section">
              <span class="user-greeting">
                 <i class="fas fa-user-circle"></i> {{ authStore.user?.username }}
              </span>
              <button @click="handleLogout" class="btn-logout" title="Logout">
                <i class="fas fa-sign-out-alt"></i>
                <span class="mobile-only-text">Logout</span>
              </button>
            </div>
          </li>
        </template>
        
        <template v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" @click="closeMenu">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="btn-register" @click="closeMenu">Get Started</router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-content {
  background: rgba(10, 10, 11, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100px;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.logo {
  flex-shrink: 0;
}

.logo a {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon { color: var(--accent-green); }
.logo-text { color: var(--text-primary); }
.logo-accent { color: var(--accent-green); }

nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin-left: 40px;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  font-size: 0.95rem;
}

.nav-link:hover, .router-link-active {
  color: var(--accent-green);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid var(--border-color);
}

.user-greeting {
  font-weight: 600;
  color: var(--accent-blue);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.btn-register {
  background: var(--accent-green-bg);
  color: var(--accent-green) !important;
  border: 1px solid var(--accent-green-border);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-register:hover {
  background: var(--accent-green);
  color: var(--bg-main) !important;
}

.btn-logout {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-logout:hover {
  border-color: #ff4d4d;
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.burger span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--accent-green);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.burger:hover { border-color: var(--accent-green); }

.burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .header-content {
    height: 80px;
    padding: 0 1.5rem;
    position: relative;
  }

  .burger { display: flex; }

  nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-left: 0;
    background: rgba(10, 10, 11, 0.98);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--border-color);
    max-height: 0;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.2s ease, padding 0.3s ease;
    display: block;
  }

  nav.open {
    max-height: 500px;
    opacity: 1;
    pointer-events: auto;
    padding: 20px 1.5rem;
  }

  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    padding: 1rem 0;
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .user-item {
    margin-top: 10px;
  }

  .user-section {
    flex-direction: column;
    align-items: stretch;
    padding-left: 0;
    border-left: none;
    gap: 1rem;
  }

  .btn-logout {
    width: 100%;
    justify-content: flex-start;
    padding: 0 1rem;
    height: 50px;
  }

  .mobile-only-text { display: inline; margin-left: 10px; }

  .btn-register {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    padding: 1rem;
  }
}
</style>
