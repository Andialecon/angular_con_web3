import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Web3 from 'web3';
import swal from 'sweetalert';

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
      swal("Oops!", "Something went wrong!", "error");
    }
  }

  connect(){
    this.handleIdChainChanged();
  }

  async handleIdChainChanged(){
    const chainId: string = await window.ethereum.request({ method: 'eth_chainId'});

    if(this.chainIds.includes(chainId)){
      this.handleIdChainChanged();
    }else {
      swal("Oops!", "Something went wrong!", "error");
    }

    window.ethereum.on('chainChanged', (res: string) => {
      if(!this.chainIds.includes(res)){
        this.logout();
        swal("Oops!", "Seleciona la red principal de Etherreum! (Mainet)", "error");
      }else{
        this.authBackend();
      }
    })
  }

}
