import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthWeb3Service } from 'src/app/services/auth/auth-web3.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  addressUser:string="";
  addressUserView:boolean=false;
  loginUser: boolean=false; 

  web3:any;

  constructor(private cdr: ChangeDetectorRef, private authWeb3Service: AuthWeb3Service) { 
    this.web3 = this.authWeb3Service.web3Instance;
  }

  connect(){
    this.authWeb3Service.connect();
  }
  
  ngOnInit(): void {

    this.authWeb3Service.loginUser.subscribe((res:boolean)=>{
      this.loginUser=res;
      (!this.loginUser)? this.addressUserView = false : this.addressUserView = true;
      this.cdr.detectChanges();
    });

    this.authWeb3Service.addressUser.subscribe((res:string) => {
      this.addressUser = res;
      this.cdr.detectChanges();
    });

  }
}
