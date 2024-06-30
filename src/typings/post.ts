export type Post = {
    id?: number;
    title: string;
    description: string;
    author_id: number;
    image?: string | null;
    comments?: string[] | null;
    rating?: number;
    recipe: Recipe,
    createdAt?: Date,
    clicks: number,
  }

export type Ingredient = {
    name: string;
    weight: string;
  };


export type Recipe = {
    cuisine: string;
    ingredients: Ingredient[];
    isGlutenFree: boolean;
}