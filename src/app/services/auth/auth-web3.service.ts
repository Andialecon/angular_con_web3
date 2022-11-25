import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
const {REACT_APP_SERVER} = environment;

import Web3 from 'web3';
import Swal from 'sweetalert';
import { environment } from '../../../environments/environment';

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

  constructor() { 
    if(typeof window.ethereum !== 'undefined'){
      this.web3 = new Web3(window.ethereum);
    }else{
      Swal("No se encontró una billetera", "Para interacturar con la aplicación necesitas tener la Billetera Metamask instalada en tu navegador", "error");
    }
  }

  connect(){    
    this.handleIdChainDetected();
  }
  
  async handleIdChainDetected(){
    const currentChainId: string = await window.ethereum.request({ method: 'eth_chainId'});
    
    if(this.chainId==currentChainId){
      this.conectAccount();
    }else{
      Swal("Error de Red!", "Seleciona la red principal de Etherreum! (Mainet)", "error");
    }
    
    window.ethereum.on('chainChanged', (res: string) => {
      if(this.chainId!=res){
        this.logout();
        Swal("Oops!", "Seleciona la red principal de Etherreum! (Mainet)", "error");
      }else{
        if(this.addressUser.getValue()===''){
          this.conectAccount();
        }
      }
    })

  }
  
  async conectAccount(){
    try {
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts'});
      
      this.addressUser.next(accounts[0]);
      this.authBackend(this.addressUser);
      
      window.ethereum.on('accountsChanged', (accounts:string[]) => {
        this.logout();
        window.location.reload();
      });
      
    }
    catch(err:any) {
      Swal("Oops!", `${err.message}`, "error");
    }
  }

  
// validamos en el back que exista un usuario para esta address, de lo contrario se crea
  async authBackend(pubAd:string){
    try {
      console.log('pubAd vUs: ', pubAd)
      const user = await axios.get(`${REACT_APP_SERVER}/users/${pubAd}`);
      console.log('user1: ', user.data)
      if (!user.data) {
  
        await axios.post(`${REACT_APP_SERVER}/users`, {
          address: pubAd,
        });
  
       const userCreate = await axios.get(`${REACT_APP_SERVER}/users/${pubAd}`);
        console.log('user2: ', userCreate.data)
       return userCreate.data
  
      };
      
      return user.data;
    } catch (error) {
      console.log("userVer: ", error);
    }
    
    this.loginUser.next(true);
  }
  
  logout(){
    this.loginUser.next(false);
  }

}
