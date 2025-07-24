// src/services/profileService.ts
import api from './api';

export interface UserProfile {
    id: string;
  name: string;
  course: string;
  badge: string;
  bio: string;
  github: string;
  linkedin: string;
    picturePath: string;
    email: string;
  // adicione mais campos conforme a resposta da API
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const response = await api.get(`/user/${userId}`);
  return response.data;
}

export async function getRelevantPostByUser(userId: string) {
  const response = await api.get(`/posts/${userId}/relevantPost`);
  return response.data;
}
export async function getRelevantComentarioByUser(userId: string) {
  const response = await api.get(`/comentarios/${userId}/relevantComentario`);
  return response.data;
}

export async function getUserBadges(userId: string) {
  const response = await api.get(`/user/${userId}/badges`);
  return response.data;
}

export async function getUserBadgesCount(userId: string) {
  const response = await api.get(`/user/${userId}/badges/count`);
  return response.data;
}
