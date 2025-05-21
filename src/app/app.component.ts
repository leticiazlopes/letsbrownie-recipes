import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";   
import { CardsComponent } from "./components/cards/cards.component";

@Component({
  selector: 'app-root',
  imports: [CardsComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ls-recipes-angular';
}
