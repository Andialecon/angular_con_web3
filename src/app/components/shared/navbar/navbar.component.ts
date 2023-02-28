import { Component, OnInit } from '@angular/core';
import * as clipboard from 'clipboard-polyfill';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {
  
  contract: string = '0xsofgwugnsvsnouin234gdsg0zzx'
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  copy = () => {
    clipboard.writeText(this.contract);
    this.messageService.add({severity:'success', summary:'Copied contract', detail:`${this.contract}`});
  }

}
