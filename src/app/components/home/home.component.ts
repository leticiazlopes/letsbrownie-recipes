import { Component, OnInit, signal } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { RecipeService } from '../../services/recipe.service';
import { catchError, of } from 'rxjs'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CardComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes = signal<any[]>([]);

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Buscando as receitas ou tratando possíveis erros
    this.recipeService.getAllRecipes().pipe( 
      catchError(error => {
        console.error('Erro ao buscar receitas:', error);
        return of([]);
      })
    ).subscribe(data => {
      // atualizando o signal
      this.recipes.set(data);
    });
  }
}
