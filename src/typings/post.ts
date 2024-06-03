export type Post = {
    id?: number;
    title: string;
    description: string;
    author_id: number;
    image?: string | null;
    category: string;
    comments?: string[] | null;
    rating?: number;
  }
