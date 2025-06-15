import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from '../../../../public/assets/data.json';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CardComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes = signal<any[]>([]);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes.set(data);
  }
}
