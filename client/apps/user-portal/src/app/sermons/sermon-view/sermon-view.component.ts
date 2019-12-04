import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  // sermon$: Observable<Sermon>;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
