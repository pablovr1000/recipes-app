import React from 'react';
import { Switch, Route } from 'react-router-dom';

import pages from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ pages.Login } />
      <Route path="/foods" component={ pages.Foods } />
      <Route path="/drinks" component={ pages.Drinks } />
      <Route path="/foods/:id" component={ pages.FoodDetails } />
      <Route path="/drinks/:id" component={ pages.DrinkDetails } />
      <Route path="/foods/:id/in-progress" component={ pages.FoodsInProgress } />
      <Route path="/drinks/:id/in-progress" component={ pages.DrinksInProgress } />
      <Route path="/explore" component={ pages.Explore } />
      <Route path="/explore/foods" component={ pages.ExploreFoods } />
      <Route path="/explore/drinks" component={ pages.ExploreDrinks } />
      <Route path="/explore/foods/ingredients" component={ pages.FoodsIngredients } />
      <Route path="/explore/drinks/ingredients" component={ pages.DrinksIngredients } />
      <Route path="/explore/foods/nationalities" component={ pages.Nationalities } />
      <Route path="/profile" component={ pages.Profile } />
      <Route path="/done-recipes" component={ pages.DoneRecipes } />
      <Route path="/favorite-recipes" component={ pages.FavoriteRecipes } />
    </Switch>
  );
}

export default App;
