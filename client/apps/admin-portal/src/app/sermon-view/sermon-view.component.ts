import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BreakpointService, Media, MediaTypes, Sermon, Speaker } from '@sb/core-data';
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

  constructor(
    private breakpointService: BreakpointService,
    private mediaFacade: MediaFacade,
    private route: ActivatedRoute,
    private router: Router,
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

  routeToMediaUrl(mediaUrl: string) {
    window.open(mediaUrl, '_blank');
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  speakerNames(speakers: Speaker[]) {
    const speakerNames = speakers.map((speaker: Speaker) => `${speaker.name}`);

    if (speakerNames.length === 1) return speakerNames[0];

    return `${speakerNames.slice(0, speakerNames.length -1).join(', ')} and ${speakerNames.slice(-1)}`;
  }

  private santizeEmbedCode(media: Media[]) {
    return media.map((m: Media) => {
      const removePTags = !!m.embedCode ? m.embedCode.split('<p')[0] : '';

      return {...m, embedCode: this.sanitizeHtml(removePTags)};
    });
  }

  private sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
