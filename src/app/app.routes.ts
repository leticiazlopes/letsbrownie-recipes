import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'recipes/:id', component: RecipeComponent}
];
    