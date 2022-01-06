import { Component, OnInit } from '@angular/core';
import { NumericCard } from '../display-models/numeric-card.model';

@Component({
  selector: 'app-cardbox',
  templateUrl: './cardbox.component.html',
  styleUrls: ['./cardbox.component.css']
})
export class CardboxComponent implements OnInit {

  constructor() { }

  public numericCards: NumericCard[] = [];

  ngOnInit(): void {
    this.initNumericCards();
  }

  initNumericCards(): void {
    this.numericCards = [
      new NumericCard('1,504', 'Daily Views', 'eye-outline'),
      new NumericCard('80', 'Sales', 'cart-outline'),
      new NumericCard('284', 'Comments', 'chatbubbles-outline'),
      new NumericCard('$7,842', 'Earning', 'cash-outline')
    ];
  }
}
