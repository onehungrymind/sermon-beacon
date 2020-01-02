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
  sermon$: Observable<Sermon> = this.sermonsFacade.aggregatedSermon$.pipe(
    filter((sermon) => !!sermon && !!sermon.sermon_media.length),
    map((sermon) => ({...sermon, sermon_media: this.santizeEmbedCode(sermon.sermon_media)}))
  );

  tests = [
    { url: 'https://s3-us-west-2.amazonaws.com/test.sermonbeacon.mediabuttons/AUDIO/_flip-_--_Skyrim_Theme_Remix_-_DASH.mp3', type: 'AUDIO' },
    { url: 'https://s3-us-west-2.amazonaws.com/test.sermonbeacon.mediabuttons/PDF/BK-AGES+An+Exposition+Of+The+Seven+Church+Ages+VGR.pdf', type: 'NOTES' }
  ];

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

  grabSermon(currentSermonId: string) {
    this.sermonsFacade.selectSermon(currentSermonId);
  }

  getMediaIcon(media: Media) {
    switch(media.type) {
      case MediaTypes.AUDIO: {
        return 'graphic_eq';
      }
      case MediaTypes.NOTES: {
        return 'notes';
      }
      case MediaTypes.VIDEO: {
        return 'cloud_download';
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

  private santizeEmbedCode(media: Media[]) {
    return media.map((m: Media) =>
      ({...m, embedCode: this.sanitizer.bypassSecurityTrustHtml(m && m.embedCode)}));
  }
}
