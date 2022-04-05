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

export const getRecommendations = async () => {
  const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await responseDrinks.json();
  const responseFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await responseFoods.json();

  const recommendations = {
    foods: [...drinks].splice(0, RECOMMENDATION_RENDER_QUANTITY),
    drinks: [...meals].splice(0, RECOMMENDATION_RENDER_QUANTITY) };
  return recommendations;

export const getIdDrinksRandom = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  const idDrinks = data.drinks[0].idDrink;
  return idDrinks;
};

export const getIDFoodRandom = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  const id = (data.meals[0].idMeal);
  return id;
};
