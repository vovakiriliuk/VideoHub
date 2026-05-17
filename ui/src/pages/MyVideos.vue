<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useVideoStore } from '../stores/video';
import VideoCard from '../components/VideoCard.vue';

const videoStore = useVideoStore();
const showAddForm = ref(false);

const newVideo = ref({
  title: '',
  name: '',
  genre: 'Action',
  year: new Date().getFullYear(),
  description: '',
  url: '',
});

const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 
  'Documentary', 'Anime', 'Thriller', 'Adventure', 
  'Fantasy', 'Music', 'Education', 'Gaming', 'Sport'
];

onMounted(() => {
  videoStore.fetchMyVideos();
});

const handleAddVideo = async () => {
  try {
    await videoStore.createVideo({ ...newVideo.value });
    showAddForm.value = false;
    newVideo.value = {
      title: '',
      name: '',
      genre: 'Action',
      year: new Date().getFullYear(),
      description: '',
      url: '',
    };
  } catch (err) {
  }
};

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this video?')) {
    videoStore.deleteVideo(id);
  }
};
</script>

<template>
  <div class="my-videos-page">
    <div class="header-actions">
      <h1 class="page-title">My <span class="text-green">Library</span></h1>
      <button @click="showAddForm = !showAddForm" class="btn btn-primary btn-add">
        <i class="fas" :class="showAddForm ? 'fa-times' : 'fa-plus'"></i>
        <span class="btn-text">{{ showAddForm ? 'Cancel' : 'Share New Video' }}</span>
      </button>
    </div>

    <div v-if="showAddForm" class="add-video-container">
      <form @submit.prevent="handleAddVideo" class="add-form">
        <div class="form-header">
          <h2><i class="fas fa-cloud-upload-alt"></i> Video Details</h2>
          <p>Fill in the information below to share your video.</p>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label>Title</label>
            <div class="input-icon-wrapper">
               <i class="fas fa-heading"></i>
               <input v-model="newVideo.title" required placeholder="e.g. My Awesome Vlog" />
            </div>
          </div>
          <div class="form-group">
            <label>Internal Name</label>
            <div class="input-icon-wrapper">
               <i class="fas fa-tag"></i>
               <input v-model="newVideo.name" required placeholder="e.g. vlog_2024" />
            </div>
          </div>
          <div class="form-group">
            <label>Genre</label>
            <div class="input-icon-wrapper">
               <i class="fas fa-film"></i>
               <select v-model="newVideo.genre">
                 <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
               </select>
            </div>
          </div>
          <div class="form-group">
            <label>Release Year</label>
            <div class="input-icon-wrapper">
               <i class="fas fa-calendar-alt"></i>
               <input v-model="newVideo.year" type="number" required />
            </div>
          </div>
          <div class="form-group full-width">
            <label>Video URL</label>
            <div class="input-icon-wrapper">
               <i class="fas fa-link"></i>
               <input v-model="newVideo.url" type="url" required placeholder="https://youtube.com/..." />
            </div>
          </div>
          <div class="form-group full-width">
            <label>Description</label>
            <div class="input-icon-wrapper textarea-wrapper">
               <i class="fas fa-align-left"></i>
               <textarea v-model="newVideo.description" required rows="4" placeholder="Describe your video..."></textarea>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
           <button type="submit" class="btn btn-primary" :disabled="videoStore.loading">
              <i class="fas fa-paper-plane"></i>
              {{ videoStore.loading ? 'Sharing...' : 'Confirm & Share' }}
           </button>
        </div>
      </form>
    </div>

    <div v-if="videoStore.loading && !showAddForm" class="state-container">
      <div class="loader"></div>
      <p>Synchronizing your library...</p>
    </div>
    
    <div v-else-if="videoStore.myVideos.length === 0" class="state-container empty-state">
      <div class="empty-icon"><i class="fas fa-video-slash"></i></div>
      <p>Your library is currently empty.</p>
      <button @click="showAddForm = true" class="btn btn-secondary">Start Sharing</button>
    </div>

    <div v-else class="video-grid">
      <VideoCard 
        v-for="video in videoStore.myVideos" 
        :key="video._id" 
        :video="video" 
        show-actions
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
.my-videos-page {
  padding: var(--space-lg) 1rem;
  width: 100%;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  gap: 1rem;
}

.text-green { color: var(--accent-green); }

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px var(--accent-green-glow);
}

.add-video-container {
  background: var(--bg-secondary);
  border: 1px solid var(--accent-green-border);
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: 24px;
  margin-bottom: var(--space-xl);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: linear-gradient(165deg, var(--bg-secondary), rgba(34, 197, 94, 0.03));
}

.form-header {
  margin-bottom: 2.5rem;
  text-align: left;
}

.form-header h2 {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--accent-green);
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--text-secondary);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  text-align: left;
}

.full-width {
  grid-column: span 2;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  left: 1rem;
  color: var(--accent-green);
  opacity: 0.6;
  pointer-events: none;
}

.textarea-wrapper i {
  top: 1rem;
}

input, select, textarea {
  width: 100%;
  padding-left: 2.8rem !important;
  border-radius: 12px;
}

.form-actions {
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
}

.form-actions .btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

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
  opacity: 0.4;
}

.loader {
  width: 56px;
  height: 56px;
  border: 4px solid var(--accent-green-bg);
  border-bottom-color: var(--accent-green);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: rotation 0.8s linear infinite;
}

@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

@media (max-width: 992px) {
  .form-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: span 1; }
}

@media (max-width: 640px) {
  .header-actions { flex-direction: column; align-items: flex-start; }
  .btn-add { width: 100%; justify-content: center; }
  .form-actions { justify-content: stretch; }
  .form-actions .btn { width: 100%; justify-content: center; }
  .video-grid { grid-template-columns: 1fr; }
}
</style>
