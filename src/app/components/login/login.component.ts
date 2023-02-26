import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loading:boolean = false;

  constructor(private loadingService:LoadingService){
  }

  ngOnInit(): void {

    this.loadingService.state.subscribe((res:boolean)=>{
      this.loading=res;
    });
    
  }

  copy(){
    
  }
}
