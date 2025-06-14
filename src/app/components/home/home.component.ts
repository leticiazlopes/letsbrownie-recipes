import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import data from '../../../../public/assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NgIf],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  recipe = signal<any>(null); 

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = data.find(r => r.id === id);
    this.recipe.set(found); 
  }
}
