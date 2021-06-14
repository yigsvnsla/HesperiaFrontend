import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {

  @Input() image:string;
  @Input() title:string;
  @Input() url:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  goUrl(){
    this.router.navigateByUrl(this.url)
  }

}
