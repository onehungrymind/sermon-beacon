import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { Media, MediaTypes, Sermon, Speaker, Tag } from '@sb/core-data';
import { MediaFacade, SermonsFacade, SpeakersFacade, TagsFacade } from '@sb/core-state';
import { map } from 'rxjs/operators';
import { NotifyService } from '@sb/ui-libraries';

@Component({
  selector: 'app-sermon-view',
  templateUrl: './sermon-view.component.html',
  styleUrls: ['./sermon-view.component.scss']
})
export class SermonViewComponent implements OnInit {
  sermon$: Observable<Sermon> = this.sermonsFacade.selectedSermon$;
  speaker$: Observable<Speaker[]> = this.speakersFacade.allSpeakers$;
  media$: Observable<Partial<Media[]>> = this.mediaFacade.allMedia$;
  tags$: Observable<Tag[]> = this.tagsFacade.allTags$;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private sermonsFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private mediaFacade: MediaFacade,
    private notifyService: NotifyService,
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

    this.media$ = this.media$.pipe(
      map((media: Media[]) => this.santizeEmbedCode(media))
    );
}

  santizeEmbedCode(media: Media[]) {
    return media.map((m: Media) => {
      const removePTags = m.embedCode.split('<p')[0];

      return {...m, embedCode: this.sanitizeHtml(removePTags)};
    });
  }

  grabSermon(currentSermonId: string) {
    return this.sermonsFacade.selectSermon(currentSermonId);
  }

  sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  handleMediaAction(media: Media) {
    switch(media.type) {
      case MediaTypes.AUDIO: {
        return this.listenToAudio();
      }
      case MediaTypes.NOTES: {
        return this.downloadNotes();
      }
      case MediaTypes.VIDEO: {
        return this.downloadVideo();
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

  downloadVideo() {
    return this.notifyService.openSnackBar('The sermon is downloading!');
  }

  listenToAudio() {
    return this.notifyService.openSnackBar('The sermon audio is playing!');
  }

  downloadNotes() {
    return this.notifyService.openSnackBar('The sermon notes are downloading!');
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
