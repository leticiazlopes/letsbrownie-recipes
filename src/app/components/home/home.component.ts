import { Component } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-home',
  imports: [CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
