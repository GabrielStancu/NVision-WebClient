import { Component, OnInit } from '@angular/core';
import { TableRow } from '../display-models/table-row.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  public tableRows: TableRow[] = [];

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.tableRows = [
      new TableRow('Star Refrigerator', '$1200', 'Paid', 'Delivered', 'delivered'),
      new TableRow('Denim Shirts', '$110', 'Due', 'In Progress', 'inprogress'),
      new TableRow('Casual Shoes', '$575', 'Paid', 'Pending', 'pending'),
      new TableRow('Wall Fan', '$175', 'Paid', 'Returned', 'return'),
      new TableRow('Star Refrigerator', '$1200', 'Paid', 'Delivered', 'delivered'),
      new TableRow('Denim Shirts', '$110', 'Due', 'In Progress', 'inprogress'),
      new TableRow('Casual Shoes', '$575', 'Paid', 'Pending', 'pending'),
      new TableRow('Wall Fan', '$175', 'Paid', 'Returned', 'return'),
      new TableRow('Star Refrigerator', '$1200', 'Paid', 'Delivered', 'delivered'),
      new TableRow('Denim Shirts', '$110', 'Due', 'In Progress', 'inprogress')
    ];
  }
}
