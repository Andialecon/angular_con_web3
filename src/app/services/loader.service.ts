import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  state = new BehaviorSubject<boolean>(false);

  changeState(_newState:boolean){
    this.state.next(_newState);
  }

}
