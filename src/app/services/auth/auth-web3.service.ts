import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Web3 from 'web3';
import Swal from 'sweetalert';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthWeb3Service {
  web3: any = null;
  get web3Instance() { return this.web3; }

  chainIds: string[] = ['0x1'];
  addressUser: any = new BehaviorSubject<string>('');
  loginUser: any = new BehaviorSubject<boolean>(false);

  constructor() { 
    if(typeof window.ethereum !== 'undefined'){
      this.web3 = new Web3(window.ethereum);
    }else{
      Swal("No se encontró una billetera", "Para interacturar con la aplicación necesitas tener la Billetera Metamask instalada en tu navegador", "error");
    }
  }

  connect(){
    this.handleIdChainChanged();
  }

  async handleIdChainChanged(){
    // debugger;
    try {
      const chainId: string = await window.ethereum.request({ method: 'eth_chainId'});
    } catch (error) {
      Swal("No se encontró una Billetera", "Instala Metamask", "error");
    }

    window.ethereum.on('chainChanged', (res: string) => {
      if(!this.chainIds.includes(res)){
        this.logout();
        Swal("Oops!", "Seleciona la red principal de Etherreum! (Mainet)", "error");
      }else{
        this.authBackend();
      }
    })
  }

  async handledAccountsChanged(){
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccount'});

    this.addressUser.next(accounts[0]);
    this.authBackend();

    window.ethereum.on('accountsChanged', (accounts:string[]) => {
      this.addressUser.next(accounts[0]);
      this.authBackend();
    })
  }

  async authBackend(){
    this.loginUser.next(true);
  }

  logout(){
    this.loginUser.next(false);
  }

}
