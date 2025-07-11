interface UserBadge {
    name: string;
};

interface UserSocialLink {
    url: string
};

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    picturePath?: string;
    bio?: string;
    github?: UserSocialLink;
    linkedin?: UserSocialLink;
    badges?: UserBadge[];
}