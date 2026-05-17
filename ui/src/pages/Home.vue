<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Elevate Your <span class="text-green">Streaming</span></h1>
        <p class="hero-subtitle">The ultimate platform to manage, share, and discover high-quality video content with a community of enthusiasts.</p>
        
        <div class="cta-group">
          <router-link to="/videos" class="btn btn-primary">
            <i class="fas fa-play"></i> Start Browsing
          </router-link>
          <router-link v-if="!authStore.isAuthenticated" to="/register" class="btn btn-secondary">
            <i class="fas fa-user-plus"></i> Create Account
          </router-link>
          <router-link v-else to="/my-videos" class="btn btn-secondary">
            <i class="fas fa-upload"></i> Upload Video
          </router-link>
        </div>
      </div>
      <div class="hero-visual">
        <div class="visual-card">
          <div class="card-line green"></div>
          <div class="card-line blue"></div>
          <div class="card-content">
             <i class="fas fa-video-slash visual-icon"></i>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <h2 class="section-title">Why Choose <span class="text-blue">VideoHub</span>?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon icon-green"><i class="fas fa-bolt"></i></div>
          <h3>Lightning Fast</h3>
          <p>Instant playback and seamless navigation across all your devices.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon icon-blue"><i class="fas fa-shield-alt"></i></div>
          <h3>Secure & Private</h3>
          <p>Your content is protected with industry-standard encryption and auth.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon icon-white"><i class="fas fa-magic"></i></div>
          <h3>Custom Themes</h3>
          <p>A beautiful, dark-first interface designed for focused viewing.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding: var(--space-xl) 1rem;
}

.hero-section {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: var(--space-xl);
  align-items: center;
  margin-bottom: var(--space-xl);
  text-align: left;
}

.hero-title {
  margin-bottom: var(--space-md);
}

.text-green { color: var(--accent-green); }
.text-blue { color: var(--accent-blue); }

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  max-width: 600px;
}

.cta-group {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cta-group .btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.visual-card {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 3 / 4;
  background: var(--bg-secondary);
  border: 1px solid var(--accent-green-border);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.1);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.visual-icon {
  font-size: clamp(3rem, 10vw, 5rem);
  color: var(--accent-green);
  opacity: 0.2;
}

.card-line {
  position: absolute;
  height: 4px;
  border-radius: 2px;
}

.card-line.green {
  top: 10%;
  left: 10%;
  right: 10%;
  background: var(--accent-green);
}

.card-line.blue {
  top: 15%;
  left: 10%;
  width: 60%;
  background: var(--accent-blue);
}

.features-section {
  margin-top: var(--space-xl);
}

.section-title {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.feature-card {
  padding: var(--space-lg);
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-blue);
  background: var(--accent-blue-bg);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
}

.icon-green { color: var(--accent-green); }
.icon-blue { color: var(--accent-blue); }

@media (max-width: 992px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-subtitle { margin-inline: auto; }
  .cta-group { justify-content: center; }
  .hero-visual { margin-top: 2rem; }
}

@media (max-width: 480px) {
  .home-page { padding: var(--space-lg) 1rem; }
  .cta-group .btn { width: 100%; justify-content: center; }
  .hero-visual { display: none; }
}
</style>
