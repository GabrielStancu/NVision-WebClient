import { Component, Input, OnInit } from '@angular/core';
import { DisplaySubjectCard } from '../display-models/display-subject-card.model';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.css']
})
export class SubjectCardComponent implements OnInit {

  constructor() { }

  @Input() subject: DisplaySubjectCard;

  ngOnInit(): void {
  }
}
