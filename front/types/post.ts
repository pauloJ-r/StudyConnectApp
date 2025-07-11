import { User } from "./user";

interface PostTag {
    name: string;
};

export interface Post {
    title: string;
    text: string;
    owner: User;
    likes: number;
    tags: PostTag[];
    createdAt: string
    updatedAt?: string
};