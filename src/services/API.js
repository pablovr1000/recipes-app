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
