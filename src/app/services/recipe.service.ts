import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  // Método GET para recuperar todas as receitas
  getAllRecipes(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método GET para recuperar receitas individualmente
  getRecipeById(id: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  // POST deu errado. Fiz com PUT
  addComment(recipeId: number, comment: { text: string }): Observable<any> {
    // buscando receita atual
    return this.http.get<any>(`${this.apiUrl}/${recipeId}`).pipe(
      switchMap(existingRecipe => {
        if (!existingRecipe.comments) {
          existingRecipe.comments = [];
        }
        // gerando um id de forma simples pro novo comentario
        const newCommentId = existingRecipe.comments.length > 0 ? Math.max(...existingRecipe.comments.map((c: any) => c.id)) + 1 : 1;
        existingRecipe.comments.push({ id: newCommentId, ...comment });

        // Atualizando a receita -> agora ela possuirá o novo comentário
        return this.http.put<any>(`${this.apiUrl}/${recipeId}`, existingRecipe);
      })
    );
  }
}
