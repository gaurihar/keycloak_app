import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isDefault:boolean=false
  isGoogle:boolean=false
  isKibana:boolean=false
  googleLink: any = 'https://www.google.com'


  constructor(public sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;   
  }

  ngOnInit(): void {
  }

  getLink(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.googleLink);
  }
  kibanaSet(){
  this.isDefault=false
  this.isGoogle=false
  this.isKibana=true

  }
  googleSet()
  {
    this.isDefault=false
    this.isGoogle=true
    this.isKibana=false
    
  }


}
