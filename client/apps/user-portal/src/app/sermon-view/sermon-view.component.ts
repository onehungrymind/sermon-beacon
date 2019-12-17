import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { Sermon } from '@sb/core-data';
import { SermonsFacade } from '@sb/core-state';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  sermon$: Observable<Sermon> = this.sermonsFacade.selectedSermon$;
  actionButtons = [
    { title: 'SAVE', icon: 'cloud_download' },
    { title: 'LISTEN', icon: 'graphic_eq' },
    { title: 'NOTES', icon: 'notes' }
  ];
  currentSermon;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private sermonsFacade: SermonsFacade
  ) {}

  ngOnInit() {
    this.sermonsFacade.loadSermons();
    this.grabSermon();
  }

  grabSermon() {
    this.currentSermon = this.route.snapshot.params.id;
    this.sermonsFacade.selectSermon(this.currentSermon);
    console.log(this.sermon$);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
