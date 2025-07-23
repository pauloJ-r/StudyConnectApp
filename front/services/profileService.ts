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
