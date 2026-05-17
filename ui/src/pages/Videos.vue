<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useVideoStore } from '../stores/video';
import VideoCard from '../components/VideoCard.vue';

const videoStore = useVideoStore();
const filters = ref({
  name: '',
  genre: '',
  year: '' as string | number,
});

const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 
  'Documentary', 'Anime', 'Thriller', 'Adventure', 
  'Fantasy', 'Music', 'Education', 'Gaming', 'Sport'
];

const fetchVideos = () => {
  const activeFilters: any = {};
  if (filters.value.name) activeFilters.name = filters.value.name;
  if (filters.value.genre) activeFilters.genre = filters.value.genre;
  if (filters.value.year) activeFilters.year = filters.value.year;
  videoStore.fetchVideos(activeFilters);
};

let searchTimeout: any = null;

watch(() => filters.value.name, () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchVideos();
  }, 300);
});

watch([() => filters.value.genre, () => filters.value.year], () => {
  fetchVideos();
});

onMounted(() => {
  fetchVideos();
});
</script>

<template>
  <div class="videos-page">
    <div class="page-header">
      <h1 class="page-title">Explore <span class="text-green">Videos</span></h1>
      <p class="page-subtitle">Discover high-quality content curated by our community.</p>
    </div>

    <div class="filters-container">
      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
        <input v-model="filters.name" type="text" placeholder="Search title, info..." />
      </div>
      <div class="filter-controls">
        <div class="select-wrapper">
          <i class="fas fa-film"></i>
          <select v-model="filters.genre">
            <option value="">All Genres</option>
            <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
          </select>
        </div>
        <div class="input-wrapper">
          <i class="fas fa-calendar-alt"></i>
          <input v-model="filters.year" type="number" placeholder="Year" class="year-input" />
        </div>
      </div>
    </div>

    <div v-if="videoStore.loading" class="state-container">
      <div class="loader"></div>
      <p>Fetching amazing content...</p>
    </div>
    
    <div v-else-if="videoStore.videos.length === 0" class="state-container empty-state">
      <div class="empty-icon"><i class="fas fa-search"></i></div>
      <p>No videos found matching "{{ filters.name }}"</p>
      <button @click="filters = { name: '', genre: '', year: '' }" class="btn btn-secondary">
        <i class="fas fa-undo"></i> Reset Filters
      </button>
    </div>

    <div v-else class="video-grid">
      <VideoCard 
        v-for="video in videoStore.videos" 
        :key="video._id" 
        :video="video" 
      />
    </div>
  </div>
</template>

<style scoped>
.videos-page {
  padding: var(--space-lg) 1rem;
  width: 100%;
}

.page-header {
  margin-bottom: var(--space-xl);
  text-align: left;
}

.page-title { margin-bottom: 0.5rem; }
.text-green { color: var(--accent-green); }
.page-subtitle { color: var(--text-secondary); font-size: 1.1rem; }

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: var(--space-xl);
  background: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: 20px;
  border: 1px solid var(--accent-green-border);
  background: linear-gradient(145deg, var(--bg-secondary), rgba(34, 197, 94, 0.05));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.search-box {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  padding: 0 1.2rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.search-box:focus-within {
  border-color: var(--accent-green);
  box-shadow: 0 0 0 2px var(--accent-green-glow);
}

.search-icon { color: var(--accent-green); opacity: 0.7; }

.search-box input {
  background: transparent;
  border: none;
  width: 100%;
  padding: 0.9rem;
}

.search-box input:focus { box-shadow: none; }

.filter-controls {
  display: flex;
  gap: 1.2rem;
}

.select-wrapper, .input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
}

.select-wrapper i, .input-wrapper i {
  position: absolute;
  left: 1rem;
  color: var(--accent-green);
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
}

select, .year-input {
  padding-left: 2.8rem !important;
  border-radius: 12px;
  min-width: 150px;
}

.year-input { width: 100%; }

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
}

.state-container {
  padding: clamp(3rem, 10vw, 6rem);
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border-radius: 24px;
  border: 1px dashed var(--accent-green-border);
}

.empty-state {
  border-color: var(--accent-green-border);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  color: var(--accent-green);
  opacity: 0.5;
}

.loader {
  width: 56px;
  height: 56px;
  border: 4px solid var(--accent-green-bg);
  border-bottom-color: var(--accent-green);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: rotation 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

@media (max-width: 992px) {
  .filters-container { 
    flex-direction: column; 
    align-items: stretch;
    padding: 1.5rem;
  }
  .filter-controls { 
    flex-direction: row; 
    width: 100%;
  }
}

@media (max-width: 640px) {
  .filter-controls { flex-direction: column; }
  .video-grid { grid-template-columns: 1fr; }
  .select-wrapper, .input-wrapper { width: 100%; }
}
</style>
