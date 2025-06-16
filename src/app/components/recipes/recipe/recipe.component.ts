import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  imports: [NgIf, NgFor, ReactiveFormsModule],
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe = signal<any>(null);
  commentForm: FormGroup;
  private recipeId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.commentForm = new FormGroup({
      commentText: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRecipeDetails(); 
  }

  // carregando detalhes da receita
  loadRecipeDetails(): void {
    if (this.recipeId !== null) {
      this.recipeService.getRecipeById(this.recipeId).pipe(
        catchError(error => {
          console.error('Erro ao buscar receita:', error);
          return of(null);
        })
      ).subscribe(data => {
        this.recipe.set(data);
      });
    }
  }

  onSubmitComment(): void {
    if (this.commentForm.valid && this.recipeId !== null) {
      const newComment = { text: this.commentForm.value.commentText };

      this.recipeService.addComment(this.recipeId, newComment).pipe(
        catchError(error => {
          console.error('Erro ao adicionar comentário:', error);
          return of(null);
        })
      ).subscribe(updatedRecipe => {
        if (updatedRecipe) {
          // O updatedRecipe agora contém a receita completa com o novo comentário
          this.recipe.set(updatedRecipe); // atualiza o signal
          this.commentForm.reset(); // Limpa o formulário
        }
      });
    }
  }
}