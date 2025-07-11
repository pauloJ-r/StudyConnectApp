export interface UserBadge {
    name: string;
};

export interface UserSocialLink {
    url: string
};

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    course: string; //Temporary.
    picturePath?: string;
    bio?: string;
    github?: UserSocialLink;
    linkedin?: UserSocialLink;
    badges?: UserBadge[];
}