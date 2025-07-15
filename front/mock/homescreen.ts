import { Post, PostTag, Comment } from "@/types/post";
import { IndexableStudyGroup, Group } from "@/types/group";
import { User } from "@/types/user";

// Usuários mockados (completo)
const mockUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    course: { name: 'Engenharia de Software' },
    picturePath: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Apaixonado por mobile e React Native.',
    github: { url: 'https://github.com/joaosilva' },
    linkedin: { url: 'https://linkedin.com/in/joaosilva' },
    badges: [{ name: 'Top Contributor' }, { name: 'React Native Expert' }],
  },
  {
    id: 2,
    name: 'Maria Souza',
    email: 'maria.souza@email.com',
    course: { name: 'Design de Interfaces' },
    picturePath: 'https://randomuser.me/api/portraits/women/45.jpg',
    bio: 'UX/UI designer e estudante de mobile.',
    github: { url: 'https://github.com/mariasouza' },
    linkedin: { url: 'https://linkedin.com/in/mariasouza' },
    badges: [{ name: 'UI Specialist' }],
  },
];

// Tags mockadas
const mockTags: PostTag[] = [
  { name: 'React Native' },
  { name: 'Design' },
  { name: 'JavaScript' },
];

// Posts mockados
export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Dúvida sobre FlatList',
    text: 'Como otimizar performance em listas grandes no React Native?',
    contextText: 'Tenho um FlatList com mais de 1000 itens e estou enfrentando travamentos.',
    owner: mockUsers[0],
    likes: 10,
    comments: [], // vai receber abaixo
    tags: [mockTags[0], mockTags[2]],
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 2,
    title: 'Expo ou CLI?',
    text: 'Expo ou React Native CLI? Qual vocês preferem?',
    contextText: 'Quero começar um projeto novo e estou em dúvida entre Expo e React Native CLI.',
    owner: mockUsers[1],
    likes: 5,
    comments: [],
    tags: [mockTags[0]],
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
];

// Comments mockados
const mockComments: Comment[] = [
  {
    id: 1,
    text: 'Já tentou usar getItemLayout?',
    post: mockPosts[0],
    owner: mockUsers[1],
    likes: 2,
    createdAt: new Date().toISOString(),
  },
];

// Associar comments
mockPosts[0].comments = mockComments;

// IndexableStudyGroups mockados (resumidos para lista)
export const mockIndexableStudyGroups: IndexableStudyGroup[] = [
  {
    id: 1,
    name: 'Estudo de React Native',
    participantsQuantity: 25,
    thumbnailParticipantsImages: [
      mockUsers[0].picturePath!,
      mockUsers[1].picturePath!,
    ],
  },
  {
    id: 2,
    name: 'Frontend com JavaScript',
    participantsQuantity: 40,
    thumbnailParticipantsImages: [],
  },
];

// Groups detalhados (com participants)
export const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Estudo de React Native',
    paricipants: mockUsers, // usando todos os mockUsers
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 2,
    name: 'Frontend com JavaScript',
    paricipants: [mockUsers[0]], // só um participante
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
];
