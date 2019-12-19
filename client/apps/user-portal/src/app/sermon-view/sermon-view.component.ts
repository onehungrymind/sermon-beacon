import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { Media, Sermon, Speaker, Tag } from '@sb/core-data';
import { MediaFacade, SermonsFacade, SpeakersFacade, TagsFacade } from '@sb/core-state';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  sermon$: Observable<Sermon> = this.sermonsFacade.selectedSermon$;
  speaker$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  media$: Observable<Media[]> = this.mediaFacade.allMedia$;
  tags$: Observable<Tag[]> = this.tagsFacade.allTags$;

  embed = '<iframe src="https://player.vimeo.com/video/378141919" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private sermonsFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private mediaFacade: MediaFacade,
    private tagsFacade: TagsFacade
  ) {}

  ngOnInit() {
    // loads current sermon id
    const currentSermonId = this.route.snapshot.params.id;
    this.grabSermon(currentSermonId);

    this.sermonsFacade.loadSermons();

    // loads sermon details
    this.speakersFacade.loadSpeakersBySermonId(currentSermonId);
    this.mediaFacade.loadMediaBySermonId(currentSermonId);
    this.tagsFacade.loadTagsBySermonId(currentSermonId);
  }

  grabSermon(currentSermonId: string) {
    return this.sermonsFacade.selectSermon(currentSermonId);
  }

  sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  checkMediaType(mediaType: string) {
    return mediaType === 'VIDEO';
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
