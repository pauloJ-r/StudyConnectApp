// src/services/profileService.ts
import api from "./api";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

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

export async function getUserProfile(
  userId: string | undefined
): Promise<UserProfile> {
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

export async function getUserTrophies(userId: string) {
  const response = await api.get(`/user/${userId}/badges`);
  return response.data;
}

export async function getUserBadgesCount(userId: string | undefined) {
  const response = await api.get(`/user/${userId}/badges/count`);
  return response.data;
}

export async function getRelevantAnswersByUser(userId: string | undefined) {
  const response = await api.get(`/comentarios/${userId}/relevantComentario`);
  return response.data;
}

export async function getRelevantPostsByUser(userId: string) {
  const response = await api.get(`/posts/${userId}/relevantPost`);
  return response.data;
}

export async function getPostsByUserId(userId: string | undefined) {
  const response = await api.get(`/posts/user/${userId}`);
  return response.data;
}

export async function getAnswersByUserId(userId: string | undefined) {
  const response = await api.get(`/comentarios/user/${userId}`);
  return response.data;
}

export async function updateUserProfile(
  userId: string,
  profileData: Partial<UserProfile>,
  newImage: ImagePicker.ImagePickerAsset | null
): Promise<UserProfile> {
  const formData = new FormData();

  // Adiciona os campos de texto ao FormData
  Object.keys(profileData).forEach((key) => {
    const value = profileData[key as keyof typeof profileData];

    // -> CORREÇÃO 2: Verificação para evitar valores nulos ou indefinidos
    // Só adiciona ao formulário se o valor existir.
    if (value !== null && value !== undefined) {
      formData.append(key, String(value)); // Usamos String() para garantir que é texto
    }
  });

  // Se uma nova imagem foi selecionada, prepara e adiciona ao FormData
  if (newImage) {
    const uri = newImage.uri;
    const fileType = uri.split(".").pop();

    const file = {
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
      name: `profile.${fileType}`,
      type: `image/${fileType}`,
    };

    formData.append("profileImage", file as any);
  }

  try {
    const response = await api.put(`/user/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro no serviço updateUserProfile:",
      error.response?.data || error.message
    );
    throw error;
  }
}
