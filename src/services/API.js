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

export const getFoodByCategory = async (category) => {
  const CATEGORIES_MAX_LENGTH = 12;
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await response.json();
  return Object.values(meals).splice(0, CATEGORIES_MAX_LENGTH);
};

export const getDrinkByCategory = async (category) => {
  const CATEGORIES_MAX_LENGTH = 12;
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  return Object.values(drinks).splice(0, CATEGORIES_MAX_LENGTH);
};

export const getByNationality = async () => {
  const CATEGORIES_MAX_LENGTH = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  console.log(meals);
};
console.log(getByNationality());
