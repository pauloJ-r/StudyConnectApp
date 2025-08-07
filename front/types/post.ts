import { User } from "./user";

export interface PostTag {
  name: string;
};

export interface Comment {
  id: string;
  text: string;
  post: Post;
  owner: User;
  likes: number;
  createdAt: string;
};

export interface PostAuthor {
  _id: string;
  id: string;
  name: string;
  email: string;
  course: string;
  picturePath: string;
  // adicione outros campos se precisar
}

export interface Post {
  _id: string; // <-- A chave é _id
  titulo: string;
  texto: string;
  userId: PostAuthor | null;
  likes: any[]; // É um array, a contagem será o .length
  tags: string[]; // Assumindo que seja um array de strings
  comments?: any[];
  createdAt: string;
  updatedAt: string;
}
export interface UserBadge {
  label: string;
}