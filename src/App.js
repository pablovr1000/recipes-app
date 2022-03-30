import React from 'react';
import { Switch, Route } from 'react-router-dom';

import pages from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ pages.Login } />
      <Route exact path="/foods" component={ pages.Foods } />
      <Route exact path="/drinks" component={ pages.Drinks } />
      <Route exact path="/foods/:id" component={ pages.FoodDetails } />
      <Route exact path="/drinks/:id" component={ pages.DrinkDetails } />
      <Route exact path="/foods/:id/in-progress" component={ pages.FoodsInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ pages.DrinksInProgress } />
      <Route exact path="/explore" component={ pages.Explore } />
      <Route exact path="/explore/foods" component={ pages.ExploreFoods } />
      <Route exact path="/explore/drinks" component={ pages.ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ pages.FoodsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ pages.DrinksIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ pages.Nationalities }
      />
      <Route exact path="/profile" component={ pages.Profile } />
      <Route exact path="/done-recipes" component={ pages.DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ pages.FavoriteRecipes } />
    </Switch>
  );
}

export default App;
