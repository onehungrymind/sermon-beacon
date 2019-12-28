import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { BreakpointService, Media, MediaTypes, Sermon, Speaker, Tag } from '@sb/core-data';
import { MediaFacade, SermonsFacade, SpeakersFacade, TagsFacade } from '@sb/core-state';
import { NotifyService } from '@sb/ui-libraries';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  isMobile = this.breakpointService.isMobile();
  isTablet = this.breakpointService.isTablet();
  sermon$: Observable<Sermon> = this.sermonsFacade.selectedSermon$;
  speaker$: Observable<Speaker[]> = this.speakersFacade.allSermonSpeakers$;
  tags$: Observable<Tag[]> = this.tagsFacade.allSermonTags$;
  media$: Observable<Partial<Media[]>> = this.mediaFacade.allMedia$.pipe(
    filter((media: Media[]) => !!media.length),
    take(1),
    map((media: Media[]) => this.santizeEmbedCode(media))
  );

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private sermonsFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private mediaFacade: MediaFacade,
    private notifyService: NotifyService,
    private breakpointService: BreakpointService,
    private tagsFacade: TagsFacade,
  ) {}

  ngOnInit() {
    // loads current sermon id
    const currentSermonId = this.route.snapshot.params.id;
    this.grabSermon(currentSermonId);

    // loads sermon details
    this.sermonsFacade.loadSermons();
    this.speakersFacade.loadSpeakersBySermonId(currentSermonId);
    this.mediaFacade.loadMediaBySermonId(currentSermonId);
    this.tagsFacade.loadTagsBySermonId(currentSermonId);
  }

  grabSermon(currentSermonId: string) {
    this.sermonsFacade.selectSermon(currentSermonId);
  }

  handleMediaAction(media: Media) {
    switch(media.type) {
      case MediaTypes.AUDIO: {
        return this.getSermonAudio(media.url);
      }
      case MediaTypes.NOTES: {
        return this.downloadSermonNotes(media.url);
      }
      case MediaTypes.VIDEO: {
        return this.downloadSermonVideo(media.url);
      }
      default: {
        break;
      }
    }
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

  downloadSermonVideo(mediaUrl: string) {
    this.routeToVimeo(mediaUrl);

    return this.notifyService.openSnackBar('The sermon is downloading!');
  }

  downloadSermonAudio(mediaUrl: string) {
    this.getSermonAudio(mediaUrl);

    return this.notifyService.openSnackBar('The sermon audio is playing!');
  }

  downloadSermonNotes(mediaUrl: string) {
    this.routeToSermonNotes(mediaUrl);

    return this.notifyService.openSnackBar('The sermon notes are downloading!');
  }

  getSermonAudio(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sermonaudio.mp4');
    document.getElementsByTagName('body')[0].appendChild(link);
    // Firefox
    if (document.createEvent) {
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      link.dispatchEvent(event);
    }
    // IE
    else if (link.click) {
      link.click();
    }
    link.parentNode.removeChild(link);
  }

  routeToSermonNotes(mediaUrl: string) {
    window.location.href = mediaUrl;
  }

  routeToVimeo(mediaUrl: string) {
    window.location.href = mediaUrl;
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
