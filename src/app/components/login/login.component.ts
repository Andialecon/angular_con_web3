import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loader.service';
import { AuthWeb3Service } from 'src/app/services/auth/auth-web3.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

  loading:boolean = false;

  constructor(private loadingService:LoadingService, private authWeb3Service: AuthWeb3Service){
  }


  ngOnInit(): void {

    this.loadingService.state.subscribe((res:boolean)=>{
      this.loading=res;
    });
    
  }

  connect(){
    this.authWeb3Service.connect();
  };
  
}
