import { User } from "./user";

export interface IndexableStudyGroup {
    id: number;
    name: string;
    participantsQuantity: number;
    thumbnailParticipantsImages?: string[]
};

export interface Group extends Pick<IndexableStudyGroup, 'id' | 'name'> {
    // TODO: Adicionar mecanismo de admin e modders.
    paricipants: User[];
    createdAt: string;
    updatedAt: string | null;
};