import { RECOMMENDATION_RENDER_QUANTITY } from '../utils/constants';

export const getFoods = async (search, option) => {
  const searchOrFilter = option === 'i' ? 'filter' : 'search';

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${searchOrFilter}.php?${option}=${search}`);
  const { meals } = await response.json();
  return meals;
};

export const getDrinks = async (search, option) => {
  const searchOrFilter = option === 'i' ? 'filter' : 'search';

  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${searchOrFilter}.php?${option}=${search}`);
  const { drinks } = await response.json();
  return drinks;
};

export const getFoodDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals[0];
};

export const getDrinkDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks[0];
};

// export const getRecommendationFoods = async () => {
//   const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
//   const { meals } = await response.json();
//   return meals.splice(0, RECOMMENDATION_RENDER_QUANTITY);
// };

// export const getRecommendationDrinks = async () => {
//   const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
//   const { drinks } = await response.json();
//   return drinks.splice(0, RECOMMENDATION_RENDER_QUANTITY);
// };

export const getRecommendations = async () => {
  const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await responseDrinks.json();
  const responseFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await responseFoods.json();

  const recommendations = {
    drinks: drinks.splice(0, RECOMMENDATION_RENDER_QUANTITY),
    foods: meals.splice(0, RECOMMENDATION_RENDER_QUANTITY) };
  return recommendations;
};
