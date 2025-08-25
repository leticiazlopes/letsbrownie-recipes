import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) { }

  // Método GET para recuperar todas as receitas
  getAllRecipes(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método GET para recuperar receitas individualmente
  getRecipeById(id: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

    getComments(recipeId: number | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${recipeId}/comments`);
  }

  // POST
  addComment(recipeId: number, commentText: string): Observable<any> {
    const comment = { text: commentText };
    return this.http.post<any>(`${this.apiUrl}/${recipeId}/comments`, comment);
  }

  // DELETE
  deleteComment(recipeId: number, commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${recipeId}/comments/${commentId}`);
  }
}
