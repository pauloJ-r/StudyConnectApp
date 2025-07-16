import { User } from "./user";

export interface Notification {
    id: number;
    content: string;
    isRead: boolean;
    owner: User;
    createdAt: string;
};