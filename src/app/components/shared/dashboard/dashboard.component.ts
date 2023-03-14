import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  display:boolean = false;
  saldo:number = 3123;
  
  constructor() { }

  ngOnInit(): void {
  }

}
