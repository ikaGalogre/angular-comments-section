export interface User {
  image: {
    png: string;
    webp?: string;
  };
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
}

export interface DataJson {
  currentUser: User;
  comments: Comment[];
}
