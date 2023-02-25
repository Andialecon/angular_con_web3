import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { handleSignature } from './validate';
import { environment } from '../../../environments/environment';
const { SERVER_RUT } = environment;


import Web3 from 'web3';
import Swal from 'sweetalert';
import { User } from 'src/app/interfaces/Users';
import { RestAuth } from '../../interfaces/ResAuht';
import { LoadingService } from '../loader.service';
 


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthWeb3Service {
  web3: any = null;
  get web3Instance() { return this.web3; }

  chainId: string = '0x1';
  addressUser: any = new BehaviorSubject<string>('');
  loginUser: any = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private loadingService:LoadingService) {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      Swal("No se encontró una billetera", "Para interacturar con la aplicación necesitas tener la Billetera Metamask instalada en tu navegador", "error");
    }
  }

  connect() {
    this.isMetamaskInstaled();
  }

  // Se valida si metamask está instalado
  isMetamaskInstaled() {
    if (!this.web3) {
      Swal("No se encontró una billetera", "Para interacturar con la aplicación necesitas tener la Billetera Metamask instalada en tu navegador", "error");
    } else {
      this.handleIdChainDetected();
    }
  }

  // se valida que metamask esté en la red correcta
  async handleIdChainDetected() {

    this.loadingService.changeState(true);
    const currentChainId: string = await window.ethereum.request({ method: 'eth_chainId' });

    if (this.chainId == currentChainId) {
      this.conectAccount();
    } else {
      this.loadingService.changeState(false);
      Swal("Error de Red!", "Seleciona la red principal de Etherreum! (Mainet)", "error");
    }

    window.ethereum.on('chainChanged', (res: string) => {
      if (this.chainId != res) {
        this.logout();
        Swal("Oops!", "Seleciona la red principal de Etherreum! (Mainet)", "error");
      } else {
        if (this.addressUser.getValue() === '') {
          this.conectAccount();
        }
      }
    })

  }

  // se obtienen las cuentas de metamask 
  async conectAccount() {
    try {

      this.loadingService.changeState(true);
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if(accounts){
        this.addressUser.next(accounts[0]);
        this.authBackend(accounts[0]);
      }

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.logout();
        this.loadingService.changeState(false);
        window.location.reload();
      });

    }
    catch (err: any) {
      this.loadingService.changeState(false);
      Swal("Oops!", `${err.message}`, "error");
    }
  }

  // se valida en el back que exista un usuario para esta address, de lo contrario se crea
  async authBackend(pubAd: string) {
    try {
      // ver si el usuario ya existe
      await this.http.get<any>(`${SERVER_RUT}/users/${pubAd}`).subscribe(async user => {

        if (!user) {

          let body = {
            address: pubAd,
            role: 'player'
          };

          await this.http.post<User>(`${SERVER_RUT}/users`, body).subscribe(res => {
            if (res) {
              
              const user = {
                address : res.address,
                username : res.username,
                email : res.email,
                role : res.role,
                nonce : res.nonce,
                activo : res.activo,
                rewards: res.rewards,  
              };

              this.firmarConMetamask(user);
              
            }
          });

        }else{
          this.firmarConMetamask(user);
        }
        
      })

    } catch (error: any) {
      this.loadingService.changeState(false);
      Swal("Oops!", `${error.message}`, "error");
    }
    
  }

  // Se solicita que el usuario firme con su llave privada usando metamask
  async firmarConMetamask(user:any){
    try {

      const signature = await handleSignature(user, window.ethereum);

      if (signature){

        this.getToken(user.address, signature);
  
      }else{

        this.loadingService.changeState(false);
        Swal({
          title: "Authentication Error",
          text: "No fue posible verficar su firma",
          icon: "warning",
          dangerMode: true,
        });

      }

    } catch (error:any) {

      this.loadingService.changeState(false);
      Swal({
        title: "Authentication Error",
        text: error.message,
        icon: "warning",
        dangerMode: true,
      });

    }
  }

  async getToken(publicAddress:string, signature:string){
    try {
      
      let body = {
        publicAddress,
        signature
      }
  
      const res = await this.http.post<RestAuth>(`${SERVER_RUT}/login`, body).toPromise();
      
      if (res) {

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.user);
        localStorage.setItem("role", res.role);
        this.loadingService.changeState(false);
        this.loginUser.next(true);

      }else{
        this.loadingService.changeState(false);
        Swal("Oops!", `Could not log in, please try again later`, "error");
      }
    
    } catch (error:any) {

      this.loadingService.changeState(false);
      Swal("Oops!", `${error.message}`, "error");

    }

  }

  logout() {
    this.loginUser.next(false);
  }

}
