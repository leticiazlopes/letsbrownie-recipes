import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  imports: [NgIf, NgFor, ReactiveFormsModule, FormsModule],
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe = signal<any>(null);
  comments = signal<any[]>([]);
  newCommentText = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
     console.log('ID da receita na rota:', id);
    this.recipeService.getRecipeById(id).subscribe(data => {
      this.recipe.set(data);
      this.loadComments(id);
    });
  }

  loadComments(recipeId: number | null): void {
    this.recipeService.getComments(recipeId).subscribe(data => {
      this.comments.set(data);
    });
  }

  addComment(): void {
    if (this.newCommentText.trim()) {
      const recipeId = this.recipe().id;
      this.recipeService.addComment(recipeId, this.newCommentText).subscribe(() => {
        this.newCommentText = '';
        this.loadComments(recipeId); // Recarrega os comentários para exibir o novo
      });
    }
  }

  deleteComment(commentId: number): void {
    const recipeId = this.recipe().id;
    this.recipeService.deleteComment(recipeId, commentId).subscribe(() => {
      this.loadComments(recipeId); // Recarrega os comentários
    });
  }

}