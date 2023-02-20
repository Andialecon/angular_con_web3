import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { handleSignature } from './validate';
import { environment } from '../../../environments/environment';
const { SERVER_RUT } = environment;


import Web3 from 'web3';
import Swal from 'sweetalert';
import { User } from 'src/app/interfaces/Users';
import { RestAuth } from 'src/app/interfaces/resAuht';
 


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

  constructor(private readonly http: HttpClient) {
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

    const currentChainId: string = await window.ethereum.request({ method: 'eth_chainId' });

    if (this.chainId == currentChainId) {
      this.conectAccount();
    } else {
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
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });

      this.addressUser.next(accounts[0]);
      this.authBackend(accounts[0]);

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.logout();
        window.location.reload();
      });

    }
    catch (err: any) {
      Swal("Oops!", `${err.message}`, "error");
    }
  }


  // se valida en el back que exista un usuario para esta address, de lo contrario se crea
  async authBackend(pubAd: string) {
    try {

      // ver si el usuario ya existe
      this.http.get<any>(`${SERVER_RUT}/users/${pubAd}`).subscribe(user => {

        if (!user) {

          let body = {
            address: pubAd,
            role: 'player'
          };

          this.http.post<User>(`${SERVER_RUT}/users`, body).subscribe(res => {
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
              this.firmarConMetamask(user)
              
            }
          })
        };
        this.firmarConMetamask(user)
        
      })

    } catch (error: any) {
      Swal("Oops!", `${error.message}`, "error");
    }

  }

  // Se solicita que el usuario firme con su llave privada usando metamask
  async firmarConMetamask(user:any){
    try {
      const signature = await handleSignature(user, window.ethereum);

      if (signature){

        this.getToken(user.address, signature);
  
      }

    } catch (error) {
      Swal({
        title: "Error de autenticación",
        text: "No fue posible verficar su firma",
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
  
      const res = await this.http.post<RestAuth>(`${SERVER_RUT}/login`, body).subscribe(res => {
        if (res) {
          console.log(res)
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", res.user);
          localStorage.setItem("role", res.role);
          this.loginUser.next(true);
        }
      })
      
    } catch (error) {
      
    }


  }

  logout() {
    this.loginUser.next(false);
  }

}
