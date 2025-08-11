import { Post } from "@/types/post";
import api from "./api"

export function buildPostFromData(data: any): Post {
    return {
        _id: data._id,
        titulo: data.titulo,
        texto: data.texto,
        userId: data.userId,
        likes: data.likes,
        userLiked: data.userLiked,
        tags: data.tags,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
}

export async function listPosts(offset: number, limit: number): Promise<Post[]> {
    const response = await api.get(`posts/${offset}/${limit}`);
    return response.data;
}