export interface UserBadge {
  tag: string;
  count: string; 
};

export interface UserSocialLink {
    url: string
};



export interface User {
    id: string;
    name: string;
    email: string;
    course: string; //Temporary.
    picturePath?: string;
    bio?: string;
    github?: UserSocialLink;
    linkedin?: UserSocialLink;
    badges?: UserBadge[];
}