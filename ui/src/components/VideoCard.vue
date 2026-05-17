<script setup lang="ts">
import { type Video } from '../stores/video';

defineProps<{
  video: Video;
  showActions?: boolean;
}>();

const emit = defineEmits<{
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <div class="video-card">
    <div class="video-preview">
      <div class="preview-overlay">
        <div class="play-btn"><i class="fas fa-play"></i></div>
      </div>
      <div class="genre-tag">{{ video.genre }}</div>
    </div>
    <div class="video-content">
      <div class="video-meta">
        <span class="year"><i class="far fa-calendar"></i> {{ video.year }}</span>
        <span class="dot">•</span>
        <span class="owner"><i class="far fa-user"></i> {{ video.owner?.username || 'User' }}</span>
      </div>
      <h3 class="video-title">{{ video.title }}</h3>
      <p class="video-desc">{{ video.description }}</p>
      
      <div class="card-footer">
        <a :href="video.url" target="_blank" class="btn-watch">
          <span>Watch Now</span>
          <i class="fas fa-chevron-right"></i>
        </a>
        <button 
          v-if="showActions" 
          @click="emit('delete', video._id)" 
          class="btn-delete-icon"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: left;
  display: flex;
  flex-direction: column;
}

.video-card:hover {
  transform: translateY(-12px);
  border-color: var(--accent-green);
  background: linear-gradient(180deg, var(--card-bg), rgba(34, 197, 94, 0.08));
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-green-glow);
}

.video-preview {
  height: 200px;
  background: linear-gradient(135deg, #111827, #064e3b);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-card:hover .preview-overlay { opacity: 1; }

.play-btn {
  width: 64px;
  height: 64px;
  background: var(--accent-green);
  color: var(--bg-main);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 0 20px var(--accent-green);
}

.genre-tag {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(6, 78, 59, 0.8);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-green-bright);
  border: 1px solid var(--accent-green-border);
}

.video-content {
  padding: 1.75rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.video-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.video-meta i { color: var(--accent-green); opacity: 0.8; }

.owner { color: var(--accent-blue); font-weight: 600; }

.video-title {
  margin-bottom: 1rem;
  line-height: 1.4;
  font-size: 1.4rem;
}

.video-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-watch {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 0.9rem 1.4rem;
  border-radius: 12px;
  font-weight: 700;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.btn-watch:hover {
  background: var(--accent-green);
  color: var(--bg-main);
  border-color: var(--accent-green);
  box-shadow: 0 5px 15px var(--accent-green-glow);
}

.btn-delete-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-delete-icon:hover {
  background: #ef4444;
  color: var(--bg-main);
  border-color: #ef4444;
}
</style>
