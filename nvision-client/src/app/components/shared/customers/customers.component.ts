import { Component, OnInit } from '@angular/core';
import { Person } from '../display-models/person.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor() { }

  public people: Person[] = [];

  ngOnInit(): void {
    this.initPeople();
  }

  initPeople(): void {
    this.people = [
      new Person('David', 'Italy'),
      new Person('Emily', 'USA'),
      new Person('Andrew', 'UK'),
      new Person('Yuri', 'Russia'),
      new Person('David', 'Italy')
    ];
  }
}
