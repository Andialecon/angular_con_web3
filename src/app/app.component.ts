import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loading:boolean = false;

  constructor(private loadingService:LoadingService){
  }

  ngOnInit(): void {

    this.loadingService.state.subscribe((res:boolean)=>{
      this.loading=res;
    });
    
  }
  
}
