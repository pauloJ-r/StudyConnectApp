import { User } from "./user";

export interface PostTag {
    name: string;
};

export interface Post {
    id: number,
    title: string;
    text: string;
    contextText?: string;
    owner: User;
    likes: number;
    comments?: number; //TODO: Remover.
    tags: PostTag[];
    createdAt: string
    updatedAt?: string
};