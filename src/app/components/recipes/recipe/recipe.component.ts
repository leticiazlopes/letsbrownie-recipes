import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import data from '../../../../../public/assets/data.json';

@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  imports: [NgIf, NgFor],
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe = signal<any>(null); 

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = data.find(r => r.id === id);
    this.recipe.set(found); 
  }
}
