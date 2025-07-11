import { User } from "./user";

export interface PostTag {
    name: string;
};

export interface Comment {
    id: number;
    text: string;
    post: Post;
    owner: User;
    likes: number;
    createdAt: string;
};

export interface Post {
    id: number,
    title: string;
    text: string;
    contextText?: string;
    owner: User;
    likes: number;
    comments?: Comment[];
    tags: PostTag[];
    createdAt: string
    updatedAt?: string
};