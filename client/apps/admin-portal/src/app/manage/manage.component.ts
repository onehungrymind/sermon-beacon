import { Component, OnInit } from '@angular/core';
import { Speaker, SpeakersService, emptySpeaker } from '@sb/core-data';

@Component({
  selector: 'sb-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {
  primaryColor = 'red';
  speakers$;
  selectedSpeaker: Speaker;

  constructor(private speakersService: SpeakersService) {
  }

  ngOnInit() {
    this.getSpeakers();
    this.resetSpeaker();
  }

  selectSpeaker(speaker) {
    this.selectedSpeaker = speaker;
  }

  resetSpeaker() {
    this.selectSpeaker(emptySpeaker);
  }

  getSpeakers() {
    this.speakers$ = this.speakersService.all();
  }

  saveSpeaker(speaker) {
    if(!speaker.id) {
      this.createSpeaker(speaker);
    } else {
      this.updateSpeaker(speaker);
    }
  }

  createSpeaker(speaker) {
    this.speakersService.create(speaker)
      .subscribe(result => {
        this.getSpeakers();
        this.resetSpeaker();
      });
  }

  updateSpeaker(speaker) {
    this.speakersService.update(speaker)
      .subscribe(result => {
        this.getSpeakers();
        this.resetSpeaker();
      });
  }

  deleteSpeaker(speaker) {
    console.log(speaker);
    this.speakersService.delete(speaker.id)
      .subscribe(result => this.getSpeakers());
  }

  cancel() {
    this.resetSpeaker();
  }

}
