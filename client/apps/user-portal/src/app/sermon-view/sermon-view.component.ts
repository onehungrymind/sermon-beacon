import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sermon } from '@sb/core-data';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  sermon$: Observable<Sermon>;
  actionButtons = [
    { title: 'SAVE', icon: 'cloud_download' },
    { title: 'LISTEN', icon: 'graphic_eq' },
    { title: 'NOTES', icon: 'notes' }
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sermon$ = of({
      title: 'First Sermon',
      date: '2018-05-01',
      media: [
        {
          type: 'VIDEO',
          url: 'https://player.vimeo.com/video/375272866'
        }
      ],
      sermon_tags: [
        {
          tag: {
            value: 'Sunday Morning'
          }
        }
      ],
      sermon_speakers: [
        {
          speaker: {
            first_name: 'Ron',
            last_name: 'Peterson',
            position: 'Pastor',
            church_name: 'Evening Light Fellowship'
          }
        }
      ]
    } as any);
  }

  getVideoUrl(media: any[]) {
    const videoMedia = media.find((m) => m.type === 'VIDEO');

    return this.sanitizeUrl(videoMedia.url);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
