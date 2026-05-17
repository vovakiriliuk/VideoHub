import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
import { useToastStore } from './toast';

export interface Video {
  _id: string;
  title: string;
  genre: string;
  name: string;
  year: number;
  description: string;
  url: string;
  owner?: {
    username: string;
  };
}

interface VideoState {
  videos: Video[];
  myVideos: Video[];
  loading: boolean;
  error: string | null;
}

const API_URL = 'http://localhost:5000/videos';

export const useVideoStore = defineStore('video', {
  state: (): VideoState => ({
    videos: [],
    myVideos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchVideos(filters: any = {}) {
      this.loading = true;
      try {
        const response = await axios.get(API_URL, { params: filters });
        this.videos = response.data;
      } catch (err) {
        this.error = 'Failed to fetch videos';
      } finally {
        this.loading = false;
      }
    },
    async fetchMyVideos() {
      const authStore = useAuthStore();
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}/my`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.myVideos = response.data;
      } catch (err) {
        this.error = 'Failed to fetch your videos';
      } finally {
        this.loading = false;
      }
    },
    async createVideo(videoData: Partial<Video>) {
      const authStore = useAuthStore();
      const toast = useToastStore();
      this.loading = true;
      try {
        const response = await axios.post(API_URL, videoData, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.videos.push(response.data);
        this.myVideos.push(response.data);
        toast.success('Video shared successfully!');
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to create video';
        toast.error(this.error || 'Failed to share video');
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async deleteVideo(id: string) {
      const authStore = useAuthStore();
      const toast = useToastStore();
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.videos = this.videos.filter((v) => v._id !== id);
        this.myVideos = this.myVideos.filter((v) => v._id !== id);
        toast.success('Video deleted');
      } catch (err) {
        this.error = 'Failed to delete video';
        toast.error('Failed to delete video');
      }
    },
  },
});
