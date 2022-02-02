import { Component, Input, OnInit } from '@angular/core';
import { WatcherCardReply } from 'src/app/replies/watcher-data.reply';
import { DashboardCard } from '../display-models/display-card.model';

@Component({
  selector: 'app-cardbox',
  templateUrl: './cardbox.component.html',
  styleUrls: ['./cardbox.component.css']
})
export class CardboxComponent implements OnInit {

  constructor() { }

  public dashboardCards: DashboardCard[] = [];
  @Input() cards: WatcherCardReply[];
  private iconNames = [
    'eye-outline', 'thermometer-outline', 'alert-circle-outline', 'calendar-outline'
  ];

  ngOnInit(): void {
    this.initNumericCards();
  }

  initNumericCards(): void {
    this.cards.forEach(card => {
      const index = this.cards.indexOf(card);
      const iconName = this.iconNames[index];
      this.dashboardCards.push(new DashboardCard(card.numericValue, card.propertyName, iconName));
    });
    this.dashboardCards.sort((a, b) => b.numericValue - a.numericValue);
  }
}
