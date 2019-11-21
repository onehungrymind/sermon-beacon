import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {
  links = [
    { path: '/', icon: 'home', title: 'Home' },
    { path: '/customers', icon: 'face', title: 'Customer' },
    { path: '/projects', icon: 'work', title: 'Projects' },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
