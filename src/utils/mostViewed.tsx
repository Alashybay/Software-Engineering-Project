import { Post } from "../typings/post";

export const updateTrendingRecipe = (data: Post[]) => {
  // Get the current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  // Filter recipes for the current month
  const currentMonthRecipes = data.filter((recipe) => {
    const recipeDate = new Date(recipe.createdAt ?? "");
    return recipeDate.getMonth() === currentMonth;
  });

  // Find the recipe with the most clicks
  const mostClickedRecipe = currentMonthRecipes.reduce((max, recipe) => {
    return recipe.clicks > max?.clicks ? recipe : max;
  }, currentMonthRecipes[0]);
  return mostClickedRecipe;
};
