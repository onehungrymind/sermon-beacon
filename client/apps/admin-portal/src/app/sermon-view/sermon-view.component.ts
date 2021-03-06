import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BreakpointService, Media, MediaTypes, Sermon } from '@sb/core-data';
import { MediaFacade, SermonsFacade, SpeakersFacade, TagsFacade } from '@sb/core-state';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  isMobile = this.breakpointService.isMobile();
  isTablet = this.breakpointService.isTablet();
  sermon$: Observable<Sermon> = this.sermonsFacade.aggregatedSermon$;
  video$: Observable<Media> = this.mediaFacade.videoMedia$.pipe(
    filter((media) => media && media.embedCode),
    map((media) => ({...media, embedCode: this.sanitizer.bypassSecurityTrustHtml(media.embedCode)}))
  );
  videoLoading$: Observable<Boolean> = this.mediaFacade.mediaLoading$;

  constructor(
    private breakpointService: BreakpointService,
    private mediaFacade: MediaFacade,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sermonsFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private tagsFacade: TagsFacade,
  ) {}

  ngOnInit() {
    // loads current sermon id
    const currentSermonId = this.route.snapshot.params.id;
    this.sermonsFacade.selectSermon(currentSermonId);

    // loads sermon details
    this.sermonsFacade.loadSermons();
    this.speakersFacade.loadSpeakersBySermonId(currentSermonId);
    this.mediaFacade.loadMediaBySermonId(currentSermonId);
    this.tagsFacade.loadTagsBySermonId(currentSermonId);
  }

  getMediaIcon(media: Media) {
    switch(media.type) {
      case MediaTypes.AUDIO: {
        return 'graphic_eq';
      }
      case MediaTypes.PDF: {
        return 'notes';
      }
      case MediaTypes.VIDEO: {
        return 'ondemand_video';
      }
      default: {
        return '';
      }
    }
  }

  handleMediaAction(mediaItemUrl: string) {
    window.open(mediaItemUrl, '_blank');
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
