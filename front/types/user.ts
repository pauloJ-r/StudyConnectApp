export interface UserBadge {
    name: string;
};

export interface UserSocialLink {
    url: string
};

export interface Course {
    name: string;
};

export interface User {
    id: number;
    name: string;
    email: string;
    course: Course; //Temporary.
    picturePath?: string;
    bio?: string;
    github?: UserSocialLink;
    linkedin?: UserSocialLink;
    badges?: UserBadge[];
}