import { Post } from "../typings/post";
import { Preferences } from "../typings/user";

export const getRecomm = (posts: Post[], preferences?: Preferences): Post[] => {
console.log({preferences}, {posts});

    return posts.filter(post => {
      const matchesCuisine = preferences?.cuisines.length === 0 || preferences?.cuisines.some(cuisine =>
        cuisine.toLowerCase() === post.recipe.cuisine.toLowerCase());

      const matchesIngredients = preferences?.ingredients.length === 0 || post.recipe.ingredients.some(ingredient =>
        preferences?.ingredients.includes(ingredient.name.toLowerCase()));

      const avoidsAllergies = preferences?.allergies.length === 0 || post.recipe.ingredients.every(ingredient =>
        !preferences?.allergies.includes(ingredient.name.toLowerCase()));

      const matchesGlutenFree = !preferences?.glutenFreeOnly || post.recipe.isGlutenFree;

      return matchesCuisine && matchesIngredients && avoidsAllergies && matchesGlutenFree;
    });
  };
