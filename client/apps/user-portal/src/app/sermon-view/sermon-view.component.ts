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
  speaker$: Observable<Speaker> = this.speakersFacade.selectedSpeaker$;
  media$: Observable<Media> = this.mediaFacade.selectedMedia$;
  tags$: Observable<Tag> = this.tagsFacade.selectedTag$;

  actionButtons = [
    { title: 'SAVE', icon: 'cloud_download' },
    { title: 'LISTEN', icon: 'graphic_eq' },
    { title: 'NOTES', icon: 'notes' }
  ];
  currentSermonId;
  media;

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
    this.sermonsFacade.loadSermons();
    this.speakersFacade.loadAll();
    this.mediaFacade.loadMedia();
    this.tagsFacade.loadTags();
    this.grabSermon();
    this.media = this.mediaFacade.selectMedia(this.currentSermonId);
    console.log(this.media$);
    this.speakersFacade.selectSpeaker(this.currentSermonId);
    this.tagsFacade.selectTag(this.currentSermonId);
  }

  grabSermon() {
    this.currentSermonId = this.route.snapshot.params.id;
    this.sermonsFacade.selectSermon(this.currentSermonId);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
