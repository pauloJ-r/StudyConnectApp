import { Post } from "@/types/post";
import api from "./api"

export function buildPostFromData(data: any): Post {
  return {
    _id: data._id,
    titulo: data.titulo,
    texto: data.texto,
    userId: data.userId,
    likes: data.likes,
    tags: data.tags,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
}

export async function listPosts(offset: number, limit: number): Promise<Post[]> {
  const response = await api.get(`posts/${offset}/${limit}`);
  return response.data;
}

export async function createPost(
  titulo: string,
  texto: string,
  tags: string[],
  userId: string,
  token: string
): Promise<Post> {
  const response = await api.post(
    'posts',
    { titulo, texto, tags, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function togglePostLike(postId: string, token: string | null) {
  const response = await api.put(
    `/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}